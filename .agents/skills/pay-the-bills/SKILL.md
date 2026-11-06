---
name: pay-the-bills
description: >
  Prépare le paiement des factures fournisseurs : lit les factures, vérifie
  les coordonnées bancaires, crée une demande de virement groupé Qonto avec
  lien d'approbation. Aucun paiement n'est exécuté par le plugin.
  À utiliser quand le dirigeant dit « payer les fournisseurs », « régler
  les factures ».
  [EN] Prepares supplier payments as a Qonto bulk transfer request.
---

> Language rule: see `shared/language.md`.

# pay-the-bills

## Étape 1 — Lire les factures
Sources : ap-processor, grand livre (Pennylane), ou CSV receivables.

## Étape 2 — Vérifier
- Cohérence IBAN / nom via verifier-tiers (fraude au changement de RIB).
- Déjà payée ? Vérifier dans Qonto.
- Litige en cours ? Vérifier dans purchase-desk.

## Étape 3 — Demande de virement groupé
Créer une demande de virement groupé dans Qonto (MCP officiel). Le plugin
ne peut pas exécuter le virement : Qonto renvoie un lien d'approbation que
le dirigeant valide lui-même.

## Sortie
- Liste des factures avec montant, bénéficiaire, échéance.
- Lien d'approbation Qonto.
- Une ligne : « X factures, Y €, lien d'approbation prêt ».

## Règle absolue
Aucun paiement exécuté. Le plugin prépare, Qonto exécute après approbation.

## Repli
Sans Qonto : fichier SEPA XML ou liste à saisir manuellement.
