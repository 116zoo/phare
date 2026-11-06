---
name: grow-pipeline
allowed-tools: Read, WebFetch
description: >
  Développe le pipeline commercial : pistes, relances, prévisions. Contrôle
  RGPD. À utiliser quand le dirigeant dit « remplir le pipeline », « les
  prospects ».
  [EN] Grows the sales pipeline.
---

> Language rule: see `shared/language.md`.

Lance la chaîne de construction du pipeline : une lecture de marché native web
pour le contexte, puis `lead-finder` pour la liste, `outreach-composer` pour les
messages, et `crm-autopilot` pour la trace. Chaque skill conserve ses propres
gardes, et cette commande n'en relâche aucune.

Connecteurs : Apollo (ou Clay) plus HubSpot constituent le chemin complet. Mail
(Gmail ou Microsoft 365) ajoute l'envoi. Zoom ajoute les appels de découverte et
de vente enregistrés au journal de l'étape 4 — en lecture seule, uniquement les
réunions que le dirigeant a présidées ou suivies, et sa liste d'enregistrements
couvre une fenêtre d'un mois par appel, donc un balayage se fait mois par mois
plutôt que sur une plage qu'il ne peut pas renvoyer. Sans aucun de ces
connecteurs, la recherche web plus un CSV clients déposé fait l'entrée, une
liste triée et des messages rédigés sortent pour que le dirigeant les envoie
lui-même, et le journal vit dans un tableur. C'est une exécution réelle.

## Étape 1 — D'abord le contexte de marché (recherche web)

Exécuter cette branche en ligne et la garder limitée à ce qui éclaire le
ciblage — pas un brief hebdomadaire complet. Examiner les sources publiques sur
les concurrents du dirigeant et leur marché : sites et tarifs, activité
publicitaire et sociale, offres d'emploi, presse.

**Entre :** la liste de surveillance des concurrents si elle existe, plus les
sources publiques. Les données gagné-perdu de HubSpot quand il est connecté,
qui constituent le signal le plus affûté disponible et ne sont pas publiques.

**Sort :** ce qui a changé sur le marché, quels concurrents apparaissent dans les
affaires perdues, et où la demande se déplace. Faits observés et inférences
étiquetés séparément, toujours.

**Garde :** montrer la lecture au dirigeant et demander si elle change la cible.
Une seule question. Si rien d'essentiel n'a changé, le dire en trois lignes et
passer à la suite — un marché calme est une réponse valide et ne bloque pas la
chaîne.

## Étape 2 — Construire la liste (lead-finder)

Déclencher le déroulé du skill `lead-finder`, en passant le contexte de l'étape
1 comme entrée de ciblage.

**Entre :** la base de clients réelle du dirigeant depuis QuickBooks, HubSpot ou
un CSV déposé, plus la lecture de marché. Le profil de client idéal est déduit de
qui paie réellement, jamais demandé dans l'abstrait.

**Sort :** 40 à 60 entreprises triées, chacune avec une personne nommée, une
raison d'appeler, et un score adéquation / signal / joignabilité. Les contacts
déduits sont signalés comme tels.

**Garde :** le dirigeant obtient une passe de correction sur le profil avant que
la liste soit construite — « oui, mais pas ceux de moins de 10 salariés » vaut
plus que n'importe quel enrichissement. Puis il approuve la liste avant qu'un
seul message soit rédigé.

**Garde :** écrire la liste dans HubSpot demande son propre oui, avec le nombre
de contacts et d'entreprises annoncé. Un refus ne pose pas de problème ; le
XLSX est le livrable.

## Étape 3 — Rédiger la prospection (outreach-composer)

Déclencher le déroulé du skill `outreach-composer` sur la liste approuvée.

**Entre :** les prospects triés avec leurs raisons, plus le profil de voix
partagé. S'il n'existe pas de profil, il est construit à partir de 15 à 30
messages envoyés par le dirigeant lui-même avant qu'un mot ne soit écrit.

**Sort :** une séquence argumentée par prospect — premier message sous 120 mots,
chaque point de contact portant une raison neuve d'exister, passé au test
d'oisiveté avant que le dirigeant ne le voie.

**Garde :** le dirigeant lit le premier message en entier et survole la forme du
reste, puis modifie. Attendre des modifications. Chaque correction se réinjecte
dans le profil de voix pour ne pas avoir à la refaire.

**Garde :** l'envoi exige un oui explicite pour ce lot précis, en indiquant
combien de messages, à qui, sur quel calendrier et depuis quel compte.
L'approbation du premier message n'est pas l'approbation des relances — les
confirmer séparément ou les laisser en brouillons.

**Garde :** les prospects dont l'adresse email a été déduite plutôt que vérifiée
sont signalés et approuvés comme un groupe distinct. Des retours à lrance en
volume endommagent le domaine d'envoi du dirigeant pendant des mois, et cet
endommagement atteint son vrai courrier client.

Sans connecteur mail, l'ensemble fonctionne en brouillons uniquement, mis en
forme pour être collé n'importe où.

## Étape 4 — Journaliser (crm-autopilot)

