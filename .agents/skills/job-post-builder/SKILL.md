---
name: job-post-builder
description: >
  Rédige une offre d'emploi : CDI / CDD / alternance, convention collective,
  rémunération brute annuelle, mention H/F. Modèle de promesse d'embauche à
  faire relire. Signature Yousign ou DocuSign.
  [EN] Builds a French job posting: CDI/CDD, collective agreement, salary,
  H/F mention.
---

> Language rule: see `shared/language.md`.

# job-post-builder

## Structure de l'offre
- Intitulé du poste (avec mention H/F).
- Type de contrat : CDI, CDD, alternance, stage.
- Convention collective applicable.
- Rémunération : brute annuelle (ou taux horaire).
- Lieu de travail.
- Missions principales.
- Profil recherché (compétences, expérience).
- Processus de recrutement.

## Modèle de promesse d'embauche
Fournir un modèle, avec la mention : « à faire relire par un juriste avant
envoi ».

## Signature
Yousign ou DocuSign si connecté. Sinon : impression, signature manuscrite,
scan.

## Sortie
- Offre d'emploi (DOCX, PDF).
- Promesse d'embauche (modèle).
- Une ligne : « offre prête, X points à vérifier ».

## Repli
Sans connecteur : DOCX local.
