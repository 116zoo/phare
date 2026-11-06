---
name: shopify-setup
description: >
  Connecte la boutique au plugin : installe le Shopify AI Toolkit,
  vérifie l'accès à la boutique (URL, scopes, token) et consigne le
  contexte boutique. [EN] Sets up the Shopify store connection and access.
---

> Language rule: see `shared/language.md`.

# Shopify — Setup

## But
Rendre le plugin capable de parler à la boutique, en une séance validée.

## Entrées
- URL de la boutique (`*.myshopify.com`).
- Outil IA utilisé par le dirigeant (Claude Code, autre).
- Ce qu'il veut piloter (catalogue, commandes, tout).

## Étapes
1. **État des lieux** — lire `shared/shopify-ai-toolkit.md`, vérifier :
   serveur MCP `shopify-dev-mcp`, connecteur `shopify`, scopes.
2. **Proposer l'installation** — l'une des 3 options de la doc, adaptée
   à l'outil du dirigeant. Les commandes sont présentées, pas exécutées.
   Proposer aussi la désactivation des télémétries du toolkit.
3. **Vérifier l'accès** — `shopify store auth --store <domaine>
   --scopes read_products` puis une requête en lecture seule via
   `shopify store execute` (nom, devise, pays, plan). Si ça échoue :
   diagnostiquer (Node, CLI, domaine, scopes) et re-proposer.
4. **Consigner le contexte** — ajouter les champs boutique dans
   `## Business context` (URL, plan, devise, canaux, emplacements) sans
   renommer les champs existants.
5. **Scopes par domaine** — table des scopes lecture/écriture nécessaires
   par domaine à piloter (catalogue, commandes, stock, clients, marketing,
   reporting), avec recommandation de n'accorder que le minimum.

## Sortie
Connexion prête + table des scopes + domaines que le cluster peut déjà
couvrir. Prochaine étape proposée : `shopify-hub`.

## Repli
Pas de Node / pas de réseau : le cluster fonctionne en mode « coller » —
le dirigeant exporte depuis l'admin Shopify (CSV) et les skills traitent.
On le dit clairement, on ne simule pas.

## Garde-fous
- Le token n'est jamais demandé en clair dans la conversation : il vit
  dans l'environnement du dirigeant.
- Ne jamais créer l'application Shopify à la place du dirigeant sans
  lui montrer le formulaire.