Déclencher le déroulé du skill `crm-autopilot` en mode journal.

**Entre :** chaque point de contact envoyé ou rédigé, avec qui, quand, et où il
se situe dans la séquence.

**Sort :** activité journalisée contre le bon contact et la bonne affaire, une
prochaine étape datée sur chaque ligne ouverte, et les points de contact
silencieux mis en évidence pour la passe suivante.

**Garde :** les écritures CRM sont approuvées. La création de contact est
annoncée avant de se produire. L'étape et le montant d'une affaire sont
proposés, jamais écrits. Rien n'est jamais supprimé.

Sans CRM, le journal va dans le tableur léger pour que la prochaine exécution
sache qui a déjà été contacté. Contacter quelqu'un deux fois avec la même
accroche est une erreur visible et évitable.

## Gardes de validation (doivent tenir)

- Aucun envoi de prospection sans approbation explicite du lot — brouillons
  jusque-là.
- Les contacts déduits sont signalés et approuvés séparément des contacts
  vérifiés.
- Aucune écriture CRM sans oui, et aucune affaire créée sans demande.
- Aucune adresse email, aucun numéro de téléphone et aucun fait concurrentiel
  fabriqué n'entre dans la chaîne à une étape quelconque.
- Si un connecteur échoue — Apollo, HubSpot, le connecteur mail — le nommer, et
  demander s'il faut réessayer, basculer sur des fichiers, ou s'arrêter.

## Ce qu'il ne faut pas faire

- **Ne pas sauter l'étape marché pour atteindre la liste plus vite.** C'est elle
  qui rend les raisons de chaque ligne spécifiques plutôt que génériques.
- **Ne pas gonfler la liste.** Quarante lignes vraiment researched que le
  dirigeant appellera valent mieux que cinq cents lignes scrapées qui bounce.
- **Ne pas fusionner un nom d'entreprise dans un gabarit et appeler ça de la
  personnalisation.** Si le message peut partir à n'importe qui en changeant
  deux mots, il n'est pas prêt.
- **Ne pas traiter une approbation comme l'approbation de la chaîne.** La
  liste, les messages, l'envoi et l'écriture CRM sont quatre décisions
  distinctes.
- **Ne pas envoyer aux adresses déduites dans le même lot que les vérifiées.**
- **Ne pas traiter l'absence d'Apollo comme un blocage.** Recherche web plus
  export clients est un chemin conçu.

## Sortie

**Livrer le dossier pipeline selon la préférence de sortie enregistrée — jamais
par défaut en fichier markdown.** Vérifier le champ `Output preference` du bloc
`## Business context` (règle du guide de style partagé,
`../../shared/artifact-style.md`) :

- **Artefact visuel (par défaut) :** rendre l'exécution en page HTML au style
  maison — prospects trouvés, rédigés et envoyés en tuiles de statistiques, la
  liste en lignes portant chacune sa raison, et une pastille de contact déduit
  là où elle s'applique. **Chaque message rédigé est un bloc de texte à
  copier** pour que le dirigeant puisse le copier et l'envoyer lui-même.
- **Préférence docx / md / notion / canva :** livrer le même contenu sous cette
  forme — un fichier DOCX ou markdown, une page Notion créée via le connecteur
  (destination nommée, jamais d'écrasement), ou un Canva Doc via le connecteur
  Canva (un nouveau design par exécution, nommé avec la date ; les tableaux
  deviennent des listes) ; retomber sur l'artefact visuel si Notion ou Canva
  n'est pas connecté — en le disant.
- **Best for skill :** utiliser l'artefact visuel — cette sortie est une liste
  sur laquelle le dirigeant travaille, pas de la prose.

Terminer par un récapitulatif d'un paragraphe : ce que la lecture de marché a
dit, combien de prospects ont retenu la liste et comment elle a été construite,
combien de messages ont été rédigés contre envoyés et à qui, ce qui a été écrit
dans le CRM, et ce qui reste à faire par le dirigeant.

Puis une clôture brève : l'entonnoir est rempli et chaque point de contact est
journalisé. L'étape suivante naturelle est « les prospects refroidissent » —
`speed-to-lead` rattrape les réponses et les nouvelles entrées que cette
prospection génère avant qu'elles ne refroidissent. À proximité aussi :
« réactiver les clients silencieux » (`/reactiver-clients`) pour les clients
déjà perdus, et « est-ce que mon marketing fonctionne » (`growth-pulse`) pour
voir si la poussée pipeline se lit dans les chiffres. Proposer au plus trois, et
omettre toute proposition déjà refusée dans la session.

## Utiliser un outil qui n'est pas listé

Les connecteurs nommés dans ce skill sont les chemins testés, pas une muraille.
Si le dirigeant veut que ce flux utilise un outil non connecté ou non listé,
proposer `build-connector` — il vérifie d'abord l'annuaire des connecteurs et se
connecte via Zapier sinon, jamais en construisant à la main contre une API brute.
Une fois la connexion en place, l'outil rejoint ce skill comme tout connecteur
optionnel, sous les mêmes gardes de validation.
