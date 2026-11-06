---
name: working-capital
description: >
  Calcule le BFR : DSO (délai clients), DPO (délai fournisseurs), DIO
  (rotation du stock), cycle de conversion, trajectoire 90 jours, scénarios
  (retarder un achat, escompte, financement décrit de façon neutre). Aucune
  recommandation de produit financier.
  [EN] Working capital: DSO, DPO, DIO, 90-day trajectory, neutral scenarios.
---

> Language rule: see `shared/language.md`.

# working-capital

## Indicateurs
- DSO = (créances / CA TTC) × jours
- DPO = (dettes fournisseurs / achats TTC) × jours
- DIO = (stock moyen / coût des ventes) × jours
- Cycle de conversion = DSO + DIO − DPO

## Sorties
Indicateurs actuels, trajectoire 90 jours, scénarios.
Financements décrits de façon neutre, sans classement : affacturage,
assurance-crédit, Dailly, financement de factures — conditions à demander.

## Règle
Aucune recommandation de produit financier.
