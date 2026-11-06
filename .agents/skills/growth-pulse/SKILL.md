---
name: growth-pulse
description: >
  Répond à la seule question qui compte pour un dirigeant de PME : le moteur de
  croissance fonctionne-t-il vraiment ? Extrait la tendance des ventes par
  canal, la conversion de l'entonnoir, le retour des campagnes, les produits qui
  marchent et ceux qui ne marchent pas, et le sentiment client depuis ce qui est
  connecté, puis se termine par les trois actions de croissance qui valent la
  peine cette semaine. Le jumeau côté croissance de business-pulse, qui couvre le
  côté financier. À utiliser quand le dirigeant demande comment marchent son
  marketing ou ses ventes, si une campagne a rapporté, d'où viennent les leads,
  pourquoi le pipeline stagne, ou dit « est-ce que mon marketing fonctionne »,
  « comment va l'entonnoir », ou « où mettre mon argent le mois prochain ».
  [EN] Use whenever the owner asks how marketing or sales is performing,
  whether a campaign paid off, where leads come from, why the pipeline is
  stalling, or says "is my marketing working" or "how's the funnel."
allowed-tools: Read, WebFetch
---

> Language rule: see `shared/language.md`.

# Pouls de croissance

Une page qui répond à la question : le moteur de croissance fonctionne-t-il, et
que faire à son sujet cette semaine.

Les dirigeants décrivent un travail où ils ouvrent trois tableaux de bord et
cherchent eux-mêmes l'histoire à raconter. C'est cette histoire qui est le
livrable — pas les tableaux de bord.

## Étape 1 — Tout extraire en parallèle

Envoyer tous les appels de connecteur en un seul lot. Voir
`reference/data_sources.md` pour le correspondance métrique / outil. Des
extractions en série transforment ceci en une attente que personne ne vit deux
fois.

- **HubSpot** — affaires par étape, nouveaux contacts, source des leads, taux de
  réussite, durée de cycle, affaires à l'arrêt
- **PayPal, Stripe, Square** — tendance des revenus, nombre de transactions,
  remboursements
- **Shopify** — commandes, revenus par référence, taux de réachat
- **QuickBooks** — revenu réalisé, le chiffre sur lequel les comptes concordent
- **TikTok Ads** — dépense de la semaine passée, impressions, clics, résultats et
  coût par résultat par campagne, via le connecteur natif
  (`report_integrated_get`, 7 derniers jours contre les 7 précédents), pour que
  la dépense payante soit posée à côté des ventes qu'elle prétend driver
- **Mailchimp** — analyses de campagne, e-commerce et croissance d'audience,
  avec attribution de revenu sur les campagnes
- **Gmail ou Microsoft 365** — volume des demandes entrantes et délais de
  réponse
- **Avis publics** — notes récentes et texte des avis, par recherche web

Si une source échoue ou manque, l'enregistrer et continuer. Ce skill est conçu
pour dire quelque chose d'utile sur un connecteur et quelque chose d'excellent
sur six.

**Zéro connecteur est un chemin pris en charge.** Demander des exports — un
export d'affaires CRM, un rapport de ventes, un CSV de performance publicitaire —
et construire le même pouls à partir de fichiers. Le dire clairement plutôt que
de bloquer.

## Étape 2 — Calculer les cinq vues

Lire `reference/thresholds.md` pour les seuils. Calculer chaque vue et lui
attribuer un statut.

1. **Tendance par canal** — revenus par canal sur la période contre la
   précédente, et contre la même période de l'an dernier si disponible
2. **Conversion de l'entonnoir** — leads entrants, qualifiés, opportunités,
   gagnés ; le taux de conversion entre chaque étape et l'endroit où la plus
   forte chute se situe
3. **Retour des campagnes** — dépense contre revenu attribué par campagne, et
   coût par lead
4. **Performance des produits** — les trois premiers et les trois derniers par
   revenu et par taux de croissance
5. **Sentiment client** — notes d'avis récentes, thèmes des avis, litiges,
   signaux de départ

Une vue sans donnée est marquée « n/d » et nommée en annexe. Elle ne disparaît
pas en silence.

