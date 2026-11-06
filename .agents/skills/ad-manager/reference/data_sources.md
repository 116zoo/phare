# Sources de données

D'où viennent les chiffres, comment les obtenir sans connecteur, et comment réconcilier
les deux histoires qu'ils racontent.

---

## Connecteurs

| Source | Statut | Ce qu'il faut extraire |
|---|---|---|
| Canva | Disponible | Génération d'assets créatifs à partir d'un brief écrit |
| TikTok Ads | Le chemin natif connecté (TikTok MCP) | Dépense, impressions, clics, résultats, coût par résultat — au niveau campagne, groupe d'annonces et annonce |
| Google Ads | Pas de connecteur natif — accessible via une connexion Zapier construite avec `build-connector`, proposée une seule fois quand le dirigeant y fait de la publicité | Ce que les actions Zapier connectées exposent. L'export CSV fonctionne toujours quand aucune connexion n'existe |
| HubSpot | Optionnel mais très utile | Leads par source, affaires conclues par source — le vérificateur de vérité face aux déclarations des plateformes |
| QuickBooks, Shopify, Square | Optionnels | Revenu réellement encaissé sur la période |

**Vérifier avant de supposer.** Si un appel TikTok ou une action Zapier échoue, ne pas
réessayer en boucle et ne pas bloquer. Dire que le chemin n'est pas disponible,
basculer sur la voie export, et continuer. Ne jamais appeler directement une plateforme
sans connecteur natif — elle passe par une connexion Zapier construite ou par un CSV.

---

## La voie de l'export CSV

C'est la voie commune. La traiter comme le cas par défaut, pas comme le plan B.

### Ce qu'il faut demander, avec les mots du dirigeant

- **Google Ads :** « Dans Google Ads, va dans Campaigns, mets la plage de dates sur
  les 30 derniers jours, clique sur l'icône de téléchargement, choisis CSV. »
- **TikTok :** « Ads Manager, onglet Campaign, Export, 30 derniers jours. »

Demander aussi 90 jours quand la question porte sur la tendance plutôt que sur ce
mois-ci. Dire pourquoi : « 30 jours nous dit où nous en sommes, 90 jours nous dit dans
quel sens ça bouge. »

### Lire le fichier

Les noms d'en-tête varient selon la plateforme et les réglages d'export. Faire la
correspondance, ne pas supposer.

| Ce qu'il faut | Noms de colonnes courants |
|---|---|
| Dépense | `Amount spent`, `Cost`, `Total spent` |
| Impressions | `Impressions`, `Impr.` |
| Clics | `Clicks (all)`, `Link clicks`, `Clicks` |
| Résultats | `Results`, `Conversions`, `Leads`, `Purchases` |
| Coût par résultat | `Cost per result`, `Cost / conv.` — ou le calculer |
| Portée et fréquence | `Reach`, `Frequency` |
| Plage de dates | Généralement dans une ligne d'en-tête au-dessus du tableau, pas une colonne |

**Deux pièges dans les exports réels.** D'abord, `Results` peut vouloir dire des
choses différentes selon la campagne — le résultat d'une ligne est un formulaire de
lead, celui d'une autre est une vue de page. Vérifier la colonne `Result type` si elle
existe ; sinon, dire que les résultats ne sont pas comparables d'une campagne à l'autre
plutôt que de les additionner. Ensuite, les symboles de devise et les séparateurs de
milliers arrivent sous forme de texte. Les retirer avant tout calcul.

Si une colonne nécessaire est absente, la nommer : « cet export contient la dépense et
les clics mais pas de colonne de conversion, donc je peux te dire ce qu'a coûté le
trafic et rien sur ce qu'il a produit. » Puis proposer le réglage d'export qui
l'inclurait.

---

## Réconcilier les chiffres de la plateforme avec le CRM

Les deux ne concorderont jamais. L'écart est une information, pas une erreur.

**Pourquoi les plateformes en rapportent davantage :**

- Conversions view-through — quelqu'un a vu la pub, n'a pas cliqué, et a acheté plus
  tard
- Attribution cross-device que le CRM ne voit pas
- Fenêtres d'attribution, souvent 7 jours après un clic et 1 jour après une vue
- Chaque plateforme revendique la même conversion quand un client a touché plusieurs
  pubs

**Pourquoi le CRM en rapporte moins :**

- Le champ source est vide sur les enregistrements créés à la main
- Les appels téléphoniques et les visites spontanées ne portent aucune source numérique
- Les formulaires remplis qui n'ont jamais devenu un enregistrement CRM

### La méthode

1. Extraire les résultats déclarés par la plateforme, campagne par campagne
2. Extraire les leads et les affaires conclues du CRM avec cette source, sur les mêmes
   dates
3. Montrer les deux, côte à côte, étiquetés par qui les a déclarés
4. Donner au dirigeant un seul chiffre sur lequel piloter — le coût par affaire conclue
   issu du CRM — et étiqueter le chiffre de la plateforme comme la borne optimiste

### Le rapporter ainsi

```
Social payant — Spring Tune-Up
  Dépense                  1 840 €
  La plateforme indique     34 conversions, 54 € chacune
  Le CRM indique            19 leads rattachés, 6 devenus des affaires
  Coût par affaire réelle  307 €
  L'écart                  La plateforme compte les gens qui ont vu la pub puis ont
                           appelé plus tard. Le CRM ne compte que ce qui a été
                           rattaché. Le chiffre réel est probablement entre les
                           deux, plus proche du CRM.
```

Ne jamais publier un chiffre agrégé unique. Les dirigeants renvoient ces chiffres à
leurs partenaires et à leurs prêteurs.

---

## Quand il n'y a aucun suivi

Beaucoup de petits comptes diffusent des pubs sans pixel et sans événement de
conversion. Les clics sont le seul signal.

Le dire clairement : « Il n'y a aucun suivi de conversion sur ce compte, donc personne
— ni moi, ni la plateforme — ne peut te dire ce que ces pubs ont produit. On peut
comparer le coût par clic d'une campagne à l'autre, ce qui te dit quelle création a
obtenu l'attention, et c'est tout ce que ça dit. »

Proposer ensuite la correction comme première recommandation, avant tout changement de
budget. Le suivi avant l'optimisation ; sinon, chaque recommandation ultérieure ne
repose sur rien.