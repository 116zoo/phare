# Pièges — cash-flow-snapshot

Cas limites connus et modes d'échec des connecteurs.

---

## 1. La balance âgée des créances clients QuickBooks inclut des factures déjà encaissées

**Mauvais :** intégrer des factures totalement payées dans le rapport de balance
âgée gonfle les projections d'encaissements. QuickBooks affiche parfois des factures
à solde nul dans ses exports de balance âgée.

**Bon :** filtre les lignes de créances clients sur `balance_due > 0` avant de
calculer les encaissements. Si le connecteur n'expose pas balance_due, soustrais les
règlements PayPal/Stripe connus du total de la facture avant de l'inclure.

---

## 2. Le délai de règlement PayPal varie selon le type de transaction

**Mauvais :** supposer que tous les encaissements PayPal sont réglés en 1 à 2 jours
ouvrés. PayPal retient les fonds différemment selon les litiges, les nouveaux
vendeurs et les transactions de forte valeur — une hypothèse de règlement uniforme
produit un calendrier d'encaissements trop confiant.

**Bon :** calcule le délai de règlement à partir des paires réelles
`transaction_date` → `completed_date` dans l'historique des transactions PayPal.
Utilise la moyenne et l'écart-type calculés, par client ou par type de transaction.

---

## 3. Les noms de colonnes CSV sont incohérents d'un export comptable à l'autre

**Mauvais :** exiger des noms de colonnes exacts comme « Date », « Amount », « Type ».
Les exports CSV de QuickBooks utilisent « Transaction Date », « Amount », «
Transaction Type ». Wave utilise « Date », « Amount », « Account Type ». Un parsing
rigide échoue silencieusement.

**Bon :** fais un rapprochement approximatif des en-têtes de colonnes (date →
transaction date → txn date ; amount → débit/crédit ; type → catégorie → account
type). Montre la ligne d'en-tête à l'utilisateur et fais confirmer le mapping avant
de calculer — une question vaut mieux qu'une prévision fausse et silencieuse.

---

## 4. Des coûts fixes cachés dans des écritures fournisseurs ponctuelles

**Mauvais :** ne récupérer que les lignes récurrentes étiquetées « recurring » dans
QuickBooks. Beaucoup de petites entreprises n'étiquettent pas leurs coûts fixes de
façon homogène — le loyer peut apparaître chaque mois comme une facture fournisseur
isolée.

**Bon :** cherche les écritures fournisseurs qui apparaissent sur 3 mois consécutifs
ou plus avec le même fournisseur et un montant similaire (± 10 %). Traite-les comme
des coûts fixes récurrents dans la prévision. Montre la liste à l'utilisateur : « je
les traite comme des coûts fixes mensuels — est-ce que ça te paraît juste ? »

---

## 5. La formule de la borne de confiance casse quand le délai moyen de paiement vaut zéro

**Mauvais :** diviser l'écart-type par un délai moyen de 0 (par exemple les clients qui
paient immédiatement, comme sur Square POS) provoque une division par zéro ou une
borne infinie.

**Bon :** si le délai moyen est ≤ 1 jour, fixe band_pct à 5 % (faible variance,
règlement quasi immédiat). Ne tente pas la division.