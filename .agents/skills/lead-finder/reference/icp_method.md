# Déduire le profil client idéal

Le profil vient des clients qui paient déjà, pas de la description du dirigeant. Les dirigeants décriment une aspiration ; les données décriment une réalité, et les deux diffèrent le plus souvent d'une manière importante.

---

## La méthode

**1. Extraire tous les clients avec un chiffre d'affaires rattaché.**

Depuis QuickBooks : nom du client, chiffre d'affaires total, date de première facture, délai moyen de paiement. Depuis HubSpot : secteur, taille, source, durée du cycle de vente. Depuis un CSV téléversé : les colonnes qui existent.

**2. Classer par valeur, pas sur le seul chiffre d'affaires.**

Un client qui vaut le coup est un client qui paie bien, qui paie à l'heure et qui reste. Classe sur les trois :

```
valeur = chiffre d'affaires total x ancienneté en années, minorée pour les
paiements lents
```

Un client à 40 000 € qui met 70 jours à payer et qui est parti au bout d'un an ne vaut pas mieux qu'un client à 22 000 € en quatrième année qui paie en 12 jours.

**3. Séparer le quartile supérieur du quartile inférieur.**

Prends les 25 % du haut et les 25 % du bas. Le milieu ne t'apprend rien.

**4. Trouver ce qui les sépare.**

Compare sur toutes les dimensions disponibles :

- Secteur ou métier
- Taille de l'entreprise — effectif, sites, tranche de chiffre d'affaires
- Géographie — distance par rapport au dirigeant, urbain ou rural
- Comment ils sont arrivés — recommandation, recherche, publicité, passage au comptoir
- Ce qu'ils ont acheté en premier
- Saison ou mois d'arrivée

Ce qui est utile, c'est une dimension sur laquelle les deux quartiles diffèrent réellement. Si les deux quartiles sont répartis uniformément entre les secteurs, le secteur ne fait pas partie du profil — dis-le plutôt que de l'inclure par souci d'exhaustivité.

**5. Énonce le profil dans les mots du dirigeant.**

```
Les meilleurs clients ressemblent à :
  <secteur ou métier>, <tranche de taille>, <géographie>
  généralement trouvés via <canal>
  premier achat généralement <produit ou service>

Les pires clients ressemblent à :
  <le contre-motif, quand il est net>
```

Le contre-motif compte autant que le motif. « Quiconque a moins de 10 salariés part au bout d'un an » fait économiser plus d'argent que n'importe quel critère de ciblage.

---

## Exemple travaillé

Export clients d'un artisan CVC, 340 lignes.

**Points communs du quartile supérieur :** gestionnaires d'immeubles commerciaux, 3 bâtiments ou plus, dans un rayon de 40 km, arrivés par recommandation, première intervention un contrat de maintenance plutôt qu'une réparation.

**Points communs du quartile inférieur :** résidentiel mono-immobilier, arrivé via une annonce sponsorisée, première intervention une réparation d'urgence.

**Profil réécrit :**

```
Les meilleurs clients ressemblent à :
  Des gestionnaires d'immeubles commerciaux de 3 bâtiments ou plus, dans un
  rayon de 40 km.
  Arrivent généralement par recommandation.
  Première intervention : un contrat de maintenance, pas un appel d'urgence.

Les pires clients ressemblent à :
  Du résidentiel mono-immobilier venu des annonces sponsorisées pour un
  dépannage urgent.
  Ils payent une fois et ne reviennent jamais.
```

La correction du dirigeant : « Exact, mais les gestionnaires de plus d'une quinzaine de bâtiments vont voir les grandes firms régionales. Mets un plafond. »

Cette correction vaut plus que toute l'étape d'enrichissement, et elle n'apparaît que lorsque tu renvoies le profil pour validation.

---

## Quand il y a très peu de données

Certains dirigeants ont vingt clients et pas de CRM. La méthode fonctionne quand même, elle se fait simplement à la main — lis les vingt, demande lesquels il dupliquerait, et trouve ce que ces cinq ont en commun.

Avec moins d'une dizaine de clients, la réponse honnête est qu'il n'existe pas encore de motif statistique. Dis-le, et construis le profil à partir du jugement du dirigeant. Ne présente pas une intuition comme une analyse.

---

## Ce qu'il ne faut pas inclure dans le profil

**Tout ce sur quoi le dirigeant ne peut pas agir.** « Les entreprises à forte culture interne » n'est pas un critère de ciblage.

**Les dimensions où le haut et le bas se ressemblent.** Les inclure fait paraître le profil rigoureux et rend la recherche moins bonne.

**Plus de cinq critères.** Chaque filtre supplémentaire réduit le nombre de résultats de façon géométrique. Cinq suffisent généralement pour trouver des sosies ; huit ne trouvent personne.