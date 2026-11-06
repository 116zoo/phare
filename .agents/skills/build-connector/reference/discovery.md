# Découverte

Ce fichier explique comment découvrir les façons de se connecter à l'outil
nommé, dans un ordre précis. Dès qu'une section trouve une correspondance,
arrête-toi — inutile de descendre les autres chemins. Le plus souvent, quelque
chose existe déjà, et le trouver prend dix minutes contre une heure de
construction.

---

## 1. Chercher les connecteurs Claude natifs

**Voie principale — `ToolSearch`.** Vérifier si Claude peut déjà atteindre cet
outil :

1. Appeler `ToolSearch` avec le nom exact du produit comme requête, par exemple
   `ToolSearch({query: "ServiceTrade", max_results: 5})`.
2. Si cela ne renvoie rien de pertinent, réessayer une fois avec la catégorie de
   l'éditeur plutôt que le nom de la marque (par exemple
   `"field service management"`).

`ToolSearch` ne trouve que les connecteurs déjà configurés pour cette session —
un échec ici n'exclut pas qu'un serveur existe sans avoir encore été ajouté. Un
résultat peut revenir deux fois, comme entrée propre du dirigeant et comme
enregistrement `small-business:<name>` du plugin ; c'est un seul connecteur :
utilise l'entrée qui est autorisée, celle du dirigeant si les deux le sont
(`../../../shared/connector-neutrality.md`, « Un connecteur, deux
enregistrements »).

**Voie secondaire — chercher dans le registre MCP.** Si `ToolSearch` ne renvoie
rien, vérifie s'il existe un serveur MCP pour cet outil quelque part dans
l'écosystème ouvert :

1. Chercher dans `ToolSearch` un outil `SearchMcpRegistry` — certains hôtes
   l'exposent nativement. S'il est disponible, l'appeler avec le nom du produit.
2. Sinon, appeler `WebFetch` sur
   `https://registry.modelcontextprotocol.io/v0.1/servers?search=<exact product name>`
   — une API publique, sans authentification, avec les mêmes données
   sous-jacentes.

Si l'une des recherches ci-dessus trouve une correspondance, c'est la réponse :
guider le dirigeant à travers la connexion est tout le travail, et c'est le
meilleur résultat. Sinon, passer à la section 2.

---

## 2. Chercher les connexions Zapier

**Voie principale — le MCP Zapier est présent.** Ce plugin le déclare dans
`.mcp.json`, c'est donc normalement le cas :

1. Appeler `ToolSearch` pour `discover_zapier_actions` — l'outil de découverte
   d'applications et d'actions de Zapier — puis l'exécuter avec le nom exact du
   produit de l'étape 1.
2. Si elle est listée, vérifier la présence du déclencheur ou de l'action
   précise dont ce cas d'usage a besoin, et pas seulement que l'application est
   sur Zapier. Une application présente sur Zapier mais dépourvue de l'action
   dont le périmètre a besoin n'est pas une correspondance — dis-le clairement
   et passe à la section 3.

**Repli — le MCP Zapier n'est pas installé ou n'est pas joignable.** Vérifie
plutôt directement l'annuaire public des applications :

1. Récupère `zapier.com/apps/<product-slug>/integrations.md` avec `WebFetch` —
   la version markdown, pas la page HTML — pour voir si l'application y est
   listée et avec quoi elle s'intègre.
2. Considère cela comme moins fiable que la voie MCP — cela confirme que
   l'application existe sur Zapier, mais pas quel déclencheur ou quelle action
   est disponible. Confirme une fois la connexion MCP disponible.
3. Si ce n'est toujours pas clair quelle surface utiliser,
   `zapier.com/llms.txt` et `zapier.com/.well-known/ai-catalog.json` sont les
   index lisibles par machine de Zapier pour ses surfaces de découverte (MCP,
   SDK, annuaire des applications) — une carte de où regarder, pas des outils de
   recherche en soi.

**Adéquation et coût.** Zapier convient quand le besoin est une consultation ou
une action à la demande, que le volume est faible, ou que l'alternative est un
développement sur mesure fragile. Il ne convient pas pour extraire de gros
volumes de données historiques, ni partout où un coût par tâche
s'additionnerait — Zapier facture à la tâche. Voir `zapier.com/pricing.md` pour
les paliers d'offre et la facturation des tâches avant de t'engager sur cette
voie ; l'estimation est présentée au dirigeant (`use-zapier.md`, « Estimer la
facture de tâches »).

Si aucune connexion n'est trouvée pour cette application ou ce service, passer à
la section 3.

---

## 3. Chercher une API documentée

Le SaaS moderne a presque toujours une API, même quand la page de tarifs n'en
parle pas. Ceci sert de contexte sur ce qui est techniquement possible — jamais
de chemin de construction manuelle, selon la règle du skill lui-même.

