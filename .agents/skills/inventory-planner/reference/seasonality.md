# Saisonnalité

Quand ajuster pour la saison, quand demander à la place, et comment dire
lequel des deux tu as fait.

---

## Le seuil

**N'ajuste qu'avec au moins 400 jours d'historique.** Cela donne une année
pleine plus un chevauchement suffisant pour comparer les mêmes semaines d'une
année sur l'autre.

En dessous, ne calcule pas de coefficient. Demande au dirigeant.

La raison est simple : un coefficient saisonnier tiré de neuf mois de données,
c'est de l'arithmétique appliquée à une hypothèse. Il en ressort avec l'air d'un
vrai chiffre — « x1,6 pour juin » — et il servira à acheter du vrai stock. Le
dirigeant connaît déjà sa saison mieux que ce chiffre, et demander prend une
ligne.

---

## Avec un an ou plus

Compare la fenêtre de planification à venir à la même fenêtre calendaire l'an
dernier, par référence ou par catégorie.

```
seasonal_factor = units_sold(même fenêtre, année précédente) ÷ units_sold(28 derniers jours, année précédente)
```

Applique le coefficient à la vitesse de dimensionnement (le rythme sur 28 jours),
et à la vitesse de rupture quand tu projettes dans la saison. Plafonne-le — tout
ce qui dépasse x3 ou passe sous x0,3 est montré au dirigeant au lieu d'être
appliqué en silence, parce que des coefficients aussi extrêmes signalent
généralement une promotion, une rupture ou un événement unique dans les données
de l'an dernier plutôt qu'une vraie saison.

Privilégie les **coefficients par catégorie** pour les références dont
l'historique individuel est mince. Les chiffres d'il y a un an pour un SKU isolé
sont bruités ; ceux de la catégorie ne le sont pas.

**Vérifie s'il y a eu une rupture sur la fenêtre de comparaison de l'an
dernier.** Si la référence était en rupture au mois de juin dernier, les unités
de juin dernier sous-estiment la demande, et le coefficient construit dessus
sous-commandera ce juin. Dis-le plutôt que de l'appliquer.

---

## Sans un an

Dis ce que tu as et pose une seule question :

> J'ai 120 jours d'historique, je ne vois donc pas ta saison dans les données. Tu
> entres dans l'été — est-ce que les filtres et les condensateurs s'écoulent
> différemment chez toi à cette période ? Donne-moi un multiple approximatif et je
> dimensionnerai la commande dessus. Sinon je planifierai sur le rythme actuel et
> on ajustera au fil de l'eau.

Puis utilise ce qu'il te dit et **indique sur la liste d'achat d'où vient le
chiffre** :

> Dimensionné à x1,8 de la vitesse actuelle d'après ton estimation, pas d'après
> l'historique.

C'est cette étiquette qui permet au dirigeant de recalibrer le trimestre suivant.
Un chiffre ajusté sans étiquette devient indiscernable d'un chiffre calculé six
semaines plus tard.

---

## Quand le dirigeant fixe une fin de saison

Une saison a deux dates, et c'est la seconde qui fait les dégâts. Dimensionner
60 jours de stock au rythme de pointe, six semaines avant la fin de la période
active, achète un mois de stock pour un mois qui n'aura pas lieu — et il reste
sur l'étagère jusqu'à l'an prochain, à l'ancien coût.

**Quand le dirigeant donne une date de fin, plafonne la commande au nombre de
jours restants dans la saison.** Ne plafonne pas en silence :

```
days_left       = season_end_date − expected_arrival_date
target_uncapped = (60 + lead_time_days) × sizing_velocity
target_capped   = days_left × sizing_velocity
```

Montre les deux chiffres et dis lequel est commandé :

> Ray dit que la saison de la climatisation se termine fin août — 47 jours après
> l'arrivée de cette commande, pas 60. À 7,0/jour avec 20 unités en stock, cela
> fait 309 unités, donc 8 cartons : 1 184 €. Le chiffre non plafonné aurait donné
> 11 cartons à 1 628 € — les trois cartons en plus resteraient sur l'étagère
> jusqu'au mois de mai prochain.

Le dirigeant passe outre quand il le veut. Certaines références valent la peine
d'être conservées — un filtre se garde sans problème et le prix ne fait que
monter. D'autres non, et une longue queue de ventes lentes qui traîne dans la
hors-saison est exactement là où la trésorerie se bloque. **Sa décision, prise
avec les deux chiffres devant lui.**

Conserver quelques jours de queue après la date de fin ne pose pas de problème
quand le dirigeant le demande — dis la phrase, ne l'ajoute pas en silence.

Quand la saison se termine avant même que le stock puisse arriver, ne commande
rien. Dis-le franchement et mets la référence sur la liste de surveillance pour la
saison prochaine, avec la date limite de décision déjà inscrite.

---

## Ajustements liés à des événements connus

La saisonnalité, ce n'est pas que le calendrier. Demande et consigne :

- Un gros chantier, un contrat ou un événement à venir qui va puiser dans le stock
- Une promotion ou une vente prévue
- Une hausse de tarif fournisseur annoncée, qui justifie parfois d'acheter plus
  tôt
- Une fermeture de fournisseur — beaucoup de fournisseurs ferment un moment, et
  les délais doublent autour de cette période

Ce sont des ajustements ponctuels, appliqués à des références précises, et
toujours étiquetés comme fournis par le dirigeant plutôt que calculés.

---

## Restituer l'ajustement

Chaque ligne ajustée sur la saison montre les deux chiffres :

```
Compresseur, 3 tonnes            SKU CMP-3T
  Vitesse actuelle 0,4/jour (28j)
  Saisonnier        x1,9 — juin a tourné à x1,9 le rythme du printemps l'an dernier
  Dimensionné à    0,76/jour
  En stock          11 unités, 14 jours de couverture au rythme saisonnier
  Statut            COMMANDER MAINTENANT
```

Afficher le rythme non ajusté à côté du rythme ajusté, c'est ce qui rend
l'ajustement vérifiable. Un dirigeant qui juge x1,9 trop chaud peut le dire avant
que le bon de commande parte.

---

## Exemple travaillé

L'atelier de Ray, planification pour juin.

- 120 jours d'historique seulement. Aucun coefficient calculé.
- Question posée directement à Ray. Sa réponse : « Les filtres et les condensateurs
  s'envolent dès la première semaine chaude. Les compresseurs peut-être
  doublent. Tout le reste est pareil. »
- Coefficient x2,0 appliqué aux filtres, condensateurs et compresseurs d'après
  l'estimation de Ray. Tout le reste planifié au rythme actuel sur 28 jours.
- Liste d'achat étiquetée : trois catégories dimensionnées sur l'estimation
  saisonnière de Ray, le reste sur la vitesse récente.
- Noté pour l'an prochain : avec une année complète d'historique au printemps
  suivant, ces coefficients pourront être calculés et confrontés à son estimation.