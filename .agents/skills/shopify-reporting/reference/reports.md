# Catalogue des rapports boutique

Chaque rapport : but, données (Admin API), fréquence, lecture.

## 1. Pulse hebdo
Ventes, commandes, panier moyen, marge brute, top 3 produits, alertes
stock. Fréquence : chaque lundi. Sert de point de départ de la semaine.

## 2. Ventes par produit / collection
CA, quantité, marge par ligne. Fréquence : mensuel. Sert à `shopify-catalog`
(déclasser, promouvoir) et à `pricing-desk`.

## 3. Marge
Marge brute par période et par produit ; écart vs prévision. Exige les
coûts d'achat. Sert à `pricing-desk`.

## 4. Panier moyen
Évolution, par segment de clients (`shopify-customers`). Sert à
`shopify-marketing` (seuils de panier, offres).

## 5. Cohortes
Nouveaux vs clients de retour, valeur client dans le temps. Sert à
`shopify-customers` et `shopify-marketing`.

## 6. Taux de retour
Par produit et motif. Au-dessus du seuil : renvoi à `shopify-catalog`
(fiche produit) ou `shopify-orders` (processus).

## 7. Coût des remises
Montant cédé par campagne, vs objectif. Sert à `shopify-marketing`
(arrêter / corriger).

## 8. TVA collectée
TVA sur la période par taux, base taxable. Sert à `tva-pilot`.

## 9. P&L boutique
Revenus, COGS, frais (expédition, remises, publicités), résultat.
Fréquence : mensuel, alimente `month-end-prep` et `cash-flow-snapshot`.

## 10. Trésorerie boutique
Encaissements / décaissements par canal de paiement. Sert à
`cash-flow-snapshot`.
