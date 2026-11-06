# Vitesse et dimensionnement des réapprovisionnements

Le calcul, et le jugement qui entoure le calcul.

---

## Les deux fenêtres

**Vitesse sur 7 jours** = unités vendues sur les 7 derniers jours ÷ 7
**Vitesse sur 28 jours** = unités vendues sur les 28 derniers jours ÷ 28

Les deux, toujours, pour chaque référence. L'enjeu n'est pas d'en choisir une —
c'est que l'écart entre les deux te dit quelque chose.

| Motif | Lecture | Action |
|---|---|---|
| 7 j ≈ 28 j | Stable | Planifier sur le rythme 28 j. Simple |
| 7 j bien plus haut | Tendance à la hausse, ou une commande en gros | Vérifier le détail des commandes avant d'y croire |
| 7 j bien plus bas | Freinage, ou rupture en cours de semaine | Vérifier si le stock était disponible toute la semaine |
| 7 j nul, 28 j positif | Ventes arrêtées, ou rupture | Vérifier l'historique de stock avant de conclure à la mort du produit |

**Quand les deux divergent de plus de 50 %, regarde les commandes sous-jacentes
avant de recommander quoi que ce soit.** Une commande de gros de 40 unités fait
passer un article lent pour une best-seller pendant exactement une semaine, et
commander sur ce pic, c'est comme ça qu'on achète une palette.

---

## Sur quelle vitesse planifier

Deux chiffres différents, et il ne faut surtout pas les confondre :

- **`stockout_velocity`** = le rythme **le plus élevé** des deux, 7 jours ou
  28 jours. Sert à la couverture en jours et à la date de rupture.
- **`sizing_velocity`** = le rythme **sur 28 jours**. Sert à la quantité de
  réapprovisionnement.

Cette asymétrie est volontaire :

- Les dates de rupture doivent être prudentes. Se tromper tôt coûte un peu de
  coût de portage. Se tromper tard perd la vente, et parfois le client.
- Les quantités de réapprovisionnement doivent être sobres. Dimensionner 60 jours
  de stock sur un pic d'une semaine, c'est comme ça que la trésorerie se fait
  enterrer.

Dis quel rythme a servi à chaque chiffre. Un dirigeant qui lit « rupture au rythme
5,8, commande au rythme 4,1 » peut passer outre l'un ou l'autre en quelques
secondes. N'emploie jamais un seul mot — « vitesse de planification » — pour les
deux, car les deux chiffres diffèrent précisément sur les références qui comptent
le plus.

---

## Distorsions à éliminer

**Périodes de rupture.** Les jours à stock nul ne sont pas des jours à demande
nulle. Exclus-les du dénominateur : la vitesse, c'est unités vendues ÷ nombre de
jours où la référence était réellement disponible. Ne pas le faire conduit à
sous-commander durablement, précisément les références qui manquent sans arrêt.

**Commandes en gros ou de négoce.** Une commande unique nettement hors du format
habituel fausse la fenêtre dans laquelle elle tombe. Identifie-la, signale-la, et
donne les deux chiffres — avec et sans.

**Retours.** Deduis-les de la période où la vente a eu lieu, pas de celle où le
retour est arrivé.

**Promotions.** Une période avec une remise en cours n'est pas une base de
référence. Si les données de promotion sont disponibles, marque ces périodes. Si
elles ne le sont pas et que le dirigeant mentionne une vente, demande.

**Articles nouveaux.** Une référence avec moins de 28 jours d'historique n'a pas
de vitesse fiable sur 28 jours. Dis « historique insuffisant » par SKU plutôt que
d'annualiser une semaine.

---

## Couverture en jours et décision de commande

```
days_of_cover = (stock_on_hand + units_on_order) ÷ stockout_velocity
```

Le stock en route compte. Une référence avec 4 jours en rayon et une palette qui
arrive jeudi n'est pas sur le point de manquer, et la signaler comme urgente
apprend au dirigeant à ignorer la liste des urgences.

**Une vitesse nulle n'a pas de couverture en jours.** Diviser par zéro donne
soit une erreur, soit un nombre absurde, et dans les deux cas la référence n'a
rien à faire sur cette échelle — rien ne se vend, donc rien ne manque. Passe
outre tout le calcul de couverture et envoie-la directement sur la liste des
rotulants, avec la trésorerie qui y reste immobilisée. La seule exception est une
saison que le dirigeant a nommée ; voir plus bas.

Compare avec le délai plus une marge de sécurité. La marge par défaut est de 7
jours, ou la moitié du délai, la plus grande des deux — les délais longs demandent
proportionnellement plus de marge. **Plafonne la marge à 30 jours.**

```
buffer = min(30, max(7, lead_time_days ÷ 2))
```

Le plafond compte sur les approvisionnements lents. Un délai de 120 jours
produirait sinon une marge de 60 jours, qui transforme discrètement une commande
de 60 jours en une commande de 150 et enterre un quart de la trésorerie annuelle
dans un conteneur. Au-delà de 30 jours, la bonne réponse est de commander plus
souvent, pas de commander plus.

| Condition | Statut | Formulation |
|---|---|---|
| couverture < délai | Trop tard | « La rupture surviendra avant qu'une commande puisse arriver. Commander maintenant raccourcit l'écart, ne le comble pas » |
| couverture < délai + marge | Commander maintenant | « X jours de couverture, délai de Y jours. C'est la semaine » |
| couverture < 45 jours | Commander bientôt | « Rien pour l'instant, mets-le au prochain cycle » |
| couverture 45–120 jours | Rien à signaler | Aucune action |
| couverture > 120 jours | Surstock | Pas une réapprovisionnement. Voir la liste des rotulants |

