---
name: restock
description: >
  Transforme ce qui se vend réellement en décision de réapprovisionnement, et
  va jusqu'à la comptabilité : calcule la vitesse de vente et des dates de
  rupture prudentes par référence, dimensionne la commande, rédige le bon de
  commande et le mail fournisseur, puis prépare l'écriture correspondante pour
  que la facture se rapproche du bon de commande à son arrivée. Signale aussi
  l'argent immobilisé, pour que le stock dormant soit liquidé plutôt que
  racheté. Fonctionne sur Shopify, Square ou un CSV ventes+stock déposé, et
  s'approfondit avec QuickBooks, Gmail ou M365, Calendar et NetSuite. Aucun bon
  de commande n'est envoyé sans validation. À utiliser quand le dirigeant dit
  « que dois-je recommander », « vais-je manquer de stock », « on manque
  toujours de filtres », ou « combien d'argent dort dans l'entrepôt ».
  [EN] Use when the owner says "what do I need to reorder," "am I going to run
  out," "restock," "we keep running out of filters," "draft a PO for my
  supplier."
allowed-tools: Read, WebFetch
---

> Language rule: see `shared/language.md`.

# Réapprovisionnement

Enchaîne deux skills pour que le réapprovisionnement finisse en comptabilité
plutôt que dans un mail oublié : `inventory-planner` décide quoi acheter,
`ap-processor` prépare ce que cela va coûter.

Le trou que cela comble est petit et coûteux. Le réapprovisionnement est
calculé, le bon de commande est rédigé, le mail est envoyé — puis rien n'est
enregistré nulle part, si bien que quand la facture arrive six semaines plus
tard, personne ne sait dire si le prix ou la quantité étaient justes.

## Étape 1 — Déterminer quoi acheter (inventory-planner)

Appeler `inventory-planner`.

- **Entre :** historique des ventes et stock physique depuis Shopify, Square
  ou NetSuite, ou un CSV des deux déposé par le dirigeant.
- **Sort :** vitesse sur 7 et 28 jours par référence, dates de rupture
  prudentes, une commande à 60 jours dimensionnée avec son coût, et une liste
  distincte de rotulants.

`inventory-planner` porte tout le calcul — les deux fenêtres de vitesse, le
traitement des distortions, la comparaison des délais, la règle de
saisonnalité. Ne rien refaire ici.

Deux de ses règles méritent d'être nommées dans l'enchaînement :

- **Un article à vitesse nulle n'est jamais candidat au réapprovisionnement.**
  Il ressort en rotulant, avec l'argent immobilisé dedans. Zéro vente veut
  dire arrêter d'acheter, pas acheter plus.
- **Une période de rupture n'est pas une demande nulle.** C'est de la demande
  freinée, et la traiter comme nulle sous-commande l'article indéfiniment.

**Garde — la liste d'achat.** Montrer le montant total et le nombre de
références qui vont manquer avant toute rédaction. Le dirigeant approuve la
liste, la rogne ou modifie les quantités. Chaque ligne porte sa vitesse, sa
couverture en jours, son délai, sa quantité et son coût : la décision prend
une minute au lieu d'une reprise complète.

## Étape 2 — Rédiger le bon de commande et le mail (inventory-planner)

Pour les lignes approuvées, `inventory-planner` rédige un bon de commande par
fournisseur et le mail qui l'accompagne, écrit dans la voix du dirigeant.

**Garde — les deux attendent un oui explicite, distinctement de l'étape 1.**
Approuver la liste d'achat, c'est convenir de ce qui sera commandé. Envoyer le
bon de commande, c'est engager l'argent et dépenser la relation fournisseur.
Annoncer le fournisseur, les lignes et le total avant de demander.

Sans connecteur mail (Gmail ou Microsoft 365), le bon de commande et le mail
sont des fichiers que le dirigeant envoie lui-même. C'est un résultat complet.

## Étape 3 — Laisser une trace que la facture future pourra rapprocher

Deux choses distinctes se passent ici, et il importe de savoir laquelle incombe
à quel skill.

**`inventory-planner` conserve le bon de commande lui-même.** Le bon de
commande approuvé est son document — fournisseur, lignes, quantités, prix, date
prévue. Il est enregistré et remis au dirigeant à l'étape 2, et c'est la trace
de ce qui a été commandé.

**`ap-processor` reçoit la note imputée, pas le bon de commande.** Lui
transmettre le fournisseur, le numéro de bon de commande, le total, la date
prévue, et le compte, la classe et l'affectation auxquels la dépense se
rattache.
`ap-processor` ne crée pas de bon de commande dans la comptabilité : il les
lit quand une facture arrive, pour faire le rapprochement à trois voies entre
facture, bon de commande et bon de réception. Ce qu'il attend de cette étape,
c'est une trace imputée, là où ce rapprochement ira la chercher.

- **Entre :** fournisseur, numéro de bon de commande, total, date prévue et
  l'imputation.
