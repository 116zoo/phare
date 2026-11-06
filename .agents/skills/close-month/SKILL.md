---
name: close-month
description: >
  Clôture le mois de bout en bout : rapprochement, cut-off, prévision de
  trésorerie, dossier de clôture. Pour les profils à stock, intègre
  l'inventaire et la valorisation.
  [EN] End-to-end month close: reconciliation, cut-off, cash forecast,
  closing package.
---

> Language rule: see `shared/language.md`.

# close-month

## Séquence
1. month-end-prep — rapprochement, lettrage, cut-off.
2. stock-count-cutoff — uniquement si Profil = negoce | fabrication | mixte.
3. cash-flow-snapshot — prévision 30/60/90 jours.
4. report-builder — tableau de bord du mois.

## Validation
Chaque étape produit un brouillon. Le dirigeant valide avant passage à la
suivante.

## Sortie finale
- Paquet de clôture daté (dossier, archive, ou import).
- Une ligne : « clôture prête, X points à vérifier ».
