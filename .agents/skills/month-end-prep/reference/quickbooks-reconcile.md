# QuickBooks — référence de rapprochement

## Rapports à extraire

### Compte de résultat

Utilise le rapport **Profit and Loss** via le connecteur QuickBooks :
- Période : du premier au dernier jour du mois cible
- Méthode comptable : **engagements** sauf si l'utilisateur t'a indiqué fonctionner en caisse
- Inclure tous les comptes

Champs clés utilisés en aval :
| Champ | Remarques |
|---|---|
| `TotalRevenue` | Chiffre d'affaires |
| `GrossProfit` | Chiffre d'affaires moins coût des ventes |
| `GrossProfitMargin` | À calculer par GrossProfit / TotalRevenue |
| `NetIncome` | Résultat net |
| `TotalExpenses` | Sous-total des charges opérationnelles |

### Registre des transactions

Extrais le rapport **Transaction List by Date** ou son équivalent pour le mois
cible. C'est le détail ligne à ligne utilisé pour le signalement des transactions
non catégorisées et la détection des doublons.

Champs clés :
| Champ | Remarques |
|---|---|
| `TxnDate` | Date de la transaction (pas la date de comptabilisation) |
| `TxnType` | Facture client, paiement, charge, dépôt, etc. |
| `Amount` | Positif = produit, négatif = charge dans la plupart des exports QB |
| `AccountRef.name` | La catégorie de compte du plan comptable |
| `EntityRef.name` | Nom du fournisseur ou du client |
| `Memo` | Description libre |
| `AttachmentCount` | > 0 signifie qu'un justificatif est joint dans QB |

## Identifier les transactions non catégorisées

Signale une transaction comme non catégorisée si `AccountRef.name` vaut l'un des
suivants :
- "Uncategorized Income"
- "Uncategorized Expense"
- "Uncategorized Asset"
- vide / null
- "Ask My Accountant" (catégorie intégrée de QB, le « je ne sais pas »)

## Pagination

L'API QB renvoie au maximum 1 000 lignes par requête. Pour les entreprises à fort
volume de transactions, pagine avec les paramètres `startPosition` et
`maxResults`. Demande par lots de 500 lignes pour rester nettement sous la limite.

## Problèmes de données fréquents

**Transactions ventilées** — un achat unique réparti sur plusieurs catégories
apparaît comme plusieurs lignes avec la même date et le même fournisseur mais des
montants différents. Ce ne sont PAS des doublons. Avant de signaler des doublons,
regroupe les lignes par `TxnID` : les lignes qui partagent un identifiant sont
les fractions d'une seule transaction.

**Flux bancaires et saisies manuelles** — les transactions issues du flux bancaire
ont `PrivateNote` réglé sur "bank feed" ou équivalent. Les saisies manuelles
n'ont souvent pas de mémo. Aucun des deux n'est un signal de problème à lui seul,
mais cela aide à expliquer pourquoi une transaction peut manquer de justificatif.

**Transactions PayPal déjà présentes dans QB** — si l'utilisateur a activé la
synchronisation automatique PayPal-QB, les transactions PayPal apparaîtront déjà
dans le registre. Ne les compte pas deux fois lors du rapprochement (étape 3).
Vérifie que les lignes de dépôt QB mentionnent "PayPal" dans le compte ou le mémo
avant de rapprocher.

**Transactions d'acompte / de dépôt** — un acompte client n'est pas un produit tant
que la prestation n'est pas livrée. Si l'utilisateur tient une comptabilité de
caisse, cette distinction importe moins, mais signale toute transaction de type
Deposit d'un montant important sans facture correspondante, pour sa prise en
connaissance.