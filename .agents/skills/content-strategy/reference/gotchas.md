# Pièges

## Piège : confondre corrélation et causalité

Les données de ventes montrent qu'un produit a culminé en mars. Cela ne veut pas dire
que le marketing de mars l'a causé — il peut s'agir d'une demande saisonnière.

**Pourquoi c'est important :** si tu pousses fort sur un produit à faible rotation
simplement parce qu'il s'est bien vendu une fois, tu gaspilles une énergie créative
sur quelque chose qui ne parle réellement pas à ta clientèle.

### À éviter

« Les widgets se sont vendus à 10 unités en mars. Pousse les widgets fort en mai,
puisque mars a marché. »

### À faire

« Les widgets se vendent bien en mars. Vérifie si c'est une demande saisonnière
(cadeaux de fin d'année fiscale ?) ou un pic isolé. Si c'est saisonnier,
positionne-toi pour mars l'an prochain. Si c'est isolé, ne surinvestis pas dessus. »

---

## Piège : ignorer les produits à faible rotation et forte marge

Le chiffre d'affaires est séducteur. Un service à faible volume et forte marge (comme
le conseil) peut générer moins de chiffre d'affaires total qu'un produit de grande
consommation bon marché, mais il est bien plus rentable.

**Pourquoi c'est important :** si tu n'as d'yeux que pour les champions du volume et
que tu ignores les leaders de marge, tu priorises le travail inutile sur la
rentabilité.

### À éviter

« Les forfaits service ont rapporté 500 € au total, mais les packs de widgets en ont
rapporté 2 000 €. Pousse les widgets. »

### À faire

« Pose la question : qu'est-ce qui rapporte le plus de profit par unité ? Les forfaits
service peuvent être 70 % de marge × 500 € = 350 € de profit. Les packs de widgets
peuvent être 20 % de marge × 2 000 € = 400 € de profit. L'histoire est tout autre. »

---

## Piège : des repères saisonniers qui ne collent pas à ta niche

« Le commerce de détail culmine en novembre » est vrai pour beaucoup, pas pour tous.
Un service de déclaration d'impôts culmine en mars ; une entreprise de piscines
culmine en mai.

**Pourquoi c'est important :** les repères génériques t'orientent dans le mur. Demande
toujours à l'utilisateur : « Est-ce que cette saisonnalité colle à ta réalité ? »

### À éviter

« Les repères du secteur disent que le T4 est le pic du commerce de détail. Tu es une
entreprise de piscines. Pousse fort au T4 quand même. »

### À faire

« Les entreprises de piscines culminent de mai à août. Les repères du T4 ne
s'appliquent pas. Confirme avec l'utilisateur : « Vos ventes culminent-elles de mai à
août ? » »

---

## Piège : manquer la vue d'ensemble

« Ce qui se vend » peut désigner le chiffre d'affaires, la marge, la vitesse de rotation,
la valeur vie client ou la rétention. Des indicateurs différents racontent des histoires
différentes.

**Pourquoi c'est important :** choisis le mauvais indicateur et tu priorises des
produits qui brillent une fois mais ne ramènent pas de clients fidèles.

### À éviter

Supposer que « meilleure vente » = chiffre d'affaires le plus élevé. Classer uniquement
par chiffre d'affaires.

### À faire

« Comment mesures-tu le succès ? Chiffre d'affaires ? Profit ? Valeur vie client ?
Achats répétés ? » Classe ensuite selon l'indicateur retenu — ou combine plusieurs
indicateurs pour l'équilibre.

---

## Piège : ne pas tenir compte des contraintes de stock

Un produit peut se vendre comme des petits pains, mais si le stock est bas, pousser
fort peut créer des ruptures et de la déception.

**Pourquoi c'est important :** tu veux déclencher des ventes, pas casser l'expérience
client.

### À éviter

« Les ventes de widgets sont bonnes. Pousse encore plus les widgets. »

### À faire

« Les ventes de widgets sont bonnes, mais le stock est tombé à 5 unités. Signale :
« Avant de pousser, confirme le stock. Envisage de promouvoir une alternative
similaire ou de mettre en pause jusqu'au réapprovisionnement. » »

---

## Piège : profil QuickBooks non configuré avant la première utilisation

Les nouveaux utilisateurs de QuickBooks sautent souvent la configuration du profil
d'entreprise (secteur d'activité, raison sociale). Quand tu essaies de récupérer les
données de compte de résultat, le connecteur renvoie une erreur
`profile_info_required`.

**Pourquoi c'est important :** une erreur qui bloque tout le monde agace l'utilisateur.
La validation en amont évite le temps perdu.

### À éviter

Utilisateur : « Qu'est-ce que je dois publier ? »
Skill : [appelle profit_loss_quickbooks_account] → Erreur : « Profil requis »
Utilisateur : [perdu, ne sait pas quoi faire ensuite]

### À faire

Utilisateur : « Qu'est-ce que je dois publier ? »
Skill : [appelle company-info] → Secteur d'activité = « Inconnu »
Skill : « J'ai besoin de ton secteur d'activité pour récupérer les bons repères. Dans
quel secteur es-tu ? »
Utilisateur : [indique son secteur d'activité]
Skill : [appelle quickbooks-profile-info-update] → Profil mis à jour
Skill : [appelle maintenant profit_loss_quickbooks_account avec succès]

---

## Piège : limitation de débit PayPal sur les appels répétés

Si tu appelles `list_transactions` plusieurs fois d'affilée (par exemple en bouclant sur
des plages de dates), PayPal peut limiter le débit et renvoyer des erreurs 429.

**Pourquoi c'est important :** sans logique de réessai, la compétence casse en pleine
analyse alors qu'elle devrait se dégrader proprement.

### À éviter

Appel list_transactions → erreur 429 → le skill plante

### À faire

Appel list_transactions → erreur 429 → Attends 30 secondes → Réessaie → Si toujours
bloqué, propose un repli : « PayPal est temporairement limité en débit. Tu veux
basculer sur QuickBooks/Square, ou continuer avec des données partielles ? »