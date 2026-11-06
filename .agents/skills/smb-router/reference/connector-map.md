# Carte des connecteurs

Connecteurs obligatoires et facultatifs par skill, plus le repli sans
connecteur de chaque skill. Le routeur s'en sert pour éviter de recommander
quelque chose qui échouera à moitié, et pour proposer la voie de repli à la
place.

**Les listes ci-dessous sont les chemins testés, pas une muraille.** Quand le
dirigeant veut qu'un skill utilise un outil qui n'est pas listé pour lui, route
d'abord vers `build-connector` — il vérifie l'annuaire des connecteurs, puis se
connecte via Zapier. Une fois la connexion en place, l'outil rejoint ce skill
comme tout autre connecteur facultatif, sous les mêmes gardes de validation.

Chaque skill fonctionne sans aucun connecteur. « Obligatoire » ci-dessous
signale obligatoire pour le chemin *connecté* — la colonne de repli est
toujours disponible.

**Formes d'appel.** Les formes de paramètres que les connecteurs exigent et que
les descriptions d'outils ne rendent pas évidentes sont regroupées dans
[`../../../shared/connector-call-shapes.md`](../../../shared/connector-call-shapes.md) ;
un skill lit la ligne d'un connecteur avant son premier appel.

**Un produit, éventuellement deux entrées.** Le connecteur du dirigeant et
l'enregistrement par manifeste du plugin (`small-business:<name>`) comptent
comme un seul ; une garde s'ouvre dès que l'un des deux est autorisé
(`../../../shared/connector-neutrality.md`, « Un connecteur, deux
enregistrements »).

**Les gardes sont des catégories, pas des fournisseurs.** Là où une ligne dit
« un grand livre », n'importe lequel de MYOB, NetSuite, QuickBooks, Xero ou Zoho
Books ouvre la garde ; « un connecteur de paiement » vaut n'importe lequel de
PayPal, Square ou Stripe ; « un CRM » vaut n'importe lequel de HubSpot,
Monday.com, Salesforce ou Zoho CRM (Salesforce est ajouté par le dirigeant comme
connecteur personnalisé, absent du manifeste) ; « une boutique en ligne » vaut
Shopify ou Square (les connecteurs qui portent commandes et stock) ; « Mail »
vaut Gmail ou Microsoft 365 ; « un magasin de fichiers » vaut Google Drive ou
Microsoft 365 (Microsoft 365 est un connecteur unique couvrant ces deux
catégories, ajouté par le dirigeant comme connecteur personnalisé, absent du
manifeste) ; et aucun ne domine un autre
(`../../../shared/connector-neutrality.md`). Les listes de fournisseurs sont
alphabétiques. Les limites de capacité qui comptent pour une garde sont dans
les notes sous chaque tableau, formulées comme ce que le connecteur détient, pas
comme un classement.

---

## Piloter l'entreprise

| Skill | Obligatoire | Facultatif | Repli sans connecteur |
|---|---|---|---|
| `report-builder` | une source de données quelconque | Expensify, HubSpot, MYOB, NetSuite, PayPal, QuickBooks, Ramp, Shopify, Square, Stripe, Xero, Zoho Books | dépôt CSV/XLSX — pleinement fonctionnel |
| `business-pulse` | aucun | Calendar, DocuSign, Expensify, Gmail ou M365, Paie US, HubSpot, MYOB, NetSuite, PayPal, QuickBooks, Ramp, RingEx Chat, Shopify, Slack, Stripe, TikTok Ads, Xero, Zoho Books, Zoho Desk | se construit à partir de ce qui existe, ou de données collées |
| `cash-flow-snapshot` | un grand livre (MYOB, NetSuite, QuickBooks, Xero ou Zoho Books) ou un connecteur de paiement (PayPal, Square ou Stripe) | Paie US, Ramp, Shopify | dépôt CSV |
| `month-end-prep` | un grand livre (MYOB, NetSuite, QuickBooks, Xero ou Zoho Books) | Expensify, Paie US, PayPal, Ramp, Shopify, Square, Stripe | dépôts de relevés / CSV |
| `invoice-chase` | un grand livre (MYOB, NetSuite, QuickBooks, Xero ou Zoho Books) | Airwallex, Gmail, Microsoft 365, PayPal, Shopify, Square, Stripe | CSV des créances en entrée, relances rédigées en sortie |
| `ap-processor` | un grand livre (MYOB, NetSuite, QuickBooks, Xero ou Zoho Books) + Mail (Gmail ou M365) | Expensify, Ramp | dépôt de facture en PDF/photo, écritures exportées |
| `payroll-prep` | Paie US ou QuickBooks Payroll | un grand livre avec un chemin d'écriture, pour l'écriture comptable | dépôt de feuille de temps → feuille de paie validée |
| `inventory-planner` | Shopify ou Square | Calendar, NetSuite, QuickBooks | CSV ventes + stock |
| `inbox-manager` | Gmail ou M365 | Slack | texte d'e-mail collé / transféré |
| `hiring-screener` | Mail (Gmail ou M365) + Calendar | DocuSign, Drive ou M365, Paie US, Trello | dépôt de CV, brouillons à envoyer manuellement |
| `job-post-builder` | aucun | DocuSign, Drive ou M365 | totalement autonome |
| `contract-review` | aucun (dépôt de fichier) | DocuSign, Drive ou M365, Gmail ou M365 | le dépôt de fichier est le mode principal |
| `tax-season-organizer` | un grand livre (MYOB, NetSuite, QuickBooks, Xero ou Zoho Books) | Expensify, Paie US, PayPal, Ramp, Square, Stripe | dépôt de CSV/document ; le calcul fiscal est propre aux États-Unis (`../../../shared/currency-and-locale.md`) |
| `ticket-deflector` | un connecteur de paiement (PayPal, Square ou Stripe), un CRM, ou Mail | Atlassian, RingEx Chat, Shopify, Zoho Desk | texte collé |

