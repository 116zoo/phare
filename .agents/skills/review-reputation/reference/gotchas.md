# Pièges — review-reputation

## Piège : publier une réponse publique sans approbation

**Pourquoi c'est important :** une réponse à un avis est définitive, publique, et
attribuée au dirigeant par son nom. Elle est lue par chaque futur client qui
trouve cet avis. Il n'existe aucune version de « on s'en occupera au prochain
passage » qui rattrape cela.

### ✗ À éviter

Rédiger huit réponses, les publier toutes, puis montrer au dirigeant ce qui est
parti.

### ✓ À faire

Présente chaque brouillon à côté de l'avis auquel il répond et obtiens un « oui »
sur celui-là avant de le publier. Approuve un par un — une approbation par lot
sur huit réponses publiques, c'est comme ça qu'une mauvaise se met en ligne.

---

## Piège : mélanger les moyennes de notes entre plateformes

**Pourquoi c'est important :** le 4,3 de Google et le 4,0 de Yelp décrivent des
populations d'auteurs d'avis différentes. Une moyenne des deux est un nombre qui
n'existe nulle part, et le dirigeant le répétera à un client ou l'imprimera sur
un camion.

### ✗ À éviter

> Votre note globale est de 4,2 sur 45 avis.

### ✓ À faire

> Google : 4,3 (34 avis), en baisse depuis 4,6 le trimestre dernier.
> Yelp : 4,0 (11 visibles). Pools d'auteurs d'avis différents — pas de moyenne.

---

## Piège : traiter une extraction web partielle comme un relevé complet

**Pourquoi c'est important :** les pages d'avis publiques paginent, tronquent et
réordonnent. Un rapport bâti sur la première page se lit comme la vue d'ensemble,
donc le dirigeant conclut qu'il n'y a aucune nouvelle réclamation alors qu'il y
en a trois en page deux.

### ✗ À éviter

> Yelp, avis : 6

### ✓ À faire

> Yelp (web, partiel) : 6 — la page n'affiche que les plus récents

Puis demande un export une seule fois. Cela prend deux minutes au dirigeant et
corrige chaque exécution ensuite.

---

## Piège : classer les clients silencieux par le silence seul

**Pourquoi c'est important :** une liste triée par le plus long intervalle se
remplit de clients annuels parfaitement satisfaits et d'acheteurs uniques qui ne
reviendraient pas. Le dirigeant travaille le haut de la liste, la trouve inutile,
et cesse de s'en servir.

### ✗ À éviter

Trier tous les clients par le nombre de jours depuis la dernière commande et
remettre 200 noms.

### ✓ À faire

Mesure chaque client par rapport à son propre intervalle médian, puis classe par
valeur passée. Quinze noms que le dirigeant appellera vraiment valent mieux que
deux cents qu'il n'appellera pas. Mets en tête quiconque a laissé un mauvais avis
puis s'est tu, quelle que soit sa valeur — ils ont dit ce qui n'allait pas et
sont partis quand même.

---

## Piège : offrir une remise que le dirigeant n'a jamais autorisée

**Pourquoi c'est important :** un message de reconquête qui promet 20 % de
réduction est un engagement que le dirigeant devra tenir une fois le message
arrivé. Le rédiger avant d'avoir demandé transforme un problème de perte de
client en problème de marge, et le dirigeant l'apprend quand le client
l'utilise.

### ✗ À éviter

> Bonjour Dana — vous nous avez manqué. Voici 20 % de réduction sur votre
> prochaine intervention.

Personne n'a accepté 20 %.

### ✓ À faire

Demande ce qui est sur la table avant de rédiger : une offre, un simple mot, ou
un appel du dirigeant. Rédige uniquement dans les limites de cette réponse, et
dis clairement quand un appel vaut mieux qu'un bon de réduction — un e-mail à
quelqu'un qui a dépensé 9 000 € chez toi se lit comme un envoi de masse.

---

## Piège : discuter avec un auteur d'avis en public

**Pourquoi c'est important :** le public n'est pas l'auteur de l'avis. C'est le
prochain client qui lit l'échange et qui décide comment cette entreprise se
comporte quand on la provoque. Une réfutation correcte et bien étayée fait quand
même perdre ce lecteur.

### ✗ À éviter

> Nos registres montrent que le technicien est arrivé dans le créneau prévu et
> que notre politique indique clairement que les commandes de pièces prennent
> 5 à 7 jours ouvrés.

### ✓ À faire

Corrige un seul point factuel, propose un vrai canal de contact, et arrête-toi.
Moins de 60 mots. Si l'avis enfreint les règles de la plateforme, explique
honnêtement au dirigeant la voie de suppression — y compris que la plupart des
demandes sont rejetées — plutôt que de promettre qu'il sera retiré.

---

## Piège : limites de débit de PayPal sur les requêtes de litiges

**Pourquoi c'est important :** l'API des litiges PayPal bride fortement sur les
plages de dates qui contiennent beaucoup de litiges. Des nouvelles tentatives
silencieuses font perdre le temps de l'utilisateur sans aucun retour.

### ✗ À éviter

Réessayer 3× automatiquement sans retour. L'utilisateur voit un indicateur de
chargement pendant plus de 30 secondes avant une erreur.

### ✓ À faire

À la première erreur de limite de débit, saute PayPal, ajoute
`PayPal : limité — non inclus` à la section Sources, et continue avec les autres
connecteurs. Mentionne que l'utilisateur peut réessayer avec une plage de dates
plus étroite.

---

## Piège : citations verbatim paraphrasées ou résumées

**Pourquoi c'est important :** le dirigeant doit voir les mots exacts du client —
pas l'interprétation de Claude. La paraphrase détruit la crédibilité du rapport.

### ✗ À éviter

**Thème : livraison lente** (8 signaux)
> Les clients ont signalé que les livraisons arrivaient plus tard que prévu.

### ✓ À faire

**Thème : livraison lente** (8 signaux)
> « Commandé il y a 2 semaines et toujours rien — c'est inacceptable. » — [Gmail]
> « Le colis avait 10 jours de retard et le support n'a jamais répondu. » — [Zoho Desk]

---

## Piège : HubSpot qui renvoie 0 tickets, traité comme une erreur

**Pourquoi c'est important :** les portails de test et les nouveaux comptes ont
légitimement 0 ticket. Afficher un avertissement crée du bruit et érode la
confiance.

### ✗ À éviter

> ⚠️ HubSpot a renvoyé 0 ticket. Vérifie ta connexion ou tes permissions.

### ✓ À faire

Note `HubSpot tickets: 0` dans la section Sources et continue. Ne signale un
problème de connecteur que si l'authentification elle-même échoue.

---

## Piège : liste de mots-clés Gmail trop étroite

**Pourquoi c'est important :** les clients n'utilisent pas les mots-clés de
réclamation standard. Une expérience à une étoile ressort souvent sous « ça a
pris une éternité » ou « jamais deux fois », pas « déçu ».

### ✗ À éviter

Chercher uniquement : `remboursement annulation mécontent`

### ✓ À faire

Utilise la liste de départ complète dans `sources.md`, qui contient des
formulations comme « ça a pris une éternité » et « jamais deux fois ». Laisse
l'extraction des thèmes filtrer le signal du bruit — trop en inclure coûte moins
cher qu'un thème manqué.