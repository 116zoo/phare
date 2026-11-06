# Objets, champs et types d'activité Salesforce

Les objets et champs Salesforce que le skill `crm-autopilot` lit et écrit,
ainsi que la manière dont il y accède. Seuls les champs listés ici sont dans le
périmètre ; tout le reste de l'org est laissé intact.

**Origine de ces noms.** Les noms d'API des objets standard, plus le contrat
d'outils Headless 360 publié par Salesforce. Tout nom d'opération que `discover`
renvoie fait autorité sur ce fichier.

---

## Comment fonctionne le connecteur

Salesforce est atteint via le serveur Headless 360, que le dirigeant ajoute
comme connecteur personnalisé (il a une adresse par org et son propre client
OAuth ; il n'apparaît donc pas dans le manifeste du plugin). Il expose quatre
outils, et chaque étape de ce skill suit le même enchaînement en trois temps :

1. `discover` — dis ce dont tu as besoin avec des mots simples (« trouve un
   contact par email », « ouvre les affaires sans activité récente »,
   « journalise un appel terminé »). Il renvoie des opérations classées par
   pertinence.
2. `describe` — celle que tu retiens. Lis ses paramètres et ses étapes ordonnées
   avant de l'appeler. Ne saute jamais cette étape : les noms de paramètres sont
   ceux de l'opération, pas ceux de ce fichier.
3. `dispatch_readonly` pour toute lecture ; `dispatch` uniquement pour
   l'écriture que le dirigeant a approuvée. `dispatch` s'exécute avec
   l'utilisateur connecté et avec ses droits, et il n'existe aucune opération de
   suppression — ce qui correspond à la toute première porte de ce skill.

Les formes d'appel sont détaillées dans `../../../shared/connector-call-shapes.md`.

---

## Contacts — écriture (`Contact`)

| Champ | Usage |
|---|---|
| `Email` | Identifiant principal pour la recherche et le dédoublonnage. Toujours renseigné à la création. |
| `FirstName` | Depuis la signature d'email ou l'invitation d'agenda si elle est disponible. |
| `LastName` | Exigé par Salesforce. Depuis la signature ou l'invitation ; si inconnu, demander avant de créer — n'invente pas de nom. |
| `AccountId` | Renseigné uniquement quand l'entreprise est sans ambiguïté (un Account existant correspondant au domaine de l'email). Sinon laisser vide et le dire. |

N'écris aucun autre champ contact. `OwnerId`, `LeadSource` et tout champ
personnalisé sont gérés par l'utilisateur.

## Contacts — lecture (pour la recherche)

| Champ | Usage |
|---|---|
| `Email` | Clé de recherche. La correspondance des emails dans Salesforce ignore la casse. |
| `FirstName` · `LastName` · `Account.Name` | Montrés au dirigeant lors de la résolution d'ambiguïtés. |
| `Id` | Le `WhoId` de toute activité journalisée sur cette personne. |

Une personne peut exister comme `Lead` plutôt que comme `Contact` (non convertie).
Cherche des deux côtés par email, avec `IsConverted = false` côté Lead — la ligne
d'un lead converti subsiste et apparaîtrait sinon à côté du Contact qu'il est
devenu. Une correspondance sur un `Lead` non converti est signalée comme un lead,
et l'activité est journalisée avec `WhoId` = l'`Id` du lead **et sans `WhatId`** —
Salesforce refuse une activité qui nomme à la fois un Lead et une Opportunity.
Dis que l'affaire n'est pas renseignée et qu'elle se rattache dès la conversion du
lead.

## Opportunities — lecture (tous les chemins de nettoyage et de résolution)

