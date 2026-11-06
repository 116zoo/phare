# Plus de sources

Plus de factures dans le périmètre. Même cadrage de ton, mêmes points de validation.

---

## Sources de créances clients

Les grands livres sont équivalents (`../../../shared/connector-neutrality.md`) :
celui qui est connecté est la source des créances clients. Si les deux sont
connectés, demande lequel détient les factures et nomme-le.

| Source | Remarques |
|---|---|
| MYOB | Soldes encours par client avec indicateurs de risque, plus les conditions de règlement standard. Lecture seule, trois exercices d'historique |
| NetSuite | Balance âgée des créances clients via les rapports et SuiteQL |
| QuickBooks | Rapport de balance âgée des créances clients avec dates de facture, dates d'échéance et jours d'encours |
| Xero | Créances clients ventilées par contact (`get_aged_receivables`) avec le détail des factures |
| Zoho Books | `list_invoices` avec `status=overdue` (trié par `due_date`) : chaque ligne porte `due_days`, `balance`, `customer_name`, `email`, `reminders_sent`, `last_reminder_sent_date`, ainsi que l'`invoice_url` hébergée à mettre dans la relance. `list_contacts` avec `filter_by=Invoice.OverDue` donne le total par client. Aucun outil d'envoi de relance : les relances passent par le connecteur de courrier ou reviennent en copie, comme pour MYOB |
| PayPal | Factures et délais de règlement |
| Stripe | Factures échues et prélèvements d'abonnement en échec. Interroge-le dès qu'il est connecté |
| Airwallex | `list_billing_invoices` avec `status: FINALIZED` et `payment_status: UNPAID`. Chaque ligne porte `amount_due`, `currency`, `due_at`, `days_until_due`, `billing_customer_id`, ainsi que la page de paiement `hosted_url` à mettre dans la relance. Airwallex attribue son propre `number` (`INV-XXXX-0002`) qui ne correspond à rien dans le grand livre — rapproche par le numéro de grand livre contenu dans `metadata` quand la facture a été créée avec, sinon par client (`retrieve_billing_customer` sur `billing_customer_id` pour le nom et l'email) plus montant plus date d'échéance. Les factures `VOIDED` indiquent toujours `UNPAID` ; le filtre de statut les écarte. `hosted_url` n'est présent que pour les factures `CHARGE_ON_CHECKOUT` ; une facture `OUT_OF_BAND` (virement bancaire) peut ne porter qu'un `pdf_url`. Aucun outil d'envoi de relance : les relances passent par le connecteur de courrier avec le lien de paiement dans le corps |

**Interroge toutes les sources connectées, puis déduplique.** La même facture peut
apparaître à la fois dans le grand livre et chez le prestataire de paiement.
Rapproche par client plus montant plus date, et préfère la version du grand livre —
c'est ce que dit la comptabilité du dirigeant.

**MYOB donne le montant, pas la personne.** Il renvoie des noms de clients et ce
qu'ils doivent, sans adresse email ni numéro de téléphone rattachés. Rapproche chaque
nom d'un contact dans Gmail, Microsoft 365 ou le CRM avant de rédiger, et quand
aucune correspondance n'existe, dis-le en nommant les clients — « trois clients de la
liste n'ont pas d'email au dossier » — plutôt que de les retirer du passage en
silence.

MYOB est aussi la seule source de créances clients incapable d'envoyer. Toute relance
issue de MYOB passe par le connecteur de courrier ou revient en copie.

---

## Le contrôle « payé dans les 14 derniers jours »

Ce contrôle s'exécute sur tous les prestataires de paiement connectés, pas seulement
PayPal.

Un client qui a payé par Stripe le vendredi et reçoit une relance pilotée par
QuickBooks le lundi est le seul échec vraiment destructeur de cette compétence.
C'est embarrassant, cela donne une image de négligence, et cela retombe précisément
sur les clients qui paient bien.

Vérifie les règlements PayPal, Stripe, Square et Shopify avant de rédiger quoi que ce
soit. Si l'un d'eux affiche un paiement récent, marque « possiblement payé — à
vérifier » plutôt que de rédiger.

Fenêtre : 14 jours pour toutes les sources sauf PayPal, qui est interrogée sur 7 jours
(3 en cas de réessai sur limitation de débit) parce que les fenêtres plus larges
provoquent ses 429. Dis dans le résumé quand PayPal a tourné sur la fenêtre courte.

Clé de rapprochement : l'email quand le grand livre et le prestataire de paiement ou
la boutique en exposent tous deux un ; sinon le nom, marqué « rapprochement par nom
seulement — à vérifier » dans le tableau. La fiche client d'un prestataire et celle
d'un grand livre pour la même personne diffèrent régulièrement dans la forme du nom ;
l'email est la clé stable.

Le contrôle d'Airwallex, c'est le `payment_status` propre à la facture : une facture
Airwallex qui indique `PAID` alors que le grand livre porte encore le solde est
« possiblement payé — à vérifier ». Un seul appel de liste, sans fenêtre de dates.

---

## Envoi

| Voie | Quand |
|---|---|
| PayPal | La facture est née dans PayPal. Envoi direct, avec validation |
| Stripe | La relance propre à Stripe, avec validation |
| Airwallex | Aucun outil d'envoi (Airwallex Billing n'a pas d'API pour envoyer une facture par email). La relance part par le connecteur de courrier (ou revient en copie) avec le `hosted_url` de la facture comme lien de paiement, ou le `pdf_url` quand il n'y a pas de page hébergée. Pour une facture présente uniquement au grand livre, le dirigeant peut demander un lien : `create_payment_link` avec `title`, `amount`, `currency`, `reference` et `metadata` réglés sur le numéro de facture du grand livre, sans `shopper_email`. Créé à l'intérieur de la validation du lot, jamais tout seul |
| Gmail ou Microsoft 365 | Tout le reste — met un vrai brouillon en file dans la boîte mail du dirigeant |
| Brouillon seul | Aucun connecteur de courrier. Copie mise en forme à coller |

Mettre en file dans le vrai client de courrier du dirigeant est une amélioration de
fond par rapport à rendre le texte. Le brouillon atterrit dans le dossier où il
travaille déjà, et l'historique du fil de discussion reste intact.

---

## Registre

Les relances partent au nom du dirigeant. Lis [le profil de registre partagé](../../../shared/voice-profile.md)
avant de rédiger.

Deux choses distinctes sont à l'œuvre, et les deux comptent :

- `tone-matching.md` détermine **à quel point** le message est ferme, d'après
  l'historique de paiement
- Le profil de registre détermine **comment il sonne**

Une relance correctement ferme qui ne sonne pas comme le dirigeant sera quand même
réécrite à la main — c'est précisément le résultat que la compétence existe pour
éviter.

---

## Ce qui ne change pas

- Rien ne part sans validation explicite, un lot à la fois
- Aucune relance à quiconque ne figure pas dans un rapport de créances clients.
  Jamais de mémoire
- Les bons payeurs reçoivent une relance cordiale, les payeurs récurrents en retard
  une relance ferme, et le scoring est inchangé
- L'absence totale de connecteur fonctionne toujours : un CSV de créances clients en
  entrée, des relances rédigées en sortie