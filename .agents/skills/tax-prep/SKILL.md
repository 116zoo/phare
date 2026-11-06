---
name: tax-prep
description: >
  Prépare la fiscalité de l'entreprise : chaîne month-end-prep → tva-pilot →
  dossier-expert-comptable, plus le calendrier fiscal personnalisé.
  [EN] Prepares French business tax: month-end → VAT → accountant package.
---

> Language rule: see `shared/language.md`.

# tax-prep

## Séquence
1. month-end-prep — rapprochement, cut-off.
2. tva-pilot — TVA collectée / déductible / solde.
3. dossier-expert-comptable — pièces manquantes, paquet de clôture.
4. calendrier-fiscal-fr — échéances à venir.

## Sortie
- Paquet fiscal daté.
- Une ligne : « liasse prête, X points à vérifier ».

## Ce que le skill ne fait pas
- Aucune déclaration déposée.
- Aucun calcul d'IS (calculé par l'expert-comptable).
- Aucune connexion à impots.gouv.
