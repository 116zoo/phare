---
name: shopify-inventory
description: >
  Pilote le stock de la boutique : niveaux par emplacement, alertes de
  seuil, transferts, bons de commande, inventaire.
  [EN] Manages Shopify inventory: levels, transfers, purchase orders, counts.
---

> Language rule: see `shared/language.md`.

# Shopify — Stock

## But
Voir et piloter le stock de la boutique : niveaux, alertes, mouvement —
toujours avec une justification.

## Entrées
Quoi (produit / emplacement / global), quel besoin (état, alerte,
transfert, réassort, comptage).

## Étapes
1. **Lire les niveaux** — par produit et emplacement ; mettre en avant
   les sous le seuil et les surstocks.
2. **Proposer l'action** — transfert entre emplacements ou bon de
   commande au fournisseur : quantités, motif, coût estimé.
3. **Faire valider** — le lot de mouvements en une passe.
4. **Exécuter** — mutations d'inventaire ou création du BC, relire.
5. **Récapituler** — nouveau niveau, ce qui reste à faire.

## Règles
- Tout mouvement de stock a un motif explicite : vente, perte, casse,
  transfert, correction de comptage.
- Jamais de stock négatif : un niveau qui y aboutit est bloqué et signalé.
- Le seuil d'alerte vient du contexte ou de `inventory-planner`.

## Liens
- `inventory-planner` (points de réappro, prévisions), `b2b-stock-planner`,
  `purchase-desk` (bons de commande), `stock-count-cutoff` (comptage).
- `shopify-reporting` — rotation, jours de couverture.

## Garde-fous
- Une correction manuelle de stock = diff affiché + validation.
- En cas de divergence boutique / comptabilité : on la signale, on ne
  « corrige » pas en silence.
