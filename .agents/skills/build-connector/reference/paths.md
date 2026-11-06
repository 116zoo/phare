# Chemins de construction

Les options, par ordre de préférence. Préfère l'option ennuyeuse — le dirigeant
ne peut pas déboguer une intégration astucieuse qui échoue en novembre.

**Il n'existe aucun chemin de construction par API directe.** Même quand un outil
a une API REST propre et bien documentée, ne construis pas à la main un
connecteur contre elle : ce code devient celui de l'entreprise à maintenir —
gestion du jeton, limites de débit, changements silencieux du fournisseur — et
personne ici ne le maintiendra. Quand l'annuaire des connecteurs Claude n'a
rien, le chemin de construction, c'est Zapier.

---

## 1. Connecteur Claude existant / serveur MCP

**Quand :** qu'il en existe un dans l'annuaire des connecteurs Claude (ou le
registre MCP) et qu'il couvre le besoin.

Toujours le premier choix. Quelqu'un d'autre le maintient, il survit aux
changements d'API côté fournisseur, et il n'y a rien de sur mesure qui puisse
casser.

Travail : installation, authentification, vérification du périmètre. Généralement
quelques minutes.

---

## 2. Connexion Zapier

**Quand :** rien dans l'annuaire, et l'outil fait partie des 8 000+ applications
de Zapier. C'est le chemin de construction quand l'annuaire n'a rien ; la
mécanique est dans `use-zapier.md`.

Bon pour : « quand un ordre de travail est créé, faire X ». Zapier gère le
déclencheur et le branchement.

Mauvais pour : les extractions historiques en masse, ou tout ce qui est à fort
volume. Zapier facture à la tâche et le calcul devient vite défavorable.

**Dis le coût à voix haute.** Un dirigeant qui découvre une facture Zapier
mensuelle de 70 € à laquelle il ne s'attendait pas en accuse l'intégration, et
il n'a pas tort.

```
Cela fonctionne via Zapier. Environ 40 tâches par jour à ton volume, ce qui
correspond à leur palier à 30 €. Si ça en vaut la peine, très bien — autant le
savoir avant qu'on construise.
```

---

## 3. Export planifié

**Quand :** pas dans l'annuaire et pas sur Zapier, mais que le système peut
envoyer un email ou déposer un fichier selon un calendrier.

**Sous-estimé.** Aucun jeton qui expire, aucune limite de débit, aucun
changement d'API. Pour un besoin quotidien, il est souvent strictement meilleur
qu'une intégration en direct.

Mise en place :

1. Configurer l'export dans le système source — quotidien, vers une adresse
   précise
2. Surveiller cette boîte pour le fichier
3. L'analyser et l'utiliser

La principale faiblesse est la latence. Un export quotidien ne peut pas prendre
en charge ce qui exige des données de l'heure. Dis-le plutôt que de laisser le
dirigeant le découvrir.

**Le mode de défaillance est silencieux.** Si l'export cesse d'arriver, rien ne
signale d'erreur — les données vieillissent, c'est tout. Intègre un contrôle : si
aucun fichier n'est arrivé depuis plus longtemps que l'intervalle attendu,
dis-le fort.

---

## 4. Contournement au niveau de l'écran

**Quand :** tout le reste a échoué et que le besoin est réel.

Fragile par nature. Il casse dès que le fournisseur change son interface, ce
qu'il fait sans prévenir.

Uniquement approprié quand :

- Les données sont réellement inaccessibles autrement
- Le besoin est assez important pour justifier la maintenance
- Le dirigeant comprend qu'il cassera, et à peu près à quelle fréquence

Dis-le clairement :

```
Cela fonctionnerait, mais c'est tenu avec du scotch — le moindre changement
d'interface de leur côté le casse, et tu n'aurais aucun autre indice que
l'arrêt des données.

Avant d'en arriver là : peux-tu exporter ceci à la main une fois par semaine ?
Moins astucieux, mais ça fonctionnera encore l'an prochain.
```

Recommander l'export manuel plutôt que l'automatisation fragile est
généralement le bon choix, et les dirigeants respectent qu'on le dise.

---

## Choisir quand plusieurs options conviennent

| Priorité | Raisonnement |
|---|---|
| Le moins de pièces en mouvement | Chaque composant est une pièce qui peut casser sans surveillance |
| Rien à maintenir | Le dirigeant ne peut pas le déboguer et ne paiera personne pour le faire |
| Échoue bruyamment | Une défaillance silencieuse est pire que pas de connecteur |
| En lecture seule quand c'est possible | Un accès plus étroit, des conséquences plus limitées |
| Aucun coût par tâche | Sauf si le dirigeant y a consenti |

**Un CSV quotidien qui fonctionne toujours vaut mieux qu'une API en direct qui
casse chaque trimestre.** Le vrai besoin du dirigeant, c'est que son brief du
matin soit juste, pas que l'intégration soit élégante.

---

## Délimiter la construction

Quel que soit le chemin, ne construis que ce qui a été délimité.

```
À éviter : Connecter ServiceTrade.
À faire  : Extraire chaque jour les ordres de travail ouverts, avec client,
           description et assigné, pour qu'ils apparaissent dans le brief du
           matin.
```

Le second est constructible cet après-midi et testable contre une réponse
connue. Le premier est un projet sans définition de « terminé ».

On peut ajouter d'autres endpoints quand quelque chose en a besoin. Construire
toute la surface de l'API par avance, c'est sécuriser et maintenir du code que
rien n'utilise.