---
name: payroll-prep
description: >
  Prépare les variables de paie : heures travaillées, absences, congés payés,
  primes, titres-restaurant. Export vers Payfit, Silae ou l'expert-comptable.
  Aucun calcul de cotisations, de net ni de DSN.
  [EN] Prepares payroll variables (hours, absences, bonuses). No contribution
  or net pay calculation.
---

> Language rule: see `shared/language.md`.

# payroll-prep

## Ce que le skill fait
- Collecte les variables de paie du mois :
  - Heures travaillées / heures supplémentaires.
  - Absences (maladie, congés sans solde).
  - Congés payés pris / restants.
  - Primes (exceptionnelles, 13e mois).
  - Titres-restaurant (nombre de jours).
- Produit un fichier d'export (CSV, XLSX) au format attendu par :
  - Payfit (API publique, lecture seule).
  - Silae.
  - L'expert-comptable (format libre ou imposé).

## Ce que le skill ne fait pas
- Aucun calcul de cotisations sociales.
- Aucun calcul de net à payer.
- Aucune DSN.
- Aucune soumission à un organisme.

## Entrées
- Calendrier des jours travaillés / fériés.
- Saisie du dirigeant ou export d'un outil de pointage.
- Contrats de travail (pour les taux horaires, si besoin).

## Sortie
- Fichier d'export daté, prêt à transmettre.
- Une ligne : « X salariés, Y variables, prêt pour Payfit ».

## Avertissement
Les cotisations, le net et la DSN relèvent du gestionnaire de paie ou de
l'expert-comptable. Ce plugin prépare les variables, il ne calcule pas la paie.
