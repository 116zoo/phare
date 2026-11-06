---
name: contract-review
description: >
  Relit un contrat selon la grille de droit français : déséquilibre
  significatif, rupture brutale de relation commerciale, clauses abusives
  B2C, non-concurrence, RGPD art. 28, juridiction. Pour les CGV B2B :
  réserve de propriété, pénalités, limitation de responsabilité. Ne conclut
  jamais « signez ».
  [EN] Reviews a contract under French law. Never says "sign it".
---

> Language rule: see `shared/language.md`.

# contract-review

## Grille B2B
| Point | Base | À vérifier |
|---|---|---|
| Déséquilibre significatif | C. com. L442-1 | Clause qui impose des obligations déséquilibrées |
| Rupture brutale | C. com. L442-1 | Préavis écrit suffisant, durée, motif |
| Réserve de propriété | C. com. L624-16 | Écrite, acceptée au plus tard à la livraison |
| Pénalités de retard | C. com. L441-10 | Mention obligatoire, taux plancher |
| Indemnité 40 € | C. com. D441-5 | Mention obligatoire |
| Limitations de responsabilité | C. civ. | Clause claire, non abusive |
| Juridiction compétente | C. com. | Tribunal de commerce, médiation, arbitrage |
| RGPD art. 28 | RGPD | Sous-traitance, finalité, durée, sécurité |

## Grille B2C (si applicable)
| Point | Base | À vérifier |
|---|---|---|
| Clauses abusives | C. conso. L212-1 | Liste noire, liste grise |
| Droit de rétractation | C. conso. L221-18 | 14 jours, mention obligatoire |
| Non-concurrence | Jurisprudence | Limites dans le temps et l'espace |

## Règle absolue
Ne jamais conclure « signez ». Le plugin liste les points d'attention, il ne
remplace pas un avocat.

## Sortie
- Tableau des points d'attention, avec base légale.
- Une ligne : « X points à vérifier, Y à faire relire ».

## Repli
Sans connecteur : le dirigeant colle le texte du contrat.
