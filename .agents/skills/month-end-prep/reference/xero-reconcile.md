# Xero — référence de rapprochement

Document frère de [quickbooks-reconcile.md](quickbooks-reconcile.md). Même séquence
de clôture, même paquet ; les lectures et le signal « à traiter » diffèrent parce
que le modèle de données de Xero diffère.

**Les noms d'outils ci-dessous proviennent de la surface publiée du connecteur
Xero. Confirme chacun d'eux sur le serveur connecté avant la première clôture
réelle.**

---

## Rapports à extraire

### Compte de résultat

`get_profit_and_loss` sur le mois cible, du premier au dernier jour. Base
engagements sauf si le dirigeant tient une comptabilité de caisse. Mêmes champs en
aval que le chemin QuickBooks : chiffre d'affaires total, marge brute, résultat
net, total des charges opérationnelles.

### Le registre — ce que « chaque ligne » signifie chez Xero

Xero n'a pas de lecture unique du registre mensuel des transactions. Pour la
clôture, le registre est constitué de trois éléments, extraits séparément :

| Élément | Outil | Ce qu'il contient |
|---|---|---|
| Factures fournisseurs | `get_bills` avec `include_line_items=true` | Factures fournisseurs, payées et impayées |
| Factures clients | `get_invoices` avec `include_line_items=true` | Factures clients, payées et impayées |
| File bancaire | `get_bank_account_transactions` | Lignes du flux bancaire, rapprochées et non rapprochées |

`get_bank_account_transactions` n'est pas à lui seul le registre mensuel ; sa
propre description précise de ne pas le traiter comme tel. Les factures
fournisseurs et clients portent le détail imputé ; la file bancaire porte ce qui a
et ce qui n'a pas été lettré.

**Indique le périmètre dans le paquet.** La ligne « Rapproché » se lit : *« Xero
(grand livre : factures fournisseurs, factures clients et transactions bancaires du
mois). »* Un comptable qui lit le paquet doit savoir que le registre a été assemblé
à partir de documents et de lignes bancaires, et non exporté en un seul rapport.

Champs clés :

| Champ | Remarques |
|---|---|
| `date` | Date du document ou de la ligne bancaire |
| `status` | `AUTHORISED` (approuvée, impayée), `PAID`, `DRAFT`, `VOIDED`. Les brouillons sont exclus de la clôture |
| `contact.name` | Fournisseur ou client |
| `total` | Total du document ; à comparer au montant de la ligne bancaire lors du lettrage |
| `account_code` | Compte comptable de chaque ligne |
| `line_item_cardinality` | Nombre de lignes sur le document. Supérieur à 1 signifie une ventilation |
| `has_attachments` | Présent uniquement quand `include_line_items=true` |
| `is_reconciled` (ligne bancaire) | Indique si la ligne du flux bancaire a été lettrée avec un document |

---

## Le signal « à traiter » : lignes bancaires non rapprochées, pas transactions non catégorisées

Xero exige un code de compte au lettrage d'une ligne bancaire, donc les
catégories QuickBooks (« Uncategorized Expense », « Ask My Accountant ») n'apparaissent
pas. Le signal équivalent est **les lignes bancaires encore non rapprochées en fin
de mois** : de l'argent qui a bougé mais qui n'a été lettré ni avec une facture
fournisseur, ni avec une facture client, ni avec une transaction de dépense ou
d'encaissement.

L'étape 2 pour un grand livre Xero rapporte :

```
Lignes bancaires non rapprochées :   14 lignes, 6 240 € sur 2 comptes
```

et les liste pour que le dirigeant les rapproche dans Xero avant que la clôture
n'avance. La ligne « À traiter » du bloc de synthèse de l'étape 6 porte ce
décompte.

Ne présente pas une ligne non rapprochée comme une erreur. C'est un travail non
encore fait, et le dirigeant peut avoir une raison (un virement pas encore
ventilé, une facture fournisseur pas encore saisie). Nomme-la, compte-la, et
laisse-le décider.

---

## Détection des doublons : analyser les documents, pas les lignes bancaires

Une facture fournisseur saisie deux fois dans Xero reste sous la forme de deux
documents `AUTHORISED` et ne produit **aucune ligne bancaire tant que l'une des
deux n'est pas payée**. Une analyse de doublons côté banque ne peut pas la voir.
Pour un grand livre Xero, l'étape 4 analyse les factures fournisseurs et clients :

Signale une paire comme doublon suspecté lorsque les quatre conditions sont
réunies :

