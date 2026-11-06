---
name: verifier-tiers
description: >
  Vérifie un client ou fournisseur : existence (Sirene), dirigeants,
  procédures collectives (BODACC), n° de TVA intracommunautaire (VIES),
  cohérence IBAN/nom. À utiliser quand le dirigeant dit « vérifie ce client ».
  [EN] Verifies a French business.
---

> Language rule: see `shared/language.md`.

# verifier-tiers

## Sources
API Recherche d'entreprises, INSEE Sirene, BODACC, VIES, Pappers.

## Contrôles
1. Existence et statut.
2. Dirigeants, bénéficiaires effectifs.
3. Procédures collectives.
4. N° TVA intracommunautaire (VIES).
5. Cohérence IBAN / nom (fraude au changement de RIB).
6. Adresse, NAF, effectif.

## Sortie
Fiche FR : raison sociale, SIREN, statut, dirigeants, alertes.
Alerte procédure collective → renvoi à credit-desk (checklist datée).

## Repli
Saisie du SIREN, checklist manuelle sur sites officiels.
