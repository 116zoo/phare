---
name: cash-flow-snapshot
description: >
  Prévoit la trésorerie à 30, 60 et 90 jours : encaissements attendus,
  décaissements (prélèvements SEPA, salaires, TVA, fournisseurs), et pour
  les profils à stock, les indicateurs DSO / DPO / DIO.
  [EN] 30/60/90-day cash forecast; DSO/DPO/DIO for stock profiles.
---

> Language rule: see `shared/language.md`.

# cash-flow-snapshot

## Sources
- Qonto (MCP officiel) pour les mouvements et prélèvements SEPA planifiés.
- Grand livre (Pennylane) ou CSV receivables + orders + purchase_orders.

## Indicateurs FR (profils à stock)
- DSO = (créances clients / CA TTC) × jours
- DPO = (dettes fournisseurs / achats TTC) × jours
- DIO = (stock moyen / coût des ventes) × jours
- Cycle de conversion = DSO + DIO − DPO

Afficher ces indicateurs uniquement pour Profil = negoce | fabrication | mixte.
Pour Profil = services, DIO n'est pas affiché.

## Règle
Les prélèvements SEPA (Qonto) sont lus depuis les scheduled transactions,
jamais devinés.

## Repli
CSV receivables + orders + purchase_orders.

## Lien cluster Shopify
Cette compétence dialogue avec la boutique en ligne via `shopify-reporting` (hub : `shopify-hub`, doc : [AI Toolkit](../../shared/shopify-ai-toolkit.md)).
