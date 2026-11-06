---
name: shopify-customers
description: >
  Gère les clients de la boutique : consultation, segments, tags,
  historique d'achat, analyse RFM, fidélité.
  [EN] Manages Shopify customers: segments, tags, purchase history, RFM.
---

> Language rule: see `shared/language.md`.

# Shopify — Clients

## But
Travailler la base clients de la boutique : segmenter, taguer, analyser
la fidélité — sans jamais exporter des données personnelles hors boutique.

## Entrées
Objectif (fidélité, réactivation, ciblage promo), périmètre de clients.

## Étapes
1. **Lire la base** — volumes, répartition par nombre d'achats, valeur
   moyenne, ancienneté.
2. **Proposer la segmentation** — critères précis (RFM : récence,
   fréquence, montant) + les tags correspondants, avec la taille estimée
   de chaque segment.
3. **Faire valider** — le plan de tags en une passe.
4. **Appliquer** — mutations de tags, relire l'échantillon.
5. **Livrer** — la carte des segments, prêts à être ciblés par
   `shopify-marketing`.

## Règles
- Un segment = des critères écrits + un tag lisible.
- Les données personnelles restent dans la boutique : pas d'export vers
  un outil tiers sans validation explicite (RGPD).
- Personne n'est « supprimé » : on retire un tag, on n'efface pas.

## Liens
- `crm-autopilot` (CRM global), `customer-reorder` (récommande B2B),
  `reactivate` (dormants), `lead-triage` (prospects).
- `shopify-marketing` consomme les segments pour les campagnes.

## Garde-fous
- Aucun e-mail, aucun envoi depuis ce skill : préparation uniquement.
- Segment vide ou flou : on le dit, on le reformule.
