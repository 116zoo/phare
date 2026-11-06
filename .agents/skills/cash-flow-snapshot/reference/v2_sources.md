# Plus de sources

D'autres sources de données alimentent le même modèle de prévision. La logique ne
change pas — elles élargissent ce que le modèle peut voir.

Récupère tout en un seul lot parallèle. Une prévision qui touche cinq systèmes en
série est une prévision que le dirigeant arrête d'attendre.

---

## Grands livres — celui qui est connecté

Les grands livres sont équivalents (`../../../shared/connector-neutrality.md`).
Celui qui est connecté fournit les branches comptables.

| Source | Ce qu'elle fournit |
|---|---|
| MYOB | **Les branches créances clients et dettes fournisseurs uniquement** — lecture seule, pas de soldes bancaires ni de caisse, et les remontées couvrent trois exercices |
| NetSuite | Créances clients, dettes fournisseurs, coûts fixes et solde de trésorerie, via les rapports et SuiteQL |
| QuickBooks | Balance âgée des créances clients ; dettes fournisseurs en deux appels : la ligne « dettes fournisseurs » du bilan pour le total, et `qbo_accounting_get_ap_aging_detail` avec `due_before` positionné sur l'horizon de prévision pour le calendrier des sorties (lignes réparties par date d'échéance, avoirs gardés à part) ; le résumé de la balance âgée fournisseurs net les avoirs et devient négatif, il ne sert donc jamais de source, et un appel de détail sans contrainte déborde (Piège 1). Plus les coûts récurrents et le bilan |
| Xero | Créances clients ventilées, factures fournisseurs, soldes des comptes bancaires et dossier de l'organisation (devise, exercice comptable) |
| Zoho Books | Trésorerie via `list_bank_accounts` (`current_balance`, sommé sur les comptes actifs) ; créances clients via `list_invoices` `status=unpaid` avec la `due_date` de chaque facture (`response_option=1` pour le solde sommé) ; dettes fournisseurs via les `list_purchase_orders` ouvertes plus `list_expenses` `status=unbilled` ; dossier de l'organisation via `get_organization`. **Pas d'objet facture fournisseur ni de rapport de trésorerie :** les coûts fixes récurrents viennent du dirigeant ou des dépenses récurrentes, et la prévision se construit à partir des dates d'échéance des factures et des dates de livraison attendues des commandes, pas d'une projection comptable — dis-le dans la ligne des sources |

**Deux grands livres connectés : lis les deux, totalise sur un seul.** Demande lequel
fait foi, dis-le dans la sortie, et prends tous les totaux (solde d'ouverture, créances
clients, dettes fournisseurs) sur celui-là. Ne lis l'autre que pour les détails qu'il
détient seul. N'additionne jamais le même chiffre sur deux grands livres.

**MYOB est le seul grand livre qui ne peut pas fournir le solde d'ouverture.**
Récupère-lui la balance âgée des créances clients, les dettes fournisseurs, les
totaux de ventes et les conditions de règlement standard, puis demande au dirigeant
le solde bancaire ou prends-le chez un prestataire de paiement. Intituler la prévision
« pas de solde d'ouverture — variation nette uniquement » est le résultat honnête
quand personne ne peut en fournir un.

Depuis le grand livre : balance âgée des créances clients avec dates d'échéance,
dettes fournisseurs avec dates d'échéance, coûts fixes récurrents et solde de
trésorerie.

---

## Shopify — calendrier des encaissements

Pour une entreprise de commerce, c'est souvent le plus gros encaissement à lui seul,
et il n'arrive pas au moment de la commande.

Récupère les commandes, les versements et le calendrier de versement. C'est l'écart
entre la date de commande et la date de versement qui compte — une entreprise avec
40 000 € de commandes cette semaine et un délai de versement de deux jours a une
vision à 30 jours très différente d'une entreprise réglée chaque semaine.

Modélise les dates de versement, pas les dates de commande. Utiliser les dates de
commande produit une prévision optimiste d'exactement le délai de règlement, à chaque
fois.

**Les versements peuvent être illisibles.** Les scopes du connecteur Shopify
excluent Shopify Payments : les lectures de versements échouent alors que les commandes
réussissent. Quand c'est le cas, demande au dirigeant son calendrier de versement
(quotidien, hebdomadaire, le délai en jours) et modélise à partir de là, et dis dans la
ligne Sources que le calendrier vient du dirigeant. N'infère jamais un délai de
règlement à partir des dates de commande ni de la norme d'une autre boutique.

---

## Ramp — la dépense qui n'a pas encore atterri

La raison la plus fréquente pour laquelle une prévision de trésorerie est
discrètement fausse : des dépenses par carte déjà engagées mais pas encore saisies
dans les livres.

Récupère les transactions par carte en cours et les dépenses non soumises. Ajoute-les
comme un décaissement connu même quand elles n'ont pas encore d'écriture comptable.

**Ramp répond aussi à la question du solde d'ouverture.** Il expose les soldes des
comptes professionnels et de trésorerie avec leur historique. Pour un dirigeant qui
banque chez Ramp, cela transforme « qu'y a-t-il dans le compte là, tout de suite »
en une valeur sourcée — et c'est toute la différence entre une réponse sur la paie et
une supposition sur la paie.

Les remboursements récupérés depuis Ramp peuvent aussi vivre dans l'outil de dépenses
du dirigeant (Expensify). Ne les compte qu'une fois.

Dis ce qui a été ajouté et d'où il vient :

```
Les décaissements incluent 4 180 € de dépenses par carte venant de Ramp qui ne
sont pas encore arrivées dans QuickBooks. Sans elles, cette prévision serait
optimiste d'environ 4 000 €.
```

Cette phrase est souvent la ligne la plus utile de toute la sortie.

---

## Ce qui ne change pas

- Les bornes de confiance viennent toujours de la variance historique de paiement de
  chaque client
- Les indicateurs de risque nomment toujours le client concerné, le montant et le
  nombre de jours de retard
- Le chemin CSV reste entièrement pris en charge et produit toujours la même prévision
- N'invente jamais un chiffre. Une source qui n'a rien renvoyé est signalée par son
  nom comme indisponible

---

## Rapporter les sources

Dis toujours ce sur quoi la prévision a été construite. Les dirigeants emportent ces
documents chez leurs prêteurs, et « d'après QuickBooks et les versements Shopify
jusqu'au 27 juil. » est ce qui la rend défendable.

Recense aussi tout ce qui est indisponible :

```
Construit à partir de : QuickBooks (créances clients, dettes fournisseurs, coûts
fixes), Shopify (calendrier de versement), Ramp (dépenses par carte non saisies).
Indisponible ce passage : Stripe — authentification expirée. Tout revenu Stripe est
absent de ces encaissements.
```

La seconde moitié compte plus que la première. Un dirigeant qui sait ce qui manque
peut juger le chiffre. Celui qui l'ignore lui fera une confiance totale.