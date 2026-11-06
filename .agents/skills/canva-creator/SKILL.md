---
name: canva-creator
description: >
  Prend un brief de contenu approuvé et exécute une campagne de bout en bout :
  construit le calendrier de publication, génère des designs Canva pour les posts
  sociaux, rédige les légendes et les copies email, et met les envois sociaux en
  file dans HubSpot. Chaque étape exige l'approbation explicite du dirigeant. À
  utiliser quand le dirigeant transmet un brief approuvé ou en désigne un —
  « lance ce brief », « exécute la campagne », « transforme ce brief en posts ».
  Pour une publication au quotidien sans brief — « je dois publier plus » — utilise
  plutôt social-content-engine ; c'est lui qui tient le calendrier permanent.
  [EN] Use when the owner hands off an approved content brief — "run this
  brief," "execute the campaign," "turn this brief into posts."
allowed-tools: Read, WebFetch
---

> Language rule: see `shared/language.md`.

# Canva Creator

## Périmètre

Ce skill traite une campagne en cinq étapes séquentielles, chacune verrouillée
par l'approbation du dirigeant :

```
brief → calendrier → inventaire des visuels → designs Canva → copie → mise en file HubSpot
```

| Chemin | Canaux | Ce que ce skill produit |
|--------|--------|-------------------------|
| Canva (social) | Instagram, Facebook, X/Twitter, LinkedIn | Design Canva + légende + post HubSpot programmé |
| Texte seul | Email (newsletter, marketing, séquence) | Objet + pré-en-tête + corps, affichés en ligne pour que le dirigeant envoie |

**Canva n'est jamais utilisé pour les lignes email, en aucune circonstance** —
aucun template, aucun autofill, aucune copie de design, aucun envoi de visuel,
aucun export. Les visuels email sont hors périmètre de ce skill parce que
l'autofill de template email produit des visuels de remplacement quand les
emplacements d'image dépassent les photos disponibles, et que les vignettes de
variation ne s'affichent pas dans les aperçus de chat. Si le dirigeant demande un
design Canva pour un email, vois `reference/gotchas.md` pour les mots de
redirection.

---

## Pré-vol

Avant l'Étape 1, confirme :

1. **Brief.** L'utilisateur a cité ou collé un brief approuvé. Sinon :
   « J'ai besoin du brief de contenu avant de pouvoir construire la campagne. Tu
   en as un venant du skill content-strategy, ou tu veux en écrire un maintenant
   ? »

2. **Niveau Canva.** Pro/Teams exigent une sélection manuelle du template dans la
   bibliothèque de l'utilisateur (pas d'API d'autofill). Enterprise peut faire
   l'autofill depuis les templates de marque.

3. **Niveau HubSpot.** La mise en file sociale exige Marketing Hub Professional.
   Starter ou Free → saute l'Étape 5 et exporte un CSV à la place
   (voir [reference/hubspot-staging.md](reference/hubspot-staging.md)).

