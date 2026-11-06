---
name: crm-autopilot
description: >
  Met à jour le CRM : Sellsy, Axonaut, noCRM, Pipedrive en pairs. Ajoute
  SIREN, effectif, forme juridique, commercial affecté, grille, plafond.
  RGPD dans les notes.
  [EN] Updates the CRM: Sellsy, Axonaut, noCRM, Pipedrive.
---

> Language rule: see `shared/language.md`.

# crm-autopilot

## Connecteurs
Sellsy, Axonaut, noCRM.io, Pipedrive, HubSpot, Salesforce.

## Champs B2B à ajouter
siren, effectif, forme_juridique, commercial_affecte, grille_tarifaire,
plafond_encours, assurance_credit.

## RGPD
- Minimisation des données dans les notes.
- Pas de donnée personnelle superflue.
- Durée de conservation respectée.

## Lien cluster Shopify
Cette compétence dialogue avec la boutique en ligne via `shopify-customers` (hub : `shopify-hub`, doc : [AI Toolkit](../../shared/shopify-ai-toolkit.md)).