| Champ | Usage |
|---|---|
| `Name` | Montré au dirigeant ; rapproché approximativement de l'objet de l'email ou du titre de la réunion |
| `StageName` | Lecture seule pendant le nettoyage — signaler les écarts, ne jamais modifier |
| `Amount` | Lu pendant le nettoyage ; signaler si un email ou une réunion récent laisse entendre un changement |
| `CloseDate` | Lu pendant le nettoyage ; signaler s'il est dépassé sur une affaire ouverte |
| `NextStep` | Lu, et mises à jour proposées pendant le nettoyage |
| `OwnerId` → `Owner.Name` | Montré au dirigeant ; jamais modifié |
| `IsClosed` | Filtre du pipeline ouvert |
| `LastActivityDate` | Détection des affaires périmées. Renseigné par les Tasks et Events terminés ; **null sur un enregistrement où aucune activité n'a jamais été journalisée** — traite le null comme l'affaire la plus silencieuse, pas comme « pas de données » |
| `OpportunityContactRoles` (sous-requête) | Si les participants de l'email ou de la réunion figurent sur l'opportunity. Un objet enfant, pas une colonne : `SELECT Id, (SELECT ContactId, Role FROM OpportunityContactRoles) FROM Opportunity WHERE Id = ...` |

## Opportunities — écriture (chemin de nettoyage uniquement, avec approbation)

| Champ | Règle |
|---|---|
| `NextStep` | Proposé à partir de la prochaine étape extraite ; écrit uniquement après approbation |
| `CloseDate` | Proposé quand les éléments de preuve indiquent une date ; écrit uniquement après approbation |
| `StageName`, `Amount` | **Jamais écrits par ce skill.** Signale et laisse en suspens ; l'étape alimente les prévisions que le dirigeant transmet à d'autres personnes |

Ne crée jamais une Opportunity sans demande explicite. N'en clôture jamais une.

## Activities — écriture

| Activité | Objet | Champs |
|---|---|---|
| Call | `Task` | `Subject`, `Description` (le résumé, jamais la transcription), `ActivityDate` (la date réelle), `Status` = Completed, `TaskSubtype` = Call, `WhoId` (contact ou lead), `WhatId` (opportunity) |
| Email | `Task` | Idem, `TaskSubtype` = Email |
| Meeting | `Event` | `Subject`, `Description`, `StartDateTime` et `EndDateTime` (les heures réelles), `WhoId`, `WhatId` |

`WhoId` prend un `Id` de Contact ou de Lead ; `WhatId` prend un `Id` d'Opportunity
ou d'Account. Chacun peut être seul : une activité rattachée uniquement à une
affaire (`WhatId` renseigné, pas de `WhoId`) est valide, et il en va de même
pour une activité rattachée uniquement à un contact. La seule contrainte est
qu'un `WhoId` de Lead exige un `WhatId` vide. Une activité sans l'un ni l'autre
est orpheline et invisible depuis l'affaire ; si l'affaire ne peut pas être
résolue, journalise contre le contact et dis que l'affaire n'est pas renseignée.

## Règles de rattachement

- Un contact rejoint une opportunity via `OpportunityContactRole` ; propose
  d'ajouter un participant présent à l'email ou à la réunion mais absent de
  l'opportunity, n'ajoute jamais en silence.
- L'entreprise d'un contact est `AccountId`. Si le domaine de l'email correspond
  à exactement un Account, propose-le ; s'il n'en correspond aucun ou plusieurs,
  laisse le champ vide et dis-le.

---

## Ce que le chemin Salesforce ne peut pas faire ici

- **Supprimer.** Aucune opération n'existe ; le skill n'en a jamais voulu une.
- **Faire des jointures arbitraires en une lecture.** SOQL couvre les
  rattachements parents (contact → account, opportunity → account) et un niveau
  de sous-requête enfant (les rôles contact d'une opportunity) ; au-delà, il
  faut deux lectures, et le compte rendu le dit.
- **Contourner les droits propres de l'utilisateur.** `dispatch` s'exécute avec
  le dirigeant connecté. Un champ qu'il ne peut pas modifier dans Salesforce ne
  peut pas l'être non plus d'ici, et l'erreur est rapportée comme telle, pas
  comme un échec du plugin.