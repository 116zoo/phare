---
name: shopify-marketing
description: >
  Lance les promotions de la boutique : remises, codes, campagnes,
  e-mails, publicités — avec budget, conditions et mesure.
  [EN] Runs Shopify promotions: discounts, codes, campaigns, email.
---

> Language rule: see `shared/language.md`.

# Shopify — Marketing

## But
Préparer et lancer des promotions boutique : l'offre, ses conditions,
son budget — et mesurer après coup.

## Entrées
Objectif (débutter un produit, remplir un panier, relancer des segments),
budget, durée.

## Étapes
1. **Diagnostiquer** — quel levier : remise, code, offerte, livraison
   gratuite ? Sur quel segment (`shopify-customers`) ?
2. **Rédiger l'offre** — type de remise, valeur, conditions, plafond
   (nombre de uses ou durée), dates.
3. **Contrôler la marge** — coût de la remise estimé ; si la marge passe
   sous le seuil : alerte avant validation (`pricing-desk`).
4. **Faire valider** — l'offre complète en une passe.
5. **Créer** — discount + campagne dans la boutique, relire.
6. **Mesurer** — à J+7 : uses, conversion, panier moyen, marge nette.

## Règles
- Tout code est plafonné (uses ou durée) — jamais de code illimité.
- Aucune remise sous le coût de revient sans alerte explicite.
- Les e-mails ne partent pas d'ici : la liste est livrée à l'outil
  e-mail du dirigeant, prêt à envoyer.

## Liens
- `marketing-monday` (plan de semaine), `ad-manager` (publicités payantes),
  `content-strategy`, `social-content-engine`, `growth-pulse`.
- `shopify-customers` (segments) et `shopify-reporting` (mesure).

## Garde-fous
- Une seule campagne active par objectif à la fois.
- Mesure J+7 obligatoire : on arrête ce qui ne marche pas.
