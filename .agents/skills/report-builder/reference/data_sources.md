# Sources de données

Correspondance entre chaque indicateur et son connecteur. Tout extraire en un seul
lot parallèle ; jamais en série.

---

## La comptabilité — l'épine dorsale de la plupart des rapports

La plupart des rapports de PME se résolvent dans la comptabilité générale. Le
système connecté — MYOB, NetSuite, QuickBooks, Xero ou Zoho Books — fait foi ; tous
sont équivalents (`../../../shared/connector-neutrality.md`). Les familles
d'indicateurs ci-dessous sont écrites avec les noms de rapports QuickBooks ; les
sections NetSuite, Xero, MYOB et Zoho Books indiquent d'où vient chaque famille chez
eux. Les montants portent le code devise de l'entreprise
(`../../../shared/currency-and-locale.md`).

### QuickBooks

| Famille d'indicateurs | Origine |
|---|---|
| Chiffre d'affaires, charges, résultat net | Compte de résultat — depuis les lignes ou `monthlyBreakdown`, jamais le `totalExpenses` / `grossProfit` / `grossProfitMargin` du résumé, qui renvoient 0 / 100 % face à des lignes réelles (Piège 2) |
| Chiffre d'affaires par établissement ou par classe | Compte de résultat avec ventilation par classe ou par établissement |
| Balance âgée clients | Synthèse de la balance âgée clients, toujours contrainte — voir ci-dessous |
| Balance âgée fournisseurs | Balance âgée fournisseurs **détaillée** (`qbo_accounting_get_ap_aging_detail`), contrainte par `vendor_name` ou `due_before` ; construis les tranches toi-même. Jamais la synthèse : elle net les avoirs fournisseurs dans les tranches et affiche des totaux d'impayés négatifs (un défaut de cet outil, `../../../shared/quickbooks-report-traps.md`, Piège 6) |
| Position de trésorerie | Bilan |
| Ventes par client | Synthèse des ventes par client, lignes de regroupement filtrées — voir ci-dessous |
| Ventes par produit | Synthèse des ventes par produit |
| Charge de personnel | Lignes « paie » du compte de résultat |

**Repli :** si QuickBooks renvoie un résultat vide, un état de synchronisation en
cours ou une erreur d'authentification, marque les indicateurs concernés « non
disponible — QuickBooks indisponible » et continue avec les autres sources. Ne
réessaie pas en boucle et ne demande pas au dirigeant de reconnecter en plein
rapport.

### Les balances âgées doivent être contraintes, à chaque fois

Un appel de balance âgée sans contrainte échoue sur toute vraie comptabilité. Sur
un jeu de comptes de taille moyenne, la synthèse de la balance âgée clients renvoie
bien plus de cent mille caractères, dépasse la limite de sortie de l'outil, et
revient inexploitable. Ce n'est pas un cas limite ; c'est le résultat normal pour une
entreprise de quelques centaines de clients.

Passe toujours des arguments de restriction. Les trois qui comptent :

- un plafond top-N, pour que seuls les plus gros soldes remontent
- un seuil minimal de jours de retard, qui fait disparaître entièrement la tranche courante
- un seuil minimal en euros, qui fait disparaître la longue traîne de petits soldes

Pour un rapport, « les vingt plus gros soldes avec au moins un jour de retard » est
la forme utile, et elle tient toujours. Si le dirigeant a vraiment besoin de chaque
ligne, extrais le rapport détaillé par client plutôt que de demander le grand livre
entier d'un coup.

La même règle vaut pour la balance âgée fournisseurs, qui vient du rapport détaillé :
restreins-la par fournisseur ou par date d'échéance. C'est le plus petit des deux
rapports, mais il grossit de la même façon.

### Les ventes par client comptent deux fois les clients parents

La synthèse des ventes par client renvoie deux lignes pour tout client qui a des
sous-clients ou des chantiers en dessous : une ligne de synthèse pour le parent, et
une ligne de total distincte pour ce même parent. Elles portent le même montant. La
liste des meilleurs clients du rapport elle-même contient les deux.

Lue naïvement, elle place un client deux fois dans tes classements — une fois sous
son propre nom, une fois comme « Total pour » ce nom — et gonfle tous les chiffres de
concentration que tu en tires.

