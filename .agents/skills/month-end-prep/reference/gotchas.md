# Pièges

Erreurs fréquentes et cas limites lors de la clôture mensuelle. Chaque entrée
suit le même plan : le mécanisme, la raison pour laquelle c'est important, et un
exemple Mauvais / Correct.

---

## Piège : signaler les transactions ventilées comme des doublons

**Pourquoi c'est important :** un achat unique réparti sur plusieurs catégories
du plan comptable apparaît comme plusieurs lignes dans un export QuickBooks —
même fournisseur, même date, montants différents. Les signaler comme doublons
envoie le dirigeant sur une fausse piste.

### ✗ Incorrect

> Signalé comme doublon : Office Depot 47,50 € le 12 mars et Office Depot 62,50 €
> le 12 mars — même fournisseur, même date.

Les deux lignes partagent le même `TxnID` : ce sont les fractions d'un achat de
110 € ventilé entre « Fournitures de bureau » et « Équipement ».

### ✓ Correct

Avant de signaler des doublons, regroupe les lignes par identifiant de
transaction du grand livre (`TxnID` dans QuickBooks). Ne compare que les
transactions dont les identifiants diffèrent. Les fractions d'une même
transaction ne sont jamais des doublons. Dans Xero, une transaction ventilée est
un document unique dont `line_item_cardinality` est supérieur à 1 : compare les
documents, jamais les lignes.

---

## Piège : analyser les lignes bancaires d'un grand livre Xero pour y chercher des doublons

**Pourquoi c'est important :** une facture fournisseur saisie deux fois dans Xero
reste sous la forme de deux documents non réglés et ne produit aucune ligne
bancaire tant que l'un des deux n'est pas payé. Une analyse côté banque déclare
le grand livre propre alors que le doublon attend d'être payé deux fois.

### ✗ Incorrect

> 212 transactions bancaires analysées pour le mois. Aucune paire de doublons
> trouvée.

Le doublon est dans la liste des factures fournisseurs, pas dans le flux
bancaire.

### ✓ Correct

Pour un grand livre Xero, analyse les factures fournisseurs et les factures
clients : même tiers, même total, dans un délai de 5 jours, les deux non réglées
ou l'une déjà payée dans la fenêtre (le cas « payé une fois, sur le point d'être
payé deux fois » est celui qui coûte cher). Précise ce qui a été analysé
(« factures fournisseurs et clients, pas les lignes bancaires ») pour que le
dirigeant sache ce que couvre ce résultat propre. Correspondance détaillée dans
[xero-reconcile.md](xero-reconcile.md).

---

## Piège : traiter un remboursement comme un règlement manquant

**Pourquoi c'est important :** un remboursement PayPal apparaît comme transaction
négative dans le rapport de règlement. Si tu le traites comme une sortie non
rapprochée, tu vas signaler un remboursement légitime comme un problème.

### ✗ Incorrect

> Signalé : sortie PayPal de –89,00 € le 18 mars sans dépôt QB correspondant.
> Transaction manquante possible.

Les –89,00 € sont un remboursement à un client. Cela doit se rapprocher d'un
avoir QB, pas d'un dépôt.

### ✓ Correct

Sépare les entrées (positives) des sorties (négatives) avant de rapprocher. Rapproche
les montants négatifs du prestataire avec les avoirs QB ou les transactions de
remboursement, pas avec les dépôts. Ne signale une négative non rapprochée que
s'il n'existe aucun avoir dans QB.

---

## Piège : comparer le montant brut PayPal au dépôt net QB

**Pourquoi c'est important :** QuickBooks enregistre souvent le dépôt bancaire net
(après frais PayPal), alors que le rapport de transactions PayPal affiche le
montant brut de la vente. Comparer le brut au net fera toujours apparaître un
écart égal aux frais.

### ✗ Incorrect

> Écart : règlement PayPal 500,00 €, dépôt QB 484,80 € — écart 15,20 €.
> Signalé comme erreur de rapprochement.

Les 15,20 € sont les frais de traitement de 3,04 % de PayPal. C'est attendu et
c'est correct.

### ✓ Correct

Utilise le champ **net payout** du rapport de règlement PayPal
(`transaction_info.transaction_amount.value` moins
`transaction_info.fee_amount.value`) pour la comparaison avec le dépôt bancaire
QB. Si l'écart est < 0,50 € après ajustement des frais, marque comme RECONCILED.

---

## Piège : passer à l'étape 6 alors qu'il reste des signalements non résolus

**Pourquoi c'est important :** le paquet de clôture est l'artefact final que le
dirigeant archive ou transmet à son comptable. L'exporter avec des signalements
ouverts fige les erreurs dans le dossier.

### ✗ Incorrect

> Le dirigeant n'a pas répondu au sujet des 3 transactions non catégorisées.
> Génération du paquet de clôture maintenant pour qu'il ait quelque chose à
> examiner.

### ✓ Correct

Reste bloqué à la porte de l'étape 6 tant que le dirigeant n'a pas acquitté
chaque signalement — soit en le résolvant (« classe ça en fournitures de
bureau »), soit en le reportant explicitement (« marque ça : à revoir plus
tard »). Ensuite seulement, exporte. Les points ouverts que le dirigeant a
reportés doivent apparaître dans la feuille Points à traiter, pas être
discrètement supprimés.