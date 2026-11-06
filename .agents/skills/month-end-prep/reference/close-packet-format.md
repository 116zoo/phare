# Référence — format du paquet de clôture

Le paquet de clôture est constitué de deux fichiers : un classeur xlsx et un résumé PDF d'une page.

## Nommage des fichiers

```
close-packet-2024-03.xlsx
close-packet-2024-03-summary.pdf
```

Utilise le format année-mois ISO 8601 (`YYYY-MM`) dans le nom de fichier. L'emplacement d'enregistrement par défaut est le Bureau ; utilise le chemin préféré de l'utilisateur s'il est indiqué.

---

## Classeur xlsx — trois feuilles

### Feuille 1 : compte de résultat

Copie mise en forme du compte de résultat du grand livre pour le mois cible. Mise en page sur deux colonnes :
**Catégorie** et **Montant**.

Lignes obligatoires (dans l'ordre) :
1. Sous-total du chiffre d'affaires
2. Sous-total du coût des ventes
3. **Marge brute** (gras)
4. **Taux de marge brute (%)** (gras, formaté en pourcentage)
5. Charges opérationnelles par catégorie (chacune sur sa propre ligne)
6. Total des charges opérationnelles
7. **Résultat net** (gras)

Ajoute une colonne de comparaison mois sur mois (MoM) si les données du mois précédent sont disponibles. Formate les montants en devise avec le code ISO de l'entreprise, jamais un symbole seul : `"EUR "#,##0.00` (voir `../../../shared/currency-and-locale.md`). Valeurs négatives en rouge.

### Feuille 2 : rapprochement

Comparaison côte à côte des dépôts enregistrés au grand livre et des règlements des prestataires de paiement.

Colonnes :
| Colonne | Source |
|---|---|
| Date (grand livre) | Date du dépôt au grand livre |
| Montant (grand livre) | Montant du dépôt au grand livre |
| Prestataire | PayPal / Shopify / Square / Stripe |
| Date (prestataire) | Date d'arrivée des fonds chez le prestataire |
| Montant (prestataire) | Virement net effectué par le prestataire |
| Écart | Montant au grand livre moins montant du prestataire |
| Statut | RECONCILED / MISSING_IN_LEDGER / UNMATCHED_DEPOSIT / DATE_MISMATCH / UNRECONCILED_IN_LEDGER |

`UNRECONCILED_IN_LEDGER` est le cas du flux bancaire : le virement est une ligne du grand livre qui n'a pas encore été lettrée avec un document (la forme habituelle chez Xero).

Code la colonne Statut par couleur :
- RECONCILED → fond vert
- DATE_MISMATCH ou UNRECONCILED_IN_LEDGER → fond jaune
- MISSING_IN_LEDGER ou UNMATCHED_DEPOSIT → fond rouge

### Feuille 3 : points à traiter

Tous les signalements ouverts de la liste de contrôle. Colonnes :
| Colonne | Remarques |
|---|---|
| Catégorie | À traiter (non catégorisé ou non rapproché) / Justificatif manquant / Doublon / Signalement de rapprochement |
| Date | Date de la transaction |
| Montant | Montant, dans la devise de l'entreprise |
| Fournisseur / Client | Nom |
| Description | Ce qui pose problème et quoi faire |

S'il n'y a aucun point ouvert, affiche une seule ligne : « Aucun point à traiter — les comptes sont propres. »

### Feuille 4 : paie (uniquement si un connecteur de paie est connecté)

Les totaux de l'étape 5a en regard de ce que le grand livre a enregistré. Une ligne par exécution de paie, plus une ligne prestataires et une ligne de total. Colonnes :

| Colonne | Source |
|---|---|
| Exécution | Date de paiement, ou « Prestataires » pour la ligne de paiements aux prestataires |
| Brut | `totals.gross_pay` |
| Charges patronales | `totals.employer_taxes` |
| Charges salariales | `totals.employee_taxes` |
| Net à payer | `totals.net_pay` ; la ligne prestataires utilise `total.wages` |
| Charge de paie au grand livre | Les lignes de charge de paie du mois dans le grand livre, lettrées par date |
| Écart | Grand livre moins (net à payer + charges patronales), signalé au-delà de 0,50 |

Des totaux uniquement. Aucun nom de salarié ni montant individuel sur cette feuille — le nombre d'exécutions et les totaux du mois sont ce dont le comptable a besoin. Ajoute une note de bas de page quand PayFit alimente la ligne des prestataires : « Les paiements aux prestataires couvrent uniquement les prestataires français. »

---

## Résumé PDF — une page

Disposition (de haut en bas) :

```
[Nom de l'entreprise]                Paquet de clôture — [Mois Année]
────────────────────────────────────────────────────────────

CHIFFRES CLÉS
Chiffre d'affaires   12 400 €
Marge brute          60 %
Résultat net         4 150 €
Paie                 12 400 € (2 exécutions)   [uniquement si un connecteur de paie est connecté]

SYNTHÈSE DU COMPTE DE RÉSULTAT
[150–250 mots de commentaire en français courant, d'après l'étape 7]

POINTS À TRAITER
X points à traiter · X justificatifs manquants · X signalements ouverts
[ou « Les comptes sont propres — aucun point ouvert. » si tout est en ordre]

────────────────────────────────────────────────────────────
Établi le [Date] · Réalisé avec Claude
```

Utilise une police sans empattement nette (Helvetica ou équivalent). Aucun logo n'est requis. Conserve des marges ≥ 0,75 pouce sur les quatre côtés pour une impression propre. Le code devise des chiffres clés est celui de l'entreprise (`EUR` ci-dessus est un exemple).

**Générer le PDF :** utilise la bibliothèque Python `xlsxwriter` ou `reportlab` si tu lances un script, ou demande à Claude de rendre le contenu et de l'exporter via la capacité d'impression PDF du connecteur Desktop. L'utilisateur peut aussi imprimer le PDF depuis la feuille « compte de résultat » du xlsx si aucun script n'est disponible.