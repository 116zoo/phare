---
name: credit-desk
description: >
  Calcule l'encours client (factures ouvertes + commandes confirmées non
  facturées), le compare au plafond, classe en vert / vigilance / bloqué,
  contrôle l'assurance-crédit, surveille le BODACC, alerte sur les
  procédures collectives avec checklist datée.
  [EN] Customer credit exposure and risk: limit, insurance, insolvency.
---

> Language rule: see `shared/language.md`.

# credit-desk

## Calcul
Encours = factures ouvertes + commandes confirmées non facturées.
- Vert : < 80 % du plafond
- Vigilance : 80 % ≤ encours < plafond
- Bloqué : ≥ plafond ou alerte BODACC

## Alerte procédure collective — checklist datée [à vérifier avec un avocat]
- Déclaration de créance dans le délai court après BODACC
- Revendication au titre de la réserve de propriété
- Arrêt des livraisons à crédit
- Sortie du circuit de relance courant

## Gate
Tout déblocage de commande est une décision du dirigeant.
