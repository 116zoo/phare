---
name: shopify-reporting
description: >
  Produit les rapports de la boutique : ventes, panier moyen, marge,
  profit, cohortes, retours, TVA, P&L et KPIs hebdomadaires.
  [EN] Produces Shopify store reports: sales, margin, profit, KPIs, P&L.
---

> Language rule: see `shared/language.md`.

# Shopify — Reporting

## But
Le set de rapports de la boutique : des chiffres tirés de la store,
interprétés en 3 lignes, reliés aux décisions.

## Choix du rapport
Le catalogue des rapports est dans [reference/reports.md](reference/reports.md) :
pulse hebdo, ventes par produit/collection, marge, panier moyen, cohortes,
taux de retour, coût des remises, TVA collectée, P&L boutique, trésorerie.

## Étapes
1. **Choisir** — le rapport demandé (sinon : proposer le pulse hebdo).
2. **Tirer les données** — ShopifyQL via `shopify store execute`
   (sinon Admin API, ou export collé en repli) : jamais de chiffre
   estimé pour se passer de données.
3. **Calculer** — les métriques du rapport, avec la période exacte.
4. **Interpréter** — 3 lignes : ce qui bouge, pourquoi (hypothèse),
   ce qu'on propose de faire.
5. **Livrable** — le rapport + la relance du rapport suivant.

## Contrôles
- Période et devise affichées en tête de chaque rapport.
- La marge exige les coûts d'achat : s'ils manquent, on les demande —
  on n'invente pas.
- Un écart boutique / comptable > 5 % est signalé, pas lissé.

## Liens
- `report-builder`, `business-pulse`, `growth-pulse` (pouls global),
  `cash-flow-snapshot`, `month-end-prep`, `tva-pilot` (TVA boutique),
  `pricing-desk` (marges).
- `shopify-catalog` et `shopify-marketing` quand l'interprétation vise
  le catalogue ou les promotions.

## Garde-fous
- Tout chiffre a sa source : requête, export, ou calcul affiché.
- Pas de rapport « au feeling » : si les données manquent, le rapport
  le dit.
