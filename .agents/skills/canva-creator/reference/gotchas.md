# Pièges

Modes de défaillance courants du skill canva-creator.

---

## Piège : générer un design Canva pour une ligne email

**Pourquoi c'est important :** Canva est totalement hors périmètre pour le
chemin email. L'autofill de template email de Canva produit des visuels de
remplacement (paysages de banque d'images, rectangles vides) dans les tuiles de
grille de services, et les vignettes de variante ne s'affichent pas dans le
chat. Les emails sont en texte seul pour ce skill, sans exception. Générer un
design Canva pour un email — même un seul — enfreint cette règle.

### ✗ Mauvais

```
Le calendrier compte 6 lignes sociales + 2 lignes email.
→ L'Étape 2 génère 6 designs sociaux + 2 designs email.
→ Les designs email partent avec des tuiles de services de remplacement.
```

Ou toute variante : « Je vais générer le template email juste pour te
montrer une référence visuelle », « J'ai trouvé un template email qui pourrait
marcher, tu veux un aperçu ? », « Voici un design Canva pour l'email du
5 juin… » — tout est interdit.

### ✓ Bon

```
Étape 1 : calendrier construit avec la colonne Path.
  - 6 lignes étiquetées Canva (social)
  - 2 lignes étiquetées Texte seul (aucun Canva)
Étape 2 : génère exactement 6 designs Canva. Les lignes email ne passent par
         aucun endpoint Canva.
Étape 3 : rédige 6 légendes sociales + 2 emails complets (objet + pré-en-tête
         + corps) en texte brut.
Étape 4 : met 6 posts sociaux en file dans HubSpot. Affiche les 2 emails en
         ligne pour que le dirigeant les copie dans son outil d'email.
```

Si le dirigeant demande explicitement un design Canva pour un email (« tu peux
me faire une version Canva de l'email du 5 juin ? »), redirige : « Ce skill
garde les emails en texte seul parce que le chemin email Canva produit des
visuels de remplacement. Si tu veux un email conçu sur Canva, construis-le
directement dans Canva et je peux t'aider à rédiger le texte ici. »

---

## Piège : générer sans plan de budget

**Pourquoi c'est important :** Canva plafonne l'usage de l'API à 100 requêtes
par minute et par token, et chaque design coûte ~5 appels (autofill + export +
sondage). Une campagne de 10 lignes avec 4 candidats par ligne génère 40
designs et ~200 appels API — et le calcul empire avec le parallélisme. Sans
budget préparé en amont, le dirigeant bute sur son quota en plein milieu de
campagne, sans chemin de récupération clair, avec quatre posts déjà générés
mais inutilisés.

### ✗ Mauvais

```
Calendrier validé → lance immédiatement 4 candidats × 8 lignes en parallèle
→ ~160 appels API en 90 secondes → RATE_LIMIT_EXCEEDED au post 5 → boucle
de réessais → dirigeant bloqué.
```

### ✓ Bon

```
Phase préparatoire : « 8 lignes Canva × 3 candidats = 24 designs, ~120 appels
API. Je lance avec le défaut de 3 candidats par ligne ? »

Étape 3 : les 3 candidats de la ligne 1 partent en parallèle → pause 30 s →
ligne 2 → pause 30 s → ligne 3 → … terminé à ~12 designs/minute, bien en
dessous du quota.

Si le quota est atteint malgré tout : arrête-toi, affiche l'avancement, demande
au dirigeant s'il faut passer à un seul candidat, mettre en pause une heure, ou
passer aux légendes avec ce qui est fait.
```

---

## Piège : sauter le Point de contrôle 1 (approbation du calendrier) avant de générer les ressources

**Pourquoi c'est important :** générer 10 designs Canva ou plus coûte des
appels API, du temps et l'attention de l'utilisateur. Si le calendrier a les
mauvaises dates, les mauvais canaux, ou si le dirigeant change d'avis sur un
thème, tout ce travail part à la poubelle. Le point de contrôle du calendrier
est l'endroit le moins cher où rattraper un désalignement.

### ✗ Mauvais

Reçois le brief → lance immédiatement `POST /autofills` pour les 12 posts →
présente les designs avant que le dirigeant ait validé le calendrier.

Dirigeant : « Ah attends, je ne voulais aucun post la semaine du 15, je suis
en déplacement. »

### ✓ Bon

Présente d'abord le tableau calendrier. Attends un « c'est bon » explicite
avant d'ouvrir le moindre appel à l'API Canva.

---

## Piège : le template a plus d'emplacements d'image que le brief ne fournit de photos

**Pourquoi c'est important :** les templates sociaux multi-images (carrousels
Instagram, grilles produits) peuvent avoir 3 emplacements d'image ou plus. Quand
le brief ne te donne qu'1 photo et que le template en exige 3, les emplacements
non remplis affichent sans bruit le visuel paysage de la banque d'images Canva
— des nuages génériques et des collines vertes là où il faudrait des photos
produit. Le design paraît « complet » jusqu'à ce que le dirigeant l'ouvre.

(Note : dans ce skill, les lignes email sautent entièrement Canva — voir
l'Étape 3 du SKILL.md. Ce piège ne concerne que les templates sociaux avec
plusieurs emplacements d'image.)

### ✗ Mauvais

Construis le manifeste avec une ligne par design (« Carrousel — a besoin de
Hero_Image »). Envoie l'unique photo. Génère. Le carrousel part avec la
diapositive 1 remplie et les diapositives 2-3 qui montrent toutes deux le même
paysage générique.

### ✓ Bon

Construis le manifeste emplacement par emplacement. Affiche explicitement le
manque :

```
Le template « carousel 3 produits » a 3 emplacements d'image. Le brief ne m'a
donné qu'1 photo. Comment remplir les 2 autres ?

1. Réutiliser la même photo dans les 3 emplacements
2. Je t'envoie 2 photos de plus
3. Choisir un template à une seule image
```

Attends le choix du dirigeant avant de générer. Ne laisse pas partir des
visuels de remplacement.

---

## Piège : se fier à `status: success` sans exporter ni vérifier visuellement

**Pourquoi c'est important :** un job d'autofill réussi signifie que Canva a
accepté la requête et a produit un design — pas que le design contient les
bonnes images. Si un `asset_id` était vide, périmé ou du mauvais type, le job
renvoie quand même `status: success` et le design s'affiche avec les visuels de
remplacement par défaut. Le seul moyen de le savoir, c'est de regarder le
rendu.

### ✗ Mauvais

```
Statut du job : success ✓
result.design.id : présent ✓
→ Présente au dirigeant
```

Résultat : le dirigeant ouvre le carrousel et voit des paysages de banque
d'images dans 3 designs sur 4.

### ✓ Bon

Une fois le job réussi, exporte chaque design en PNG permanent via
`POST /exports` (ou le MCP `export-design`). Regarde chaque PNG et confirme
qu'il contient de vraies ressources — pas le paysage par défaut de Canva, pas
de rectangles gris, pas de texte lorem-ipsum. Ne présente au dirigeant
qu'après une vérification visuelle passée.

---

## Piège : un design d'un lot ne s'affiche pas

**Pourquoi c'est important :** quand 1 design sur 4 d'un lot échoue (erreur de
job, URL d'aperçu expirée, placeholder affiché) et que tu présentes quand même
le carrousel partiel, le dirigeant voit trois vrais designs et un rectangle gris
« Afficher l'image ». Il perd confiance dans tout le reste du carrousel, même
si le reste est bon.

### ✗ Mauvais

```
Les designs de la semaine 1 sont prêts :
[Option A — véritable aperçu]
[Option B — véritable aperçu]
[Option C — véritable aperçu]
[Option D — placeholder « Afficher l'image »]
Lequel dois-je utiliser ?
```

### ✓ Bon

Quand tu repères le design cassé à la vérification du point 6, régénère juste
ce design avec le bon asset_id. Réexporte, revérifie. Ne présente qu'une fois
que les quatre designs du lot ont des aperçus permanents et vérifiés. Si la
seconde tentative échoue aussi, demande au dirigeant s'il faut passer, changer
de template, ou essayer une autre photo.

---

## Piège : générer des ressources sans vérifier que tous les champs d'autofill ont une valeur

**Pourquoi c'est important :** l'autofill de Canva affiche sans bruit des
placeholders vides quand une valeur de champ manque ou que l'`asset_id`
référencé n'existe pas. Le résultat, c'est un template à l'air professionnel
avec des rectangles blancs vides là où devraient être la photo produit et le
titre.

### ✗ Mauvais

Construis le calendrier → lance immédiatement tous les `POST /autofills` en
parallèle → la moitié des designs reviennent avec des placeholders d'image
vides parce que les photos produits n'avaient pas été envoyées d'abord.

### ✓ Bon

Construis le calendrier → inventorie chaque emplacement de champ d'autofill
emplacement par emplacement → envoie les images produits manquantes →
confirme toutes les valeurs de champ avec le dirigeant → puis génère les
designs en parallèle, avec chaque champ pré-rempli.

---

## Piège : passer des valeurs invalides aux champs image d'autofill

**Pourquoi c'est important :** quand un champ image d'autofill reçoit une
chaîne vide, un chemin de fichier, une URL ou un `asset_id` périmé/invalide,
Canva ne remonte pas d'erreur — il affiche sans bruit le placeholder par
défaut du template (par ex. un paysage générique avec nuages et collines). Le
design paraît « terminé » alors que l'image principale est une image de banque
d'images, pas la photo produit du dirigeant.

### ✗ Mauvais

Envoie la photo produit → n'attends pas la fin du job d'envoi → passe le
`job_id` (et non l'`asset.id`) dans les données d'autofill → le design
s'affiche avec un paysage de remplacement au lieu de la photo produit.

### ✓ Bon

Envoie la photo produit via `POST /v1/asset-uploads` → sonde
`GET /v1/asset-uploads/{job_id}` jusqu'à `status == "success"` → extrais
`asset.id` de la réponse → passe cet ID exact dans le champ image d'autofill.
Vérifie que chaque champ image a un `asset.id` confirmé avant d'appeler
`POST /autofills`.

---

## Piège : intégrer les URL de vignettes du CDN Canva dans du markdown

**Pourquoi c'est important :** la réponse d'autofill de Canva renvoie des URL
CDN authentifiées de courte durée, en `design.canva.ai`. Elles expirent en
quelques minutes. Si Claude les intègre comme images markdown
(`![](design.canva.ai/...)`), elles s'affichent comme des placeholders
« Afficher l'image » cassés au moment où le message est montré.

### ✗ Mauvais

Génère 8 designs → intègre manuellement chaque URL de vignette CDN dans la
réponse sous la forme `![Hero 1](https://design.canva.ai/xxx)` → toutes les
images s'affichent en placeholders gris cassés, les URL ayant expiré avant le
rendu.

### ✓ Bon

Soit tu laisses le carrousel natif de Cowork afficher automatiquement le
résultat de l'outil, soit tu exportes chaque design via `POST /exports` et
tu intègres l'URL d'export **permanente**. En dernier recours, mets un lien
vers l'URL d'édition permanente du design
(`https://www.canva.com/d/{design_id}`). Ne réintègre jamais les URL
`design.canva.ai`.

---

## Piège : lister les designs un par un comme blocs d'image individuels

**Pourquoi c'est important :** quand Claude liste chaque design comme un bloc
séparé (« Hero 1 / [image] / Hero 2 / [image] »), les images s'affichent comme
des placeholders gris cassés « Afficher l'image ». Présenter tous les designs
ensemble dans un seul lot groupé déclenche le carrousel côte à côte de Cowork,
qui s'affiche correctement.

### ✗ Mauvais

```
Hero 1 — portfolio multi-biens
[Afficher l'image]
Voir dans Canva : https://canva.com/d/xxx

Hero 2 — étude de cas marché côtier
[Afficher l'image]
Voir dans Canva : https://canva.com/d/yyy
```

### ✓ Bon

Présente tous les designs dans une seule réponse groupée pour qu'ils
s'affichent en carrousel côte à côte. Sous le carrousel, ajoute une seule
invite :

```
Voici 4 designs hero pour la Semaine 1. Fais défiler le carrousel
ci-dessus et dis-moi lequel garder.
```

---

## Piège : générer les designs en séquence au lieu de les paralléliser

**Pourquoi c'est important :** générer les designs un par un oblige le
dirigeant à attendre N allers-retours au lieu d'un seul. Lance toutes les
requêtes de génération d'un lot en une fois et présente le choix après la fin
de tous les jobs.

### ✗ Mauvais

Génère le design 1 → attends → affiche-le → génère le design 2 → attends →
affiche-le → … × 8 designs. Le dirigeant regarde couler un filet pendant 10
minutes.

### ✓ Bon

Lance tous les designs du lot en cours en une fois → sonde tous les jobs en
parallèle → une fois tous les jobs terminés, exporte chacun → vérifie
visuellement → puis présente.

---

## Piège : choisir automatiquement un template de marque pour les utilisateurs Pro/Teams

**Pourquoi c'est important :** les utilisateurs Pro/Teams n'ont pas accès à
l'API des templates de marque. Si Claude devine un template par son nom et
génère avec le mauvais, le dirigeant obtient des design dans les mauvaises
couleurs/polices et doit refaire le travail à la main dans Canva.

### ✗ Mauvais

```
Template « Square Post - Blue » trouvé. Utilisé pour tous les posts de flux.
```
…suivi de 8 designs en bleu alors que la marque est verte.

### ✓ Bon

```
J'ai trouvé 3 templates dans ta bibliothèque Canva qui pourraient convenir
aux posts de flux :
1. Square Post - Blue  (dernière modification mars 2026)
2. Summer Promo - Green  (dernière modification avril 2026)
3. Product Feature Card  (dernière modification janv. 2026)

Lequel dois-je utiliser ?
```

---

## Piège : dérive de la voix des légendes sur un long calendrier

**Pourquoi c'est important :** quand tu rédiges 12 à 20 légendes d'un seul
trait, le ton a tendance à dériver — les premières légendes suivent les
marqueurs de voix du brief, les suivantes glissent vers une copie marketing
générique. Les dirigeants le remarquent immédiatement.

### ✗ Mauvais

Post 1 : « Nos bougies artisanales sont le cadeau d'été parfait 🌿 »
(conforme au brief : « chaleureux, conversationnel »)  
Post 10 : « Sublimez votre ambiance avec notre collection de parfums
artisanaux. » (dérive corporate)

### ✓ Bon

Avant de rédiger, ancre-toi sur 2 à 3 marqueurs de ton du brief (par ex.
« décontracté, amical, humour léger »). Relis la première légende rédigée
avant d'écrire chaque nouvelle. Si le dirigeant signale une legsende au
mauvais ton, relis cette légende et fais-en le point de recalibrage pour les
prochaines.

---

## Piège : mettre des posts HubSpot en file sans vérifier que `scheduledAt` est dans le futur

**Pourquoi c'est important :** HubSpot rejette avec une erreur de validation les
posts dont `scheduledAt` est dans le passé. Si le calendrier a été construit à
une date antérieure et que le dirigeant ne met en file que maintenant, certaines
dates sont peut-être déjà passées.

### ✗ Mauvais

Construit le calendrier le 1er avril pour des posts de juin → le dirigeant
valide le 15 mai → tu essaies de mettre en file sans vérifier → le post du
« 30 avril à 10 h 00 » renvoie une erreur 400.

### ✓ Bon

Avant d'appeler `POST /social/posts`, compare chaque `scheduledAt` à l'heure
UTC actuelle. Si une date de post est déjà passée, affiche-la : « Le post
planifié pour le 30 avril est déjà passé. Je le saute, ou je le reprogramme
pour la semaine prochaine ? »