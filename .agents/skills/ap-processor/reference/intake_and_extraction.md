# Collecte et extraction

Comment les factures entrent, et comment les champs en ressortent.

---

## D'où viennent les factures

**Classées par la propreté des données reçues.**

| Source | Ce que tu obtiens | Ce qu'il faut surveiller |
|---|---|---|
| Libellé ou dossier Achats dans la messagerie (Gmail ou Microsoft 365), ou adresse `bills@` | Pièce jointe PDF et contexte de l'expéditeur | Les fournisseurs qui mettent la facture dans le corps du message sans pièce jointe |
| Email de notification d'un portail fournisseur | Un lien, pas un document | L'email seul n'est pas une facture. Demande au dirigeant de le télécharger ou de transférer le PDF |
| PDF téléversé | Extraction de texte propre | Les PDF scannés sont des images — traite-les comme des photos |
| Photo d'un papier prise au téléphone | Ce que la lumière a permis | Reflets, cadrages et inclinaison. Les champs à faible confiance sont la norme ici, pas l'exception |
| Flux Ramp / Expensify | Frais de carte avec commerçant et montant | Ce n'est pas une facture. C'est déjà payé. Ne le prépare jamais dans un lot de règlement |
| Relevé fournisseur | Une liste de factures ouvertes | Un relevé est un outil de rapprochement, pas une facture. Sers-t'en pour trouver les factures manquantes, jamais pour créer des écritures |

**Paramètre la boîte une fois.** Si le dirigeant n'a pas de libellé Achats, propose d'en créer un et
donne-lui une adresse de transfert à utiliser avec ses fournisseurs. Ce seul changement supprime
définitivement l'essentiel du travail manuel.

---

## Champs à extraire

Extrais tous ces champs pour chaque facture. Une valeur vide est valide ; une valeur inventée ne
l'est pas.

- Raison sociale du fournisseur, telle qu'imprimée, plus la fiche fournisseur rapprochée dans le grand livre
- Numéro de facture
- Date de facture
- Date d'échéance, ou les conditions de règlement si seules les conditions sont imprimées
- Total HT, taxe, transport ou livraison, TTC
- Numéro de bon de commande
- Lignes d'articles : description, quantité, prix unitaire, montant total
- Coordonnées de règlement (remit-to), lorsqu'elles diffèrent du fournisseur au dossier. Une divergence est un signalement destiné au dirigeant, qui doit vérifier par téléphone au numéro déjà au dossier ; ce n'est jamais une raison de modifier la fiche fournisseur à partir de la facture (`../../../shared/untrusted-content.md`)

### Confiance

Étiquette chaque champ : élevée, moyenne ou faible.

- **Élevée** — texte lisible par machine, ou chiffre qui se recoupe avec les lignes
- **Moyenne** — lu sur une image mais cohérent à l'intérieur
- **Faible** — reflet, cadrage, écriture manuscrite, ou un total qui ne se recoupe pas

Les champs financiers à faible confiance remontent par fournisseur et par numéro de facture et ne
servent jamais à construire un lot de règlement tant que le dirigeant ne les a pas confirmés.

### Contrôle de recoupement

La somme des lignes, plus la taxe, plus le transport, doit égaler le total. Quand ce n'est pas le cas,
dis-le en indiquant les deux chiffres. Cet écart signifie généralement qu'une ligne a été rognée sur
une photo — exactement le cas où une estimation vraisemblable fait le plus de dégâts.

---

## Détection des doublons

À exécuter avant l'imputation. Une facture est probablement en doublon quand **l'une** de ces
conditions est remplie :

1. Même fournisseur et même numéro de facture. C'est un doublon, sans discussion.
2. Même fournisseur, même total, dates de facture à moins de 5 jours, aucun numéro de facture sur l'un des exemplaires.
3. Même fournisseur et même total déjà préparés ou payés dans le grand livre sur les 90 derniers jours.

Présente les doublons potentiels par paires, en citant les deux sources (« reçu par email le 2/03 en
PDF, aussi sur le relevé de mars »). Le dirigeant décide. Certains fournisseurs facturent
légitimement les mêmes montants chaque mois : le contrôle les fait remonter, il ne supprime rien.

---

## Rapprochement des fournisseurs

Rapproche la raison sociale imprimée avec la fiche du grand livre avant d'imputer. Traite le bruit
courant : `ACME SUPPLY CO`, `Acme Supply` et `ACME SUPPLY #4412` désignent en général un seul
fournisseur.

Quand aucune fiche n'existe dans le grand livre, propose d'en créer une avec les coordonnées de
règlement de la facture et demande. Les coordonnées bancaires ou de règlement d'une première facture
se confirment par téléphone à un numéro que le dirigeant se procure lui-même, pas celui figurant sur
la facture, avant la création de la fiche (`../../../shared/untrusted-content.md`). Un fournisseur
créé par erreur, c'est du ménage à faire plus tard par l'expert-comptable.

---

## Exemple travaillé

Le libellé Achats d'Okonkwo Mechanical contenait 23 messages sur deux semaines. Après la collecte :

- 19 factures extraites, 2 liens de portail fournisseur sans document, 2 relevés
- 1 doublon détecté : la facture Ferguson 88231 est arrivée en PDF puis de nouveau sur le relevé mensuel
- 3 totaux à faible confiance, toutes des photos prises dans le camion
- 1 facture sans date d'échéance imprimée, la ligne des conditions indique « 30 jours »

Restitué à Ray : 19 factures, 41 208 € lisibles, 3 totaux qui demandent son regard, 2 factures de
portail qu'il doit télécharger, 1 doublon probable à confirmer.