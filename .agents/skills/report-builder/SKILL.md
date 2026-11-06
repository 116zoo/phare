---
name: report-builder
description: >
  Construit le tableau de bord mensuel : trésorerie, impayés, TVA, et selon
  le profil, DSO / DPO / DIO, marge par client, carnet de commandes.
  [EN] Builds the monthly dashboard, with profile-specific KPIs.
---

> Language rule: see `shared/language.md`.

# report-builder

## Indicateurs par profil
| Profil | Indicateurs |
|---|---|
| Tous | Trésorerie 30/60/90, impayés par ancienneté, TVA, échéances |
| services | Taux d'occupation, temps non facturé, CA récurrent, renouvellements, devis en cours |
| negoce, fabrication | DSO, DPO, DIO, marge brute par client et produit, taux de transformation, carnet de commandes, taux de service, ruptures, stock dormant, encours vs plafond, litiges transport |

## Règle
Valeurs absentes = « non disponible » (absent-is-not-zero).

## Lien cluster Shopify
Cette compétence dialogue avec la boutique en ligne via `shopify-reporting` (hub : `shopify-hub`, doc : [AI Toolkit](../../shared/shopify-ai-toolkit.md)).