- Même `contact.name`
- Même `total` (à 0,01 près dans la devise de l'entreprise)
- Datées à moins de 5 jours calendaires l'une de l'autre
- Toutes deux impayées (`AUTHORISED`), ou l'une impayée et l'autre payée dans la fenêtre

Présente les paires au dirigeant exactement comme le fait le chemin QuickBooks. Les
factures fournisseurs hebdomadaires récurrentes du même fournisseur sont le faux
positif habituel.

**Les ventilations sont un document unique.** Une facture fournisseur avec
plusieurs lignes est un document unique dont `line_item_cardinality` est supérieur
à 1. La règle QuickBooks « regroupe par `TxnID` avant de comparer » se traduit ici
par « compare les documents, jamais les lignes ». Deux lignes sur une même facture
fournisseur ne sont jamais une paire de doublons.

---

## Justificatifs : vérifie le document d'abord, puis le dossier

Xero stocke les pièces jointes sur la facture fournisseur ou la facture client.
Avant d'analyser un dossier de justificatifs (étape 5), lis `has_attachments` sur
chaque document de charge supérieur au seuil d'attention. Ce champ n'est renvoyé
que si `include_line_items=true` est passé à `get_bills` et `get_invoices` ; sans
ce paramètre le champ est absent et tous les documents semblent sans justificatif.

- `has_attachments = true` → « justificatif au dossier (Xero) »
- `false` → repli sur l'analyse du dossier, puis sur la question au dirigeant

Les paiements effectués directement depuis le flux bancaire sans facture
fournisseur derrière (une transaction de dépense) n'ont aucun document auquel
rattacher une pièce jointe. Traite-les comme une charge QuickBooks sans pièce
jointe.

---

## Règlements des prestataires : le virement est déjà une ligne du grand livre

Les clients Xero reçoivent fréquemment des virements Square, Stripe et PayPal via
un flux bancaire. Le virement est donc déjà dans le grand livre comme ligne
bancaire, et la question de rapprochement est de savoir si cette ligne a été
lettrée, pas si une ligne de grand livre existe.

L'étape 3 pour un grand livre Xero :

1. Parmi les transactions bancaires non rapprochées, repère les lignes dont le
   bénéficiaire ou la référence désigne un prestataire (Square, Stripe, PayPal,
   Shopify Payments).
2. Liste-les par prestataire comme points à traiter : *« Stripe : 4 virements,
   3 180 €, non rapprochés. »*
3. Rapproche les lignes de prestataires déjà rapprochées du rapport de règlement du
   prestataire, net à net comme d'habitude, pour vérifier les frais. Garde le
   chemin CSV de règlement pour un prestataire sans flux bancaire ou quand le
   dirigeant veut faire contrôler les frais.

Un virement de prestataire sans aucune ligne bancaire (flux non configuré, ou
banque manuelle) bascule sur le rapprochement CSV décrit dans
[paypal-settlements.md](paypal-settlements.md).

---

## Pays, devise et exercice comptable

`get_organisation_info` renvoie la devise et le pays de base de l'organisation ;
`get_organisation_financial_year` renvoie la date de clôture d'exercice. Lis-les
une fois au début de la clôture si le contexte de l'entreprise ne les porte pas
déjà, et sers-t'en pour :

- Tous les montants du paquet (`12 400 €`, jamais un symbole seul)
- Les seuils 0,50 / 0,01 / 25, exprimés dans la devise de base
- Le fait que l'étape 9 propose ou non `/fiscalite` (France uniquement)

La règle est `../../../shared/currency-and-locale.md`.

---

## Dégradation gracieuse — Xero non connecté ou non autorisé

Ne prends ce chemin que si aucune entrée Xero ne fonctionne. Une entrée
`small-business:xero` non autorisée à côté du Xero actif du dirigeant est
connectée — appelle plutôt l'entrée du dirigeant
(`../../../shared/connector-neutrality.md`, « One connector, two registrations »).

Demande **deux exports** à Xero : le rapport **Profit and Loss** du mois, et le
rapport **Account Transactions** avec tous les comptes sélectionnés sur la même
période. L'un ne contient pas l'autre. Le rapport Account Transactions est le
registre ; les lignes non rapprochées n'y figurent pas, demande donc au dirigeant
le décompte des non-rapprochées visible sur l'écran de rapprochement bancaire
comme troisième élément, ou dis dans le paquet que ce n'était pas disponible.

---

## Pagination et limites

Chaque lecture renvoie une page. Demande le mois en un appel par compte bancaire
et un par type de document, et pagine jusqu'à ce que la réponse indique qu'il n'y a
plus rien. Ne t'arrête pas à la première page et ne considère pas le registre
comme complet.