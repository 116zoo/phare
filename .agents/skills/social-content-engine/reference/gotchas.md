# Pièges

Modes de défaillance courants du skill social-content-engine.

---

## Piège : reconstruire le calendrier au lieu de l'étendre

**Pourquoi c'est important :** le calendrier est l'artefact durable — c'est lui
qui fait de ceci une opération de contenu et non un générateur de campagnes.
Quand chaque exécution repart d'un calendrier vide, le dirigeant réapprouve des
dates qu'il avait déjà approuvées, et les posts programmés le mois dernier se
font discrètement dupliquer ou disparaître.

### ✗ À éviter

```
Dirigeant : « Donne-moi un mois de posts de plus. »
→ Construire un calendrier de 30 jours tout neuf.
→ Deux lignes entrent en collision avec des posts déjà programmés dans HubSpot.
```

### ✓ À faire

```
Ouvrir d'abord le calendrier existant, puis rapporter :
  Publié depuis la dernière exécution : 6 posts (2 juin – 24 juin)
  Encore programmé :                    4 posts (jusqu'au 6 juil.)
  Trou à partir du :                    7 juil.

« Je poursuis à partir du 7 juil. Même rythme, trois par semaine ? »
```

---

## Piège : écrire un texte avant d'avoir lu le profil de voix

**Pourquoi c'est important :** la fidélité à la voix est la barrière à l'adoption
annoncée pour ce skill. Les dirigeants ne l'abandonnent pas parce que les visuels
seraient mauvais ; ils l'abandonnent parce que le texte ressemble à un compte de
marque et pas à eux. Le profil partagé existe pour qu'une correction faite une
fois vaille dans tous les skills.

### ✗ À éviter

Rédiger 12 textes dans le registre général du secteur, les présenter, puis
réécrire les 12 après que le dirigeant a dit « ça ne sonne pas comme moi ».

### ✓ À faire

Lire d'abord `../../../shared/voice-profile.md`. Ancre-toi sur les interdits avant
chaque texte, pas seulement avant le premier. S'il n'existe aucun profil,
construis-le à partir de ses propres posts et fais-le confirmer avant de rédiger
en volume.

---

## Piège : répéter un prix Shopify de mémoire

**Pourquoi c'est important :** un prix erroné dans un post public ne se corrige
pas discrètement une fois que cent personnes l'ont vu. Les prix changent d'une
session à l'autre et le calendrier a une longue durée de vie : un chiffre repris
d'une exécution précédente est presque toujours périmé.

### ✗ À éviter

« Le split miniature était à 2 400 € la dernière fois où on a publié — je
reprends ce chiffre. »

### ✓ À faire

Relis `variants[].price` à frais pour chaque post qui cite un montant. Si le
connecteur n'en a renvoyé aucun, dis que le prix est indisponible et demande. Ne
revendique « avant X, maintenant Y » que si `compare_at_price` existe et est
réellement plus élevé.

---

## Piège : générer le moindre design Canva pour une ligne email

**Pourquoi c'est important :** Canva est totalement hors périmètre pour le chemin
email. L'autofill de modèles d'email Canva produit des visuels de remplacement
(paysages génériques, rectangles vides) dans les tuiles de grille de prestations,
et les vignettes de variante ne s'affichent pas dans le chat. Pour ce skill, les
emails sont en texte seul, sans exception. Générer ne serait-ce qu'un seul design
Canva pour un email casse cette règle.

### ✗ À éviter

```
Le calendrier compte 6 lignes social + 2 lignes email.
→ L'étape 6 génère 6 designs social + 2 designs email.
→ Les designs email partent avec des tuiles de remplacement.
```

Ou toute variante : « Je génère le modèle d'email juste pour te donner une
référence visuelle », « J'ai trouvé un modèle d'email qui pourrait marcher, tu
veux un aperçu ? », « Voici un design Canva pour l'email du 5 juin… » — tout est
interdit.

### ✓ À faire

```
Étape 2 : calendrier construit avec la colonne Path.
  - 6 lignes étiquetées Canva (social)
  - 2 lignes étiquetées Texte seul (pas de Canva)
Étape 6 : génère exactement 6 designs Canva. Les lignes email ne sont
        envoyées à aucun endpoint Canva.
Étape 8 : rédige 6 textes social + 2 emails complets (objet + pré-en-tête
        + corps) en texte brut.
Étape 9 : programme 6 posts social. Affiche les 2 emails en ligne pour
        que le dirigeant les copie dans son outil d'email.
```

