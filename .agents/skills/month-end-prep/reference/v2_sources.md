# Autres sources

Davantage de systèmes rapprochés. Même séquence de clôture, même paquet.

---

## Grand livre — celui qui est connecté

Les grands livres sont équivalents (`../../../shared/connector-neutrality.md`).
Celui qui est connecté assure la clôture.

| Source | Ce qu'elle fournit |
|---|---|
| MYOB | Compte de résultat, soldes clients et fournisseurs, totaux des ventes. Pas de soldes bancaires : le côté banque provient d'un import de relevé |
| NetSuite | Compte de résultat et registre via les rapports et SuiteQL. Courant dans le haut de gamme du segment |
| QuickBooks | Compte de résultat et liste des transactions ; détaillé dans [quickbooks-reconcile.md](quickbooks-reconcile.md) |
| Xero | Compte de résultat, factures fournisseurs, factures clients, file d'attente bancaire ; détaillé dans [xero-reconcile.md](xero-reconcile.md) |
| Zoho Books | Factures clients, charges, commandes d'achat, encaissements clients, soldes bancaires et de caisse avec un décompte des non-catégorisés par compte. Pas d'objet facture fournisseur, pas de flux de transactions bancaires, pas de endpoints de rapports : le compte de résultat et le relevé bancaire arrivent en export ; détaillé dans [zoho-books-reconcile.md](zoho-books-reconcile.md) |

**Deux grands livres connectés : lis les deux, totalise à partir d'un seul.**
Demande lequel tient la comptabilité à clôturer et nomme-le dans le paquet comme
source de référence. Lis l'autre pour ce qu'il détient en propre (un flux bancaire
qui manque au premier, un registre de factures fournisseurs), mais tous les totaux,
et le rapprochement lui-même, se font sur le grand livre nommé. Ne rapproche
jamais contre les deux, et n'additionne jamais un chiffre entre les deux — cela
double le montant.

---

## Rapprochement des règlements Shopify

Un axe à part entière, et une source fréquente d'écarts inexplicables.

Le piège : une commande, son virement et ses frais arrivent à des dates et dans
des montants différents. Rapprocher la valeur brute des commandes d'un virement
net ne tombera jamais juste, et l'écart n'est pas une erreur.

Extrais trois éléments séparément :

- **Commandes** — brutes, par date
- **Virements** — nets, par date de règlement
- **Frais et remboursements** — l'écart entre les deux

Rapproche ensuite les virements de la banque, et les commandes du produit. Ce sont
deux rapprochements différents et les confondre produit chaque mois un écart
fantôme.

Si la lecture des virements échoue (les scopes du connecteur excluent Shopify
Payments), l'axe commandes-produit fonctionne quand même ; l'axe virements-banque
utilise le rapport de virements que le dirigeant exporte depuis Shopify, ou est
déclaré non rapproché pour ce mois. Dis-le.

```
Shopify : 38 400 € de commandes, 36 910 € versés, 1 490 € de frais et remboursements.
Les virements se rapprochent de la banque. Les frais sont imputés aux frais de commission.
```

---

## Ramp et Expensify

Dépenses par carte et détail des notes de frais. Ces deux-là referment l'écart
entre ce qui a réellement été dépensé et ce qui a été imputé.

Extrais les transactions en attente et les notes de frais non soumises, et signale
comme point ouvert dans le paquet de clôture tout ce qui n'est pas imputé, au
lieu de le laisser disparaître :

```
Points ouverts :
  4 180 € de dépenses carte Ramp, 23 transactions, pas encore imputées
  610 € de rapports Expensify soumis mais non approuvés
```

Un dirigeant qui clôt le mois sans les voir se retrouve avec un chiffre faux.

Deux points à garder en tête pendant l'extraction :

- **Expensify est en lecture seule.** Il restitue les notes de frais, les rapports, les justificatifs et les états d'approbation ; il ne modifie rien. Le filtre de présence de justificatif est ce qui fait ressortir le déficit de pièces justificatives — « 2 140 € sur 17 notes de frais sans justificatif joint » est une ligne de paquet de clôture qu'un comptable utilisera réellement.
- **Ramp peut écrire, et la clôture n'est pas le lieu où il écrit.** Approuver une facture fournisseur ou la marquer comme prête à synchroniser relève de `ap-processor`, derrière sa propre porte de paiement. Ici, Ramp est en lecture seule : dépenses par carte, statut des factures fournisseurs et soldes de comptes. Les remboursements chevauchent Expensify — ne les compte qu'une seule fois.

---

## Paie — celui qui est connecté

PayFit et QuickBooks Payroll sont équivalents. L'étape 5a lit les totaux du mois
depuis celui qui est connecté et les confronte à la charge de paie du grand livre.

**PayFit.** Deux lectures :

| Lecture | Paramètres | Champs utilisés |
|---|---|---|
| `list_payrolls` | `include=totals` ; filtrer sur `check_date` dans le mois (la liste peut aussi porter `pay_period.start_date` / `end_date`) | `totals.gross_pay`, `totals.employer_taxes`, `totals.employee_taxes`, `totals.net_pay`, `check_date` |
| `list_contractor_payments` | `start_date`, `end_date` = premier et dernier jour du mois ; `group_by_date=true` | `total.wages`, `total.reimbursements` |

Ne conserve que les paies effectivement traitées ; une paie non traitée dans la
liste est un plan, pas un paiement, et relève de `payroll-prep`. Les paiements aux
prestataires couvrent uniquement les prestataires français — précise-le en note de
bas de page quand la ligne n'est pas nulle, et précise son absence quand
l'entreprise paie des prestataires internationaux.

**QuickBooks Payroll.** `qbo_payroll_get_company_last_payroll_run` renvoie la
dernière paie avec ses totaux ; les paies antérieures du mois figurent dans
l'export de synthèse de la paie. Confirme les noms de champs avant la première
clôture.

**Le contrôle croisé.** Net à payer + charges patronales + salaires des
prestataires, comparés aux lignes de charge de paie du grand livre pour le mois :

```
Paie (PayFit) : 2 exécutions, 18 420 € brut, 1 660 € de charges patronales,
14 210 € net. Prestataires : 2 400 €.
Charge de paie au grand livre : 18 270 €. Écart 150 € — l'exécution du 28 mars a été comptabilisée en avril.
```

**Ce qui n'entre jamais dans le paquet :** noms des salariés, taux horaires,
heures travaillées, retenues, adresses personnelles, ou tout montant individuel. Le
connecteur les renvoie ; la clôture n'en a pas besoin et ne les reproduit pas.

---

## Ce qui ne change pas

- La séquence de rapprochement, la synthèse du compte de résultat et le format du paquet de clôture
- La détection des doublons et le traitement des transactions ventilées
- Le chemin CSV et import de relevé, qui produit toujours une clôture complète
- Ne jamais inventer un chiffre. Une source indisponible est nommée comme indisponible, et le paquet le dit

---

## Nommer les sources dans le paquet

Le paquet de clôture est transmis aux comptables et aux banques. Il doit dire ce
sur quoi il a été construit et ce qui n'était pas disponible :

```
Rapproché : Xero (grand livre : factures fournisseurs, factures clients et
transactions bancaires), Shopify (règlements), PayPal, Ramp (cartes).
Non disponible : Stripe — authentification expirée le 24 juil. L'activité
Stripe n'est pas incluse dans cette clôture.
```

Nomme le grand livre et, lorsque son registre a été assemblé à partir de
morceaux, indique lesquels.

La deuxième ligne protège le dirigeant. Un paquet de clôture qui omet
silencieusement un prestataire est pire qu'un paquet qui dit qu'il l'a omis.