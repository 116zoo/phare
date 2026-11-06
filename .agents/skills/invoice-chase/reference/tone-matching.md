# Cadrage du ton

Logique de scoring et règles de ton pour invoice-chase.

## Scoring

Note chaque client d'après l'historique de règlement QuickBooks sur les 12 derniers
mois. Il faut au minimum 3 factures pour noter ; en dessous de 3, le score par défaut
est `occasionally-late`.

| Score | Critères |
|---|---|
| `good-payer` | Payé à la date ou en avance sur ≥ 75 % des factures |
| `occasionally-late` | Payé en retard sur 25 à 50 % des factures, ou moins de 3 factures à l'historique |
| `repeat-late` | Payé en retard sur plus de 50 % des factures |

« Dans les délais » signifie un règlement reçu au plus tard à la date d'échéance de
la facture.

## Ton selon le score

| Score | Ton | Caractère |
|---|---|---|
| `good-payer` | Cordial | Amical, présume un oubli. Commence par une grâce. |
| `occasionally-late` | Neutre | Professionnel, sans jugement. Relance purement factuelle. |
| `repeat-late` | Ferme | Direct, énonce une échéance. Sans chaleur, sans accusation. |

## Objets d'email

- Cordial : `Petit rappel : facture n° [N] — [montant] €`
- Neutre : `Relance : facture n° [N] — [montant] € échue`
- Ferme : `Échéance dépassée : facture n° [N] — [montant] € ([X] jours de retard)`

## Structure du corps (tous les tons)

Toute relance contient : le ou les numéros de facture, le montant total dû, la date
d'échéance initiale, le nombre de jours de retard, et le lien de paiement ou les
instructions de règlement.

Ajouts propres à chaque ton :

- **Cordial** : une phrase de reconnaissance (« Je sais que l'agenda est chargé »)
- **Neutre** : rien — les faits uniquement
- **Ferme** : une phrase d'échéance (« Merci de régler avant le [date] »)

Un seul appel à l'action par email. Jamais deux.

## Règle de regroupement

Si un client a plusieurs factures échues, regroupe-les dans un seul email. Liste
chaque facture (numéro, montant, date d'échéance), puis annonce le total cumulé.
Utilise le score du client, pas celui de la facture la plus échue.