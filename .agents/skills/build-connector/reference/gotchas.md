# Pièges

Les modes de défaillance. Plusieurs sont des problèmes de sécurité, et le
dirigeant n'aura aucun d'entre eux en tête.

---

## Piège : demander au dirigeant de coller un mot de passe

**Pourquoi c'est important :** l'échec le plus grave dans ce skill. Un mot de
passe dans une conversation est un identifiant dans un endroit où il n'a rien à
faire, et il accorde généralement bien plus d'accès que l'intégration n'en a
besoin.

### À éviter

```
C'est quoi ton identifiant ServiceTrade ? Je mets la connexion en place.
```

### À faire

```
Il faut un jeton d'API en lecture seule, pas ton identifiant. Crée-en un dans
Paramètres → API, puis ajoute-le via les paramètres du connecteur — ne le colle
pas ici.
```

Jetons et OAuth uniquement. Si un système n'offre rien d'autre qu'une
authentification par mot de passe, dis-le et laisse le dirigeant décider en
connaissance de cause, plutôt que de contourner le problème.

Quel que soit le type d'identifiant, il va dans le stockage d'identifiants
propre à la plateforme — jamais dans un fichier, une invite ou une URL.

---

## Piège : utiliser le login du dirigeant au lieu d'un utilisateur d'intégration dédié

**Pourquoi c'est important :** un accès lié au login personnel du dirigeant ne
peut pas être révoqué plus tard sans le verrouiller dehors de son propre compte.

### À éviter

Connecter l'intégration avec le nom d'utilisateur et le mot de passe du
dirigeant, ou avec sa session OAuth personnelle, parce que c'est le compte déjà
ouvert devant lui.

### À faire

Là où la plateforme le permet, crée plutôt pour le connecteur un utilisateur
d'intégration dédié (ou un jeton à périmètre restreint rattaché à celui-ci).
L'accès pourra être révoqué plus tard sans toucher au login du dirigeant.

---

## Piège : créer un connecteur avant de dire ce qu'il atteint

**Pourquoi c'est important :** un dirigeant qui ne sait pas ce qu'un connecteur
peut voir ou faire avant sa création ne peut pas accepter sérieusement.

### À éviter

Connecter d'abord, ne mentionner le périmètre que si on le demande.

### À faire

```
La connexion Zapier a besoin de ServiceTrade connecté dans ton compte Zapier.
Il verra les ordres de travail et les clients. Il ne peut rien modifier ni voir
la facturation.

Connecte-le dans Zapier sous Apps → ServiceTrade — connecte-toi directement sur
place, ne colle aucun mot de passe ici.
```

---

## Piège : demander plus d'accès que nécessaire

**Pourquoi c'est important :** un connecteur avec un accès en écriture au système
de référence peut faire des dégâts que le dirigeant ne peut ni annuler ni même
remarquer.

### À éviter

Demander un accès complet parce que c'est plus simple que de déterminer le
minimum.

### À faire

```
Le lecture seule suffit ici — il n'a besoin que de voir les ordres de travail.
Si tu veux plus tard qu'il les crée, c'est un changement distinct et j'ajouterais
des gardes de validation.
```

Un périmètre étroit, exprimé en termes simples, avant toute création.

---

## Piège : construire avant d'avoir vérifié

**Pourquoi c'est important :** une heure passée à construire quelque chose qui
existait déjà est une heure que le dirigeant a payée pour rien.

### À éviter

Se mettre immédiatement à créer une connexion Zapier — ou pire, se mettre à écrire
du code sur mesure contre l'API REST de l'outil.

### À faire

Vérifie d'abord l'annuaire des connecteurs Claude et le registre MCP, puis
Zapier, puis les exports planifiés. Rapporte la conclusion, puis construis — et
la construction, c'est la connexion Zapier, jamais du code API écrit à la main.

---

## Piège : un périmètre sans borne

**Pourquoi c'est important :** « Connecte mon ERP » n'a pas de définition de
« terminé ». Ça devient un projet, ça s'enlise, et le dirigeant en conclut que
toute la capacité ne marche pas.

### À éviter

Prendre « connecte mon ERP » comme le besoin.

### À faire

```
Que veux-tu en faire en premier ? Si c'est « voir les ordres de travail ouverts
dans mon brief du matin », c'est constructible cet après-midi. Tout le système,
c'est une plus grande conversation.
```

