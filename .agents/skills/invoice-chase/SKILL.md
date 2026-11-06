---
name: invoice-chase
description: >
  Relance les factures impayées : classe les retards, rédige des relances
  graduées (cordiale, ferme, mise en demeure) à valider avant envoi. Tient
  compte de l'encours, de l'assurance-crédit et des procédures collectives.
  À utiliser quand le dirigeant dit « qui me doit de l'argent », « mes
  impayés », « relancer un client ».
  [EN] Drafts overdue-invoice reminders. Use when the user asks "who owes
  me money".
---

> Language rule: see `shared/language.md`.

# invoice-chase

## Classement des retards
| Niveau | Ancienneté | Ton | Contenu |
|---|---|---|---|
| 1 | J+1 à J+7 | Cordial | Rappel simple, copie de la facture |
| 2 | J+8 à J+30 | Ferme | Rappel des conditions, pénalités mentionnées |
| 3 | J+31 à J+60 | Ferme + indemnité | Pénalités + indemnité forfaitaire de 40 € |
| 4 | Au-delà | Mise en demeure | Dernier niveau, mention des poursuites possibles |

## Contenu obligatoire de toute relance
- Montant TTC dû, numéro de facture, date d'échéance.
- Pénalités de retard (mention obligatoire — droit-fr.md#penalites).
- Indemnité forfaitaire de recouvrement de 40 € — droit-fr.md#penalites.
- Conditions d'escompte si applicables.
- Coordonnées bancaires pour règlement (IBAN : 4 derniers caractères).

## Contrôles avant envoi
1. Encours : appeler credit-desk si le client est proche de son plafond.
2. Assurance-crédit : si credit_insured = oui, vérifier que la créance est
   couverte.
3. Procédure collective : si le client apparaît au BODACC (via verifier-tiers),
   sortir du circuit de relance courant et renvoyer à credit-desk.
4. Ton : vouvoiement, formules françaises.
5. Langue : français par défaut.

## Sorties
- Trois brouillons (niveaux 1 à 3) pour chaque facture en retard.
- Mise en demeure uniquement si le dirigeant la demande explicitement.
- Une ligne par client : ancienneté, montant, niveau proposé.

## Validation
Envoi de chaque relance, une par une. Aucun envoi groupé sans accord.

## Repli
CSV receivables (shared/data-model.md).
