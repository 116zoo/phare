---
name: report-pack
allowed-tools: Read, WebFetch
description: >
  Assemble le pack de rapports : trésorerie, impayés, TVA, et selon le
  profil, DSO / DPO / DIO, marge, carnet.
  [EN] Assembles the monthly report pack.
---

> Language rule: see `shared/language.md`.

# Pack de rapports

Enchaîne deux skills pour que les chiffres récurrents du dirigeant arrivent
d'eux-mêmes, avec assez de contexte pour agir : `report-builder` pour le pack
lui-même, `business-pulse` pour la situation autour.

Le dirigeant a déjà en tête le rapport qu'il veut. Ce qu'il n'a pas, c'est que
celui-ci apparaisse le lundi sans qu'il ait à le réclamer. C'est tout le
travail ici.

## Étape 1 — Le pack de rapports (report-builder)

Appeler `report-builder`. Il porte la spécification, l'extraction des données,
les calculs et le classeur — ne rien refaire ici.

- **Entre :** la description du pack par le dirigeant, ou le nom d'un pack
  enregistré.
- **Sort :** un résumé dans la conversation, un classeur XLSX et une
  définition enregistrée.

`report-builder` consulte d'abord ses définitions enregistrées. Si le pack
existe déjà, il se relance sans réinterroger le dirigeant. Sinon, il construit la
spécification et la fait confirmer une fois.

**Garde — confirmation de la spécification.** Un pack entièrement nouveau
reçoit une confirmation du dirigeant avant de s'exécuter. Un pack qui a déjà une
définition enregistrée n'en reçoit pas. Redemander à quelqu'un de décrire un
rapport qu'il a défini le mois dernier est le moyen le plus rapide de faire
paraître cette commande cassée.

## Étape 2 — L'instantané de contexte (business-pulse)

Après l'exécution du pack, appeler `business-pulse` sur la même période.

- **Entre :** la période couverte par le pack.
- **Sort :** trésorerie, tendance des ventes, pipeline, liste de surveillance, et
  la seule chose qui demande de l'attention.

Le pouls est du contexte, pas un second rapport. Il répond à la question que le
pack soulève toujours : les chiffres ont bougé, mais l'entreprise va-t-elle
bien ?

**Aucune garde ici.** Les deux étapes sont en lecture seule. Rien n'est envoyé,
comptabilisé ni écrit, il n'y a donc rien à faire approuver entre elles.

## Étape 3 — Livrer comme un seul ensemble

Un seul message, dans cet ordre : le résumé du pack, puis le pouls en deux ou
trois lignes, puis le classeur.

Un dirigeant de mécanique reçoit son pack du lundi — chiffre d'affaires par
équipe comparé à l'an dernier, balance âgée des créances, main-d'œuvre en
pourcentage du chiffre d'affaires — et dessous : trésorerie à 61 400 €, deux
factures de plus de 60 jours, une camionnette toujours en panne. Il lit
l'ensemble en quatre-vingt-dix secondes et sait ce que sera son lundi.

Ne jamais envoyer deux livrables séparés. Un pack et un pouls qui arrivent
séparément sont deux choses à lire ; réunis, c'est un seul briefing.

Rendre ce briefing sous forme d'un unique artefact HTML au style maison
(`../../shared/artifact-style.md`) — en complément du résumé et du classeur,
jamais à leur place. Les indicateurs clés du pack deviennent des tuiles de
statistiques avec leurs comparaisons en lignes de contexte ; les lignes de
rapport groupées deviennent un tableau en chiffres tabulaires ; le contexte du
pouls occupe son propre panneau en dessous, ses éléments de liste de
surveillance portant des pastilles de statut (warn ou critical) ; les sources
citées figurent en un discret pied de page.

## Étape 4 — Fixer la cadence, une seule fois

**Proposer la programmation une seule fois, après une exécution que le
dirigeant a trouvée utile.** Pas avant — une cadence proposée sur un pack que
personne n'a encore vu est un argument d'abonnement.

Poser la question simplement : « Vous voulez ça tous les lundis matin ? » Sur un
oui, enregistrer la cadence avec la définition du rapport dans `report-builder`
et confirmer en une ligne : « Enregistré. Cela s'exécute tous les lundis matin. »

Puis tenir parole. Chaque exécution programmée répète les étapes 1 à 3 sans
question, sans reconfirmation et sans nouvelle proposition de cadence. Un
rapport programmé qui pose une question au dirigeant a cessé d'être programmé.

À un non ou à un silence, laisser tomber et ne jamais redemander.

Uniquement sur une exécution interactive — jamais sur une exécution programmée
— terminer par une ligne sur ce qui a été livré, puis l'étape suivante la plus
pertinente et au plus deux autres à proximité :

- Si le pack a soulevé une question de trésorerie : « prévision de trésorerie »
  lance `cash-flow-snapshot`.
- Si le pouls a signalé des créances échues : « qui me doit de l'argent » lance
  `invoice-chase`.
- Pour changer ce que le pack suit : « construis-moi un rapport » lance
  `report-builder`.

Trois propositions au maximum. Ne jamais répéter une proposition refusée dans
la session.

## Étape 5 — Tenir une exécution dégradée sans s'arrêter

Une exécution programmée a lieu que tous les connecteurs soient sains ou non.
Si une source est indisponible, `report-builder` marque cet indicateur « n/d »
et nomme la source ; le pack part quand même.

**Ne jamais sauter une livraison programmée parce que les données sont
incomplètes.** Un pack avec un trou et une note est utile. Un lundi silencieux
se lit comme une panne du plugin, et le dirigeant cesse de s'en attendre.

Si le dirigeant n'a aucun connecteur, le chemin CSV fait office de pack.
Demander l'export une fois, exécuter le rapport identique depuis le fichier, et
conserver la cadence.

## Ce qu'il ne faut pas faire

- **Ne pas réinterroger le dirigeant sur un pack enregistré.** Vérifier d'abord
  la définition enregistrée, à chaque exécution.
- **Ne pas reconstruire la logique de rapport ici.** `report-builder` porte la
  spécification, les calculs et le classeur.
- **Ne pas recalculer les chiffres du pouls.** `business-pulse` les porte, afin
  qu'il n'y ait qu'un seul jeu de chiffres.
- **Ne pas proposer la cadence deux fois.** Une fois, après une exécution utile,
  puis plus jamais.
- **Ne rien demander lors d'une exécution programmée.** Programmé signifie que
  cela arrive sans le discerning du dirigeant.
- **Ne pas sauter une exécution parce qu'un connecteur a échoué.** Livrer avec
  le trou nommé.
- **Ne pas livrer le pack et le pouls en deux messages.** Un briefing, une
  lecture.

## Utiliser un outil qui n'est pas listé

Les connecteurs nommés dans ce skill sont les chemins testés, pas une muraille.
Si le dirigeant veut que ce flux utilise un outil non connecté ou non listé,
proposer `build-connector` — il vérifie d'abord l'annuaire des connecteurs et se
connecte via Zapier sinon, jamais en construisant à la main contre une API brute.
Une fois la connexion en place, l'outil rejoint ce skill comme tout connecteur
optionnel, sous les mêmes gardes de validation.