Commence par un endpoint qui débloque une seule chose.

---

## Piège : ne pas vérifier le palier de l'offre

**Pourquoi c'est important :** l'accès API est souvent réservé aux paliers
d'abonnement supérieurs. Construire contre une API que le dirigeant ne peut pas
utiliser est un après-midi perdu, et ça arrive souvent.

### À éviter

Lire la documentation, construire le connecteur, découvrir au moment du test que
l'endpoint de jeton renvoie 403.

### À faire

```
Une précision avant de construire : ServiceTrade réserve l'accès API aux offres
Pro et supérieures. Tu es sur quel palier ?
```

---

## Piège : survendre la fiabilité

**Pourquoi c'est important :** un connecteur sur mesure n'est pas une intégration
de première partie. Un dirigeant qui le croit n'enquêtera pas le jour où ses
données vieillissent discrètement.

### À éviter

```
Tout est en place — ServiceTrade est connecté.
```

### À faire

```
Connecté. Utile de savoir comment ça casse :
  - Le jeton expire dans 90 jours. Je te le signalerai avant.
  - S'ils changent leur API, ça cessera de fonctionner. Aucun avertissement de
    leur côté.
  - Si les ordres de travail affichent un jour zéro et que ça te paraît faux,
    c'est probablement ça, pas tes données.
```

La troisième ligne est la plus importante. Elle apprend au dirigeant à reconnaître
la défaillance plutôt qu'à croire une mauvaise réponse.

---

## Piège : défaillance silencieuse

**Pourquoi c'est important :** un connecteur qui cesse de fonctionner sans le
dire produit un résultat faussement sûr. Le brief du matin n'affiche aucun ordre
de travail ouvert, et le dirigeant le croit.

### À éviter

Renvoyer un résultat vide quand l'extraction échoue.

### À faire

Distinguer « aucun enregistrement » de « extraction impossible », et signaler le
second :

```
Ordres de travail : indisponibles — ServiceTrade a renvoyé une erreur
d'authentification. C'est un problème de connecteur, pas une file vide.
```

Pour les exports planifiés, vérifie l'ancienneté du fichier. S'il est plus vieux
que l'intervalle attendu, dis-le.

---

## Piège : un connecteur en écriture sans garde de validation

**Pourquoi c'est important :** un connecteur capable de modifier sans surveillance
le système de référence peut faire des dégâts que personne ne remarque pendant
des semaines.

### À éviter

Construire un accès en écriture parce que le dirigeant l'a demandé, sans aucune
garde.

### À faire

Chaque écriture est gardée, et la garde énonce ce qui va changer :

```
Cela marquerait OT-4471 comme terminé et fixerait la date de clôture à
aujourd'hui. Tu confirmes ?
```

Cela tient quel que soit ce que le dirigeant a demandé. Ce n'est pas une
préférence.

---

## Piège : une facture Zapier surprise

**Pourquoi c'est important :** Zapier facture à la tâche. Un dirigeant qui
découvre une facture mensuelle de 70 € en accuse l'intégration, et il a raison de
le faire.

### À éviter

Construire la connexion Zapier sans rien dire du coût.

### À faire

```
Cela passe par Zapier — environ 40 tâches par jour à ton volume, ce qui
correspond à leur palier à 30 €. Si ça en vaut la peine, très bien, mais autant
le savoir d'abord.
```

---

## Piège : choisir l'astucieux plutôt que l'ennuyeux

**Pourquoi c'est important :** le dirigeant ne peut déboguer quoi que ce soit.
Une intégration astucieuse qui casse en novembre est pire qu'une intégration
ennuyeuse qui ne casse jamais.

### À éviter

Construire un contournement au niveau de l'écran parce qu'il est plus
automatique qu'un export hebdomadaire.

### À faire

```
Je pourrais automatiser ça en pilotant leur interface web, mais ça casserait à
chaque changement de page et tu n'aurais aucun avertissement.

Tu pourrais plutôt exporter le CSV une fois par semaine ? Moins astucieux, mais
encore fonctionnel l'an prochain.
```

Recommander l'étape manuelle est souvent le bon choix, et les dirigeants
respectent qu'on leur dise lequel des deux l'est.