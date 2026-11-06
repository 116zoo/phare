# Zoho Books — référence de rapprochement

Document frère de [quickbooks-reconcile.md](quickbooks-reconcile.md) et de
[xero-reconcile.md](xero-reconcile.md). Même séquence de clôture, même paquet ;
les lectures et le signal « à traiter » diffèrent parce que la surface du
connecteur diffère.

Chaque appel prend `organization_id` ; récupère-le une seule fois via
`list_organizations` (ou `get_organization`, qui renvoie aussi les champs de
locale) et réutilise-le.

---

## Ce que le connecteur contient, et ce qu'il ne contient pas

| Contenu | Contenu absent |
|---|---|
| Factures clients, devis, commandes client, encaissements clients | Factures fournisseurs, paiements fournisseurs |
| Charges, commandes d'achat | Transactions bancaires ou flux bancaire |
| Comptes bancaires et de caisse avec soldes et décompte des non-catégorisés | Écritures de journal |
| Contacts (clients et fournisseurs, avec un indicateur de déclaration annuelle de revenus) | Tous rapports : compte de résultat, flux de trésorerie, balance âgée |
| Plan comptable avec soldes (`list_chart_of_accounts` avec `showbalance`) | |
| Fiche organisation : pays, devise, début d'exercice | |

Indique-le dans le paquet : un comptable doit savoir quelles parties viennent du
connecteur et lesquelles d'un export.

---

## Rapports à extraire

### Compte de résultat — depuis un export

Il n'y a pas d'endpoint de compte de résultat. Demande l'export **Profit and Loss**
(Reports → Profit and Loss → Export, mois cible) avant que l'étape 2 ne s'exécute,
même quand le connecteur est connecté. Explique pourquoi en une ligne : *« Zoho
Books n'expose pas les rapports via le connecteur, j'ai donc besoin de l'export du
compte de résultat ; tout le reste, je peux le lire directement. »*

Un substitut quand le dirigeant ne peut pas exporter : chiffre d'affaires facturé
via `list_invoices` (`date_start`/`date_end`, `response_option=3` pour le `total`
agrégé) moins les charges enregistrées via `list_expenses` sur la même période.
Libelle-le partout où il apparaît : *« facturé moins enregistré, pas un compte de
résultat »*.

### Le registre — trois listes de documents

| Élément | Outil | Ce qu'il contient |
|---|---|---|
| Factures clients | `list_invoices` avec `date_start` / `date_end`, `per_page` jusqu'à 200 | Factures clients, tous statuts ; filtre `status` pour `paid`, `unpaid`, `overdue`, `draft`, `void` |
| Charges | `list_expenses` avec `date_start` / `date_end` | Dépenses imputées à un `account_name`, avec `vendor_name` et `status` |
| Commandes d'achat | `list_purchase_orders` pour le mois | Engagements ouverts envers les fournisseurs |

Exclut les documents `draft` et `void` de la clôture. Pagine jusqu'à ce que
`page_context.has_more_page` soit faux ; une seule page n'est pas le mois.

Champs clés :

| Champ | Remarques |
|---|---|
| `date`, `due_date` | Dates des documents |
| `status`, `current_sub_status` | `overdue` porte `due_days` en texte (« Overdue by 323 days ») |
| `customer_name` / `vendor_name` | Contrepartie |
| `total`, `balance` | Total du document et montant restant dû |
| `has_attachment` | Justificatif ou document joint |
| `reminders_sent`, `last_reminder_sent_date` | Historique des relances |
| `currency_code`, `exchange_rate` | Par document ; les champs `bcy_*` sont en devise de base |

---

## Le signal « à traiter » : transactions non catégorisées par compte

`list_bank_accounts` (`filter_by=Status.Active`) renvoie chaque compte bancaire et
de caisse avec `current_balance`, `bank_balance` et
`uncategorized_transactions`. Ce décompte est le signal d'attention — les lignes
du flux bancaire que le dirigeant n'a pas encore imputées.

L'étape 2 pour un grand livre Zoho Books rapporte :

```
Transactions bancaires non catégorisées :   9 sur 2 comptes (Exploitation 7, Épargne 2)
```

