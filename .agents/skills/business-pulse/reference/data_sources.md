# Sources de données

Correspondance exacte entre chaque section du pouls et l'outil MCP qui la produit.
**Déclenche tous les appels dans un seul lot parallèle** — pas d'extraction en série.

## Trésorerie et finance (la comptabilité)

Quel que soit le logiciel comptable connecté, il alimente cette section — MYOB,
NetSuite, QuickBooks, Xero ou Zoho Books, tous équivalents
(`../../../shared/connector-neutrality.md`). Le tableau QuickBooks vient en premier
seulement parce qu'il est le plus long ; les tableaux Xero, NetSuite, MYOB et Zoho
Books ci-dessous cartographient les mêmes indicateurs. Les montants portent le code
devise de l'entreprise (`../../../shared/currency-and-locale.md`) ; les seuils sont
dans cette devise.

### QuickBooks

| Indicateur | Outil | Remarques |
|---|---|---|
| Trésorerie / solde bancaire | `cash_flow_quickbooks_account` | Solde actuel ; afficher l'écart vs. semaine précédente si disponible |
| CA du mois | `profit_loss_quickbooks_account` | Mois courant vs. mois précédent. Lire les produits et les charges depuis les lignes du rapport ou `monthlyBreakdown` ; les `totalExpenses`, `grossProfit` et `grossProfitMargin` de premier niveau de la réponse renvoient 0 / 100 % face à des lignes réelles (un défaut de la forme de la réponse) : ne les lis jamais |
| Créances clients ouvertes | Liste des factures QuickBooks | Filtrer sur ouvertes / non payées |
| Balance âgée clients | Liste des factures QuickBooks | Regrouper par jours de retard : 0–30, 31–60, 61+ |
| Factures échues | Liste des factures QuickBooks | Filtrer sur due_date > 30 jours de retard ; nommer client + montant + jours de retard |

**Traitement de l'état de la comptabilité** : si la lecture de trésorerie renvoie une
erreur, une réponse vide ou un état « non connecté », marque toute la section
Trésorerie « non disponible — comptabilité indisponible » (en précisant laquelle) et
continue. Ne réessaie pas.

### Xero

