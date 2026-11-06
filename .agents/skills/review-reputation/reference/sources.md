# Sources

Un seul socle obligatoire, tout le reste l'approfondit. Le skill fonctionne dès
le premier jour sans rien de connecté.

| Source | Statut | Ce qu'elle apporte |
|---|---|---|
| Un CRM (HubSpot, Monday.com, Salesforce, Zoho CRM), un connecteur de paiement (PayPal, Square, Stripe), **ou** une boutique en ligne (Shopify, Square) | Obligatoire — l'une des trois catégories | Tickets et retours ; litiges et remboursements ; ou historique des commandes (qui a acheté quoi et quand) plus les habitudes de traitement et de remboursement |
| Support desk (Zoho Desk) | Facultatif | Tickets par client, priorité et statut — les réclamations dans les mots du client |
| Gmail | Facultatif | Le langage des réclamations et des compliments dans les fils |
| Recherche web | Toujours disponible | Les avis publiquement visibles sur Google Business Profile, Trustpilot, Avis Vérifiés et Facebook ; Yelp seulement en dernier recours (marginal en France) |
| Avis collés ou exportés | Toujours disponible | La meilleure source qui soit, avec dates et notes |

---

## Avis publics

**Préféré : un export.** Google Business Profile, Trustpilot et Yelp permettent
tous au dirigeant de télécharger ses avis. Yelp reste marginal en France — le
SKILL.md le signale explicitement — ne le consulte que si aucune autre source
n'a rien donné. Un export porte la note, la date, le nom de l'auteur et le texte
intégral, et il inclut les avis que la page publique
fait disparaître par pagination. Demande-en un la première fois que ce skill
s'exécute ; cela prend deux minutes au dirigeant et améliore chaque exécution
ensuite.

**Solution de repli : ce qui est visible sur le web.** Récupère les pages d'avis
publiques de l'entreprise et lis ce qui s'affiche. C'est réellement utile et
réellement partiel — les pages tronquent, paginent et réordonnent. Dis-le dans la
section Sources plutôt que de présenter une extraction partielle comme complète.

**Également valable : du texte collé.** Le dirigeant colle des avis dans la
conversation. Étiquette-les `[Review]` comme n'importe quelle autre source et
utilise-les.

Pour compter, ne fais jamais la moyenne des notes entre sources. La moyenne de
Google et celle de Yelp sont deux chiffres sur deux populations différentes, et un
dirigeant qui répète un chiffre fusionné à un client aura tort.

---

## Litiges et tickets

**Litiges PayPal.** Récupère les litiges ouverts sur la fenêtre. PayPal bride
fortement sur les plages de dates larges. À la première erreur de limite de débit,
arrête-toi, note `PayPal : limité — non inclus` dans Sources, et continue. Ne
réessaie pas en silence ; propose plutôt une fenêtre plus étroite.

**Litiges et remboursements Stripe.** `GET /v1/disputes` créés sur la fenêtre
(via `stripe_api_read`), avec `reason` et `status` ; `GET /v1/refunds` pour la
même fenêtre, puisqu'une série de remboursements sur un même produit est un thème
avant d'être un avis. L'`evidence_details.due_by` d'un litige est une échéance —
fais remonter toute échéance ouverte dans la liste « fais ces trois choses ».

**Litiges Square.** Le point de terminaison des litiges via `make_api_request`
pour la fenêtre. Même traitement que Stripe.

**Tickets et retours HubSpot.** Récupère les tickets ouverts et récemment clos,
plus les retours envoyés. Zéro ticket est un état légitime pour un portail neuf ou
de petite taille — note `HubSpot tickets: 0` et passe à autre chose. Ne signale
un problème de connecteur que lorsque l'authentification elle-même échoue.

**Tickets Zoho Desk.** `getTickets` sur la fenêtre (`receivedInDays` 30 ou 90
pour correspondre ; tri par `recentThread`), puis `getThreads` sur ceux dont
l'objet se lit comme une réclamation, pour le verbatim. `getTicketsMetrics` donne
les compteurs ouverts, en retard et en attente pour l'en-tête. Les tickets
ouverts de priorité High appartiennent au décompte Litiges et tickets, pas
seulement à la liste des thèmes. `getTickets` refuse un paramètre `include` —
demande des champs supplémentaires avec `fields`.

---

## E-mail

Cherche sur la fenêtre les fils contenant du langage de réclamation et de
compliment. Liste de départ, volontairement large :

```
remboursement  annulation  mécontent  problème  souci  déçu  frustré  cassé
retard  lent  raté  manquant  jamais deux fois  une éternité  merci  sauveur
recommandé  super travail
```

Les clients utilisent rarement le mot « déçu ». Ils écrivent « une éternité » et
« jamais deux fois ». Trop inclure coûte peu ici, parce que l'extraction des
thèmes filtre le bruit ; une liste de mots-clés étroite perd en silence des
thèmes entiers.

Récupère l'objet et une ou deux phrases des mots du client — assez pour citer
verbatim plus tard.

---

## Shopify

Traité dans `churn-signals.md`. En bref : les commandes, les délais de
traitement et les remboursements, lus comme un comportement plutôt que comme une
opinion.

---

## Rapporter ce que tu as obtenu

Chaque exécution se termine par un bloc Sources honnête. Les décomptes, et les
échecs nommés :

```
Sources tirées — 28 avril au 27 juillet

  Avis Google (export)         14
  Yelp (web, partiel)           6   — marginal en France, et la page n'affiche que les plus récents
  Litiges Stripe                3
  Remboursements Stripe         7
  Tickets HubSpot               0
  Tickets Zoho Desk            12   — 2 ouverts, priorité High
  Fils Gmail                   11
  Commandes Shopify            182
```

Nomme le connecteur qui a réellement été lu sur chaque ligne (l'exemple
ci-dessus est une entreprise Stripe et Zoho Desk ; une entreprise PayPal et
HubSpot liste ceux-là). Le tiret compte autant que les chiffres. Une source qui
manque ressemble exactement à une source sans rien de grave, à moins qu'on la
nomme.