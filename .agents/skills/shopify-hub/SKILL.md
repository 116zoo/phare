---
name: shopify-hub
description: >
  Point d'entrée du cluster Shopify : vérifie l'AI Toolkit, mappe les 8
  skills qui couvrent tous les domaines de la boutique (catalogue,
  commandes, stock, clients, marketing, reporting, builder) et route la
  demande vers le bon. [EN] Hub of the Shopify skills: routes store requests.
---

> Language rule: see `shared/language.md`.

# Shopify — Hub

## But
Porte d'entrée unique pour toute demande sur la boutique Shopify. Vérifie
que l'AI Toolkit est disponible, puis transmet au skill du domaine
concerné — sans répondre lui-même.

## Étape 1 — Disponibilité
Lis `shared/shopify-ai-toolkit.md` et vérifie :
- serveur MCP `shopify-dev-mcp` disponible (ou connecteur `shopify`),
- URL de la boutique et scopes connus,
- contexte boutique présent (sinon : `shopify-setup`).
Si rien n'est disponible : proposer `shopify-setup` et s'arrêter.

## Étape 2 — Routage par domaine
| Demande | Skill |
|---|---|
| produits, variantes, collections, SEO, prix boutique | shopify-catalog |
| commandes, expédition, retours, remboursements | shopify-orders |
| stock, transferts, réassort, bons de commande | shopify-inventory |
| clients, segments, fidélité, RFM | shopify-customers |
| promos, codes, campagnes, e-mail, publicités | shopify-marketing |
| ventes, marge, profit, P&L, KPIs de la boutique | shopify-reporting |
| automatisation, app, fonction, thème | shopify-builder |
| connexion, installation, scopes | shopify-setup |

## Étape 3 — Transfert
Nommer le skill cible en une ligne et l'appliquer. Demande qui touche
plusieurs domaines : proposer un plan ordonné (3 étapes max) et le faire
valider avant d'agir.

## Liens
- Les skills B2B existants restent primaires : `catalog-quote`,
  `order-intake`, `inventory-planner`, `crm-autopilot` — le cluster Shopify
  est leur reflet dans la boutique en ligne.
- `shared/shopify-ai-toolkit.md` — comment on parle à la boutique.

## Garde-fous
- Aucune écriture boutique sans validation.
- Aucun chiffre inventé : donnée indisponible → on le dit.
- Sujet développeur (app, thème, fonction) : `shopify-builder`, pas le hub.
