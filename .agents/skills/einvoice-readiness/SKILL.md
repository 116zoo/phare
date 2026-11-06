---
name: einvoice-readiness
description: >
  Facturation électronique B2B et B2G en France : audit de préparation
  (plateforme agréée, réception, émission, e-reporting) et préparation de
  l'émission Factur-X (complétude des mentions EN 16931, profils,
  validation). Checklist d'écarts datée, jamais le mot « conforme ».
  À utiliser quand le dirigeant dit « la facture électronique », « Factur-X
  » ou « plateforme agréée ».
  [EN] French e-invoicing: readiness audit and Factur-X issuance prep.
---

> Language rule: see `shared/language.md`.

# einvoice-readiness

Deux modes, selon la demande : **audit** (« suis-je prêt ? ») et
**préparation de l'émission** (« prépare mes factures pour la
plateforme »). Lire `reference/facture-electronique-fr.md` avant de
répondre : calendrier vérifié, plateformes, profils Factur-X, e-reporting.

## Mode audit

1. **Positionner l'entreprise** — taille (GE / ETI / PME / micro) et date
   d'obligation d'émission qui lui correspond. La réception est obligatoire
   pour toutes les entreprises assujetties depuis le 1er sept. 2026.
2. **Plateforme agréée (PA)** — en a-t-une été choisie ? La PA choisie est-elle
   immatriculée DGFiP (Qonto et Pennylane le sont) ? Une « solution
   compatible » ne suffit pas : elle ne route pas vers la PA du client et ne
   fait pas l'e-reporting.
3. **Réception** — la plateforme sait-elle recevoir Factur-X et UBL ?
4. **B2G** — facture-t-il des personnes publiques ? Si oui : passage par le
   PFP (portail public), pas par la PA privée.
5. **e-reporting** — activer sur la PA les transmissions à la DGFiP
   (données de facture, de transaction, de paiement) à la date qui concerne
   l'entreprise.
6. **Mentions** — SIREN/SIRET client, adresse de livraison, nature du
   bien/service, option TVA sur les débits : présents sur les factures ?

## Mode préparation de l'émission

Pour chaque facture type de l'entreprise, vérifier la complétude des champs
EN 16931 portés par le profil Factur-X : numéro, date, échéance de paiement,
SIRET vendeur, n° de TVA vendeur et acheteur, moyen de paiement et IBAN,
montants. Un champ manquant est un écart nommé, jamais un zéro implicite
(`shared/absent-is-not-zero.md`). Le profil d'émission par défaut est
**EN 16931 (confort)** ; MINIMUM et BASIC ne suffisent pas. Proposer la
validation : environnement de test de la PA, ou Ecosio (gratuit) pour un
fichier isolé.

## Ce que ce skill ne fait pas

- Ne génère pas le XML Factur-X : la PA l'émet depuis les données de la
  facture.
- Ne signe pas de contrat de plateforme : c'est une décision commerciale du
  dirigeant, le skill compare et recommande.
- N'affirme jamais la conformité : « checklist d'écarts à date », jamais
  « conforme ».
