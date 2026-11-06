# Sources de données

Quel connecteur répond à quelle partie du pouls. Tout extraire en un seul lot
parallèle.

---

## HubSpot — l'entonnoir

L'épine dorsale de ce skill. Sans lui, la conversion de l'entonnoir est
indisponible et le pouls se rabat sur la tendance des revenus.

| Vue | Ce qu'il faut extraire |
|---|---|
| Conversion de l'entonnoir | Affaires par étape, avec les dates de création et de clôture |
| Volume de leads | Contacts créés sur la période, avec la propriété source |
| Mix des sources de leads | Contacts regroupés par source d'origine |
| Taux de réussite | Affaires gagnées divisées par affaires résolues |
| Durée de cycle | Nombre médian de jours entre la création et la clôture, affaires gagnées uniquement |
| Affaires à l'arrêt | Affaires sans activité depuis 14 jours ou plus, ou date de clôture dépassée et toujours ouverte |
| Vitesse de réponse | Délai entre la création du contact et la première activité enregistrée |

**Attention au montant des affaires.** C'est une prévision, pas un revenu. Ne
jamais présenter le pipeline pondéré comme de l'argent gagné.

**Repli :** un export CSV des affaires du CRM donne les mêmes vues d'entonnoir.

---

## Sources de revenus

| Source | Idéale pour |
|---|---|
| QuickBooks | Revenu réalisé — le chiffre qui concorde avec la comptabilité |
| Stripe, PayPal | Calendrier de règlement, frais, remboursements, revenus d'abonnement |
| Square | Revenu en présentiel et par point de vente |
| Shopify | Nombre de commandes, revenu par référence, taux de réachat |

**Choisir une seule source de revenu par pouls et la nommer.** Quand QuickBooks
est connecté, c'est lui qui gagne — les prestataires de paiement et les boutiques
en ligne ne fournissent alors que la ventilation par canal et par produit.
Additionner les deux double-compte, parfois plus du double.

**Ensuite, se garder du double-compte à l'intérieur de cette source unique.** Le
résumé des ventes par client de QuickBooks émet une ligne de synthèse parente
et une ligne de total distincte pour le même client dès que des sous-clients ou
des chantiers existent. Les deux portent le même montant, et la liste des
meilleurs clients du rapport elle-même contient les deux. Filtrer les lignes dont
le type de métadonnées les marque comme total avant de classer les clients ou de
calculer la concentration ; sinon un client occupe deux places dans le classement
et le chiffre de concentration est gonflé.

---

## Plateformes publicitaires

| Source | Ce qu'il faut extraire |
|---|---|
| TikTok Ads | Connecteur natif. `report_integrated_get` au niveau campagne sur les 7 derniers jours et les 7 précédents : dépense, impressions, clics, résultats, coût par résultat. `advertiser_info_get` d'abord, pour confirmer le compte. Mêmes lectures et mêmes pièges que `ad-manager` (`../../ad-manager/SKILL.md`) ; les lire avant le premier appel |
| Google Ads | Non branché à ce skill — demander un export CSV. Le connecteur lui-même se trouve dans `ad-manager` |

**Honnêteté de l'attribution.** Les plateformes publicitaires rapportent les
conversions qu'elles revendiquent. Le CRM rapporte les leads qu'il a reçus. Les
deux concordent rarement, et l'écart n'est pas un bug. Rapporter les deux et nommer
l'écart plutôt que de retenir celui qui flatte.

---

## Mailchimp — l'e-mail comme canal

| Vue | Ce qu'il faut extraire |
|---|---|
| Retour des campagnes | Analyses de campagne avec attribution de revenu — ouvertures, clics et revenu attribué par campagne |
| Tendance par canal | Analyses e-commerce, pour la part de revenu attribuée à l'e-mail |
| Volume de leads | Analyses de croissance d'audience — abonnés ajoutés et perdus sur la période |

**La même honnêteté d'attribution s'applique.** Le revenu attribué par Mailchimp
est la revendication de Mailchimp, qui se retrouve à côté de celle de la
plateforme publicitaire et de l'enregistrement du CRM. Le rapporter comme le
chiffre propre au canal e-mail et nommer l'écart. Ne jamais le fusionner dans un
seul indicateur global.

**Mailchimp est en lecture et brouillon uniquement dans ce plugin.** Il n'a pas de
chemin d'envoi ici, et son planificateur de campagnes refusera une demande de
campagne unique — il ne produit que des plans multicanaux. Traiter la liste
d'audience elle-même comme indisponible pour l'export, sauf si un appel la renvoie
réellement.

**Une erreur d'authentification ou de connexion relève de la santé du connecteur,
pas d'une absence de données.** Si les appels Mailchimp échouent sur une session
expirée ou une erreur d'autorisation, la ligne d'annexe doit dire « Mailchimp : la
connexion doit être réautorisée — reconnecte-la dans Connectors et relance », pas
« aucune donnée e-mail ». Nommer le correctif, puis poursuivre le pouls sans les
vues e-mail. Avant d'écrire cette ligne, vérifier que l'erreur ne vient pas de
l'enregistrement propre au plugin (`small-business:intuit-mailchimp`, la clé du
manifeste) alors que l'entrée Mailchimp du dirigeant est active — si l'entrée du
dirigeant fonctionne, l'utiliser et ne rien dire sur une reconnexion
(`../../../shared/connector-neutrality.md`, « One connector, two registrations »).

---

## Sentiment

| Source | Ce qu'il faut extraire |
|---|---|
| Avis publics | Avis récents sur Google, Yelp et les sites du secteur, via recherche web |
| PayPal, Stripe | Nombre de litiges et de rétrofacturations, et leurs motifs |
| Gmail ou Microsoft 365 | Réclamations entrantes, demandes de résiliation, demandes de remboursement |
| HubSpot | Volume et thèmes des tickets, si le support passe par le CRM |

Le sentiment est l'indicateur avancé de ce pouls. Il bouge avant le revenu, ce qui
est précisément ce qui rend son inclusion justifiée.

---

## La voie du fichier téléversé

Un mode à part entière, pas un mode dégradé. Beaucoup de dirigeants de ce segment
n'ont aucun connecteur propre côté croissance.

Ce qu'il faut demander, en langage courant :

- « Exporte tes affaires depuis le CRM » — conversion de l'entonnoir
- « Exporte ton rapport de ventes du mois » — performance par canal et par produit
- « Télécharge le CSV de performance des campagnes depuis Ads Manager » — retour des campagnes
- « Colle tes avis récents » — sentiment

Lire la ligne d'en-tête, mapper les colonnes et construire le pouls identique. Si
une colonne nécessaire est absente, la nommer — « il n'y a pas de colonne source,
donc je ne peux pas répartir les leads par canal » — plutôt que de supprimer
discrètement la vue.

---

## Règle des extractions parallèles

Chaque appel part en un seul lot. Ce pouls touche couramment cinq ou six systèmes.

Enregistrer les échecs en interne et les lister une seule fois en annexe. Ne
jamais faire apparaître une erreur de connecteur au milieu du brief — le dirigeant
a posé une question sur la croissance, pas sur les intégrations.