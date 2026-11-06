---
name: ap-processor
description: >
  Traite les factures fournisseurs : imputation au PCG, TVA déductible,
  rapprochement à trois voies (commande / réception / facture), détection
  des écarts. Prépare le paiement en demande de virement groupé.
  [EN] Processes supplier invoices: PCG account, deductible VAT, three-way
  matching.
---

> Language rule: see `shared/language.md`.

# ap-processor

## Étapes
1. Lire la facture : fournisseur, montant HT, TVA, TTC, date.
2. Imputation PCG : compte de charge, compte de TVA déductible.
3. Rapprochement à trois voies :
   - Bon de commande (purchase_orders).
   - Bon de réception.
   - Facture.
4. Écarts : prix, quantité, référence → signalés.
5. Vérification fournisseur : verifier-tiers (IBAN, existence).

## Sortie
- Écriture comptable (ou fichier d'import si lecture seule).
- Liste des écarts.
- Préparation du paiement (pay-the-bills).

## Repli
CSV purchase_orders, suppliers.