Notes de capacité des grands livres (ce que chacun détient, d'après ses propres
fichiers de référence) :
- **MYOB** — compte de résultat, soldes clients et fournisseurs, totaux de
  ventes, conditions de paiement. Aucun solde bancaire ou de caisse, aucun
  détail fournisseur ou bénéficiaire, aucune adresse e-mail client. Un skill qui
  a besoin de ces éléments demande au dirigeant ou utilise une autre source, et
  le dit.
- **Xero** — compte de résultat, transactions bancaires, factures fournisseurs,
  factures clients, créances âgées, fiche organisation. Les pièces jointes des
  factures sont visibles. Voir `../../month-end-prep/reference/xero-reconcile.md`.
- **NetSuite** — grand livre complet via les rapports et SuiteQL. Courant dans
  le haut du segment.
- **QuickBooks** — grand livre complet, avec les pièges de rapports dans
  `../../../shared/quickbooks-report-traps.md`.
- **Zoho Books** — factures clients, devis, commandes clients, charges,
  commandes fournisseurs, règlements clients, soldes des comptes bancaires et
  caisse, contacts avec un indicateur de déclaration annuelle de revenus, fiche
  organisation. Aucun objet facture fournisseur, aucun flux de transactions
  bancaires, aucune écriture, aucun point de terminaison de rapport (compte de
  résultat, trésorerie, balance âgée). Un skill qui a besoin de ces éléments
  demande l'export et le dit ; voir
  `../../month-end-prep/reference/zoho-books-reconcile.md`.
- Deux grands livres connectés : lis les deux, un seul est désigné comme source
  de référence pour les totaux, jamais la somme des deux.

Notes de capacité des boutiques en ligne et du point de vente (ce que chacun
détient, d'après ses propres fichiers de référence ; la catégorie est définie
dans `../../../shared/connector-neutrality.md`) :
- **Shopify** — commandes, clients, produits avec images, niveaux de stock et
  analytique ShopifyQL ; la fiche boutique porte le pays et la devise. Aucun
  versement : les portées du connecteur excluent Shopify Payments, donc le délai
  de règlement est demandé au dirigeant, jamais déduit
  (`../../cash-flow-snapshot/reference/v2_sources.md`). Un `productId` par
  lecture de stock (`../../../shared/connector-call-shapes.md`).
- **Square** — commandes avec lignes, catalogue avec images, inventaires,
  paiements et versements ; la fiche commerçant porte le pays et la devise. La
  liste des paiements renvoie un établissement par appel, donc les skills
  parcourent les établissements. Les versements peuvent être structurellement
  absents sur un compte de production.
- Une boutique en ligne seule satisfait toute garde écrite « un CRM, un
  connecteur de paiement ou une boutique en ligne » : l'historique des commandes
  dit qui a acheté quoi et quand.
- Boutique en ligne et connecteurs de paiement tous deux connectés : une commande
  et son règlement sont une seule vente. Le chiffre d'affaires vient de celui que
  le dirigeant désigne comme source de référence ; l'autre fournit le timing, les
  frais ou le stock.

## Développer l'entreprise

