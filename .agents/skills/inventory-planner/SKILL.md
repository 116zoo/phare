---
name: inventory-planner
description: >
  Détermine quoi recommander et quand, à partir de ce qui se vend vraiment :
  récupère l'historique des ventes et le stock physique depuis Shopify, Square,
  NetSuite ou un CSV déposé, calcule la vitesse sur 7 et 28 jours par référence,
  projette une date de rupture prudente, dimensionne une quantité de
  réapprovisionnement à 60 jours, et rédige les bons de commande et les mails
  fournisseurs pour la couvrir. Signale le surstock, le stock dormant et les
  articles à vitesse nulle comme des rotulants à écouler. Rien n'est commandé et
  aucun fournisseur n'est contacté sans validation. Saisis-le dès que le stock
  arrive — « que dois-je recommander », « vais-je manquer », « on manque
  toujours de filtres », « combien d'argent dort dans l'entrepôt », « qu'est-ce
  qui ne bouge pas ».
  [EN] Reach for this whenever stock comes up — "what do I need to
  reorder," "am I going to run out," "what is not moving."
allowed-tools: Read, WebFetch
---

> Language rule: see `shared/language.md`.
> Note : pour les profils negoce et fabrication, utiliser
> b2b-stock-planner et procure-to-pay à la place.

# Planificateur de stock

Achète ce qui se vend, avant que ça manque, et arrête d'acheter ce qui ne se vend pas.

Le stock, c'est de l'argent que le dirigeant a déjà dépensé. Deux choses tournent mal : manquer de l'article que les clients étaient venus chercher, et rester assis sur une palette de quelque chose que personne ne veut. Les deux se voient dans l'historique des ventes bien avant de devenir un problème, et c'est exactement ce que ce skill lit.

## Étape 1 — Obtenir les ventes et le stock

**Préféré :** Shopify pour les ventes et les niveaux de stock. Square et NetSuite fonctionnent de la même façon.

**Repli, entièrement pris en charge :** un CSV d'historique de ventes plus un comptage de stock physique. Deux fichiers, ou un seul avec les deux. Ce chemin fonctionne sans aucun connecteur et donne la même sortie. Beaucoup d'entreprises comptent sur une ardoise, et c'est une entrée légitime.

Il te faut, par référence : le SKU, le nom, les unités vendues par date, le stock physique actuel, le coût unitaire, le prix unitaire, le fournisseur, et le délai si connu. Un délai manquant se demande une fois et se mémorise — voir `reference/data_sources.md`.

**Dis à quelle date se rapporte le comptage.** Un chiffre de stock vieux de deux semaines produit une date de rupture fausse de deux semaines.

## Étape 2 — Calculer la vitesse, sur les deux fenêtres

Pour chaque référence, calcule :

- **Vitesse sur 7 jours** — unités par jour sur la dernière semaine. Repère ce qui se passe maintenant.
- **Vitesse sur 28 jours** — unités par jour sur quatre semaines. La base stable.

Les deux comptent, et leur désaccord est une information. Un article vendu trois fois son rythme sur 28 jours cette semaine est soit en tendance, soit sujet à une commande en gros, et ces deux cas appellent des réponses différentes. `reference/velocity_and_reorder.md` explique comment les distinguer.

Exclus de la base les distorsions ponctuelles quand tu peux les identifier : une seule commande en gros, un lot retourné, une période de rupture pendant laquelle l'article ne pouvait pas se vendre. **Une période de zéro vente parce qu'il n'y avait pas de stock n'est pas une demande nulle**, et c'est en la traitant comme telle qu'un article reste indéfiniment sous-commandé.

## Étape 3 — Projeter les dates de rupture, prudemment

La date de rupture, c'est le stock physique divisé par la vitesse quotidienne à laquelle tu fais le moins confiance — la plus élevée des deux fenêtres. Se tromper tôt coûte peu ; se tromper tard perd la vente.

Compare ensuite avec le délai. Ce qui compte n'est pas le moment où ça manque, c'est de savoir s'il reste le temps de commander :

