---
name: dossier-expert-comptable
description: >
  Prépare le dossier de clôture pour l'expert-comptable : pièces manquantes,
  relances pré-rédigées, paquet daté. Remplace tax-season-organizer.
  [EN] Prepares the year-end package for the accountant.
---

> Language rule: see `shared/language.md`.

# dossier-expert-comptable

## Contrôles
1. Pièces manquantes : factures d'achat sans justificatif, notes de frais,
   relevés bancaires non lettrés, contrats non transmis.
2. Rapprochements : banque ↔ grand livre, clients ↔ encaissements,
   fournisseurs ↔ paiements.
3. Cut-off : FAE, FNP, CCA, PCA.
4. Immobilisations : acquisitions, cessions, amortissements.
5. Stocks : renvoi à stock-count-cutoff.
6. Social : DSN, charges sociales, provisions congés payés.

## Sortie
Liste des pièces manquantes, relances pré-rédigées, paquet daté.
Une ligne : « X pièces manquantes, Y relances prêtes ».