4. **Visuels de marque.** Si une boutique est connectée (Shopify ou Square —
   pairs, `../../shared/connector-neutrality.md`), lis d'abord la liste des
   produits : titres, URL d'images et prix pour chaque produit que le brief
   nomme. Lecture seule — rien n'est envoyé à Canva avant l'Étape 2, point 5, et
   alors seulement les images dont les emplacements du calendrier approuvé ont
   besoin. Cette liste est l'inventaire photo de départ ; ne demande que les
   produits pour lesquels la boutique n'a aucune image. Les règles de
   récupération — quels champs, la règle sur les prix — sont dans
   [../social-content-engine/reference/shopify-assets.md](../social-content-engine/reference/shopify-assets.md)
   (écrit pour Shopify ; les images du catalogue Square suivent les mêmes étapes
   depuis l'inventaire des outils). Sans boutique, confirme le chemin vers les
   photos produit sur le disque, ou que le kit de marque est actif dans Canva.

5. **Budget de génération.** Estime le volume Canva de la campagne et présente-le
   avant le début de l'Étape 1. Par défaut, 3 variantes par ligne dirigée vers
   Canva ; chaque design coûte ~5 appels API (autofill + export + sondage).

   ```
   Budget de génération pour cette campagne :
     Lignes Canva (social) :      8
     Variantes par ligne :        3   (par défaut — dis « variante unique » pour 1)
     Total de designs :           24
     Appels API (approx.) :       ~120  (autofill + export + sondage)

   Limite Canva : 100 requêtes/minute. Cela prendra ~2-3 minutes de
   génération, largement dans les limites de ton niveau. On procède ?
   ```

   Si le total de designs projeté dépasse 30, recommande d'emblée le mode
   variante unique — les grandes campagnes consomment vite leur marge. Le
   dirigeant peut remplacer la valeur par défaut par 1, 2 ou 3 variantes par
   ligne avant le début de l'Étape 1. Verrouille la valeur choisie pour toute la
   session.

---

## Flux de travail

### Étape 1 — Calendrier de publication

Reprends dans le brief : thèmes de contenu, canaux, rythme, dates fermes
(lancements, ventes, jours fériés).

Construis un tableau de calendrier avec une colonne `Path` qui route chaque
ligne vers Canva ou vers une rédaction en texte seul :

| Date | Canal | Path | Thème | Type de visuel | Angle légende/objet |
|------|-------|------|-------|----------------|---------------------|
| 2 juin | Fil Instagram | Canva (social) | Lancement du lin | Post carré | « enfin une robe… » |
| 5 juin | Email | Texte seul | Lancement du lin | Corps d'email | « Un lin qui respire vraiment » |

Étiquette chaque ligne du canal email `Texte seul` avant de présenter. Plafonne
à 30 jours sauf si le brief précise autre chose. Signale d'emblée les conflits
de programmation (deux posts le même jour pour le même produit).

**Point de contrôle 1.** Présente le calendrier. Demande : « Est-ce que ça
correspond au plan ? Des dates à décaler, des canaux à ajouter, des thèmes à
échanger ? » Itère jusqu'à l'approbation, puis reformule la répartition à voix
haute — « N lignes passent par Canva, M lignes passent par une rédaction en texte
seul » — avant de continuer. Repérer une mauvaise catégorisation ici ne coûte
rien ; la repérer après avoir généré les designs, si.

---

### Étape 2 — Inventaire des visuels (lignes Canva uniquement)

Les lignes email sautent entièrement cette étape. Pour chaque ligne
`Canva (social)`, construis un manifeste de ce que le template exige et de ce qui
est déjà disponible.

1. **Énumère chaque emplacement d'image par son nom.** Les posts carrés
   Instagram ont en général 1 à 2 emplacements d'image ; les carrousels et les
   grilles produits peuvent en avoir 5 ou plus. Liste-les individuellement
   (`Header_Image`, `Product1_Image`, `Product2_Image`, …) — ne les regroupe
   jamais en « photos produits ».
   - Enterprise : lis les noms de champs dans `dataset[].label` sur le template
     de marque (`GET /v1/brand-templates/{id}`).
   - Pro/Teams : compte chaque rectangle d'image distinct du template.

2. **Inventorie les visuels disponibles.** Contenus texte du brief (noms de
   produits, copy de l'offre, taglines, tarifs), URL d'images produits lues sur
   la boutique connectée au pré-vol (envoyées au point 5, seulement pour les
   emplacements dont le tableau des manques a besoin, et notées ensuite par
   `asset.id`), photos produits déjà envoyées à Canva (`GET /v1/assets`) ou sur
   le disque du dirigeant, couleurs et polices du kit de marque (Enterprise). Un
   prix dans une légende vient de la valeur retournée par la boutique ou du
   brief, jamais de la mémoire.

3. **Construis le tableau des manques, emplacement par emplacement.** Une ligne
   par emplacement et par design — pas par design.

   | Date | Nom de l'emplacement | Type | Visuel disponible | Statut |
   |------|----------------------|------|-------------------|--------|
   | 2 juin | Hero_Image | image | bloom_summer.jpg → asset_id en attente | envoi |
   | 2 juin | Headline | texte | « Le lin d'été, enfin » | prêt |
   | 9 juin | Product1_Image | image | — | **MANQUANT** |

4. **Résous avec le dirigeant les écarts emplacement/visuel.** Si le template a
   plus d'emplacements d'image que le brief ne fournit de photos, mets en pause
   et demande :

   ```
   Le template « Summer Carousel » a 5 emplacements d'image. Le brief ne m'a
   donné qu'1 photo (bloom_summer.jpg). Comment je remplis les 4 autres ?

     1. Réutiliser la même photo dans les 5 emplacements
     2. Tu m'envoies 4 photos de plus (chemins de fichier)
     3. Prendre un template plus simple avec moins d'emplacements
   ```

   Aucun appel de génération tant que le dirigeant n'a pas choisi. Générer avec
   des emplacements vides produit des designs truffés des placeholders paysage
   par défaut de Canva.

5. **Envoie les photos manquantes et relève des asset IDs vérifiés.** Envoie via
   `POST /v1/asset-uploads`, puis sonde `GET /v1/asset-uploads/{job_id}` jusqu'à
   `status == "success"`. Note `asset.id` dans la réponse — c'est la seule valeur
   qui fonctionne dans un champ image d'autofill. Passer une chaîne vide, une
   URL, un chemin de fichier ou un ID périmé affiche discrètement le paysage de
   banque d'images de Canva à la place de la photo.

6. **Confirme le manifeste.** Montre au dirigeant le tableau emplacement par
   emplacement terminé, avec chaque emplacement résolu et chaque image `asset.id`
   confirmée. C'est le dernier arrêt avant les appels à l'API Canva.

---

### Étape 3 — Génération des designs Canva

Avant tout appel à l'API Canva, relis le calendrier et retire toute ligne dont
le `Path` n'est pas `Canva (social)`. Les lignes email ne passent pas par cette
étape.

Génère les designs **une ligne de calendrier à la fois**, avec 3 variantes par
ligne (ou la valeur choisie au pré-vol). Chaque ligne suit la même boucle :
générer les variantes → vérifier → exporter → contrôler visuellement → réessayer
les échecs → présenter → attendre le choix du dirigeant → ligne suivante. Pause
de 30 secondes entre les lignes. Cela plafonne la rafale à 3 générations + 3
exports par ~30 s — largement sous la limite de débit de 100 req/min de Canva. Ne
parallélise pas plusieurs lignes ; la ligne par ligne est la protection qui
empêche le dirigeant de buter sur le quota en pleine campagne.

**Cadence de sondage.** Sonde le statut des jobs toutes les 3-5 secondes, pas
plus vite. Des intervalles plus serrés brûlent du quota sans accélérer la
fin.

**URL d'aperçu — un seul type est sûr à intégrer.** Les réponses d'autofill
renvoient des vignettes `design.canva.ai` qui expirent en quelques minutes ; les
intégrer comme images markdown produit des placeholders « Show Image » cassés.
Les URL d'export permanentes (`export-download.canva.com` ou l'outil MCP
`export-design`) n'expirent pas. Les carrousels natifs de Cowork affichent
directement le résultat d'autofill en utilisant la session authentifiée du
connecteur — laisse-les s'afficher tout seuls, ne les réintègre pas.

#### Boucle de ligne

1. **Résous le template.** (Une fois par session — même template d'une ligne à
   l'autre, sauf si le calendrier mélange les types de visuels.)
   - Enterprise : `GET /v1/brand-templates` filtré par type de visuel.
   - Pro/Teams : `GET /v1/designs?ownership=any&query={template name}`,
     présente les 3 premiers au dirigeant, confirme-en un avant de générer.

2. **Génère les variantes de la ligne en parallèle.** Lance simultanément les
   3 variantes de la ligne (ou N depuis le pré-vol).
   - Enterprise : `POST /v1/autofills` par variante, avec l'ID du template et
     les valeurs des champs. Sonde tous les jobs en parallèle.
   - Pro/Teams : `POST /v1/designs` pour créer des copies. Décris les
     modifications de texte et d'image que le dirigeant applique dans Canva ;
     récupère les design IDs en retour.

3. **Vérifie le statut des jobs.** Pour chaque variante, confirme que
   `GET /autofills/{job_id}` a retourné `status == "success"` et que
   `result.design.id` est présent. Traite les erreurs design par design :
   - `JOB_FAILED` → lis `job.error.message`, corrige les valeurs de champs ou
     les asset IDs, réessaie une fois.
   - `RATE_LIMIT_EXCEEDED` (première fois cette session) → attends 60 s,
     réessaie cette seule variante une fois. Cela absorbe les pics transitoires.
   - `RATE_LIMIT_EXCEEDED` (deuxième fois cette session) **ou** toute erreur
     `quota_exceeded` / de plafond quotidien → arrête la génération
     immédiatement. Ne réessaie pas. Présente l'avancement et demande :

     ```
     Canva est en train de limiter le débit de la campagne. État à ce jour :
       ✓ Générés :  Posts 1-4 (12 designs)
       ⏸ Restants : Posts 5-8 (12 designs pas encore générés)

     Comment je procède ?
       1. Passer à 1 variante par ligne restante (4 designs au total) — terminé maintenant
       2. Mettre la campagne en pause — reprendre dans 60 minutes quand le quota se recharge
       3. Arrêter la génération — travailler avec ce qu'on a, passer aux légendes
     ```

     Attends le choix du dirigeant. Ne boucle jamais sur une relance.

4. **Exporte chaque variante réussie en PNG permanent.** Lance les exports d'une
   même ligne en parallèle.
   - REST : `POST /v1/exports` avec `format.type: "png"`, sonde
     `GET /v1/exports/{job_id}` jusqu'au succès, relève `urls[0]`.
   - Canva MCP : `export-design` avec le design ID.

   Ces URL permanentes sont ce qui est intégré aux aperçus et joint plus tard au
   post HubSpot. La vignette de la réponse d'autofill n'est jamais utilisée en
   aval.

5. **Vérifie visuellement chaque export.** Regarde l'image et rejette tout ce qui
   suit — tout cela signale un emplacement non rempli ou le mauvais visuel :
   - Paysage générique avec nuages et collines vertes (placeholder par défaut
     de Canva)
   - Rectangles gris unis là où une photo devrait être
   - Texte lorem-ipsum ou texte par défaut du template
   - Sujet qui ne correspond pas au brief (mauvais produit, mauvaise marque)

   Si une variante échoue à la vérification : revérifie le manifeste pour
   l'emplacement concerné, corrige l'`asset.id`, régénère cette seule variante,
   réexporte, revérifie.

6. **Réessaie par variante en cas d'échec partiel.** Si 1 variante sur N dans la
   ligne a échoué à l'Étape 3 ou 5, régénère uniquement celle-là — ne refais pas
   toute la ligne et ne présente pas un carrousel partiel et cassé. Si la
   deuxième tentative échoue aussi :

   ```
   La troisième variante du post du 9 juin échoue toujours — Canva a renvoyé
   [erreur / placeholder affiché]. Comment je procède ?

     1. La passer — présenter les 2 autres et continuer
     2. Passer à un template plus simple pour cette seule variante
     3. Réessayer une fois avec une autre photo
   ```

7. **Présente les variantes de la ligne.** Laisse le carrousel natif de Cowork
   afficher le résultat de l'outil autofill. En dessous, ajoute un texte :

   ```
   Les variantes du 9 juin sont prêtes — fais défiler le carrousel ci-dessus.
   Laquelle je garde pour le post du 9 juin ?
   ```

   Si le carrousel ne s'affiche pas ou si une position est cassée, intègre à la
   place les URL PNG d'export permanentes de l'Étape 4. Dernier recours : un
   lien vers l'URL d'édition Canva du design
   (`https://www.canva.com/d/{design_id}`). Ne réintègre jamais les URL
   `design.canva.ai`.

8. **Pause de 30 secondes, puis passe à la ligne suivante.**

**Point de contrôle 2.** Considéré comme satisfait une fois que le dirigeant a
choisi un design par ligne de calendrier. S'il veut une régénération, régénère
uniquement cette variante-là.

---

### Étape 4 — Rédaction de la copie

Pour chaque ligne de calendrier, rédige la copie. Les lignes sociales reçoivent
une légende ; les lignes email reçoivent un email complet.

**Légendes sociales** — Instagram, Facebook, X, LinkedIn :

- Longueur : adaptée au canal (Instagram ≤ 2 200 caractères ; Facebook ≤ 500
  recommandés ; X ≤ 280).
- Structure : accroche → un bénéfice produit → CTA → 3-5 hashtags (pas 30).
- Voix : respecte les marqueurs de ton du brief. Si le brief dit « décontracté et
  amical », n'écris pas de la copie d'entreprise.
- Pas de remplissage. Pas de « Grande nouvelle ! » ni de « Nous sommes ravis
  d'annoncer ». Commence par la valeur.

**Contenu email** — Claude rédige l'email en entier ; pas de Canva :

- Objet : ≤ 50 caractères, précis, sans clickbait. « Les projets de printemps
  se remplissent » vaut mieux que « Tu vas rater ça ! ».
- Pré-en-tête : ≤ 90 caractères, complète l'objet sans le répéter.
- Corps : prose simple, 100-250 mots. Une première ligne qui mérite la lecture →
  1-2 paragraphes de fond → un CTA clair et unique → signature.
- Voix : mêmes marqueurs de ton que le social. Les dirigeants veulent que leurs
  emails sonnent comme eux, pas comme une newsletter pré-fabriquée.
- Aucune référence à des images. N'écris pas « voir l'image ci-dessus ». Si le
  dirigeant veut des visuels, il les ajoute dans son outil d'email.
- Un CTA par email. Choisis l'action la plus importante et ouvre avec.

Présente les légendes en ligne sous chaque ligne sociale. Présente les emails
complets en ligne sous chaque ligne email :

```
Objet : <ligne d'objet>
Pré-en-tête : <texte du pré-en-tête>

<texte du corps>
```

Pour des exemples travaillés, voir
[reference/examples/boutique-brief-campaign.md](reference/examples/boutique-brief-campaign.md).

**Point de contrôle 3.** « Des légendes ou des emails à réécrire ? Signale la
date et ce qu'il faut changer. » Itère jusqu'à l'approbation.

---

### Étape 5 — Mise en file HubSpot + transmission des emails

Mets les posts sociaux en file dans HubSpot. Le contenu email n'est pas mis en
file — il est affiché en ligne pour que le dirigeant le copie dans son outil
d'email. Pour la référence des champs d'API, voir
[reference/hubspot-staging.md](reference/hubspot-staging.md).

1. **Crée la campagne.** `POST /marketing/v3/campaigns` avec le nom de campagne
   et les dates de début et de fin issues du calendrier.

2. **Mets chaque post social en file.** `POST` vers l'API Social HubSpot pour
   chaque ligne `Canva (social)` :
   - `channel` : associe le canal du calendrier à l'ID de compte HubSpot
   - `scheduledAt` : datetime ISO 8601 — confirme qu'il est dans le futur avant
     d'appeler
   - `content.body` : légende approuvée
   - `attachments` : URL PNG d'export Canva permanente depuis l'Étape 3
   - `status` : `SCHEDULED` (jamais `PUBLISHED`)

3. **Confirme la file.** Appelle
   `GET /marketing/v3/social/posts?status=SCHEDULED`, présente la liste, et donne
   un lien direct vers la vue campagne HubSpot.

4. **Affiche le contenu email pour transmission.** Pour chaque ligne email,
   présente en ligne l'objet + le pré-en-tête + le corps approuvés, groupés par
   date d'envoi. Le dirigeant les copie dans son outil d'email (HubSpot
   Marketing Email, Mailchimp, Gmail ou M365).

**Point de contrôle final.**

```
Tes posts sociaux sont programmés dans HubSpot : [lien]
Ils partiront comme programmés — tu peux annuler ou modifier n'importe quel
post dans HubSpot.

Le contenu email est rédigé ci-dessous — copie chacun dans ton outil d'email
quand tu seras prêt à envoyer :

  5 juin  — « Les projets de printemps se remplissent »
  15 juil. — « Les créneaux d'entretien d'été se remplissent »

Quelque chose à changer avant qu'on ait fini ?
```

À côté de ce résumé — jamais à sa place — rends la campagne sous forme
d'artefact HTML selon le style maison (`../../shared/artifact-style.md`) : le
calendrier de publication en tableau, une pastille de statut par canal sur
chaque ligne (programmé / rédigé / transmis), et un panneau de post en file par
ligne avec la légende ou la copie email approuvée et son lien PNG d'export.

**Offre de clôture.** Une ligne sur ce que la campagne contient désormais, puis
l'étape suivante la plus pertinente avec sa phrase déclencheur — le plus
souvent « mon marketing fonctionne-t-il ? » (`growth-pulse`) une fois les posts
en ligne. Jusqu'à deux autres : « faire le contenu » (`social-content-engine`)
pour le calendrier permanent, ou « mes pubs » (`ad-manager`). Trois au maximum ;
ne repropose jamais ce que le dirigeant a refusé cette session.

---

## Points d'approbation

- **Aucun appel Canva pour les lignes email.** Revérifie la colonne `Path` avant
  chaque appel d'API.
- **Aucune publication.** Chaque post HubSpot est mis en file comme `SCHEDULED` ;
  le dirigeant garde la main sur la mise en ligne.
- **Toujours présenter le budget de génération au pré-vol.** Le dirigeant voit le
  total de designs et approuve avant le début de l'Étape 1.
- **Une ligne à la fois à l'Étape 3.** Les variantes d'une même ligne partent en
  parallèle, mais les lignes sont séquentielles avec 30 s d'écart — c'est la
  protection du quota.
- **À la deuxième erreur de quota, mets en pause et demande.** Ne boucle jamais
  sur une relance.
- **Toujours exporter en PNG permanent avant de présenter.** Un job réussi ne
  signifie pas que le design s'est rendu correctement.
- **N'intègre jamais les URL `design.canva.ai` dans les messages.** Elles
  expirent.
- **Ne régénère jamais toute la ligne quand une seule variante échoue.**
  Relance par variante uniquement.
- **Ne sélectionne jamais automatiquement un template pour un utilisateur
  Pro/Teams.** Confirme toujours.
- **Ne saute jamais l'inventaire emplacement par emplacement.** Les templates à
  plusieurs emplacements affichent des paysages de remplacement dès qu'un
  emplacement est vide.
- **Ne saute jamais le Point de contrôle 1.** Générer avant l'approbation du
  calendrier est la première source de travail gaspillé dans ce skill.

---

## Référence

- [reference/canva-api.md](reference/canva-api.md) — endpoints de l'API Canva Connect,
  envoi de visuels, formats d'export, équivalents MCP
- [reference/hubspot-staging.md](reference/hubspot-staging.md) — API Social HubSpot et
  repli CSV pour les niveaux non-Pro
- [reference/gotchas.md](reference/gotchas.md) — motifs « à éviter / à faire »
  pour les modes de défaillance courants
- [reference/examples/boutique-brief-campaign.md](reference/examples/boutique-brief-campaign.md)
  — exemples complets travaillés (social à emplacement unique, template
  multi-emplacements)

## Utiliser un outil qui n'est pas listé

Les connecteurs nommés dans ce skill sont les chemins testés, pas un mur. Si le
dirigeant veut que ce flux utilise un outil qui n'est ni connecté ni listé,
propose `build-connector` — il vérifie d'abord le répertoire des connecteurs et
se connecte via Zapier sinon, jamais en construisant à la main contre une API
brute. Une fois la connexion en place, l'outil rejoint ce skill comme tout autre
connecteur optionnel, sous les mêmes points d'approbation.