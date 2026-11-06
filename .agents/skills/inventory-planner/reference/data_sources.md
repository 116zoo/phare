# Sources de données

D'où viennent les ventes et le stock, et ce qui doit être présent dans les
données avant que le moindre calcul ne soit fiable.

---

## Champs obligatoires

Tout ce qui vient en aval en dépend. Ce qui manque est demandé une fois, puis
mémorisé.

| Champ | Nécessaire pour | Si manquant |
|---|---|---|
| SKU ou identifiant article | Tout | Impossible d'aller plus loin pour cette référence |
| Nom de l'article | La lisibilité du rapport | Utilise le SKU et signale que le nom manque |
| Unités vendues, par date | La vitesse | Pas de vitesse, pas de date de rupture. Signale la référence |
| Stock disponible | La couverture en jours | Signale ; la vitesse seule ne dit pas quand ça manque |
| Date de référence du comptage | L'exactitude de tout le reste | Demande. Un comptage périmé est l'erreur silencieuse la plus fréquente ici |
| Coût unitaire | Les montants en euros sur la liste d'achat | N'affiche que les quantités pour cette référence, et dis pourquoi |
| Prix unitaire | La trésorerie en surstock et le contexte de marge | Facultatif, utile |
| Fournisseur | La rédaction du bon de commande | Regroupe en « fournisseur inconnu » et demande |
| Délai | S'il reste encore le temps de commander | Demande une fois par fournisseur et mémorise |
| Unités commandées | Ne pas commander deux fois | Demande. Celle-ci vaut la peine d'être réclamée — elle provoque de vraies sur-commandes |
| Conditionnement / quantité minimale | Des quantités réalistes | Arrondis à l'unité entière en signalant que la règle n'a pas été appliquée |

---

## Shopify

La source préférée. Remonte :

- Commandes avec leurs lignes sur la fenêtre de rétrospectivité, au moins
  90 jours, 400 jours si la saisonnalité entre en jeu
- Niveaux de stock par variante et par emplacement (`get-inventory-levels`
  prend un seul `productId` par appel ; boucle sur les produits dont
  l'exécution a besoin — `../../../shared/connector-call-shapes.md`)
- Fiches produit et variante pour le coût, le prix et le fournisseur

Surveille :

- **Stock multi-emplacements.** Ne totalise entre emplacements que si le
  dirigeant vend depuis un seul stock. Sinon les ruptures sont par emplacement
  et un total les masque.
- **Variantes.** La vitesse appartient au niveau de la variante. Un t-shirt qui
  se vend bien en M et jamais en XL paraît sain au niveau du produit.
- **Commandes annulées et remboursées.** Exclus-les des unités vendues.
- **Lots et ensembles.** Une vente en lot consomme le stock des composants. Si
  la boutique utilise des lots, demande comment les composants sont suivis avant
  de faire confiance aux chiffres.

## Square

Même forme, d'autres noms. Les ventes viennent des transactions, le stock des
comptages d'inventaire du catalogue d'articles. Le suivi d'inventaire Square est
souvent activé partiellement — vérifie quelles références ont réellement un
comptage avant de traiter un zéro comme un zéro.

## NetSuite

La voie ERP pour les structures plus lourdes. Les fiches article portent le
coût, le fournisseur préféré, le délai et les points de commande déjà définis
par quelqu'un. **Utilise les points de commande existants comme contexte, pas
comme vérité** — ils sont fréquemment vieux de plusieurs années, et signaler où
le chiffre calculé diverge du chiffre enregistré est réellement utile.

---

## La voie CSV

Un mode à part entière, pleinement pris en charge. Deux fichiers, ou un seul.

**Fichier d'historique des ventes**, une ligne par vente ou par article-et-jour :

```
sku, date, units_sold
```

**Fichier de stock :**

```
sku, name, on_hand, unit_cost, vendor, lead_time_days, on_order
```

Accepte les noms de colonnes tels qu'ils sortent de leur système et fais la
correspondance. Restitue la correspondance pour que le dirigeant puisse attraper
une mauvaise hypothèse avant qu'elle ne devienne un bon de commande.

**Demande la date de référence de l'inventaire.** Elle n'y est presque jamais, et
c'est la différence entre une date de rupture juste et une date fausse de deux
semaines.

---

## Contrôles de qualité des données avant tout calcul

Lance ces contrôles et rapporte ce qu'ils trouvent :

1. **Stock négatif.** Courant dans la plupart des systèmes, et cela signifie que
   le comptage est faux. Signale-le.
2. **Références avec des ventes mais sans fiche de stock**, ou du stock sans
   historique de ventes.
3. **SKU en double** avec des noms différents.
4. **Une fenêtre d'historique plus courte que 28 jours** — dis-le ; la vitesse
   sur 28 jours ne sera pas fiable.
5. **Périodes sans vente** qui coïncident avec un stock nul. Ce sont des
   ruptures, pas de la demande. Voir `velocity_and_reorder.md`.

---

## Exemple travaillé

Okonkwo Mechanical stocke les pièces courantes dans les camionnettes et à
l'atelier. Pas de Shopify — Ray a exporté deux CSV depuis le portail de son
fournisseur et a compté l'étagère de l'atelier un samedi.

- 84 SKU, 120 jours d'historique de consommation
- Inventaire arrêté au 15/03, confirmé avec Ray
- Délais manquants pour toutes les références ; Ray en a donné deux par
  fournisseur : Ferguson 3 jours, Watsco 10 jours
- 6 SKU avaient de la consommation mais pas de ligne de stock — pièces tirées
  directement sur les chantiers, jamais rangées. Exclues et signalées
- 2 comptages négatifs signalés, tous deux des compresseurs, tous deux recomptés