- **Passé le point de non-retour** — le délai dépasse la couverture en jours. La rupture est déjà inévitable. Dis-le franchement.
- **Commander maintenant** — la couverture tient dans le délai plus une marge de sécurité.
- **Commander bientôt** — confortable, mais au prochain cycle.
- **Rien à signaler** — aucune action.

**N'annonce jamais une date de rupture pour un article sans vitesse fiable.** Les nouveaux articles avec deux semaines d'historique et les articles dont les ventes ont été interrompues sont signalés « historique insuffisant », par leur nom.

## Étape 4 — Dimensionner le réapprovisionnement

La cible par défaut est **60 jours de couverture plus le délai**, dimensionnée sur le **rythme de 28 jours** — pas sur le plus rapide des deux. Le stock doit durer depuis le jour où il arrive jusqu'au jour où la commande suivante arrive, donc laisser le délai de côté fait manquer l'article d'exactement autant de jours à chaque cycle. Ajuste ensuite pour le conditionnement, la quantité minimale de commande et ce qui est déjà en cours de commande.

Les deux rythmes font des travaux différents et les deux sont nommés sur la ligne : le plus élevé dit quand ça manque, celui de 28 jours dit combien acheter. Dimensionner une commande de 60 jours sur un pic d'une semaine, voilà comment l'argent finit dans une palette.

Ne dimensionne jamais un réapprovisionnement sans soustraire le stock entrant. Commander deux fois un article lent, voilà comment une entreprise se retrouve avec trois ans de stock.

Arrondis au conditionnement du fournisseur et dis dans quel sens tu as arrondi. Montre le coût en euros de chaque recommandation — le dirigeant décide sur de l'argent, pas sur des unités.

## Étape 5 — Traiter les articles qui ne bougent pas

Les articles à vitesse nulle et très lents sont une liste à part avec un but à part. **Ce ne sont jamais des candidats au réapprovisionnement.**

- **Vitesse nulle** — aucune unité sur 28 jours. À signaler comme rotulant avec l'argent immobilisé dedans. **Ne calcule jamais de couverture en jours pour ceux-là** — rien ne se vend, donc rien ne manque, et le chiffre est soit une erreur, soit du vent. La seule exception est un article appartenant à une saison que le dirigeant a nommée, qui part sur une liste de surveillance datée plutôt que sur la liste d'écoulement.
- **Surstock** — plus de 120 jours de couverture. Signale les unités en trop et les euros.
- **Stock dormant** — aucun mouvement sur 90 jours. Propose d'écouler, de regrouper en lot ou de faire une remise.

Additionne l'argent immobilisé dans tout ça. Ce chiffre est en général le plus surprenant de tout le rapport, et souvent le plus utile.

## Étape 6 — Appliquer la saisonnalité seulement là où l'historique la soutient

Avec au moins un an d'historique, compare la période à venir à la même période l'an dernier et ajuste.

**Avec moins d'un an, dis-le et n'ajuste pas.** Un multiplicateur saisonnier inventé à partir de neuf mois de données, c'est une supposition en costume. Demande plutôt au dirigeant — il connaît sa saison mieux qu'un court historique. `reference/seasonality.md` couvre les deux chemins.

## Étape 7 — Présenter la liste d'achat

Commence par le montant total en euros et le nombre de références qui vont manquer. Ensuite : commander maintenant, commander bientôt, rotulants, et tout ce qui n'a pas assez d'historique pour être jugé.

Chaque ligne porte les chiffres derrière elle — vitesse, couverture en jours, délai, quantité, coût. Un dirigeant qui voit le raisonnement approuve en une minute ; un autre refait tout le travail à la main.

Rends la liste d'achat sous forme d'artefact HTML en utilisant le style maison des artefacts (`../../shared/artifact-style.md`) : un tableau de ruptures trié par date de rupture avec des chiffres tabulaires monospace, des pastilles de statut d'urgence (commander maintenant / commander bientôt / rien à signaler / passé le point de non-retour), un panneau de réapprovisionnement avec les quantités et les totaux en euros, et une section rotulants avec l'argent immobilisé dedans. Le résumé dans le fil reste — l'artefact est la vue complète, pas la seule vue.

## Étape 8 — Rédiger les bons de commande et les mails fournisseurs, avec validation

