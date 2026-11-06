# Format de spec de rapport

Chaque rapport se résout dans cette structure avant toute extraction de données.
C'est la spec qui est enregistrée, et c'est elle qui rend un rapport reproductible.

---

## Le format

```
Nom du rapport :  <court, reconnaissable par le dirigeant>
Cadence :         unique | hebdomadaire | mensuelle | trimestrielle
Période :         <la fenêtre que couvre chaque run>
Comparaison :     <période précédente | même période l'an dernier | objectif | aucune>
Découpage :       <dimension, ou aucun>

Indicateurs :
  <nom>  =  <formule>  [source]
  <nom>  =  <formule>  [source]

Sources :         <connecteurs utilisés, ou « fichier téléversé »>
Notes :           <tout ce que le dirigeant a précisé>
```

---

## Exemple complet 1 — le classique

**Le dirigeant a dit :** « Chaque lundi : ventes par établissement vs. l'an dernier,
balance âgée clients, part de main-d'œuvre. »

```
Nom du rapport :  Pack opérationnel du lundi
Cadence :         hebdomadaire, lundi
Période :         7 derniers jours glissants
Comparaison :     les 7 mêmes jours de l'an dernier
Découpage :       établissement

Indicateurs :
  Chiffre d'affaires =  somme des totaux de factures, hors taxe   [QuickBooks]
  Balance âgée       =  factures ouvertes réparties 0-30 / 31-60 / 61+ jours de retard   [QuickBooks]
  Part main-d'œuvre  =  charge de personnel / chiffre d'affaires net  [QuickBooks]

Sources :         QuickBooks
Notes :           Main-d'œuvre mesurée sur le chiffre d'affaires, pas sur le total des
                  charges (confirmé).
                  La balance âgée clients est à l'échelle de l'entreprise, pas ventilée
                  par établissement.
```

Remarque ce qui a été déduit et ce qui a été demandé. L'indicateur, le découpage et la
comparaison sortent directement de la phrase. Seuls le dénominateur de la main-d'œuvre
et le regroupement de la balance âgée ont demandé une question.

---

## Exemple complet 2 — sans connecteur

**Le dirigeant a dit :** « Il me faut un rapport mensuel qui montre quels produits
rapportent le plus. »

```
Nom du rapport :  Rentabilité mensuelle des produits
Cadence :         mensuelle, premier jour ouvré
Période :         mois civil précédent
Comparaison :     mois précédent
Découpage :       produit

Indicateurs :
  Chiffre d'affaires =  somme des totaux de ligne par SKU        [CSV des ventes téléversé]
  Quantités vendues  =  somme des quantités par SKU             [CSV des ventes téléversé]
  Marge brute        =  (chiffre d'affaires - coût des ventes) / chiffre d'affaires  [CSV des ventes téléversé]

Sources :         fichier téléversé — export mensuel des ventes
Notes :           La colonne de coût des ventes doit être présente dans l'export. Si elle
                  est absente, ne rapporter que le chiffre d'affaires et les quantités,
                  et dire que la marge est non disponible.
```

La voie sans connecteur produit exactement la même forme de spec. Rien n'est dégradé
dans le rapport, sauf là où la donnée elle-même manque.

---

## Exemple complet 3 — entonnoir, multi-source

**Le dirigeant a dit :** « Montre-moi chaque mois comment l'entonnoir convertit et ce
qu'il vaut vraiment. »

```
Nom du rapport :  Conversion mensuelle de l'entonnoir
Cadence :         mensuelle
Période :         mois civil précédent
Comparaison :     mois précédent
Découpage :       étape de l'affaire

Indicateurs :
  Affaires créées     =  nombre d'affaires créées sur la période           [HubSpot]
  Affaires gagnées    =  nombre d'affaires conclues gagnées sur la période   [HubSpot]
  Taux de réussite    =  affaires gagnées / affaires résolues               [HubSpot]
  Entonnoir pondéré   =  somme de (valeur de l'affaire x probabilité d'étape) [HubSpot]
  CA encaissé         =  factures réglées sur la période                    [QuickBooks]

Sources :         HubSpot, QuickBooks
Notes :           Le chiffre d'affaires encaissé vient volontairement de la comptabilité,
                  pas du CRM.
                  Les valeurs d'affaires CRM sont des prévisions ; les factures sont des
                  faits.
```

---

## Les règles qui gardent les specs honnêtes

**Chaque indicateur nomme sa source.** Un indicateur sans source est un indicateur que
personne ne pourra reproduire le mois prochain.

**Les formules sont écrites, pas sous-entendues.** « Part main-d'œuvre » ne veut rien
dire seul. « Charge de personnel divisée par le chiffre d'affaires net » se vérifie.

**Les ambiguïtés sont notées dans Notes, pas résolues en silence.** Quand le dirigeant
clarifie quelque chose, écris ce qu'il a dit. Six mois plus tard, cette note est le
seul enregistrement de la raison pour laquelle le chiffre est calculé ainsi.

**Un rapport, un objectif.** Si un dirigeant décrit huit indicateurs sans lien, c'est
probablement deux rapports. Propose le découpage plutôt que de construire un lot
illisible.