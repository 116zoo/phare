# Liste de contrôle du nettoyage

Les champs que le skill `crm-autopilot` vérifie lors du nettoyage d'une affaire, plus les éléments de preuve nécessaires pour signaler chacun. Il s'exécute quand l'utilisateur dit « nettoie HubSpot », « nettoie Salesforce » ou « cette affaire est-elle à jour », sur une affaire précise.

Passe en revue chaque point. Présente les constats sous forme de liste de contrôle ; n'écris que ce que l'utilisateur approuve.

**Les noms de champs ci-dessous sont ceux de HubSpot.** Sur Salesforce, les mêmes vérifications lisent ces champs sur `Opportunity`, via le flux discover → describe → dispatch_readonly décrit dans `salesforce-fields.md` :

| Vérification | HubSpot | Salesforce |
|---|---|---|
| 1. Dernière activité | `notes_last_updated` | `LastActivityDate` (null = rien de jamais journalisé) |
| 2. Prochaine étape | `hs_next_step` | `NextStep` |
| 3. Étape | `dealstage` | `StageName` — signalée uniquement, jamais écrite |
| 4. Date de closing | `closedate` | `CloseDate` |
| 5. Montant | `amount` | `Amount` — signalé uniquement, jamais écrit |
| 6. Contacts rattachés | rattachements de l'affaire | sous-requête `OpportunityContactRoles` ; une personne manquante est créée comme `Contact` (ou signalée comme un `Lead` existant non converti) avant qu'un rôle soit proposé |
| 7. Notes | notes portées sur l'affaire | enregistrements `Task` et `Event` rattachés à l'opportunity ; une note de clarification est une nouvelle `Task` avec `Status` = Completed, jamais une modification |

## 1. Date de dernière activité

**Vérification :** le `notes_last_updated` de l'affaire est-il plus ancien que la dernière interaction réelle (email ou réunion) impliquant ses contacts rattachés ?

**Éléments de preuve à signaler :** un fil d'emails ou un événement d'agenda de moins de 14 jours avec l'un des contacts de l'affaire, plus récent que `notes_last_updated`.

**Action proposée :** proposer de journaliser l'activité manquante. Ne marque pas l'affaire elle-même ; journaliser l'activité met `notes_last_updated` à jour automatiquement.

## 2. Champ prochaine étape (`hs_next_step`)

**Vérification :** le `hs_next_step` actuel reflète-t-il toujours ce qui a été convenu lors du dernier email ou de la dernière réunion ?

**Éléments de preuve à signaler :** le champ indique « envoyer la grille tarifaire » et un email ultérieur montre que la grille a bien été envoyée. Ou le champ est vide alors qu'une réunion récente a explicitement fixé une action suivante.

**Action proposée :** proposer une nouvelle valeur (ou une valeur vide si l'étape est franchie). Affiche l'actuel → le proposé côte à côte.

## 3. Étape de l'affaire (`dealstage`)

**Vérification :** les interactions récentes laissent-elles penser que l'affaire a changé d'étape — par exemple proposition envoyée, contrat signé, perdue face à un concurrent ?

**Éléments de preuve à signaler :** une formulation explicite dans les notes d'email ou de réunion comme « nous avançons », « nous avons signé », « nous sommes allés chez [concurrent] », ou un changement de rythme dans les réunions.

**Action proposée :** **signaler uniquement — ne jamais changer d'étape automatiquement.** Mets les éléments de preuve en avant et laisse l'utilisateur décider.

## 4. Date de closing (`closedate`)

**Vérification :** le dernier email ou la dernière réunion fait-il référence à un calendrier révisé qui contredit le `closedate` actuel ?

**Éléments de preuve à signaler :** des formulations comme « ça glisse au T3 », « nous signerons d'ici la fin du mois », ou « décalé jusqu'au prochain trimestre ».

**Action proposée :** proposer une date mise à jour. Affiche l'actuelle → la proposée.

## 5. Montant (`amount`)

**Vérification :** le dernier email ou la dernière réunion mentionne-t-il une taille d'affaire différente ?

**Éléments de preuve à signaler :** une révision explicite des tarifs dans un email de tarification, un périmètre élargi en réunion, ou un périmètre réduit que le client a accepté.

**Action proposée :** proposer un montant mis à jour. Affiche l'actuel → le proposé.

## 6. Contacts rattachés

**Vérification :** y a-t-il des personnes participant à des emails ou réunions récents avec les contacts de l'affaire qui ne soient pas elles-mêmes rattachées à l'affaire ?

**Éléments de preuve à signaler :** une copie d'un email ou un participant de réunion dont le domaine correspond au domaine d'un contact existant de l'affaire, sans que la personne figure sur l'affaire.

**Action proposée :** proposer d'ajouter le ou les contacts manquants à l'affaire. Crée d'abord le contact dans le CRM s'il n'existe pas encore (sur Salesforce : un `Contact`, puis un `OpportunityContactRole` ; les deux annoncés avant écriture).

## 7. Hygiène des notes

**Vérification :** y a-t-il des notes ou des activités de plus de 90 jours qui contredisent explicitement l'état actuel de l'affaire ?

**Éléments de preuve à signaler :** une note indiquant « client perdu » sur une affaire encore à une étape ouverte, ou une note mentionnant un montant de contrat périmé.

**Action proposée :** ajouter une nouvelle note clarifiant l'état actuel — **ne modifie ni ne supprime jamais** l'ancienne note. Ajoute, ne réécris pas l'historique.

## Format de sortie

Présente les constats sous forme de liste numérotée, chaque point indiquant :
- Ce qui a été signalé
- Les éléments de preuve (objet d'email + date, ou titre de réunion + date)
- L'action proposée (ou « signalement seul » pour les changements d'étape)

Demande ensuite une approbation point par point ou en bloc. N'écris que ce qui est approuvé.