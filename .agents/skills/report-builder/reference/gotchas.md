# Pièges

Les modes de défaillance qui produisent un rapport qui a l'air juste et qui est
discrètement faux. Ce sont les plus dangereux : les dirigeants transmettent ces
rapports aux banques, aux conseils d'administration et aux experts-comptables.

---

## Piège : une période partielle comparée à une période complète

**Pourquoi c'est important :** Le 27 juillet, les ventes depuis le début du mois face
au mois complet précédent ressemblent à un effondrement de 20 %. Ce n'en est pas un.
Des décisions d'effectifs ont été prises sur la base de cette erreur.

### Mauvais

```
Ventes — 21 400 €, en baisse de 19 % vs. juin
```

Juin était un mois complet. Juillet s'arrête au 27. La comparaison n'a aucun sens et
le dirigeant la lit comme une crise.

### Bon

```
Ventes — 21 400 € depuis le début du mois au 27 juillet
         (juin au 27 : 19 800 €, en hausse de 8 %)
```

Même donnée, comparaison honnête, conclusion opposée.

---

## Piège : la même vente comptée deux fois

**Pourquoi c'est important :** Une commande Shopify réglée via Stripe et enregistrée
dans QuickBooks existe dans trois systèmes. Additionner les sources connectées gonfle
le chiffre d'affaires, parfois de deux fois.

### Mauvais

```
Prendre le chiffre d'affaires dans QuickBooks + Shopify + Stripe, additionner les trois.
Le rapport affiche 129 000 €. Le chiffre d'affaires réel était de 43 000 €.
```

### Bon

```
Choisir un seul système comme source de revenu. Le dire :

Chiffre d'affaires — 43 000 € (source : QuickBooks ; Shopify et Stripe utilisés
                        uniquement pour l'expédition et le détail des frais)
```

Règle empirique : quand la comptabilité est connectée, c'est elle qui fait foi pour le
revenu. Les prestataires de paiement fournissent les frais et le calendrier de
règlement. Les boutiques en ligne fournissent la répartition par produit.

---

## Piège : un groupe disparaît au lieu d'afficher zéro

**Pourquoi c'est important :** Si Portland n'a rien vendu cette semaine et que la
ligne disparaît, le dirigeant suppose que la donnée est cassée et part enquêter. Un
zéro est une information ; une ligne manquante est du bruit.

### Mauvais

```
Ventes par établissement :
  Salem      18 200 €
  Eugene     19 000 €
```

Portland existait la semaine dernière. Où est-il passé ?

### Bon

```
Ventes par établissement :
  Salem      18 200 €
  Eugene     19 000 €
  Portland   0 €        (aucune vente enregistrée sur la période)
```

---

## Piège : les lignes regroupées ne raccordent pas au total

**Pourquoi c'est important :** Un dirigeant qui additionne tes colonnes et obtient un
autre nombre cesse de faire confiance à tous les rapports que tu produiras ensuite.

### Mauvais

Publier le total et la ventilation sans vérifier qu'ils concordent.

### Bon

Vérifie la somme avant de livrer. Si les deux ne concordent pas vraiment, dis pourquoi :

```
Les ventes par établissement font 41 900 €. Le total des ventes est de 43 200 €.
L'écart de 1 300 € correspond à des factures sans établissement renseigné.
```

Nommer l'écart construit plus de confiance que le cacher.

---

## Piège : réinterroger sur un rapport enregistré

**Pourquoi c'est important :** toute la promesse de ce skill tient dans « décris-le une
fois ». Poser les mêmes cinq questions chaque mois casse cette promesse et le
dirigeant cesse de s'en servir.

### Mauvais

```
Dirigeant : « Lance le rapport du lundi. »
Claude : « Bien sûr — quels indicateurs souhaites-tu, et sur quelle période ? »
```

### Bon

```
Dirigeant : « Lance le rapport du lundi. »
Claude : [lit saved_reports.md, le retrouve, l'exécute]
         « Pack opérationnel du lundi — semaine du 20 juillet... »
```

Lis toujours `saved_reports.md` en premier.

---

## Piège : un chiffre plausible rempli à la place d'un chiffre manquant

**Pourquoi c'est important :** c'est la défaillance la plus grave du skill. Un rapport
est un document sur lequel les dirigeants agissent et qu'ils transmettent. Un montant
inventé qui paraît raisonnable peut survivre à plusieurs relais avant que quelqu'un le
repère.

### Mauvais

```
Main-d'œuvre — environ 30 % du chiffre d'affaires
```

D'où vient ce chiffre ? De nulle part. Les comptes de paie n'ont pas été renvoyés.

### Bon

```
Main-d'œuvre — non disponible (comptes de paie QuickBooks indisponibles cette fois)
```

N'estime jamais, n'arrondis jamais vers une supposition, ne reconduis jamais
silencieusement le chiffre de la période précédente.

---

## Piège : commencer par le tableau

**Pourquoi c'est important :** les dirigeants ont demandé un rapport parce qu'ils
veulent prendre une décision. Un mur de chiffres leur renvoie l'analyse, qui est
exactement le travail qu'ils voulaient confier.

### Mauvais

Commence par un tableau de 40 lignes, puis un résumé en dessous.

### Bon

Commence par la phrase qui compte, trois indicateurs clés, trois constats. Tout le
reste va dans le classeur.