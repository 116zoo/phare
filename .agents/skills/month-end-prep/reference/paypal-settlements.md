# Référence — règlements des prestataires de paiement

## Sommaire

- [PayPal](#paypal)
- [Square](#square)
- [Stripe](#stripe)
- [Logique de rapprochement (tous les prestataires)](#logique-de-rapprochement-tous-les-prestataires)

---

## PayPal

### Structure du rapport de règlement

Le connecteur PayPal renvoie un rapport **Transaction History** ou **Settlement**.
Champs clés :

| Champ | Remarques |
|---|---|
| `transaction_info.transaction_id` | Identifiant de transaction PayPal |
| `transaction_info.transaction_initiation_date` | Date à laquelle la transaction a eu lieu |
| `transaction_info.transaction_amount.value` | Montant brut (positif = encaissement) |
| `transaction_info.fee_amount.value` | Frais PayPal (négatif) |
| `transaction_info.transaction_status` | N'utiliser que `S` (Success) et `P` (Pending) |
| `payer_info.email_address` | E-mail du client — utile pour le lettrage |

**Date de dépôt et date de transaction :** PayPal groupe les virements par lots.
Une vente du 28 avril peut n'être créditée que le 2 mai. Lors du rapprochement
avec les écritures bancaires QB, rapproche sur la **date de dépôt**, pas sur la
date de transaction.

**Remboursements :** ils apparaissent en montants négatifs avec
`transaction_type` = `T1107` ou `T1114`. Ils doivent compenser la vente d'origine —
ne signale pas un remboursement comme écart avec le registre QB sauf s'il
n'existe aucun avoir QB correspondant.

**Blocages :** les transactions au statut `F` (Funds on Hold) n'ont pas encore été
créditées. Note-les à part — elles apparaîtront dans le règlement du mois suivant.

---

## Square

### Structure du rapport de règlement

Square nomme ces opérations des **Payouts**. Chaque virement couvre 1 à 2 jours
ouvrés de ventes.

Champs clés de l'API Square Payouts :

| Champ | Remarques |
|---|---|
| `id` | Identifiant du virement |
| `arrived_at` | Date d'arrivée des fonds sur le compte bancaire |
| `amount_money.amount` | Virement net en centimes (frais Square déjà déduits) |
| `status` | N'utiliser que le statut `PAID` pour le rapprochement |

**Frais :** Square déduit les frais avant le virement — `amount_money.amount` est
donc net. Lors du rapprochement avec QB, compare au dépôt bancaire net, pas au
total brut des ventes.

**Virements le jour même :** si l'utilisateur a le Square Instant Transfer, les
fonds peuvent arriver à la date de la transaction. Par défaut, c'est le jour
ouvré suivant.

---

## Stripe

### Structure du rapport de règlement

Stripe nomme ces opérations des **Payouts**. Le connecteur Stripe renvoie les
objets de virement ainsi que les transactions de solde contenues dans chaque
virement.

Champs clés :

| Champ | Remarques |
|---|---|
| `id` | Identifiant du virement |
| `arrival_date` | Horodatage Unix de la date d'arrivée bancaire |
| `amount` | Virement net en centimes (frais déjà déduits) |
| `status` | N'utiliser que `paid` pour le rapprochement |

**Frais Stripe :** comme Square, les frais sont déduits avant le virement.
Compare les montants nets.

**Stripe Connect / comptes plateforme :** si l'utilisateur exploite une plateforme
sur Stripe Connect, les virements de transferts individuels peuvent sembler
inhabituels. Demande à l'utilisateur de confirmer son type de compte Stripe si
les schémas de virement ne correspondent pas aux attentes.

---

## Logique de rapprochement (tous les prestataires)

Utilise cette logique pour rapprocher les dépôts des prestataires des dépôts
bancaires QuickBooks :

```
pour chaque dépôt de prestataire sur le mois cible :
    trouve le dépôt QB tel que :
        abs(QB.amount - processor.net_amount) < 0,50 €
        ET abs(QB.date - processor.arrival_date) <= 2 jours

    si correspondance trouvée :
        marque comme RECONCILED
    elif abs(QB.amount - processor.net_amount) < 0,50 € (écart de date uniquement) :
        signale comme DATE_MISMATCH (généralement un décalage temporel — priorité basse)
    elif dépôt prestataire sans aucune correspondance :
        signale comme MISSING_IN_QB
    elif dépôt QB non rattaché à aucun enregistrement de prestataire :
        signale comme UNMATCHED_DEPOSIT (peut être un prélèvement, un chèque ou un autre produit)
```

**Entreprises multi-prestataires :** exécute cette logique indépendamment pour
chaque prestataire, puis agrège les signalements. Un dépôt QB qui ne correspond
pas à PayPal peut légitimement être un virement Square — ne le signale pas avant
d'avoir vérifié tous les prestataires connectés.