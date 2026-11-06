---
name: lead-finder
description: >
  Trouve des prospects B2B : Sirene, API Recherche d'entreprises, Pappers
  (code NAF, effectif, dirigeants), ciblage de revendeurs par code NAF.
  Coût annoncé avant enrichissement.
  [EN] Finds French B2B leads: Sirene, data.gouv, Pappers.
---

> Language rule: see `shared/language.md`.

# lead-finder

## Sources
- API Recherche d'entreprises (data.gouv) : gratuit, données publiques.
- INSEE Sirene : gratuit, données légales.
- Pappers : enrichissement payant (dirigeants, effectif, finances).
- BODACC : procédures collectives (exclure ces entreprises).

## Ciblage
- Par code NAF (ex. 4673A pour le négoce de bois).
- Par zone géographique (département, région).
- Par effectif (tranche).
- Par ancienneté.

## Coût
Annoncer le coût avant tout enrichissement payant (Pappers).
Proposer d'abord la version gratuite (Sirene, data.gouv).

## Sortie
- Liste de prospects : raison sociale, SIREN, NAF, effectif, adresse.
- Une ligne : « X prospects trouvés, Y hors procédure ».

## Repli
Sans connecteur : le dirigeant saisit des critères, le plugin affiche les
requêtes à faire manuellement sur les sites officiels.