Si le dirigeant demande explicitement un design Canva pour un email (« tu peux me
faire une version Canva de l'email du 5 juin ? »), redirige : « Ce skill garde
les emails en texte seul parce que le chemin email de Canva produit des visuels
de remplacement. Si tu veux un email designé sous Canva, construis-le
directement dans Canva et je peux t'aider à écrire le texte ici. »

---

## Piège : générer sans plan de budget

**Pourquoi c'est important :** Canva plafonne l'usage de l'API à 100
requêtes/minute et par jeton, et chaque design coûte ~5 appels (autofill + export
+ sondage). Une campagne de 10 lignes à 4 candidats par ligne génère 40 designs
et ~200 appels d'API — et le calcul se dégrade avec le parallélisme. Sans budget
préalable, le dirigeant tape dans le quota en pleine campagne, sans chemin de
reprise clair, avec quatre posts déjà générés et inutilisés.

### ✗ À éviter

```
Calendrier validé → déclencher aussitôt 4 candidats × 8 lignes en parallèle
→ ~160 appels d'API en 90 secondes → RATE_LIMIT_EXCEEDED au post 5 → boucle
de réessai → dirigeant bloqué.
```

### ✓ À faire

```
Étape 4 : « 8 lignes Canva × 3 candidats = 24 designs, ~120 appels d'API.
J'y vais avec le défaut de 3 candidats par ligne ? »

Étape 6 : les 3 candidats de la ligne 1 partent en parallèle → pause 30 s
→ ligne 2 → pause 30 s → ligne 3 → … terminé à ~12 designs/minute, bien
sous le quota.

Si le quota est atteint malgré tout : arrêter, présenter la progression,
demander au dirigeant s'il passe à un seul candidat, fait une pause d'une
heure, ou passe aux textes avec ce qui est fait.
```

---

## Piège : sauter le point de contrôle 1 (validation du calendrier) avant de générer les assets

**Pourquoi c'est important :** générer plus de 10 designs Canva consomme des
appels d'API, du temps et l'attention de l'utilisateur. Si le calendrier a de
mauvaises dates, de mauvais canaux, ou si le dirigeant change d'avis sur un
thème, tout ce travail est jeté. Le point de contrôle du calendrier est
l'endroit le moins cher où rattraper un désalignement.

### ✗ À éviter

Recevoir le brief → appeler aussitôt `POST /autofills` pour les 12 posts →
présenter les designs avant que le dirigeant n'ait validé le calendrier.

Dirigeant : « Ah attends, je ne voulais aucun post la semaine du 15, je suis en
déplacement. »

### ✓ À faire

Présente d'abord le tableau du calendrier. Attends un « ça a l'air bien » explicite
avant d'ouvrir le moindre appel d'API Canva.

---

## Piège : le template a plus d'emplacements d'image que le brief ne fournit de photos

**Pourquoi c'est important :** les templates social multi-images (carrousels
Instagram, grilles produit) peuvent avoir 3 emplacements d'image ou plus. Quand le
brief ne fournit qu'une photo et que le template en exige trois, les emplacements
non remplis affichent discrètement le paysage générique de Canva — des nuages
banals et des collines vertes à la place des photos produit. Le design paraît
« complet » jusqu'à ce que le dirigeant l'ouvre.

