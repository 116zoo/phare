# Pièges

Modes d'échec connus pour invoice-chase.

---

**Le client a payé par chèque ou par virement — rien n'apparaît chez PayPal.**

Le recoupement PayPal ne capture que les paiements PayPal. Un client qui a payé par
chèque ou par virement peut toujours apparaître en retard côté créances clients.
Signale-le dans le résumé : « Historique PayPal uniquement — les paiements par
chèque ou virement ne sont pas vérifiés. » Laisse le dirigeant confirmer avant
tout envoi.

---

**Les créances clients QuickBooks incluent des comptes internes ou de test.**

Certains paramétrages font apparaître des comptes de facturation internes ou des
enregistrements de test dans les créances clients. Avant de rédiger, écarte les
clients dont le domaine d'email correspond au domaine du dirigeant, et signale tout
nom de client contenant « Test », « Internal » ou « Demo ».

---

**Plusieurs factures échues pour le même client — un seul email.**

Ne rédige jamais deux relances séparées pour le même client dans un même lot.
Regroupe toutes les factures échues dans un seul email avec un montant total et la
liste des numéros de facture. Deux emails à la même personne dans un même lot passent
pour désordonnés et peuvent déclencher un filtre anti-spam.

---

**L'envoi de la relance PayPal échoue pour les clients sans compte PayPal.**

Les relances PayPal ne fonctionnent que si le client dispose d'un compte PayPal actif.
Si PayPal renvoie une erreur d'envoi, replie-toi sur la mise en file d'un brouillon
de courrier et signale le repli : « Envoi PayPal échoué pour [client] — mis en file
comme brouillon [application de courrier] à la place. » Ne supprime jamais la
relance en silence.

---

**Stripe et QuickBooks peuvent porter la même facture.**

Si Stripe est activé et qu'un client apparaît à la fois dans les créances clients
QuickBooks et dans les échus Stripe, il peut s'agir de la même facture dans deux
systèmes. Rapproche d'abord sur le numéro de facture ; si aucun numéro ne
correspond, rapproche sur le montant plus la date d'échéance. En cas de doute,
signale-le au dirigeant et envoie une seule relance plutôt que deux.

---

**L'API PayPal renvoie des erreurs 429 de limitation de débit.**

Le connecteur MCP de PayPal limite fortement les appels quand la fenêtre de dates
demandée est large. La cause la plus fréquente est d'interroger 14 à 30 jours de
transactions dans un seul appel.

*Correctif :* interroge toujours avec `transaction_status: S` (réglé uniquement) et
une **fenêtre de 7 jours** qui se termine aujourd'hui. C'est le réglage par défaut
du workflow.

*Schéma de réessai :* si une requête sur 7 jours renvoie 429, réessaie immédiatement
avec une **fenêtre de 3 jours**. Une fenêtre plus étroite réduit la charge de la
réponse et réussit généralement.

*Repli :* si le réessai sur 3 jours renvoie aussi 429, saute entièrement le
recoupement PayPal pour ce passage. Marque chaque client du lot comme « PayPal
indisponible — à vérifier manuellement » dans le tableau récapitulatif. Poursuis avec
un scoring basé sur QuickBooks seul. Ne supprime jamais la réserve en silence — le
dirigeant doit savoir que le recoupement a été sauté avant d'approuver le moindre
envoi.

---

**Les numéros de facture Airwallex ne correspondent à rien dans le grand livre.**

Airwallex numérote ses factures lui-même (style `INV-XXXX-0002`). Ses numéros ne
correspondent à aucun numéro de grand livre, contrairement au numéro de grand livre
stocké dans les `metadata` de chaque facture. Rapproche d'abord sur `metadata`.
Quand une facture n'a pas de `metadata` (les factures générées par abonnement en
ont souvent pas), résous `billing_customer_id` avec `retrieve_billing_customer` et
rapproche sur le client plus le montant plus la date d'échéance. Ne mets jamais le
numéro d'Airwallex dans une relance comme numéro de facture ; c'est l'exemplaire du
client qui porte le numéro du grand livre.

---

**Les factures annulées chez Airwallex indiquent toujours `payment_status: UNPAID`.**

Une facture annulée conserve `payment_status: UNPAID`, si bien qu'une liste filtrée
sur le seul statut de paiement inclut des factures que personne ne doit. Passe
toujours aussi `status: FINALIZED` (ou retire toute ligne dont le `status` vaut
`VOIDED`).

---

**Le nom de compte Airwallex peut ne pas correspondre à la raison sociale.**

`get_account_details` peut renvoyer une dénomination sociale qui ne correspond pas à
l'entreprise du dirigeant alors que le surnom du compte, si. Confirme le compte par
le surnom ou par les identifiants avant de le considérer comme le mauvais compte ; ne
t'arrête pas sur la seule dénomination sociale.

---

**Airwallex ne peut pas envoyer de relance.**

Il n'existe aucun outil d'envoi de relance ni de notification sur une facture ; la
compétence de facturation d'Airwallex le dit elle-même (« no API to email invoices
directly »). Toute relance issue d'Airwallex part par le connecteur de courrier du
dirigeant, ou revient en copie prête à coller, avec le `hosted_url` de la facture
comme lien de paiement. `hosted_url` n'existe que lorsque `collection_method` vaut
`CHARGE_ON_CHECKOUT` ; une facture `OUT_OF_BAND` peut n'avoir qu'un `pdf_url` — mets
celui-là en lien et dis au dirigeant que le client réglera par virement bancaire.
`create_payment_link` accepte bien un `shopper_email` qui envoie le lien depuis
Airwallex — ne l'utilise pas ici ; la relance est le message du dirigeant, dans son
registre, depuis sa boîte mail.

---

**Deux connecteurs Airwallex existent ; le dirigeant veut celui de production.**

Il y en a deux : **airwallex-agentos** (compte de production, `mcp.airwallex.com/mcp`)
et **airwallex-developer** (bac à sable plus documentation). Le plugin déclare celui
de production. La recommandation d'Airwallex elle-même est de prendre les noms
d'outils dans la liste d'outils du serveur connecté plutôt que de les supposer : à la
première utilisation, confirme que `list_billing_invoices`,
`retrieve_billing_customer` et `create_payment_link` existent bien sous ces noms et
adapte-toi si le serveur de production les nomme autrement. Si le dirigeant a branché
par erreur le connecteur développeur, tous les chiffres sont des données de bac à
sable : dis-le et arrête-toi.