| Skill | Obligatoire | Facultatif | Repli sans connecteur |
|---|---|---|---|
| `lead-finder` | Apollo ou Clay | HubSpot | recherche web + CSV clients |
| `outreach-composer` | Gmail ou M365 | Apollo, Clay, HubSpot, Mailchimp | brouillon seul, à coller partout |
| `speed-to-lead` | HubSpot + Mail (Gmail ou M365) | Calendar, RingEx Chat | demandes transférées / collées |
| `lead-triage` | HubSpot | Apollo, Calendar, Clay, Gmail ou M365 | liste de prospects collée / déposée |
| `proposal-builder` | Drive ou M365 | Apollo, Atlassian, Canva, DocuSign, Notion, Trello, Zoom ; un grand livre ou un connecteur de paiement pour l'historique de prix et la facture d'acompte | dépôts en entrée, DOCX/PDF en sortie |
| `crm-autopilot` | un CRM (HubSpot, Monday.com, Salesforce ou Zoho CRM) | Calendar, Notion, RingEx Chat, Trello, Zoom | tableur CRM intégré |
| `growth-pulse` | HubSpot + une source de chiffre d'affaires | Mailchimp, PayPal, Shopify, Square, Stripe, TikTok Ads | exports CSV |
| `content-strategy` | QuickBooks ou PayPal | Shopify, Square | CSV des ventes |
| `social-content-engine` | Canva | HubSpot, Mailchimp, Notion, Shopify, Trello | calendrier + textes + briefs pour publication manuelle |
| `canva-creator` | Canva, HubSpot | Shopify, Square — photos produits et prix lus depuis la boutique avant que le dirigeant soit sollicité | brief en entrée ; calendrier, textes et briefs d'assets en sortie pour la conception et la publication manuelles |
| `review-reputation` | un CRM, un connecteur de paiement (PayPal, Square ou Stripe), ou une boutique en ligne (Shopify ou Square) | Gmail ou M365, Zoho Desk | avis collés / exportés + web |
| `ad-manager` | TikTok Ads (natif) ; les autres plateformes publicitaires via une connexion Zapier `build-connector` | Canva | exports CSV de performance — le chemin courant aujourd'hui |
| `seo-ai-visibility` | aucun (natif web) | Shopify, Wix | parcourt n'importe quel site public |
| `grant-rfp-writer` | Drive ou M365 | DocuSign, Calendar, Trello | dépôt de documents + recherche web |

## Construction & méta

| Skill | Obligatoire | Facultatif | Repli |
|---|---|---|---|
| `build-agent` | aucun | ce contre quoi il construit | natif |
| `build-connector` | aucun | Emergent, Zapier | il construit le repli |
| `smb-onboard` | aucun | tous | entretien, recommande quoi connecter |
| `brand-style` | aucun | site web via WebFetch | description de marque en mots simples ; choix par défaut de la maison en cas de saut |

## Commandes (11 dossiers + 1 chaîne interne à un skill)

Les onze dossiers de commandes sont listés ci-dessous. La douzième
chaîne est la chaîne de demandes planifiée qui vit dans le skill
`speed-to-lead` plutôt que dans son propre dossier, et sa garde correspond à
`speed-to-lead` (HubSpot + Gmail).

Les commandes héritent des exigences des skills qu'elles enchaînent.
L'exigence du skill de tête décide si la commande peut démarrer ; les segments
facultatifs se dégradent selon le skill.

| Commande | Garde pour démarrer |
|---|---|
| `/pack-rapports` | un connecteur de données quelconque, ou un CSV |
| `/payer-factures` | un grand livre (MYOB, NetSuite, QuickBooks, Xero ou Zoho Books) + Mail (Gmail ou M365) |
| `/reapprovisionner` | Shopify, Square, ou un CSV |
| `/remplir-pipeline` | Apollo ou Clay, + HubSpot |
| `/lundi-marketing` | n'importe lequel de PayPal / Shopify / HubSpot ; TikTok Ads ajoute la couche dépense payante |
| `/reactiver-clients` | un CRM, un connecteur de paiement (PayPal, Square ou Stripe), ou une boutique en ligne (Shopify ou Square) ; un grand livre et un support desk ajoutent l'historique des factures et des interventions |
| `/preparer-paie` | un grand livre (MYOB, NetSuite, QuickBooks, Xero ou Zoho Books) ; Paie US ou QuickBooks Payroll pour le segment feuille de temps |
| `/cloturer-mois` | un grand livre (MYOB, NetSuite, QuickBooks, Xero ou Zoho Books) |
| `/fiscalite` | un grand livre (MYOB, NetSuite, QuickBooks, Xero ou Zoho Books) ; le calcul fiscal ne s'exécute que pour une entreprise française |
| `/brief-lundi` | aucune — se dégrade proprement |
| `/liste-appels` | HubSpot ; Mail (Gmail ou M365) ajoute le contexte e-mail, Google Calendar ajoute les créneaux, Apollo ou Clay ajoute l'adéquation société (facturé au comptage, demandé une seule fois) |