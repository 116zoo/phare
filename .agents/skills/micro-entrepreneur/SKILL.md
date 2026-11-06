---
name: micro-entrepreneur
description: >
  Suit le chiffre d'affaires d'un micro-entrepreneur par période, rappelle
  la déclaration URSSAF, surveille les plafonds et le seuil de TVA. Ne
  calcule aucun taux de cotisation.
  [EN] Tracks micro-entrepreneur revenue, thresholds, URSSAF reminders.
---

> Language rule: see `shared/language.md`.

# micro-entrepreneur

## Entrées
Période, CA facturé et CA encaissé, taux de cotisation saisi, date de création.

## Contrôles
1. Plafonds micro BIC/BNC.
2. Seuil de TVA : franchise, majoration.
3. CA du mois / trimestre.
4. Rappel déclaration URSSAF.

## Sorties
Tableau CA. Distance au plafond. Distance au seuil TVA.
Montant URSSAF avec le taux saisi, jamais déduit.