Supprime les lignes dont le type de métadonnées les marque comme total avant de
classer, de sommer ou de calculer la concentration. Garde la ligne de synthèse du
parent ; c'est la vraie. Une concentration bâtie sur des lignes non filtrées est
fausse à chaque fois, pas parfois.

---

## HubSpot — entonnoir et clients

| Famille d'indicateurs | Origine |
|---|---|
| Nombre d'affaires par étape | Recherche d'affaires CRM |
| Taux de réussite, durée de cycle | Affaires avec dates de clôture et issues |
| Entonnoir pondéré | Valeur de l'affaire × probabilité de l'étape |
| Nouveaux contacts, sources de leads | Contacts avec date de création et propriété source |
| Performance par responsable | Affaires regroupées par responsable |

**Attention :** les valeurs d'affaires CRM sont des prévisions. Quand un rapport
mélange données CRM et données comptables, le chiffre d'affaires vient toujours de
la comptabilité. Dis de quelle source vient chaque chiffre.

---

## Prestataires de paiement

| Source | Ce qu'elle apporte |
|---|---|
| PayPal | Règlements, frais, litiges, détail des transactions |
| Stripe | Règlements, frais, remboursements, revenu d'abonnement |
| Square | Ventes en présentiel, ventilation par établissement, pourboires |

**Risque de double-compte.** Une commande Shopify réglée via Stripe apparaît dans
les deux. Choisis un seul système comme source de revenu par rapport, indique le
choix dans la synthèse, et utilise l'autre uniquement pour les frais et le calendrier
de règlement.

---

## Shopify

Commandes, chiffre d'affaires par référence, performance par variante, statut
d'expédition, remboursements. Meilleure source pour tout ce qui est regroupé par
produit.

Le coût des ventes n'est généralement pas dans Shopify. Les indicateurs de marge ont
besoin de QuickBooks ou d'un fichier de coûts téléversé.

---

## NetSuite

Courant dans le haut du segment. Mêmes familles d'indicateurs que la section
QuickBooks via `ns_runReport` et `ns_runCustomSuiteQL`, plus le coût des ventes par
article et la valorisation des stocks.

---

## Xero

