# Autres sources

Deux bras de plus vers le même pouls. Le pouls se construit toujours à partir de ce
qui est connecté et se dégrade avec grâce.

---

## Shopify

Pour une entreprise de commerce, c'est la différence entre un pouls qui décrit sa
journée et un pouls qui ne le fait pas.

| Extraction | Section alimentée |
|---|---|
| Commandes et chiffre d'affaires, aujourd'hui et 7 derniers jours | Revenus et ventes |
| Statut d'expédition | Liste de surveillance — une commande non expédiée au-delà du SLA est l'élément le plus actionnable du pouls |
| Remboursements et retours | Liste de surveillance |
| Alertes de stock bas sur les produits qui tournent | Liste de surveillance |

Les commandes non expédiées au-delà de la fenêtre promise méritent le haut de la liste.
Elles sont urgentes, elles se transforment en réclamations, et aucune autre section ne
les fait remonter.

---

## La comptabilité — MYOB, NetSuite, QuickBooks, Xero ou Zoho Books

Celui qui est connecté fait foi pour la trésorerie, le chiffre d'affaires et les
créances clients, et le pouls rapporte le chiffre que voit le comptable ou le
contrôleur de gestion du dirigeant. Les logiciels comptables sont équivalents
(`../../../shared/connector-neutrality.md`) : aucun ne passe avant un autre. Mêmes
indicateurs, mêmes sections ; seuls les noms d'outils changent (`data_sources.md`).

**Deux comptabilités connectées : lis les deux, totalise depuis une seule.** Demande
laquelle fait foi, dis-le dans l'Annexe, et prends les totaux de trésorerie, de chiffre
d'affaires et de créances clients dans celle-là. L'autre ne fournit que ce qu'elle
détient seul.

---

## La règle du double-compte

Le pouls peut potentiellement voir le chiffre d'affaires à quatre endroits : la
comptabilité, un prestataire de paiement, une boutique en ligne et un point de vente.

**Choisis une seule source de revenu et dis laquelle.** Les additionner gonfle le
chiffre, parfois de plus du double, et un dirigeant qui le repère cesse de faire
confiance à tout le pouls.

Ordre : la comptabilité d'abord (celle qui est connectée ; s'il y en a deux, la source
de référence nommée par le dirigeant), puis le prestataire de paiement, puis la
boutique en ligne. Tout ce qui se trouve en dessous de la source retenue ne fournit
que du détail — répartition par canal, par produit, calendrier de règlement — pas des
totaux.

```
Chiffre d'affaires — 43 200 € sur le mois (source : Xero ; Shopify utilisé pour le mix produit)
```

### Une seule source double-compte aussi

Choisir une source unique ne suffit pas. Le résumé des ventes par client de QuickBooks
renvoie deux lignes pour tout client qui a des sous-clients ou des chantiers en dessous :
une ligne de synthèse pour le parent, et une ligne de total distincte portant le même
montant. La liste des meilleurs clients intégrée au rapport contient les deux.

Un client apparaît donc deux fois dans tout classement construit directement sur ces
lignes — une fois sous son propre nom, une fois comme « Total pour » ce nom — et chaque
chiffre de concentration calculé à partir d'elles est gonflé.

Supprime les lignes dont le type de métadonnées les marque comme total avant de classer
ou de sommer. Garde la ligne de synthèse du parent. C'est une erreur garantie sur toute
comptabilité qui utilise les chantiers ou les sous-clients, ce qui, dans les métiers de
services, représente la majorité des cas.

---

## Présets planifiés

| Préset | Quand | Forme |
|---|---|---|
| Lundi | Début de semaine | Pouls complet, prospectif. Ce qui arrive, ce qui demande attention |
| Vendredi | Fin de semaine | Récapitulatif. Ce qui a bougé, ce qui s'est conclu, ce qui a glissé |

Même skill, cadrage différent.

**Les deux sont réellement deux documents différents.** Le lundi doit commencer par les
engagements de la semaine et la seule chose la plus importante à traiter. Le vendredi
doit commencer par ce qui s'est réellement passé par rapport à ce qui était attendu. Un
récapitulatif du vendredi qui se lit comme un brief du lundi est un brief du lundi
envoyé au mauvais jour.

Propose une cadence une seule fois, après un pouls que le dirigeant a trouvé utile. Ne
redemande pas.