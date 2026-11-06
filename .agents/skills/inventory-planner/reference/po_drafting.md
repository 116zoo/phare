# Rédaction des bons de commande et des mails fournisseurs

Transformer une liste d'achat approuvée en documents, et la garde qui se tient
devant les deux.

---

## La garde

Un bon de commande engage l'argent du dirigeant, et un mail fournisseur part au
nom de celui-ci. Rien ne se fait sans un oui explicite.

Annonce avant de demander :

> Ferguson : 8 références, 640 unités, 4 180 €. Watsco : 3 références, 2 290 €.
> Total 6 470 € sur deux bons de commande. Je les rédige ?

**Le montant passe avant la question.** Le dirigeant décide sur de la
trésorerie, et les quantités seules ne lui disent pas ce qu'il a besoin de
savoir.

Fais valider fournisseur par fournisseur, pas liste d'achat par liste d'achat. Un
dirigeant peut vouloir la commande Ferguson aujourd'hui et celle de Watsco la
semaine prochaine ; forcer un oui ou non sans nuance obtient un non.

---

## Structure du bon de commande

Un bon de commande par fournisseur. Contenu standard :

- Numéro de bon de commande, en suivant la numérotation existante du dirigeant
  s'il en a une — demande plutôt que de démarrer une nouvelle série
- Date, et date de livraison demandée calculée sur le délai
- Adresse de livraison et adresse de facturation
- Lignes : SKU, description, quantité, conditionnement ou unité de mesure, prix
  unitaire, prix total
- Sous-total, fret attendu, total
- Les conditions du dirigeant, le mode de paiement et le contact

**Utilise le dernier prix connu par référence et dis de quand il date.** Un
prix vieux de quatre mois fait très bien l'affaire ; un prix présenté comme à
jour alors qu'il ne l'est pas prépare un litige sur écart plus tard. Quand aucun
prix n'est connu, laisse le champ vide plutôt que de deviner — le fournisseur
le chiffrera.

---

## Mail fournisseur

Lis le profil de voix partagé dans `../../../shared/voice-profile.md` avant
d'écrire. Ces mails partent au nom du dirigeant vers des gens avec qui il a de
vraies relations, et un message qui sonne comme du logiciel abîme cette relation.

Garde-le court. Le contenu utile :

- Ce qui est commandé, ou une référence au bon de commande joint
- La date à laquelle ils en ont besoin, et pourquoi si le délai est tendu
- Une question éventuelle — disponibilité, substitution, vérification de prix
- Comment le dirigeant veut être confirmé

Ce qu'il faut éviter : s'excuser de commander, trop en dire, et toute formule de
politesse que le dirigeant n'écrirait pas lui-même.

**Une question sur le prix vaut la peine quand le dernier prix connu est
périmé.** Demander « le carton est-il toujours à 14,80 € ? » coûte une ligne et
évite l'écart que `ap-processor` signalerait sinon à l'arrivée de la facture.

---

## Substitutions et commandes en attente

Quand un fournisseur revient avec une substitution ou une livraison partielle :

- Recalcule la couverture en jours sur ce qui arrive réellement, pas sur ce qui
  a été commandé
- Signale l'écart et s'il change la date de rupture
- N'accepte jamais une substitution à la place du dirigeant. Une référence
  différente, c'est une décision sur ce qui part sur le chantier d'un client

---

## Transmission à la comptabilité

Quand QuickBooks ou NetSuite est connecté, les bons de commande approuvés
alimentent le grand livre pour que `ap-processor` puisse faire le rapprochement à
trois voies à l'arrivée de la facture. Cela boucle la boucle : ce qui a été
commandé, ce qui est arrivé, ce qui a été facturé.

Quand ils ne le sont pas, conserve les bons de commande comme fichiers et dis au
dirigeant qu'ils font foi pour le rapprochement. Un bon de commande que personne
ne retrouve plus tard est un bon de commande incapable de détecter une
sur-facturation.

---

## Rythme d'agenda

Avec Google Calendar connecté, propose un créneau récurrent pour la revue de
réapprovisionnement — hebdomadaire ou bimensuel, selon les délais.

Cela marche bien mieux comme rythme que comme urgence. Un dirigeant qui regarde
la liste d'achat tous les mardis pendant vingt minutes manque rarement de stock.
Celui qui regarde quand un client demande quelque chose a déjà le problème.

Propose une fois. S'il refuse, ne redemande pas.

---

## Exemple travaillé

La commande de juin de Ray, après validation.

**BC 2041 — Ferguson Supply**, livraison demandée le 12/06
- 240 u, filtre Merv 11 20x25x1, 3,70 € l'unité, 888,00 €
- 24 u, condensateur 45/5, 11,40 € l'unité, 273,60 €
- 6 u, contacteur bipolaire 30 A, 18,90 € l'unité, 113,40 €
- Sous-total 1 275,00 €, fret selon les conditions habituelles

Mail rédigé au représentant de Ray, trois phrases, demandant si le prix du filtre
tient toujours et confirmant la livraison du jeudi. Conservé pour validation de
Ray avant envoi.