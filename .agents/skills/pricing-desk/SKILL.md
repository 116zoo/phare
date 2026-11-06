---
name: pricing-desk
description: >
  Construit et audite les grilles tarifaires par segment et par palier,
  simule un changement de prix d'achat ou de tarif, sort la marge par
  client et par produit, prépare la négociation annuelle.
  [EN] Builds and audits B2B price lists; margin by customer and product.
---

> Language rule: see `shared/language.md`.

# pricing-desk

## Règles
1. Jamais de chiffre sans source : grille ou saisie.
2. Marge par client et produit, définition nommée.
3. Clients dont les conditions dérogent à la grille : signalés.
4. Simulation prix d'achat ou tarif.

## Quand la marge bouge (changement de prix d'achat ou de tarif)
1. Chiffrer l'impact : marge et taux de marge avant / après, avec l'ordre de
   grandeur (ex. 33 % → 25 %) et le montant unitaire (ex. 8 € → 9 €).
2. Proposer les leviers, classés par effort croissant :
   - répercuter une partie du surcoût sur le prix de vente (revalorisation) ;
   - renégocier le prix d'achat (volume, durée du contrat, fournisseur alternatif) ;
   - réduire un autre poste (logistique, conditionnement, mix de produits) ;
   - si aucun levier ne tient la marge cible, recommander d'arrêter ou de
     déclasser la référence.
3. Ne jamais recommander une hausse de prix de vente sans avoir d'abord posé
   la renégociation fournisseur et la réduction de coût.

## Sorties
Grilles par segment, tableau de marge, dérogations, calendrier annuel, et note
de simulation d'impact avec les leviers chiffrés.

## Confidentialité
Voir shared/commercial-confidentiality.md.

## Lien cluster Shopify
Cette compétence dialogue avec la boutique en ligne via `shopify-catalog` (hub : `shopify-hub`, doc : [AI Toolkit](../../shared/shopify-ai-toolkit.md)).
