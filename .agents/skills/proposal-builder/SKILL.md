---
name: proposal-builder
description: >
  Chiffre une prestation : entretien de découverte, notes, photos, RFP →
  devis de prestation avec mentions légales FR. Pour les lignes de produits
  des profils mixtes, lit catalog-quote.
  [EN] Builds a service proposal from discovery notes.
---

> Language rule: see `shared/language.md`.

# proposal-builder

## Étapes
1. Entretien de découverte : transcription, notes, photos, RFP.
2. Chiffrage : temps passé estimé, jalons, forfait.
3. Mentions légales FR : SIREN, TVA, pénalités, 40 €, escompte.
4. Lignes de produits (profils mixtes) : appel à catalog-quote.

## Sortie
- Devis de prestation (DOCX, PDF).
- Une ligne : total HT, TVA, TTC, délai.

## Validation
Envoi du devis.
