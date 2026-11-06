# Format de la fiche de paie

Ce que le dirigeant regarde avant de dire oui.

---

## Principe de conception

Le dirigeant vérifie deux choses, dans cet ordre : la ligne de quelqu'un paraît-elle fausse, et
l'entreprise peut-elle se permettre le total ? Tout ce qui figure sur la fiche sert l'une des deux.
Le reste est du bruit qui rend la lecture rapide moins attentive.

---

## Bloc par salarié

Un bloc par personne. Les signalements rattachés à la personne, pas regroupés dans une section
séparée en bas où ils se font sauter.

```
Marcus Reyes
  Horaire        32,0 h à 34,00 €     1 088,00 €
  Heures sup.     0,0 h
  Congés payés    8,0 h                 272,00 €
  Brut                                 1 360,00 €
  ALERTE  Jeudi 12/03 — badge à l'entrée à 6 h 40, pas de badge de sortie.
         Heures inconnues. Le brut ci-dessus exclut ce poste.
```

**Lorsqu'un poste a des heures inconnues, dis ce que le brut exclut.** Sinon le chiffre passe
pour définitif et le dirigeant approuve un bulletin incomplet.

---

## Bloc des totaux

```
Période de paie    2 mars – 15 mars
Date de paie       20 mars

Personnes                    5
Heures normales         182,0
Heures supplémentaires    32,0
Heures de congés payés   16,0

Salaires bruts          9 840,00 €
Cotisations patronales    812,00 €
Total décaissements    10 652,00 €

Période précédente     8 960,00 €   (+9,8 %)
Signalements ouverts         2
```

Les cotisations patronales n'apparaissent que si le logiciel de paie les fournit. **N'estime jamais
le montant des cotisations.** Si aucun logiciel de paie n'est connecté, la ligne indique « non
disponible — aucun logiciel de paie connecté » et le total est libellé « salaires bruts seuls ».
Payfit et Silae fournissent tous deux le chiffre ; indique celui dont il provient. Un dirigeant qui
planifie sa trésorerie sur la base d'un montant de cotisations estimé se laisse tromper par un
chiffre qui paraît précis.

---

## La ligne d'écart

Tout mouvement de plus de 10 % par rapport à la période précédente donne lieu à une phrase nommant
la cause.

> En hausse de 880 € par rapport à la période précédente. La première semaine complète de Dee en
> explique 640 € ; le reste, ce sont les heures supplémentaires de Marcus sur le dépannage à
> Maple St.

Si la cause n'est pas identifiable dans les données, dis-le au lieu d'avancer une théorie.

---

## Ligne de trésorerie

Avec les données de trésorerie disponibles :

> Le solde du compte est de 31 400 €. Cette paie prélève 10 652 € le 20. Le lot de règlement
> Ferguson de 22 140 € est également programmé pour le 18, ce qui laisserait 8 608 € — serré mais
> tenable.

Sans elles :

> Je n'ai pas de solde actualisé. Cette paie nécessite 10 652 € sur le compte au 20.

---

## La question d'approbation

Dernière ligne de la fiche, énoncée comme un total et une date :

> 5 personnes, 230 heures, 10 652 € sortis le 20 mars, avec encore 2 signalements ouverts.
> Je la prépare ?

Deux signalements encore ouverts signifient que le dirigeant a choisi de les laisser. Énonce quand
même le nombre — c'est sa dernière chance de changer d'avis avant que la fiche devienne un bulletin
de paie.

---

## Formats de sortie

- **Résumé en conversation** — le bloc des totaux, la ligne d'écart, la ligne de trésorerie, le nombre de signalements
- **Fiche de paie XLSX** — une ligne par personne et par type de paie, plus un onglet de détail avec tous les pointages, pour que le dirigeant ou son expert-comptable puisse auditer n'importe quelle ligne
- **Feuille de saisie manuelle** en l'absence de connecteur de paie — les mêmes données présentées dans l'ordre attendu par le logiciel du dirigeant, pour que la saisie relève de la copie et non de la traduction