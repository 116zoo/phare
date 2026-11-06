---
name: tva-pilot
description: >
  Calcule la TVA collectée, la TVA déductible et le solde estimé de la
  période. Contrôle les taux, le fait générateur (livraison ou encaissement),
  les autoliquidations et les opérations intra-UE. Prépare le report pour la
  CA3 ou la CA12. À utiliser quand le dirigeant dit « la TVA », « ma
  déclaration de TVA », « combien de TVA je dois ».
  [EN] Computes collected/deductible VAT and the estimated balance.
---

> Language rule: see `shared/language.md`.

# tva-pilot

## But
TVA collectée, TVA déductible, solde estimé. Aucune déclaration déposée.

## Contrôles
1. Taux : 20 / 10 / 5,5 / 2,1 %. Taux inconnu → « à vérifier », jamais deviné.
2. Fait générateur : livraison (biens), encaissement (prestations sauf option
   débits). Acomptes biens exigibles dès encaissement [à vérifier].
3. Autoliquidations : intra-UE, importations.
4. Achats sans pièce : signalés, non intégrés.
5. Intra-UE / export : renvoyer à intra-eu-export-check.
6. Franchise en base : surveiller le seuil.

## Sorties
Tableau période, ventilation par taux, report CA3/CA12 à saisir manuellement.
Si régime inconnu : « régime non renseigné », rien n'est calculé.

## Repli
CSV receivables + achats.
