---
name: quote-followup
description: >
  Classe les devis ouverts par montant et ancienneté, propose une relance
  par étape (rappel, levée d'objection, expiration), marque les devis
  expirés. La probabilité est saisie par le dirigeant.
  [EN] Follows up on open quotes.
---

> Language rule: see `shared/language.md`.

# quote-followup

## Règle
Probabilité saisie, jamais inventée.

## Étapes de relance
- J+7 : rappel cordial
- J+15 : levée d'objection
- J+30 : expiration de l'offre

## Sortie
Tableau trié montant × ancienneté, projet de relance par devis.

## Validation
Envoi.
