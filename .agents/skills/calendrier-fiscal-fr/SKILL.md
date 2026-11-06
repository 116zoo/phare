---
name: calendrier-fiscal-fr
description: >
  Échéancier fiscal et social personnalisé : TVA, acomptes d'IS, CFE, liasse,
  URSSAF, taxe d'apprentissage. Dates sourcées dans droit-fr.md, jamais de
  mémoire. À utiliser quand le dirigeant dit « mes échéances ».
  [EN] Personalized French tax and social calendar.
---

> Language rule: see `shared/language.md`.

# calendrier-fiscal-fr

## Entrées
Régime fiscal, Régime de TVA, Périodicité TVA, Forme juridique, salariés,
exercice.

## Échéances (exemples)
- TVA : mensuelle ou trimestrielle (15 jan/avr/juil/oct) ; CA12 annuelle
- IS : acomptes 15 mars / 15 juin / 15 sept / 15 déc ; solde au 15 du 4e mois
- CFE : 15 décembre
- URSSAF : mensuelle ou trimestrielle
- DSN : mensuelle

## Règle
Chaque ligne porte sa source (droit-fr.md#clé). Non vérifiée → [à vérifier].

## Sortie
Calendrier daté FR. Export possible vers cash-flow-snapshot et payroll-prep.
