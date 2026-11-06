---
name: shopify-builder
description: >
  Construit dans la boutique : automatisations Flow, Shopify Functions
  (remises, checkout), thème (Liquid, Polaris), installation d'apps —
  en s'appuyant sur l'AI Toolkit.
  [EN] Builds in the Shopify store: flows, functions, theme, apps, via the AI Toolkit.
---

> Language rule: see `shared/language.md`.

# Shopify — Builder

## But
La brique « builder » du cluster : construire dans la boutique ce que les
7 autres skills pilotent — automatisations, règles, pages, apps — en
s'appuyant sur l'AI Toolkit officiel.

## Socle
`shared/shopify-ai-toolkit.md` : serveur MCP `shopify-dev-mcp` + skill
`shopify` (guidance GraphQL Admin API, Functions, Liquid, Polaris, CLI).
On charge la guidance d'une surface seulement quand la tâche l'exige.
Chaque code généré est validé par le toolkit avant d'être présenté.

## Étapes
1. **Cadrer le besoin** — automatiser quoi ? Une règle (remise, checkout) ?
   Une page ? Une app ? Une automatisation Flow ?
2. **Choisir la surface** — Flow / Function / thème / app, avec le critère
   de choix affiché (déclaratif vs code, périmètre).
3. **Rédiger la solution** — le code ou la config, avec ce qu'il change
   exactement dans la boutique.
4. **Faire valider** — solution + plan de test + plan de rollback, en une
   passe.
5. **Déployer en sûr** — snapshot du thème avant toute modification ;
   test sur commande draft ou store de staging ; puis production.
6. **Vérifier** — test fonctionnel décrit, puis mesure après 7 jours.

## Règles
- Aucune déploye en production sans test préalable (draft / staging).
- Tout déploiement a un rollback écrit avant d'agir.
- Une Function de remise se coordinate avec `shopify-marketing` (conditions
  et plafond).
- Le besoin dépasse le périmètre (app complexe, extension) : on le dit et
  on propose le périmètre restreint ou l'aide externe.

## Liens
- `build-connector` et `build-agent` (automatisations génériques).
- `shopify-marketing` (fonctions de remise), `shopify-catalog` (thème du
  catalogue), `shopify-orders` (règles de fulfillment).

## Garde-fous
- Snapshot avant, test avant, rollback écrit : les trois sont obligatoires.
- Pas de secret (token, clé) dans le code déployé.