Mêmes familles d'indicateurs que la section QuickBooks, via `get_profit_and_loss`
(chiffre d'affaires, charges, résultat net, par période), `get_aged_receivables`
(balance âgée clients, mêmes règles de contrainte) et `get_bills` (fournisseurs). La
fiche organisation fournit la devise de base et l'exercice comptable : les
références de période se résolvent donc sur la clôture de l'exercice de l'entreprise.

---

## Ramp et Expensify

Dépenses par carte, catégories de frais, justificatifs, remboursements. Utiles pour
les rapports côté charges et pour repérer les dépenses qui ne sont pas encore
passées en comptabilité.

**Ramp** porte aussi les soldes réels des comptes bancaires et de trésorerie avec
leur historique, plus le détail des factures fournisseurs et une analyse des
dépenses en langage naturel. Ses actions d'écriture — approuver ou rejeter une
facture, marquer une facture comme prête à synchroniser — relèvent d'`ap-processor`,
jamais d'un rapport. Ici, on lit seulement.

**Expensify est une recherche en lecture seule.** Notes de frais, frais individuels,
factures, déplacements, totaux par catégorie et statuts d'approbation. La
justification des dépenses est un filtre de premier ordre : « les frais de plus de
75 € sans justificatif joint » est une vraie requête et un rapport vraiment utile.

**Les remboursements apparaissent dans les deux.** Ramp et Expensify se recouvrent
ici. Choisis-en un comme source des remboursements pour chaque rapport, dis lequel,
et utilise l'autre pour le détail qu'il détient seul — la même règle que pour les
prestataires de paiement.

---

## MYOB

La comptabilité des entreprises sous MYOB. **Lecture seule.** Même compte de résultat
et mêmes créances que QuickBooks, avec trois limites dures qu'il vaut mieux énoncer
dans le rapport que découvrir en cours d'exécution.

| Famille d'indicateurs | Origine |
|---|---|
| Chiffre d'affaires, charges, résultat net | Compte de résultat, avec ventilation mensuelle ou trimestrielle et comparaison à l'exercice précédent |
| Balance âgée clients par client | Soldes clients ouverts, avec indicateurs de risque |
| Dettes fournisseurs | Dettes fournisseurs ouvertes |
| Totaux des ventes | Totaux des factures de vente |
| Conditions de paiement | Conditions de paiement standard |

- **Aucun solde bancaire ni de caisse.** MYOB donne les créances et les dettes,
  jamais la trésorerie disponible. Un indicateur de position de trésorerie tiré de
  MYOB est non disponible — dis-le plutôt que de remplacer par les créances.
- **Aucun détail de contact client.** Noms et soldes seulement.
- **Trois exercices comptables.** Le reporting couvre l'exercice courant et les deux
  précédents. Une comparaison sur quatre ans est non disponible ; dis-le plutôt que de
  renvoyer une série courte qui a l'air complète.
- Toute référence de période — « le trimestre dernier », « depuis le début de
  l'exercice » — désigne *l'exercice comptable de l'entreprise* sauf si le dirigeant
  parle de l'année civile. Résous les dates de l'exercice une fois et réutilise-les
  sur tout le run.

---

## Zoho Books

La comptabilité des entreprises sous Zoho. Lectures au niveau des documents, aucun
point d'accès de rapport — les familles d'indicateurs sont assemblées à partir de
listes, et le rapport le dit.

| Famille d'indicateurs | Origine |
|---|---|
| Chiffre d'affaires (facturé) | `list_invoices` sur une plage de dates avec `response_option=3` pour le total sommé ; par client via `customer_id`, par article via `item_id` |
| Charges | `list_expenses` sur une plage de dates, regroupées sur `account_name` ou `vendor_name` |
| Balance âgée clients | `list_invoices` avec `status=overdue`, réparties sur `due_date` ; `list_contacts` avec `filter_by=Invoice.OverDue` pour l'`outstanding_receivable_amount` par client |
| Dettes fournisseurs (engagements ouverts) | `list_purchase_orders` ouvertes, plus `list_expenses` avec `status=unbilled` |
| Position de trésorerie | `list_bank_accounts` — `current_balance` par compte actif |
| Ventes par client / par produit | `list_invoices` regroupées par `customer_name` ou par `item_name` de ligne ; `list_sales_orders` pour les commandes pas encore facturées |
| Charge de personnel | Non disponible — pas de compte de résultat. Prends-la au connecteur de paie (`month-end-prep` étape 5a) ou dans un export |

- **Aucun point d'accès compte de résultat, tableau de flux de trésorerie ou balance
  âgée.** Le « résultat net » est le chiffre d'affaires facturé moins les charges
  enregistrées, étiqueté comme tel ; un vrai compte de résultat vient de l'export
  Reports.
- **Aucun objet facture fournisseur ni paiement fournisseur.** Les dettes fournisseurs
  se limitent aux commandes d'achat et aux dépenses.
- **Aucun flux de transactions bancaires.** Soldes uniquement, avec un compte
  d'`uncategorized_transactions` par compte.
- La fiche organisation (`get_organization`) fournit `country_code`, `currency_code`
  et `fiscal_year_start_month`, donc les références de période se résolvent sur la
  clôture de l'exercice de l'entreprise.

---

## La voie du fichier téléversé

**C'est un mode à part entière, pas un mode dégradé.** Une large part des dirigeants
cumulent les outils sans connecteur propre.

Quand aucun connecteur ne couvre un indicateur :

1. Dis clairement ce qu'il te faut : « Exporte ton rapport de ventes sur la période et
   dépose-le ici. »
2. Accepte CSV ou XLSX. Lis la ligne d'en-tête et mappe les colonnes sur les
   indicateurs de la spec.
3. Si une colonne nécessaire est absente, nomme-la précisément — « il n'y a pas de
   colonne de coût, donc je ne peux pas calculer la marge » — plutôt que de supprimer
   discrètement l'indicateur.
4. Note le mapping des colonnes du fichier dans la spec enregistrée, pour que le
   prochain run puisse le réutiliser.

Un rapport construit à partir d'un fichier est un vrai rapport. Livre le même résumé
dans la conversation et le même classeur.

---

## Règle des extractions parallèles

Chaque appel part en un seul lot. Les rapports touchent couramment quatre ou cinq
systèmes, et des extractions en série transforment un skill de trente secondes en
deux minutes d'attente que les dirigeants ne subiront pas deux fois.

Enregistre les échecs en interne. Les faire remonter dans l'annexe du rapport, jamais
en plein flux.