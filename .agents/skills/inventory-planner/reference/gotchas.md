# Pièges

Les erreurs qui font manquer une best-seller ou enterrent de la trésorerie sous
une palette. Les erreurs de stock sont lentes et coûteuses — elles se voient
sous forme de vente perdue, ou d'une étagère que personne ne touche pendant deux
ans.

---

## Piège : compter une rupture comme une demande nulle

**Pourquoi c'est important :** c'est l'erreur la plus destructrice de tout le
skill, et elle s'auto-alimente. La référence a manqué parce qu'elle se vend. Les
jours sans vente font baisser la vitesse. La commande suivante est plus petite.
Elle manque encore plus vite. Répétition.

### À éviter

```
Filtre Merv 11 : 12 unités vendues sur 28 jours = 0,43/jour. Rotulant, pas de
réapprovisionnement.
```
(l'étagère était vide 20 de ces 28 jours)

### À faire

```
Filtre Merv 11 : 12 unités sur les 8 jours où il était réellement en stock =
1,5/jour.
Rupture sur 20 des 28 derniers jours — c'est de la demande freinée, pas des
ventes lentes.
Je planifie sur 1,5/jour.
```

---

## Piège : commander sur un pic d'une semaine

**Pourquoi c'est important :** une seule commande en gros fait passer une
référence ordinaire pour une best-seller pendant exactement sept jours. Soixante
jours de couverture dimensionnés sur ce chiffre, c'est une palette que le
dirigeant a payée et qu'il regardera pendant un an.

### À éviter

Vitesse sur 7 jours 5,8/jour contre 0,4/jour sur 28 jours. Dimensionner 60 jours
à 5,8/jour.

### À faire

```
Le rythme sur 7 jours vaut quatorze fois celui sur 28 jours. En regardant les
commandes : une vente de 40 unités le 9. C'est un chantier, pas une tendance. Je
dimensionne sur le rythme 28 jours et je le signale au cas où ce client
reviendrait.
```

---

## Piège : recommander une réapprovisionnement pour une référence à vitesse
nulle

**Pourquoi c'est important :** zéro vente sur 28 jours, c'est arrêter
d'acheter. Un point de commande défini il y a des années dans l'ERP dira
volontiers l'inverse, et lui obéir transforme le fonds de roulement en
décoration d'étagère.

### À éviter

Le point de commande NetSuite indique 24, il y en a 6 en stock, donc commande
18.

### À faire

```
Zéro unité vendue sur 28 jours. Le point de commande enregistré indique 24 — il
est périmé.
Ce n'est pas une réapprovisionnement. Six unités, 340 € immobilisés. Vaut la
peine de les liquider.
```

---

## Piège : oublier ce qui est déjà commandé

**Pourquoi c'est important :** deux commandes de la même référence à trois
semaines d'intervalle, c'est le double achat classique, et il arrive en général
juste après une alerte de rupture, quand le dirigeant surveille tout.

### À éviter

38 en stock, cible 258, commande 240.

### À faire

```
38 en stock, 160 déjà en route depuis la commande du 02/03, cible 258 au total.
Il reste 60 — 2 cartons de 40, donc 80 unités. Si le chiffre des unités en
route est faux, dis-le-moi, ça change le résultat.
```

---

## Piège : un inventaire sans date de référence

**Pourquoi c'est important :** tout ce qui vient en aval, c'est du stock divisé
par la vitesse. Un comptage vieux de deux semaines sur une référence qui tourne
donne une date de rupture déjà dépassée.

### À éviter

Prendre l'inventaire déposé pour argent comptant et projeter à partir d'aujourd'hui.

### À faire

Demande quand il a été fait. Si le comptage date du 1er et qu'on est le 15,
soit tu retranches deux semaines de ventes, soit tu demandes un nouveau comptage
sur les références qui tournent — et tu dis lequel des deux tu as fait.

---

## Piège : une saisonnalité inventée sur un historique partiel

**Pourquoi c'est important :** un coefficient calculé sur neuf mois ressemble
exactement à un coefficient calculé sur trois ans. Il sert ensuite à acheter du
vrai stock, et personne ne pourra dire plus tard de quel type il s'agissait.

### À éviter

```
Coefficient juin : x1,6 (calculé)
```
(calculé sur 120 jours de données qui ne contiennent aucun juin)

### À faire

```
120 jours d'historique — aucun juin dedans, je ne peux donc pas calculer une
saison.
Tu connais ça mieux que les données. Juin est à peu près combien de fois plus
fort ?
```

---

## Piège : une vitesse calculée au niveau produit au lieu de la variante

**Pourquoi c'est important :** un produit qui se vend bien en une taille et
jamais en une autre paraîtverage sain. La bonne taille manque pendant que la
mauvaise s'accumule, et le chiffre au niveau produit ne montre ni l'une ni
l'autre.

### À éviter

Filtre, 20x25 : 4,1/jour, 38 en stock, tout va bien.

### À faire

Ventile par variante. Le 1 pouce manque dans quatre jours ; le 4 pouces a neuf
mois de couverture. Deux problèmes différents, une seule gamme.

---

## Piège : présenter des quantités sans leur montant

**Pourquoi c'est important :** le dirigeant décide sur de la trésorerie.
« Commander 240 filtres » n'est pas une décision qu'il peut prendre ; « 888 € »,
si.

### À éviter

Une liste d'achat de quantités sans colonne de coût.

### À faire

Chaque ligne chiffrée, chaque fournisseur sous-totalisé, et le total annoncé avant
la question de validation.

---

## Piège : accepter en silence une substitution fournisseur

**Pourquoi c'est important :** une référence différente part sur l'équipement
d'un client. C'est une décision du dirigeant, et parfois une question de
garantie, jamais un détail d'expédition.

### À éviter

Le fournisseur remplace le condensateur par un modèle compatible, commande mise à
jour, rien dit.

### À faire

Signale la substitution, les deux références, et l'effet sur la couverture si le
dirigeant la refuse. Puis laisse-le décider.