Les bons de commande engagent de l'argent et les mails fournisseurs partent au nom du dirigeant, donc les deux attendent un oui explicite.

Énonce le fournisseur, les lignes et le total avant de demander. Rédige le mail fournisseur dans la voix du dirigeant selon [le profil de voix partagé](../../shared/voice-profile.md). **Si aucun profil n'existe encore, suis l'instruction « Quand il n'y a pas d'exemple » de ce fichier** — demande trois mails qu'il a déjà envoyés à un fournisseur. S'il préfère ne pas le faire, écris le mail simplement et de façon neutre, et dis qu'il n'est pas dans sa voix. N'invente jamais une personnalité pour la relation de quelqu'un avec son fournisseur.

Google Calendar étant connecté, propose un créneau récurrent pour la décision de réapprovisionnement — ça marche bien mieux comme rythme que comme urgence. Garde ici le document de bon de commande approuvé — ce skill en est le propriétaire. QuickBooks ou NetSuite étant connecté, transmets à `ap-processor` le mémo codé pour chacun (fournisseur, numéro de bon de commande, total, date prévue, et le compte, la classe et le chantier), pour que la facture se rapproche d'un enregistrement réel à son arrivée. `ap-processor` lit les bons de commande ; il n'en crée pas.

## Offre de clôture

Termine sur une ligne sur ce qui a été décidé — l'achat total et les références qui vont manquer. Puis propose l'étape suivante la plus pertinente avec sa phrase déclencheuse exacte : « réapprovisionner » (`/reapprovisionner`) quand le dirigeant veut les bons de commande rédigés et envoyés de bout en bout. Jusqu'à deux autres de la table du routeur, comme « prévision de trésorerie » (`cash-flow-snapshot`) ou « payer les factures » (`/payer-factures`). Trois offres au maximum, et ne répète jamais une offre déjà refusée lors de cette session.

## Ce qu'il ne faut pas faire

- **N'invente jamais une vitesse, un délai ou une date de rupture.** Trop peu d'historique se signale par SKU, on ne l'estompe pas.
- **Ne traite jamais une période de rupture comme une demande nulle.** C'est de la demande freinée, et cela biaise tout ce qui vient ensuite.
- **Ne recommande jamais de recommander un article à vitesse nulle.** Zéro vente veut dire arrêter d'acheter, pas acheter plus.
- **Ne dimensionne jamais un réapprovisionnement sans soustraire ce qui est déjà entrant.**
- **N'applique jamais la saisonnalité sans un an d'historique.** Demande plutôt au dirigeant.
- **N'envoie jamais un bon de commande ni un mail fournisseur sans validation.** Les deux dépensent de l'argent ou de la relation.
- **Ne rapporte jamais des unités sans euros.** Le dirigeant pense en argent.

## Fichiers de référence

- `reference/data_sources.md` — Shopify, Square, NetSuite, et la voie CSV, avec les champs requis
- `reference/velocity_and_reorder.md` — le calcul sur 7/28 jours, le traitement des distorsions, et le dimensionnement des réapprovisionnements
- `reference/seasonality.md` — quand ajuster, quand demander, et comment dire lequel des deux tu as fait
- `reference/po_drafting.md` — structure d'un bon de commande et rédaction des mails fournisseurs
- `reference/gotchas.md` — les erreurs qui mettent un best-seller en rupture ou enterrent de l'argent dans une palette

## Utiliser un outil qui n'est pas listé

Les connecteurs nommés dans ce skill sont les chemins testés, pas un mur. Si le dirigeant veut que ce flux utilise un outil qui n'est pas connecté ou listé, propose `build-connector` — il vérifie d'abord le répertoire des connecteurs et se connecte via Zapier sinon, jamais en construisant à la main contre une API brute. Une fois la connexion en place, l'outil rejoint ce skill comme n'importe quel connecteur optionnel, sous les mêmes portes de validation.

## Lien cluster Shopify
Cette compétence dialogue avec la boutique en ligne via `shopify-inventory` (hub : `shopify-hub`, doc : [AI Toolkit](../../shared/shopify-ai-toolkit.md)).