## Étape 3 — Trouver la véritable histoire

C'est là que le skill mérite son nom. Cinq vues seules restent un tableau de
bord. Le travail consiste à les relier entre elles.

Les liaisons qui comptent le plus :

- **Dépense en hausse pendant que le coût par lead monte** signifie que le canal
  sature au lieu de prendre de l'ampleur
- **Volume de leads solide avec taux de réussite en baisse** renvoie à la qualité
  des leads ou à la vitesse de réponse, pas au marketing
- **Un produit qui porte toute la tendance** signifie que la croissance est plus
  fragile que le total ne le laisse croire
- **Sentiment en baisse pendant que le revenu tient** est le signal d'alerte
  précoce qui apparaît dans le chiffre d'affaires deux mois plus tard
- **Une étape où l'entonnoir chute net** vaut généralement plus que n'importe
  quelle nouvelle campagne

Chercher la phrase unique qui explique la période. Commencer par elle.

## Étape 4 — Écrire les trois actions

Tout pouls se termine par exactement trois actions. Ni cinq, ni la liste de tout
ce qui a été remarqué.

Chaque action a besoin de trois choses, sinon ce n'est pas une action :

- **Quoi faire** — assez précis pour commencer aujourd'hui
- **Pourquoi** — le chiffre de ce pouls qui la justifie
- **Ce qu'elle vaut** — la taille approximative de l'opportunité ou du risque

Les classer par taille d'impact, pas par facilité. Le dirigeant peut juger ce qui
est facile ; seul ce pouls peut dire ce qui est gros.

Si la réponse honnête est que rien ne doit changer, le dire. Un pouls qui
fabrique trois actions chaque semaine apprend au dirigeant à les ignorer.

## Étape 5 — Composer

Utiliser la structure exacte de `reference/output_template.md`. N'inclure que
les sections ayant des données réelles.

Règles de rédaction :

- Les chiffres d'abord, les mots ensuite. Pas « le social payant a bien
  fonctionné » — « le social payant a généré 41 leads à 18 € chacun, contre 31 €
  le mois dernier ».
- Chaque chiffre porte sa comparaison. Un chiffre sans référence est un insight
  manqué.
- Nommer la campagne, le produit, le canal ou le client précis. « Certaines
  campagnes ont sous-performé » est inutilisable.
- Aucun vocabulaire marketing que le dirigeant n'emploie pas. Pas « vitesse de
  haut de tunnel » — « combien de nouveaux leads sont arrivés et à quel rythme ».
- Si une section n'a rien à dire, écrire « Aucun changement notable » et passer.

## Étape 6 — Livrer la page de pouls

À côté du pouls dans la conversation — en complément, jamais à sa place — livrer
le pouls complet selon la préférence de sortie enregistrée — jamais par défaut
en fichier markdown. Vérifier le champ `Output preference` du bloc
`## Business context` (règle du guide de style partagé,
`../../shared/artifact-style.md`) :

- **Artefact visuel (par défaut) :** rendre le pouls en page HTML au style
  maison. Chacune des cinq vues devient un panneau ; la tendance des revenus, le
  coût par lead et le taux de réussite sont des tuiles de statistiques avec leur
  comparaison en ligne de contexte ; le retour des campagnes et la performance
  des produits sont des tableaux à colonnes de dépenses et de revenus en chiffres
  tabulaires ; le statut de chaque vue devient une pastille (good, warn,
  critical, ou n/d en texte simple) ; les trois actions clôturent la page dans
  leur propre panneau, classées.
