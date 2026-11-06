# Gabarit de sortie

Deux livrables à chaque run : un résumé dans la conversation, puis un classeur XLSX.
Le résumé est le produit. Le classeur est l'annexe.

---

## Le résumé dans la conversation

```
## <Nom du rapport> — <période>

<Une phrase : la chose la plus importante que dit ce rapport.>

**<Indicateur 1>** — <valeur>, <écart par rapport à la comparaison>
**<Indicateur 2>** — <valeur>, <écart par rapport à la comparaison>
**<Indicateur 3>** — <valeur>, <écart par rapport à la comparaison>

### Ce qui saute aux yeux

- <Constat, en citant l'enregistrement ou le groupe précis et le montant>
- <Constat>
- <Constat>

### À surveiller

- <Tout ce qui demande une décision, avec la suite proposée>

<Classeur joint. Onglets : synthèse, un par groupe d'indicateurs, données brutes.>
```

Trois constats au maximum. Un résumé de neuf puces est un tableau avec des étapes en
plus.

---

## Exemple complet

```
## Pack opérationnel du lundi — semaine du 20 juillet

Portland est le seul établissement sous son niveau de l'an dernier, et c'est lui qui
bloque le chiffre d'affaires total.

**Chiffre d'affaires** — 43 200 €, en hausse de 2 % vs. la même semaine l'an dernier
**Créances de plus de 30 jours** — 18 400 € sur 6 factures
**Main-d'œuvre** — 31 % du chiffre d'affaires, contre 28 %

### Ce qui saute aux yeux

- Portland a réalisé 6 100 €, en baisse de 22 % sur un an. Tous les autres établissements progressent.
- La main-d'œuvre a franchi le cap des 30 % pour la première fois depuis neuf semaines, portée par les heures supplémentaires à Salem.
- Acme Corp doit 4 200 €, avec 47 jours de retard, sans aucun règlement depuis le 12 mai.

### À surveiller

- La chute de Portland dure maintenant quatre semaines d'affilée, ce n'est plus un simple creux d'une semaine. Il faut regarder
  les effectifs ou la concurrence locale avant que ça devienne l'histoire du trimestre.

Classeur joint. Onglets : synthèse, ventes par établissement, balance âgée clients, détail main-d'œuvre, données brutes.
```

Remarque ce que fait le résumé : il nomme l'établissement, donne le montant, précise
la durée de la tendance et propose une suite. « Les ventes ont été mitigées » n'aurait
rien dit.

---

## Le classeur XLSX

L'ordre des onglets compte — les dirigeants ouvrent le premier onglet et s'y arrêtent
souvent.

1. **Synthèse** — les mêmes indicateurs que le résumé, sous forme de tableau propre avec comparaisons
2. **Un onglet par groupe d'indicateurs** — ventes par établissement, balance âgée clients, détail main-d'œuvre
3. **Données brutes** — tout ce qui a été extrait, non modifié, pour que le dirigeant ou son comptable puisse vérifier les calculs

Les règles de mise en forme qui rendent un classeur exploitable :

- Ligne d'en-tête en gras et figée
- Montants formatés en montants, pourcentages en pourcentages — pas de décimales brutes
- Écarts dans leur propre colonne, pas tassés dans la cellule de valeur
- Nombres négatifs entre parenthèses ou en rouge, de façon cohérente
- Une ligne de pied d'onglet sur chaque onglet, nommant la source et l'horodatage de l'extraction

Construis le classeur avec un script plutôt qu'en assemblant les cellules à la main.
C'est plus rapide, et le mois prochain il se régénère à l'identique.

---

## Quand des données manquent

Ne supprime jamais un indicateur en silence. Une ligne manquante se lit comme un
problème de données que le dirigeant partira chercher.

```
**Main-d'œuvre** — non disponible (comptes de paie QuickBooks indisponibles cette fois)
```

Puis récapitule une seule fois chaque source indisponible, en bas :

```
Non disponibles cette fois : comptes de paie QuickBooks, Square (authentification expirée).
Tout le reste a été extrait sans problème.
```

---

## Périodes partielles

Un chiffre depuis le début du mois comparé au mois complet précédent ressemble
toujours à un effondrement. Compare des périodes homogènes, ou étiquette :

```
**Chiffre d'affaires** — 21 400 € depuis le début du mois au 27 juillet (mois précédent au 27 : 19 800 €, en hausse de 8 %)
```

Ne montre jamais une période partielle face à une période complète sans le dire. Cette
seule erreur a envoyé des dirigeants dans la panique pour un chiffre qui allait très
bien.