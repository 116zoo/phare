---
name: customer-reorder
description: >
  Détecte les clients B2B récurrents « en retard sur leur cycle »
  (intervalle médian entre commandes), prépare un message de réassort
  personnalisé. N'écrit jamais à un client bloqué par credit-desk, ni un
  message qui suggère une fin de relation.
  [EN] Proactive reorder outreach for recurring B2B customers.
---

> Language rule: see `shared/language.md`.

# customer-reorder

## Calcul
- Intervalle médian entre commandes
- Quantité médiane par référence
- Détection en retard sur le cycle (ex. cycle 45 j, 62 j sans commande)

## Garde-fous
1. Jamais de relance sur client bloqué par credit-desk.
2. Jamais de message suggérant une rupture (droit-fr.md#pratiques-restrictives).
3. B2B seulement. Pour B2C, reactivate.

## Sortie
Liste de clients en retard, avec ancienneté et cycle.
Message de relance personnalisé (dernier achat, nouveautés, ruptures levées).

## Validation
Envoi.
