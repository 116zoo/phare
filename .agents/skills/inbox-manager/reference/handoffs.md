# Passations

La boîte de réception est là où apparaissent la plupart des événements de
l'entreprise. Une facture, un nouveau lead, une demande de planification et une
réclamation client arrivent tous par e-mail avant d'exister ailleurs. Ce skill
est donc la surface de déclenchement de tout le reste du plugin.

**Chaque passation mérite une ligne dans le digest.** Un élément qui disparaît
dans un autre skill sans être mentionné ressemble, pour le dirigeant, à un
e-mail perdu — et un seul de ces cas suffit à défaire une semaine de confiance.

---

## Ce qui va où

| Ce qui est arrivé | Va vers | Ce que ce skill en fait |
|---|---|---|
| Facture fournisseur, facture, relevé, reçu au-dessus du seuil du dirigeant | `ap-processor` | Extrait les lignes, les code, prépare l'écriture et propose un lot de paiements pour approbation séparée |
| Notification de formulaire web, demande entrante, « faites-vous… » de la part d'un inconnu | `speed-to-lead` | Qualifie, rédige la réponse immédiate avec de vrais créneaux, signale les demandes chaudes à un humain |
| Demande de rendez-vous, aller-retour sur une disponibilité, ordre du jour pour quelque chose déjà réservé | reste dans ce skill — pas de passation | La réponse de planification est rédigée ici, selon `reply_drafting.md`, avec tout conflit d'agenda nommé |
| Client qui répond au sujet d'une facture échue | `invoice-chase` | Détient le fil de recouvrement et l'accord de paiement |
| Contrat, NDA, MSA ou accord joint | `contract-review` | Signale les clauses non standard et produit une version annotée |

Tout ce qui ne correspond à rien reste ici et est trié normalement.

**Une demande transmise reste un brouillon, jamais un envoi.** `speed-to-lead`
n'envoie jamais rien non plus ; une réponse née dans cette boîte mail attend le
« oui » du dirigeant comme tous les autres brouillons ici. La passation déplace
le travail de qualification, pas la permission d'envoyer.

**Un fil de planification ne quitte jamais les mains du dirigeant.** Ce skill
rédige la réponse ; il ne réserve, n'accepte et ne refuse jamais rien. Dis que
la réponse est rédigée et en attente.

---

## Comment reconnaître chacun

**Une facture, pas un reçu.** Une facture demande de l'argent qui n'a pas encore
circulé : un numéro de facture, une date d'échéance, un montant dû, des
instructions de paiement. Un reçu confirme de l'argent qui a déjà circulé. Les
reçus sont traités et classés ; les factures vont à `ap-processor`. L'inverse
signifie qu'une facture reste dans l'archive jusqu'à son dépassement d'échéance.

**Une vraie demande, pas un argumentaire.** Une demande décrit leur problème et
demande si le dirigeant peut aider. Un argumentaire décrit le produit de son
expéditeur. Les argumentaires sont traités et ne sont jamais remontés. Quand c'est
vraiment ambigu, traite-la comme une demande — le coût d'une qualification
perdue est bien inférieur au coût d'un client manqué.

**Un fil de planification, pas une mention de date.** « Peut-on faire jeudi à
14 h », c'est de la planification. « Nous avons terminé jeudi », non.

---

## Ce qu'il faut transmettre

Transmets le fil entier, pas un résumé. Le skill qui le reçoit a besoin de la
pièce jointe, de l'adresse de l'expéditeur, de tout l'historique et des
horodatages. Un résumé perd le PDF de la facture, qui est la seule partie dont
`ap-processor` a réellement besoin.

**En mode collé, transmets le texte collé intégralement tel que le dirigeant
l'a donné**, et dis clairement que la pièce jointe n'est pas là :

```
Facture Ferguson → ap-processor. Je n'ai que le texte collé, pas le PDF ; les
lignes de facture devront venir de ce qui suit ou du fichier lui-même.
```

Transmets aussi ce que tu sais déjà, pour que le travail ne soit pas refait :

- Quel seau tu lui avais attribué
- Toute échéance ou tout montant que tu as extrait
- Si quelqu'un dans l'entreprise a déjà répondu

---

## Quand le skill destinataire n'est pas installé

Dis-le par son nom et garde l'élément. Ne le perds pas et ne prétends pas qu'il a
été traité.

```
2 factures fournisseurs sont arrivées (Ferguson 1 847 €, Sid Harvey 612 €).
ap-processor n'est pas installé, donc je les ai laissées dans « te concerne »
avec les dates d'échéance sorties.
```

Le dirigeant peut alors décider s'il l'installe ou s'il traite les factures à la
main. Dans les deux cas, rien n'est perdu — c'est la promesse que fait ce skill.

---

## Exemple travaillé — Okonkwo Mechanical

Le tri du mardi de Ray a produit trois passations :

- **Facture Ferguson Enterprises n° 88214, 1 847 €, net 30, échéance le 12 août** → `ap-processor`. PDF complet en pièce jointe, rien de codé pour l'instant.
- **Relevé Sid Harvey, 612 €** → `ap-processor`. Un relevé, pas une facture, donc signalé à Ray pour qu'il confirme que cela correspond aux deux factures déjà payées.
- **Formulaire web — propriétaire à Alamo Heights, « la clim ne refroidit pas à l'étage »** → `speed-to-lead`. Arrivé à 23 h 40, sans réponse, c'est donc la chose la plus ancienne de la file par temps de réponse.

Les trois sont apparues dans le digest sous « transmis », avec une ligne
chacune. Ray sait où elles sont allées.