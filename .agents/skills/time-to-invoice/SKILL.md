---
name: time-to-invoice
description: >
  Facture le temps passé, les jalons ou le forfait : lit le relevé de temps
  (CSV, calendrier, export), contrôle les taux horaires du devis, les
  dépassements, le temps non facturable, déduit les acomptes déjà facturés,
  applique la mention de TVA (encaissement ou débits).
  [EN] Invoices time-and-materials, milestones, or fixed fee.
---

> Language rule: see `shared/language.md`.

# time-to-invoice

## Contrôles
1. Taux horaires cohérents avec le devis
2. Dépassements de budget signalés
3. Temps non facturable exclu
4. Acomptes déjà facturés déduits
5. Mention de TVA : encaissement ou débits, selon l'option

## Sortie
Projet de facture (via devis-facture-fr).

## Validation
Émission.