- **Préférence docx / md / notion / canva :** livrer le même contenu sous cette
  forme — un fichier DOCX ou markdown, une page Notion créée via le connecteur
  (destination nommée, jamais d'écrasement), ou un Canva Doc via le connecteur
  Canva (un nouveau design par exécution, nommé avec la date ; les tableaux
  deviennent des listes) ; retomber sur l'artefact visuel si Notion ou Canva
  n'est pas connecté — en le disant.
- **Best for skill :** utiliser l'artefact visuel — cinq vues se comparent mieux
  côte à côte sur un seul écran.

## Étape 7 — Proposer d'enregistrer, une fois

Après la présentation, proposer une fois d'enregistrer le pouls en fichier ou de
le publier sur Slack. Publier sur Slack est une écriture vers l'extérieur, donc
cela n'arrive que sur ce oui explicite — la proposition est la garde de
validation. Si oui, le faire. Si non ou pas de réponse, passer à la suite. Ne pas
demander deux fois.

Puis clôturer par ce que le pouls a trouvé en une ligne, plus l'étape suivante la
plus pertinente et au plus deux autres à proximité :

- Si les actions pointent vers le contenu ou la promotion : « que dois-je
  mettre en avant » lance `content-strategy`.
- Si l'entonnoir est le problème : « remplir mon entonnoir » lance
  `/remplir-pipeline`.
- Pour le jumeau côté financier : « comment va l'entreprise » lance
  `business-pulse`.

Trois propositions au maximum. Ne jamais répéter une proposition refusée dans
la session.

## Variantes de périmètre

Les dirigeants veulent souvent une tranche plutôt que le pouls entier :

- **« Comment s'est passée la campagne »** — uniquement le retour des campagnes,
  plus le contrôle de sentiment
- **« Comment va le pipeline »** — uniquement la conversion de l'entonnoir et les
  affaires à l'arrêt
- **« Qu'est-ce qui se vend »** — uniquement la performance des produits
- **« Recevons-nous des avis »** — uniquement le sentiment
- **« Où dépenser le mois prochain »** — tendance par canal et retour des
  campagnes, avec les trois actions pondérées vers le budget

Donner la tranche demandée. Ne pas imposer le pouls complet à une question
étroite.

## Ce qu'il ne faut pas faire

- **Ne pas demander la permission avant d'extraire les données.** Le skill a été
  invoqué. L'exécuter.
- **Ne pas inventer d'attribution.** Si le revenu d'une campagne ne peut pas être
  tracé, dire que l'attribution est indisponible plutôt que d'attribuer du
  revenu au hasard. Une fausse attribution a déplacé de vrais budgets.
- **Ne pas présenter la valeur prévisionnelle du CRM comme du revenu.** Les
  valeurs d'affaires sont des espoirs ; les factures sont des faits. Étiqueter
  lequel est lequel.
- **Ne pas double-compter entre sources.** Une commande Shopify réglée sur Stripe
  est une seule vente. Choisir une source de revenu et la nommer.
- **Ne pas double-compter à l'intérieur d'une source.** Le résumé des ventes par
  client renvoie à la fois une ligne de synthèse parente et une ligne de total
  distincte pour le même client. Filtrer les lignes marquées comme totaux avant
  de classer les clients ou de calculer la concentration, sinon le même client
  apparaît deux fois et la concentration ressort trop haute.
- **Ne pas fabriquer de l'urgence.** Si la croissance est stable, le pouls doit
  se lire comme stable.
- **Ne pas lire les charges ou la marge depuis le résumé P&L de QuickBooks.**
  Totaliser les lignes (`../../shared/quickbooks-report-traps.md`, piège 2).

## Fichiers de référence

- `reference/data_sources.md` — correspondance connecteur / métrique, avec
  recours de repli
- `reference/thresholds.md` — seuils de statut pour chacune des cinq vues
- `reference/output_template.md` — structure exacte de sortie
- `reference/gotchas.md` — les modes de défaillance qui produisent des conseils
  de croissance fermement erronés

## Utiliser un outil qui n'est pas listé

Les connecteurs nommés dans ce skill sont les chemins testés, pas une muraille.
Si le dirigeant veut que ce flux utilise un outil non connecté ou non listé,
proposer `build-connector` — il vérifie d'abord l'annuaire des connecteurs et se
connecte via Zapier sinon, jamais en construisant à la main contre une API brute.
Une fois la connexion en place, l'outil rejoint ce skill comme tout connecteur
optionnel, sous les mêmes gardes de validation.

## Lien cluster Shopify
Cette compétence dialogue avec la boutique en ligne via `shopify-reporting` (hub : `shopify-hub`, doc : [AI Toolkit](../../shared/shopify-ai-toolkit.md)).
