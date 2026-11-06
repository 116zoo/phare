# Rapprochement et écarts

Le rapprochement à trois voies, et la façon de formuler ce qu'il trouve.

---

## Ce qui se rapproche de quoi

| Document | Répond à |
|---|---|
| Bon de commande | Ce qui a été commandé, à quel prix |
| Bon de réception ou bon de livraison | Ce qui est réellement arrivé |
| Facture fournisseur | Ce qui est facturé |

Un rapprochement à trois voies propre signifie que les trois concordent dans la tolérance. Cette
facture ne demande rien de plus qu'un coup d'œil.

Beaucoup de petites entreprises n'émettent pas de bons de commande. **L'absence de bon de commande
n'est pas un écart** — c'est l'état normal de beaucoup de factures qui passent ici. Note-le et passe
au suivant. Ne traite un bon de commande manquant comme un problème que si le dirigeant a dit qu'il
en exige au-delà d'un certain montant.

---

## Tolérances

Demande une fois au dirigeant et retiens la réponse. Valeurs par défaut raisonnables en l'absence de
règle :

- **Écart de prix :** signaler au-delà de 2 % ou de 25 € par ligne, la valeur la plus élevée des deux
- **Écart de quantité :** signaler tout excédent, même minime
- **Frais de transport et de carburant non prévus au bon de commande :** signaler au-delà de 50 €
- **Écart de total :** signaler au-delà de 1 % du montant du bon de commande

L'asymétrie est délibérée. Se faire facturer plus d'unités que ce qui est arrivé, c'est du vol ou
une erreur à chaque fois ; une petite variation de prix n'est souvent qu'un mouvement de marché.

---

## Types d'écarts et formulation

Chaque écart mentionne le fournisseur, le numéro de facture, les deux chiffres et l'impact en euros.
Les écarts vagues sont ignorés.

**Prix supérieur au bon de commande**
> Facture Ferguson 88231, ligne 2 : facturé 1 240 € l'unité, le bon de commande indique 1 160 €.
> Deux unités. 160 € de trop.

**Facturé au-delà du reçu**
> Facture Johnstone 4471 : 12 filtres facturés, le bon de réception en montre 8. 84 € de trop.
> Rien n'a été signé pour les 4 autres.

**Reçu jamais facturé**
> Bon de réception Ferguson 2201 du 14/03 : aucune facture correspondante. Soit elle arrive, soit
> elle a été ratée. À savoir avant la clôture du mois.

**Facturé jamais reçu**
> Facture Grainger 55019 de 612 €. Aucun enregistrement de réception. Demande si l'expédition a
> bien eu lieu.

**Doublon**
> La facture Ferguson 88231 apparaît deux fois — reçue par email le 2/03 en PDF puis de nouveau sur
> le relevé de mars. Même numéro de facture. L'une des deux est une copie.

**Champ illisible**
> Photo d'une facture Watsco, total illisible à cause d'un reflet. Fournisseur et date sont nets.
> Il me faut le total avant de pouvoir la préparer.

---

## Relevés

Les relevés fournisseurs servent à repérer les trous, pas à créer des écritures.

Rapproche les lignes ouvertes du relevé de ce qui figure au grand livre :

- Sur le relevé, pas dans les comptes → une facture que le dirigeant n'a jamais reçue. Demande un exemplaire au fournisseur.
- Dans les comptes, pas sur le relevé → souvent déjà payée et imputée. Confirme avant de relancer.
- Les montants divergent → c'est généralement un avoir ou un règlement partiel.

**Ne crée jamais une facture à partir d'une ligne de relevé.** Une ligne de relevé n'a ni détail de
facture, ni lignes d'articles, ni détail de taxe. En saisir une produit une écriture que personne ne
pourra auditer ensuite.

---

## Orientation

Certains écarts relèvent du dirigeant, d'autres du fournisseur. Trie-les avant de les présenter :

- **Le dirigeant décide :** questions d'imputation, accepter ou non une hausse, procéder ou non à un règlement partiel
- **Le fournisseur doit répondre :** quantités manquantes, factures absentes, facturations de marchandises non livrées
- **L'expert-comptable traite :** corrections sur périodes antérieures, tout ce qui est déjà clôturé

Rédige le message destiné au fournisseur pour la deuxième catégorie, mais il n'est pas envoyé sans
approbation. Voir `payment_run.md` pour l'articulation entre les contestations et un règlement
programmé.