- **Sort :** une note imputée classée contre le fournisseur, pour que quand la
  facture arrive dans six semaines, prix et quantité puissent être vérifiés
  contre ce qui a réellement été approuvé.

**Garde — la validation de l'imputation.** C'est la garde propre à
`ap-processor`, et elle s'applique ici. Rien n'est écrit en comptabilité avant
le oui du dirigeant, et rien n'arrive comme facture — encore moins comme
paiement. **Aucun argent ne bouge dans cette commande** — payer ce qui arrive
relève de `/payer-factures`.

Si une imputation est incertaine sur un nouveau fournisseur, `ap-processor`
demande plutôt que de deviner. Une question maintenant vaut mieux qu'un
exercice comptable faux pour un an.

Sans connecteur comptable, la note imputée sort sous forme de fichier d'import
accompagnée d'un résumé, à côté du bon de commande. Le rapprochement à trois
voies aura lieu plus tard, à la main, contre une trace qui existe.

## Étape 4 — En faire un rythme

Un dirigeant de mécanique qui gère son stock depuis une étagère qu'il vérifie
quand une pièce manque — donc toujours trop tard. Avec Google Calendar connecté,
proposer une fois — après un réapprovisionnement que le dirigeant a trouvé utile
— de placer un créneau récurrent dans l'agenda pour la décision de
réapprovisionnement.

Cela fonctionne bien mieux comme rythme que comme exercice de pompier.
Proposer une fois. À un non ou à un silence, laisser tomber.

## Voie de repli

Un CSV de ventes plus un inventaire physique constituent une entrée
pleinement prise en charge. Beaucoup d'entreprises comptent sur un presse-papier,
et c'est une donnée légitime. Vitesse, dates de rupture, dimensionnement, bon de
commande et mail fournisseur sortent identiques. L'écriture comptable devient un
fichier d'import.

## Ce qu'il ne faut pas faire

- **Ne pas envoyer de bon de commande ni de mail fournisseur sans validation.**
  L'un engage de l'argent, l'autre engage une relation.
- **Ne pas traiter l'approbation de la liste d'achat comme une autorisation
  d'envoi.** Deux gardes, deux décisions.
- **Ne pas réapprovisionner un article à vitesse nulle.**
- **Ne pas dimensionner une commande sans déduire ce qui est déjà en
  route.** Commander deux fois un article lent immobilise de la trésorerie
  pendant des années.
- **Ne pas inventer une vitesse, un délai ou une date de rupture.** Un
  historique trop court se signale par référence.
- **Ne rien payer ici.** Les bons de commande sont préparés, pas payés. Le
  paiement relève de `/payer-factures`.
- **Ne pas présenter des quantités sans leur montant.** Le dirigeant décide sur
  de la trésorerie, pas sur des pièces.

## Sortie

**Livrer le plan de réapprovisionnement selon la préférence de sortie
enregistrée — jamais par défaut en fichier markdown.** Vérifier le champ
`Output preference` du bloc `## Business context` (règle du guide de style
partagé, `../../shared/artifact-style.md`) :

- **Artefact visuel (par défaut) :** rendre le plan en page HTML au style
  maison — total engagé en tuile de tête, en euros, chaque référence en ligne
  avec vitesse, date de rupture et quantité en chiffres tabulaires, et une
  pastille sur ce qui est déjà en route. Les bons de commande et les éventuels
  fichiers d'import accompagnent en pièces de travail, pas en second livrable.
- **Préférence docx / md / notion / canva :** livrer le même contenu sous cette
  forme — un fichier DOCX ou markdown, une page Notion créée via le connecteur
  (destination nommée, jamais d'écrasement), ou un Canva Doc via le connecteur
  Canva (un nouveau design par exécution, nommé avec la date ; les tableaux
  deviennent des listes) ; retomber sur l'artefact visuel si Notion ou Canva
  n'est pas connecté — en le disant.
- **Best for skill :** utiliser l'artefact visuel — cette sortie est une
  décision d'achat, pas de la prose.

## Après l'exécution

Les bons de commande sont partis et une trace imputée attend les factures. Quand
elles arrivent, l'étape suivante naturelle est « payer les factures » —
`/payer-factures` enchaîne le rapprochement, le contrôle de trésorerie et la
garde de paiement. À proximité aussi : « prévision de trésorerie »
(`cash-flow-snapshot`) pour voir l'effet des commandes engagées sur les 60
prochains jours, et « clôturer le mois » (`/cloturer-mois`) en fin de période.
Proposer au plus trois, et omettre toute proposition déjà refusée dans la
session.

## Utiliser un outil qui n'est pas listé

Les connecteurs nommés dans ce skill sont les chemins testés, pas une muraille.
Si le dirigeant veut que ce flux utilise un outil non connecté ou non listé,
proposer `build-connector` — il vérifie d'abord l'annuaire des connecteurs et
se connecte via Zapier sinon, jamais en construisant à la main contre une API
brute. Une fois la connexion en place, l'outil rejoint ce skill comme tout
connecteur optionnel, sous les mêmes gardes de validation.
