---
name: month-end-prep
description: >
  Prépare la clôture mensuelle : rapprochement banque ↔ grand livre,
  lettrage des virements groupés, cut-off (FAE, FNP), et pour les profils
  à stock, valorisation et dépréciations. Sortie en fichier d'import si le
  grand livre est en lecture seule.
  [EN] Month-end close: reconciliation, matching, cut-off.
---

> Language rule: see `shared/language.md`.

# month-end-prep

## Étapes
1. Rapprochement bancaire : Qonto ↔ grand livre (Pennylane ou CSV).
2. Lettrage des virements groupés : associer chaque paiement aux factures.
3. Cut-off :
   - FAE (factures à établir) : livraisons non facturées.
   - FNP (factures non parvenues) : achats reçus non facturés.
   - PCA / CCA simples.
4. Stocks (profils negoce, fabrication) : renvoi à stock-count-cutoff.
5. Social : charges sociales, provisions congés payés.

## Sorties
- Fichier d'import (CSV, FEC) si grand livre en lecture seule.
- Paquet de clôture daté.
- Une ligne : « X écritures, Y €, Z points à vérifier ».

## Repli
CSV receivables, purchase_orders, stock.