1. Récupère `docs.<vendor>.com` ou `developer.<vendor>.com` avec `WebFetch` — la
   plupart des éditeurs publient leur documentation API à l'un de ces deux
   endroits.
2. Si aucun des deux ne répond, cherche « API » dans la base de connaissances du
   support de l'éditeur, et vérifie les paramètres de compte du dirigeant pour
   une section clé API — une section clé API prouve qu'elle existe, même sans
   documentation.
3. S'il n'y a toujours rien, regarde sur le forum communautaire de l'éditeur les
   questions d'intégration — l'existence d'une API y apparaît souvent avant
   d'être officiellement documentée.

Ce qu'il faut établir une fois trouvée — authentification, endpoints et limites ;
ignore la documentation du SDK, les tutoriels et les pages marketing :

| Question | Pourquoi c'est important |
|---|---|
| Méthode d'authentification | OAuth et jetons, c'est bien. Le mot de passe seul est un problème à signaler. |
| Limites de débit | Déterminent si une extraction quotidienne est viable |
| Les endpoints spécifiques nécessaires | Pas toute l'API, seulement ce que l'étape 1 a délimité |
| Si l'offre du dirigeant inclut l'accès API | Souvent réservé aux paliers supérieurs — à vérifier avant de construire |
| Si les écritures sont prises en charge | Détermine ce qui est possible et quelles gardes sont nécessaires |
| Le journal des versions | À quelle fréquence l'API casse — un indice sur la fiabilité globale de l'outil, même si rien ne se construit contre elle |

**Vérifie tôt le palier de l'offre.** Construire contre une API que l'abonnement
du dirigeant n'inclut pas, c'est un après-midi perdu, et ça arrive souvent.

**API documentée ou non, cela n'arrête jamais la recherche — c'est du contexte
pour ce que tu diras ensuite, jamais un chemin de construction.** Passe à la
section 4.

---

## 4. Vérifier un export planifié

Sous-estimé, et souvent la meilleure réponse.

Beaucoup de systèmes savent envoyer un rapport par email ou déposer un CSV
selon un calendrier — quotidien, hebdomadaire, mensuel. Si le besoin est
« extraire les ordres de travail chaque matin », un export planifié vers une
boîte surveillée règle le problème avec presque rien qui puisse casser, et rien
à connecter du côté de Claude — le dirigeant le configure dans ses propres
paramètres.

Où regarder : paramètres de reporting, rapports planifiés, abonnements, envoi
automatisé.

**Ce n'est pas une option de second choix.** Aucun jeton qui expire, aucune
limite de débit, aucun changement d'API côté fournisseur, aucune facture à la
tâche. Pour un besoin quotidien, elle est souvent strictement meilleure qu'une
intégration en direct. Sa faiblesse est la latence et un mode de défaillance
silencieux — le montage et le contrôle de péremption sont dans `paths.md`,
section 3.

---

## 5. Rien du tout

Plus rare qu'il n'y paraît, mais réel — certains systèmes anciens sur site et
certains systèmes verticaux n'ont aucune surface externe.

Dis-le honnêtement, et donne les options qui restent :

```
Réponse franche : JobBoss sur site n'a pas d'API et n'est pas sur Zapier. Rien
de propre ici.

Deux choses qui fonctionneraient :
  - Il peut exporter en CSV manuellement. Si tu déposes ce fichier chaque
    semaine, tout l'aval fonctionne à partir de là.
  - Il existe une fonction de rapport planifié qui envoie un PDF par email. Plus
    pénible à analyser, mais automatique.

Le CSV est plus fiable. On tente ça ?
```

Un non honnête accompagné d'un contournement est plus utile qu'un développement
fragile par scrapping d'écran que le dirigeant ne pourra pas maintenir.

---

## Rapporter la conclusion

Avant de construire quoi que ce soit, dis ce qui a été trouvé et ce que cela
implique dans le temps :

```
ServiceTrade n'est pas dans l'annuaire des connecteurs Claude, mais il est sur
Zapier avec des recherches d'ordres de travail qui couvrent ton besoin.

Une précision : à ton volume, cela tombe sur l'offre payante de Zapier. Utile à
savoir avant qu'on construise.

La configuration prend une vingtaine de minutes côté dirigeant. Je te guide
étape par étape ?
```

Rappelle-toi la règle du skill : même quand la découverte trouve une API
documentée propre, c'est du contexte, pas un chemin de construction — le chemin
de construction, c'est Zapier, ou un export planifié quand Zapier n'a pas
l'outil.

Coût, effort et blocage en trois lignes. De quoi suffire au dirigeant pour
décider.