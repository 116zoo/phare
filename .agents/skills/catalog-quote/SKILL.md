---
name: catalog-quote
description: >
  Chiffre un devis depuis un catalogue et une grille tarifaire : lignes,
  paliers, remises, frais de port, franco, conditions. Calcule la marge
  (taux de marque nommé), alerte vente à perte.
  [EN] Builds a B2B quote from a catalog and a price list.
---

> Language rule: see `shared/language.md`.

# catalog-quote

## Contrôles
1. Prix uniquement depuis la grille. Jamais inventé.
2. Palier de quantité.
3. Remise au-delà du seuil → validation.
4. Marge par ligne et totale, taux de marque nommé.
5. Alerte vente à perte.
6. Disponibilité, délai.
7. Frais de port et franco.
8. Validité.
9. Conditions de règlement.
10. Réserve de propriété.

## Sortie
Devis DOCX/PDF avec mentions FR.
Une ligne : HT, TVA, TTC, marge (taux de marque), délai.

## Validation
V1 : envoi du devis.

## Confidentialité
Voir shared/commercial-confidentiality.md.

## Lien cluster Shopify
Cette compétence dialogue avec la boutique en ligne via `shopify-catalog` (hub : `shopify-hub`, doc : [AI Toolkit](../../shared/shopify-ai-toolkit.md)).