Les lignes elles-mêmes ne peuvent pas être listées via le connecteur. Communique au
dirigeant le décompte et le compte, et précise qu'elles se catégorisent dans Zoho
Books (Banking → compte → Uncategorized) avant que la clôture n'avance. La ligne
« À traiter » du bloc de synthèse de l'étape 6 porte ce décompte.

`Undeposited Funds` est un compte de caisse dans cette liste, pas une banque. Un
solde important à cet endroit en fin de mois signifie des encaissements clients
reçus et pas encore virés en banque — nomme-le comme point ouvert, pas comme
encours disponible en caisse.

---

## Détection des doublons : analyser les documents

Même règle que chez Xero — un document saisi deux fois, ce sont deux documents.
L'étape 4 analyse séparément les factures clients et les charges :

- Même `customer_name` (factures clients) ou `vendor_name` (charges)
- Même `total` (à 0,01 près dans la devise de base)
- Datées à moins de 5 jours calendaires l'une de l'autre
- Toutes deux impayées, ou l'une payée dans la fenêtre

Les charges récurrentes (`recurring_expense_id` renseigné) et les factures créées à
partir d'une facture récurrente (`recurring_invoice_id` renseigné) sont le faux
positif habituel ; affiche l'identifiant pour que le dirigeant comprenne pourquoi.

---

## Justificatifs : vérifie le document, puis le dossier

`has_attachment` sur les factures clients et les charges indique si un fichier est
joint. Au-delà du seuil d'attention, lis-le en premier :

- `true` → « justificatif au dossier (Zoho Books) »
- `false` → repli sur l'analyse du dossier, puis sur la question au dirigeant

---

## Règlements des prestataires : pas de flux bancaire, donc rapprochement CSV

Le connecteur n'a pas de liste de transactions bancaires, un virement ne peut donc
pas être trouvé comme ligne de grand livre. L'étape 3 pour un grand livre Zoho
Books passe directement au rapprochement CSV décrit dans
[paypal-settlements.md](paypal-settlements.md) : le rapport de règlement du
prestataire confronté au **relevé bancaire** que le dirigeant importe. Demande le
relevé en même temps que l'export du compte de résultat.

Deux choses que le connecteur fournit quand même pour cet axe :

- `list_customer_payments` pour le mois — paiements imputés à des factures, avec
  `payment_mode` et `reference_number`. Un virement de prestataire enregistré comme
  encaissement client apparaît ici.
- Les factures clients portent `payment_options.payment_gateways` — quelles
  passerelles de paiement (Stripe, PayPal) la facture a été configurée pour
  accepter. Cela indique quel règlement de prestataire en attendre.

---

## Pays, devise et exercice comptable

`get_organization` renvoie `country_code`, `currency_code` et
`fiscal_year_start_month` sous forme d'index de mois à base zéro (`0` = janvier,
donc la date de clôture d'exercice est le dernier jour du mois précédant l'index).
Lis-les au début de la clôture si le contexte de l'entreprise ne les porte pas, et
sers-t'en pour tous les montants, pour les seuils, et pour savoir si l'étape 9
propose `/fiscalite`. La règle est `../../../shared/currency-and-locale.md`.

---

## Dégradation gracieuse — Zoho Books non connecté

Ne prends ce chemin que si aucune entrée Zoho Books ne fonctionne. Une entrée
`small-business:zoho-books` non autorisée à côté du Zoho Books actif du dirigeant
est connectée — appelle plutôt l'entrée du dirigeant
(`../../../shared/connector-neutrality.md`, « One connector, two registrations »).

Demande **trois exports** : le rapport **Profit and Loss**, le rapport **Account
Transactions** (tous les comptes, le mois), et le **relevé bancaire**. Le décompte
des non-catégorisés provient de l'écran Banking ; demande-le comme quatrième
élément ou dis dans le paquet que ce n'était pas disponible.

---

## Pagination et limites

`per_page` monte jusqu'à 200 sur les factures clients ; par défaut c'est 10.
Fixe-la, et pagine sur `has_more_page`. Les totaux s'obtiennent moins
cherinement avec `response_option=3` (nombre et totaux seulement) qu'en listant
chaque document.