### La seule exception pour la vitesse nulle

Un chauffe-eau de piscine ne vend rien en février, et ce n'est pas du stock
dormant — c'est février. Quand le dirigeant a nommé une saison pour une référence
ou une catégorie, une référence à vitesse nulle à l'intérieur de cette saison ne
part pas sur la liste des rotulants comme une chose à liquider.

Elle part sur une **liste de surveillance datée** : la référence, la date où le
dirigeant situe le début de la saison, et la date à laquelle la décision doit
être prise, soit le début de saison moins le délai.

```
Chauffe-eau de piscine, 400k BTU   SKU PHT-400
  Vitesse        0/jour (28j) — Ray dit que la saison commence vers le 15 mai
  En stock       4 unités
  Décider avant  le 10 avril — délai de 35 jours avant le début de la saison
  Statut         SURVEILLANCE, pas un rotulant
```

Deux règles garde le mécanisme honnête. **C'est le dirigeant qui nomme la
saison ; elle ne s'infère jamais** d'un mois calme ni de ce que le nom du produit
laisse penser. Et **l'entrée de surveillance porte une date**, parce qu'un
« saisonnier, à revoir plus tard » sans date, c'est la façon dont une entreprise
passe à côté de la toute première semaine chaude. Quand la date limite de
décision arrive sans qu'aucun historique de ventes existe, demande — ne
dimensionne pas une commande sur une saison qui n'a pas commencé.

---

## Quantité de réapprovisionnement

Dimensionné sur le rythme 28 jours, jamais sur le rythme chaud.

```
target    = (60 + lead_time_days) × sizing_velocity
order_qty = target − stock_on_hand − units_on_order
```

La cible couvre 60 jours de vente **plus** le délai, parce que le stock doit
tenir depuis le jour où il arrive jusqu'au jour où la commande suivante arrive.
Dimensionner 60 jours francs, c'est manquer de la longueur du délai à chaque
cycle.

Puis ajuste :

- Arrondis **à l'unité supérieure** sur le conditionnement, sauf si cela dépasse
  90 jours de couverture à la vitesse de dimensionnement ; dans ce cas, arrondis
  à l'unité inférieure et dis-le
- Respecte la quantité minimale de commande — voir plus bas
- Ne renvoie jamais une quantité négative. En dessous de zéro, c'est qu'il y en a
  déjà assez ; cette référence part sur la liste sans action
- **Retire toujours les unités commandées.** Quand la quantité en route est
  inconnue, dis que le chiffre suppose qu'il n'y a rien en route

### Quantité minimale de commande

**Une quantité minimale s'applique presque toujours au bon de commande
fournisseur entier, pas à chaque ligne.** Les fournisseurs fixent un montant ou
un nombre d'unités minimum par expédition. Vérifie d'abord le total par rapport
à ce seuil — trois références chacune en dessous peuvent l'atteindre ensemble, et
scinder une ligne pour franchir un minimum d'expédition fait commander du stock
dont personne n'a besoin.

Quand la commande reste en dessous et que le fournisseur refuse d'expédier, le
dirigeant a une vraie décision à prendre : donne-lui les vrais chiffres plutôt que
de_razer discrètement la commande :

```
Le minimum de Ferguson est de 1 000 €. La commande telle que dimensionnée revient
à 888 €.
Atteindre le minimum demande un carton de plus — 40 filtres, 148 €, environ 10
jours de stock supplémentaires au rythme de 4,1/jour.
Je commande le carton en plus, je bloque la commande jusqu'à la prochaine
échéance, ou je la répartis entre deux fournisseurs ?
```

Des unités en trop, des euros en trop, des jours en trop — les trois, à chaque
fois. Ensuite le dirigeant décide. **Ne fais jamais passer en silence une
commande au minimum fournisseur en arrondissant vers le haut.**

---

## Chaque ligne montre son calcul

```
Filtre Merv 11, 20x25x1           SKU FLT-2025
  Vitesse       4,1/jour (28j), 5,8/jour (7j) — monte
  En stock      38 unités, rien en route
  Manque dans   6,6 jours de couverture au rythme 5,8 (38 ÷ 5,8)
  Délai         3 jours (Ferguson) + marge de 7 jours
  Statut        COMMANDER MAINTENANT
  Dimensionné à 4,1/jour, le rythme 28 j — le pic sur 7 j a une semaine
  Cible         258 unités — 63 jours (60 + 3 de délai) × 4,1
  Commande      240 unités (258 − 38 en stock = 220, arrondi à 6 cartons de 40)
  Coût          888 € à 3,70 €/unité
```

Deux rythmes différents dans un même bloc, chacun étiqueté. La référence manque
au rythme rapide parce que se tromper tard perd la vente ; elle est commandée au
rythme lent parce qu'un pic d'une semaine n'est pas une raison d'acheter une
palette. Un dirigeant qui pense que le pic est réel le dit, et la commande est
redimensionnée en une étape.

Le contrôle d'arrondi : 38 en stock plus 240 commandées font 278 unités, environ
68 jours à 4,1/jour. Sous le plafond de 90 jours, arrondir à un carton entier ne
pose pas de problème. Au-delà de 90 jours, la commande retombe à 5 cartons et la
ligne explique pourquoi.

Le dirigeant valide en dix secondes parce que le raisonnement est visible. Un
simple « commande 240 » se refait à la main à chaque fois.