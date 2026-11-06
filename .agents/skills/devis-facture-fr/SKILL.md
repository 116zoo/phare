---
name: devis-facture-fr
description: >
  Émet devis, factures, avoirs et factures d'acompte. Contrôle les mentions
  obligatoires (SIREN, TVA, pénalités, 40 €, escompte, nature de l'opération)
  et la numérotation continue. Émet via Qonto, Sellsy ou Axonaut si connecté,
  sinon PDF. À utiliser quand le dirigeant dit « fais un devis », « une
  facture ».
  [EN] Issues quotes, invoices, credit notes and deposit invoices.
---

> Language rule: see `shared/language.md`.

# devis-facture-fr

## But
Émission de devis, factures, avoirs, factures d'acompte.
Le Factur-X (e-facture) se prépare avec `einvoice-readiness` — ce skill
n'émet que des documents classiques.

## Contrôles (mentions obligatoires)
1. Numérotation continue : pas de trou, pas de doublon.
2. SIREN client, adresse de livraison si différente.
3. Taux de TVA par ligne, nature bien/service.
4. Pénalités de retard, indemnité 40 €, escompte, date de règlement.
5. Acompte : mention « acompte ».
6. Total HT + TVA = TTC.
7. Avoir : référence à la facture ou BL d'origine, motif.

## Sortie
DOCX ou PDF, ou émission via Qonto/Sellsy/Axonaut si connecté.
Une ligne : HT, TVA, TTC, échéance.

## Validation
V1 : émission avant envoi.
