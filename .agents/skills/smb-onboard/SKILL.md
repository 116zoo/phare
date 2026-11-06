---
name: smb-onboard
description: >
  Démarre le plugin : apprend l'entreprise, le profil, le régime fiscal et
  les connecteurs. Pose une question à la fois.
  [EN] Onboards the owner: business context, profile, tax regime, connectors.
---

> Language rule: see `shared/language.md`.

# Onboarding

## Règles
1. Une question à la fois.
2. Si pressé : questions 1, 3, 4, 8, 11 seulement.
3. Écrire `## Business context` à la fin. Titre et champs existants jamais
   renommés.

## Les 13 questions
1. Que vend ton entreprise ?
2. Combien de personnes y travaillent ?
3. Quelle est ta plus grosse inquiétude ?
4. Quels outils utilises-tu ?
5. Où sont tes clients ?
6. Comment factures-tu ?
7. Comment te paies-tu ?
8. Profil : « Vous vendez surtout des prestations, des produits à des
   professionnels, ou les deux ? »
9. Canaux de commande.
10. Stock et expédition.
11. Gestion commerciale.
12. Expert-comptable et régime.
13. Garantie des créances (B2B).

## Bloc Business context

## Avertissement unique
Ce plugin prépare, contrôle et rédige. Il ne dépose rien auprès d'une
administration, n'exécute aucun virement et n'envoie rien sans validation.
Ni conseil fiscal, ni juridique, ni social.

## Secteurs hors périmètre v1
BTP, restauration, santé, professions réglementées, alimentaire à traçabilité
sanitaire stricte, alcool, grande distribution EDI.
La vente en ligne est couverte par le cluster Shopify (`shopify-hub`).
Le plugin fonctionne sur le socle commun et le dit.