(Note : les lignes email ignorent complètement Canva dans ce skill — voir l'étape
2 de SKILL.md. Ce piège ne concerne que les templates social à plusieurs
emplacements d'image.)

### ✗ À éviter

Construire le manifeste avec une ligne par design (« Carrousel — Hero_Image
manquante »). Téléverser l'unique photo. Générer. Le carrousel part avec la
diapositive 1 remplie et les diapositives 2-3 qui montrent deux paysages
génériques identiques.

### ✓ À faire

Construis le manifeste emplacement par emplacement. Montre explicitement le manque :

```
Le template « carrousel 3 produits » a 3 emplacements d'image. Le brief
m'a donné 1 photo. Comment remplir les 2 autres ?

1. Réutiliser la même photo sur les 3 emplacements
2. Je t'envoie 2 photos de plus
3. Choisir un template mono-image
```

Attends le choix du dirigeant avant de générer. Ne laisse pas partir des visuels
de remplacement.

---

## Piège : se fier à `status: success` sans exporter ni vérifier visuellement

**Pourquoi c'est important :** un job d'autofill réussi signifie que Canva a
accepté la requête et produit un design — pas que le design contient les bonnes
images. Si un `asset_id` est vide, périmé ou du mauvais type, le job renvoie
quand même `status: success` et le design s'affiche avec les visuels de
remplacement par défaut. La seule façon de le savoir, c'est de regarder le rendu.

### ✗ À éviter

```
Statut du job : success ✓
result.design.id : présent ✓
→ Présenter au dirigeant
```

Résultat : le dirigeant ouvre le carrousel et voit des paysages génériques dans 3
designs sur 4.

### ✓ À faire

Une fois le job réussi, exporte chaque design en PNG permanent via `POST /exports`
(ou l'outil MCP `export-design`). Regarde chaque PNG et vérifie qu'il contient de
vrais assets — pas le paysage par défaut de Canva, pas des rectangles gris, pas du
texte lorem ipsum. Ne présente au dirigeant qu'une fois la vérification visuelle
validée.

---

## Piège : un design d'un lot ne s'affiche pas

**Pourquoi c'est important :** quand 1 design sur 4 d'un lot échoue (erreur de
job, aperçu expiré, remplacement affiché) et que tu présentes quand même le
carrousel partiel, le dirigeant voit trois vrais designs et un rectangle gris
« Show Image ». Il perd confiance dans tout le reste du carrousel alors que le
reste est bon.

### ✗ À éviter

```
Les designs de la semaine 1 sont prêts :
[Option A — vrai aperçu]
[Option B — vrai aperçu]
[Option C — vrai aperçu]
[Option D — remplacement Show Image]
Lequel j'utilise ?
```

### ✓ À faire

Quand tu détectes le design cassé pendant la vérification de l'étape 6, régénère
uniquement ce design avec le bon `asset_id`. Réexporte, revérifie. Ne présente
qu'une fois les quatre designs du lot dispose d'aperçus permanents et vérifiés. Si
la seconde tentative échoue aussi, demande au dirigeant s'il faut sauter ce
design, changer de template ou essayer une autre photo.

---

## Piège : générer des assets sans confirmer que tous les champs d'autofill ont une valeur

**Pourquoi c'est important :** l'autofill Canva affiche discrètement des
remplacements vides quand une valeur de champ manque ou que l'`asset_id` appelé
n'existe pas. Le résultat est un template d'apparence professionnelle avec des
rectangles blancs vides là où devraient être la photo produit et le titre.

### ✗ À éviter

Construire le calendrier → déclencher aussitôt tous les `POST /autofills` en
parallèle → la moitié des designs reviennent avec des emplacements d'image vides
parce que les photos produit n'avaient pas été téléversées d'abord.

### ✓ À faire

Construire le calendrier → inventorier chaque champ d'autofill emplacement par
emplacement → téléverser les images produit manquantes → confirmer toutes les
valeurs de champ avec le dirigeant → puis générer les designs en parallèle, avec
tous les champs pré-remplis.

---

## Piège : passer des valeurs invalides aux champs image d'autofill

**Pourquoi c'est important :** quand un champ image d'autofill reçoit une chaîne
vide, un chemin de fichier, une URL ou un `asset_id` périmé/invalide, Canva ne
renvoie pas d'erreur — il affiche discrètement le visuel de remplacement par
défaut du template (par exemple un paysage générique avec nuages et collines). Le
design paraît « terminé » alors que l'image principale est une image de banque,
pas la photo produit du dirigeant.

### ✗ À éviter

Téléverser la photo produit → ne pas attendre la fin du job de téléversement →
passer le `job_id` (et non le `asset.id`) dans les données d'autofill → le design
s'affiche avec un paysage de remplacement au lieu de la photo produit.

### ✓ À faire

Téléverse la photo produit via `POST /v1/asset-uploads` → sonde
`GET /v1/asset-uploads/{job_id}` jusqu'à `status == "success"` → extrais l'`asset.id`
de la réponse → passe cet ID exact dans le champ image d'autofill. Vérifie que
chaque champ image a un `asset.id` confirmé avant d'appeler `POST /autofills`.

---

## Piège : intégrer des URL de vignettes CDN Canva dans du markdown

**Pourquoi c'est important :** la réponse d'autofill de Canva renvoie des URL CDN
authentifiées à durée de vie courte depuis `design.canva.ai`. Elles expirent en
quelques minutes. Si Claude les intègre comme images markdown
(`![](design.canva.ai/...)`), elles s'affichent en remplacements gris cassés
« Show Image » au moment où le message est affiché.

### ✗ À éviter

Générer 8 designs → intégrer manuellement chaque URL de vignette CDN dans la
réponse sous la forme `![Hero 1](https://design.canva.ai/xxx)` → toutes les images
s'affichent en remplacements gris cassés parce que les URL ont expiré avant le
rendu.

### ✓ À faire

Laisse soit le carrousel natif de Cowork afficher automatiquement le résultat de
l'outil, soit exporte chaque design via `POST /exports` et intègre l'URL
d'export **permanente**. En dernier recours, fais un lien vers l'URL de
modification permanente du design (`https://www.canva.com/d/{design_id}`). Ne
réintègre jamais d'URL `design.canva.ai`.

---

## Piège : lister les designs un par un comme des blocs d'image séparés

**Pourquoi c'est important :** quand Claude liste chaque design comme un bloc
distinct (« Hero 1 / [image] / Hero 2 / [image] »), les images s'affichent en
remplacements gris cassés « Show Image ». Présenter tous les designs ensemble dans
un seul lot groupé déclenche le carrousel côte à côte de Cowork, qui s'affiche
correctement.

### ✗ À éviter

```
Hero 1 — Portfolio multi-immobilier
[Show Image]
Voir dans Canva : https://canva.com/d/xxx

Hero 2 — Étude de cas marché côtier
[Show Image]
Voir dans Canva : https://canva.com/d/yyy
```

### ✓ À faire

Présente tous les designs dans une seule réponse groupée pour qu'ils s'affichent
en carrousel côte à côte. Sous le carrousel, ajoute une seule invite :

```
Voici 4 designs principaux pour la semaine 1. Fais défiler le carrousel
ci-dessus et dis-moi lequel je garde.
```

---

## Piège : générer les designs en série au lieu de les générer en parallèle

**Pourquoi c'est important :** générer les designs un par un, c'est faire attendre
le dirigeant à travers N allers-retours au lieu d'un seul. Déclenche toutes les
requêtes de génération d'un lot en une fois et présente le choix après la fin de
tous les jobs.

### ✗ À éviter

Générer le design 1 → attendre → le montrer → générer le design 2 → attendre → le
montrer → … × 8 designs. Le dirigeant regarde un goutte-à-goutte pendant 10
minutes.

### ✓ À faire

Déclenche tous les designs du lot en cours en une fois → sonde tous les jobs en
parallèle → une fois tous terminés, exporte chacun → vérifie visuellement →
présente ensuite.

---

## Piège : choisir automatiquement un modèle de marque pour un utilisateur Pro/Teams

**Pourquoi c'est important :** les utilisateurs Pro/Teams n'ont pas accès à l'API
des modèles de marque. Si Claude devine un template par son nom et génère avec le
mauvais, le dirigeant obtient des designs aux mauvaises couleurs et aux mauvaises
polices et doit refaire le travail à la main dans Canva.

### ✗ À éviter

```
Template « Square Post - Blue » trouvé. J'utilise celui-ci pour tous les
posts du fil.
```
…suivi de 8 designs en bleu alors que la marque est verte.

### ✓ À faire

```
J'ai trouvé 3 templates dans ta bibliothèque Canva qui pourraient marcher
pour les posts du fil :
1. Square Post - Blue  (modifié en mars 2026)
2. Summer Promo - Green  (modifié en avril 2026)
3. Product Feature Card  (modifié en janvier 2026)

Lequel j'utilise ?
```

---

## Piège : dérive de la voix des textes sur un long calendrier

**Pourquoi c'est important :** quand tu rédiges 12 à 20 textes d'un trait, le ton
a tendance à dériver — les premiers textes suivent les repères de voix du brief,
les suivants glissent vers du texte marketing générique. Les dirigeants le
remarquent immédiatement.

### ✗ À éviter

Post 1 : « Nos bougies artisanales sont le cadeau d'été parfait 🌿 » (colle au brief : « chaleureux, conversationnel »)  
Post 10 : « Sublimez votre ambiance avec notre collection de parfums artisanaux. » (dérive corporate)

### ✓ À faire

Avant de rédiger, ancre-toi sur 2 à 3 repères de voix issus du brief (par exemple
« décontracté, amical, humour léger »). Relis la première légende rédigée avant
d'écrire chaque nouvelle. Si le dirigeant signale un écart de voix sur un texte
quelconque, relis ce texte et signale-le comme le point de recalibrage pour les
prochains brouillons.

---

## Piège : programmer des posts HubSpot sans vérifier que `scheduledAt` est dans le futur

**Pourquoi c'est important :** HubSpot rejette les posts dont `scheduledAt` est
dans le passé, avec une erreur de validation. Si le calendrier a été construit à
une date antérieure et que le dirigeant ne programme que maintenant, certaines
dates sont peut-être déjà passées.

### ✗ À éviter

Construire le calendrier le 1er avril pour des posts de juin → le dirigeant
approuve le 15 mai → essayer de programmer sans vérifier → le post du
« 30 avril 10:00 » renvoie une 400.

### ✓ À faire

Avant d'appeler `POST /social/posts`, compare chaque `scheduledAt` à l'heure UTC
actuelle. Si une date de post est passée, signale-la : « Le post programmé pour le
30 avril est déjà passé. Je le saute ou je le reprogramme la semaine prochaine ? »