| Indicateur | Outil | Remarques |
|---|---|---|
| Trésorerie / solde bancaire | `get_cash_position` | Même rôle que la lecture de trésorerie QuickBooks |
| CA du mois, tendance du résultat | `get_profit_and_loss` | Mois courant vs. précédent |
| Créances, balance âgée, échus | `get_aged_receivables` | Nommer client + montant + jours de retard. (`get_contacts_and_receivables` est déprécié dans le serveur Xero ; ne l'appelle pas) |

### NetSuite

| Indicateur | Outil | Remarques |
|---|---|---|
| Trésorerie, créances, résultat | `ns_runReport` / `ns_runCustomSuiteQL` | Mêmes indicateurs, même section |

### MYOB

| Indicateur | Outil | Remarques |
|---|---|---|
| CA du mois, tendance du résultat | `myob_get_profit_loss` | Résoudre d'abord l'exercice comptable avec `myob_get_financial_year_dates` |
| Créances, échus | `myob_get_outstanding_customer_balances` | Aucun solde de trésorerie n'existe dans MYOB ; laisse la ligne de trésorerie « non disponible via MYOB » |

### Zoho Books

Tous les appels prennent `organization_id` depuis `list_organizations`.

| Indicateur | Outil | Remarques |
|---|---|---|
| Trésorerie / solde bancaire | `list_bank_accounts` avec `filter_by=Status.Active` | Sommer `current_balance` sur les comptes bancaires et de caisse (`bcy_balance` est le même chiffre dans la devise de base). Aucun point d'accès d'historique : l'écart semaine sur semaine doit donc venir du chiffre stocké lors du pouls précédent, ou être omis |
| CA du mois | `list_invoices` avec `date_start`/`date_end` sur le mois et `response_option=3` | Renvoie le nombre et le `total` sommé ; chiffre d'affaires facturé, pas un compte de résultat — dis-le. Zoho Books n'expose aucun point d'accès de compte de résultat |
| Créances clients ouvertes | `list_invoices` avec `status=unpaid` et `response_option=3` | `balance` sommé |
| Balance âgée clients, factures échues | `list_invoices` avec `status=overdue`, triées par `due_date` | Chacune porte `due_days` (valeur renvoyée : « Overdue by 323 days »), `customer_name`, `balance`, `email` ; construis les tranches toi-même |

Zoho Desk est un connecteur distinct et un ID d'organisation distinct ; il alimente la
section support ci-dessous, pas celle-ci.

## Revenus et ventes (PayPal / Square / Stripe)

| Indicateur | Outil | Remarques |
|---|---|---|
| Total des règlements sur 7 jours | Transactions PayPal | Sommer les règlements aboutis sur la fenêtre |
| Tendance des ventes | Transactions PayPal | Ces 7 jours vs. les 7 précédents ; calculer l'écart |
| Transactions échouées / en attente | Transactions PayPal | Signaler toute valeur > 200 (devise de l'entreprise ; `thresholds.md`) |
| Règlements Square | Square (si connecté) | Comme PayPal — somme + tendance |
| Revenu Stripe | Stripe `list_invoices` (si connecté) | Factures payées sur la fenêtre |
| Paiements Stripe échoués | Lecture API Stripe — charges / payment intents (si connecté) | Charges échouées sur la fenêtre ; signaler toute valeur > 200 (devise de l'entreprise) |
| Litiges Stripe | Lecture API Stripe — disputes (si connecté) | Tout litige ouvert sur la fenêtre part dans la liste de surveillance, nommé |

Utilise les connecteurs de paiement disponibles. Si PayPal et Square sont tous deux
connectés, rapporte le combiné et le détail par source.

## Entonnoir (HubSpot)

| Indicateur | Outil | Remarques |
|---|---|---|
| Entonnoir par étape | `search_crm_objects` type=deals (`get_crm_objects` exige des ID explicites ; voir `../../../shared/connector-call-shapes.md`) | Regrouper par étape d'affaire ; sommer le montant |
| Affaires conclues cette semaine | `search_crm_objects` | Filtrer sur closedate dans la fenêtre, étape = closed-won |
| Affaires refroidies | `search_crm_objects` | Filtrer `notes_last_updated` > il y a 7 jours, étape ouverte. C'est le « Last Activity Date » de HubSpot sur les affaires — il n'existe aucune propriété `hs_last_activity_date` ou `hs_lastactivitydate` |
| Nouveaux leads cette semaine | `search_crm_objects` | Filtrer sur createdate dans la fenêtre |
| Affaires bloquées / décalées | `search_crm_objects` | Affaires ouvertes dont closedate < aujourd'hui |

## Engagements (Google Calendar)

| Indicateur | Outil | Remarques |
|---|---|---|
| Points clés de la semaine | `list_events` | Filtrer sur la semaine en cours ; faire remonter les réunions clients, les échéances, les réservations importantes |
| 7 jours à venir | `list_events` | Vue prospective ; mettre en évidence tout ce qui implique une partie externe |

## Liste de surveillance (Gmail ou Microsoft 365)

| Indicateur | Outil | Remarques |
|---|---|---|
| Fils urgents | `search_threads` | Requête : `is:important OR is:starred` sur les 7 derniers jours |
| Escalades clients | `search_threads` | Requête : termes comme « escalation », « complaint », « cancel », « refund », « urgent » sur les 7 derniers jours |
| Demandes à délai court | `search_threads` | Requête : `is:unread` + mots-clés comme « deadline », « ASAP », « today » |

**Repli Gmail** : si l'appel Gmail échoue (authentification instable), saute
silencieusement la liste de surveillance et ajoute « Gmail indisponible » à l'annexe.
Ne fais pas apparaître l'erreur dans le corps du pouls.

## Signaux internes (Slack / Teams)

| Indicateur | Outil | Remarques |
|---|---|---|
| Fils urgents | Recherche Slack (si connecté) | Fils avec @mentions ou signaux d'urgence dans les canaux pertinents pour le dirigeant |
| Actions à mener | Recherche Slack | Messages adressés au dirigeant ou marqués pour suivi |

Toutes les sections ci-dessous suivent la même règle : ne les inclus que si le
connecteur est disponible ; sinon, supprime la section entièrement.

## Commerce (Shopify, si connecté)

| Indicateur | Outil | Remarques |
|---|---|---|
| Commandes, chiffre d'affaires, tendance des ventes | `list-orders`, `run-analytics-query` | Ces 7 jours vs. les 7 précédents |
| Problèmes d'expédition | `list-orders` filtré sur non expédié au-delà de la promesse | Nommer les commandes dans la liste de surveillance |

## Expédition (Square, si connecté)

| Indicateur | Outil | Remarques |
|---|---|---|
| Problèmes d'expédition | API commandes Square via `make_api_request` | Même traitement en liste de surveillance que Shopify |

## Paie (si un connecteur de paie est connecté)

| Indicateur | Outil | Remarques |
|---|---|---|
| Prochaine paie | `list_payrolls` / `list_pay_periods` | Date et montant attendu — le plus gros engagement de trésorerie de la semaine |

## Publicité (TikTok Ads, si connecté)

| Indicateur | Outil | Remarques |
|---|---|---|
| Dépense publicitaire, résultats, coût par résultat | Reporting TikTok (`report_integrated_get`) | 7 derniers jours vs. 7 précédents ; se place à côté de la tendance des ventes |

## Dépenses par carte (Ramp / Expensify, si connecté)

| Indicateur | Outil | Remarques |
|---|---|---|
| Dépenses par carte de la semaine | Ramp `ramp_get_transactions` | Sommer sur la fenêtre ; signaler toute transaction unique > 500 (devise de l'entreprise) |
| Solde du compte | Ramp `ramp_get_ramp_business_account_balance` | Lecture seule |
| Dépenses par carte + justificatifs manquants | Expensify `Search` | Lecture seule ; compter les frais sans justificatif |

## Signatures (DocuSign, si connecté)

| Indicateur | Outil | Remarques |
|---|---|---|
| Enveloppes non signées | `getEnvelopes` filtré sur le statut envoyé | Signaler toute enveloppe non signée depuis plus de 3 jours, nommée |

## Signaux internes (RingEx Chat, si connecté)

| Indicateur | Outil | Remarques |
|---|---|---|
| Messages urgents sur le chat d'équipe | `read_team_chat` | Même rôle que Slack : mots-clés d'escalade, fils qui demandent le dirigeant. Chat uniquement — aucune donnée d'appel n'existe ici |

## Support client (Zoho Desk, si connecté)

| Indicateur | Outil | Remarques |
|---|---|---|
| Tickets ouverts, escalades | `getTickets` (`status`, `priority`, `sortBy=recentThread`) / `getTicketsMetrics` | Compter les ouverts ; signaler nommément tout ticket non résolu depuis plus de 48h et toute priorité High. `getTickets` refuse un paramètre `include` — demande les champs supplémentaires avec `fields` |

## Balayage des risques

Lance ces vérifications en parallèle des extractions d'indicateurs — n'attends pas la
fin des indicateurs.

| Risque | Source | Condition de déclenchement |
|---|---|---|
| Créances clients échues | Factures de la comptabilité / créances âgées | due_date > 30 jours de retard, non payée |
| Affaires bloquées | HubSpot | Affair ouverte, aucune activité depuis 7 jours ou plus |
| Affaires décalées | HubSpot | Affair ouverte, closedate dans le passé |
| Fils de mail urgents | Gmail ou Microsoft 365 | `is:important` ou mots-clés d'escalade |
| Paiements échoués | PayPal / Square / Stripe | Échec ou attente > 200 (devise de l'entreprise) |
| Nouveau litige | Stripe / PayPal | Tout litige ouvert sur la fenêtre — toujours un élément de la liste de surveillance |
| Enveloppe non signée périmée | DocuSign | Enveloppe envoyée non signée depuis plus de 3 jours |
| Justificatifs manquants qui s'accumulent | Expensify | 5 frais ou plus sans justificatif sur la fenêtre |

## Parallélisation

Tout ce qui précède doit partir dans un seul lot d'appels. Un pouls complet représente
généralement 8 à 15 appels parallèles. Si l'un échoue, les autres continuent normalement
et la source en échec apparaît dans « Sources indisponibles » en bas du pouls.