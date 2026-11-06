# Recherche sur le site web

Lis ceci avant d'aller chercher le site du dirigeant. L'objectif est de
remplacer les questions d'entretien auxquelles le site répond déjà, pas
d'ajouter une phase de recherche par-dessus l'entretien — l'onboarding doit
toujours se terminer en 15 à 20 minutes.

---

## Que récupérer

La page d'accueil, plus celles-ci si elles existent et sont liées depuis elle :
à propos, services ou produits, tarifs, implantations, contact. Trois ou
quatre pages au total suffisent — ce n'est pas un parcours complet du site.

## Que extraire

| Champ | Ce qu'il alimente |
|---|---|
| Ce qu'ils vendent vraiment | Business context ; plus net qu'une description du dirigeant en une seule ligne |
| À qui ils vendent (particulier, professionnel, les deux ; niche précise) | Tous les skills qui rédigent des textes destinés aux clients |
| Zone d'intervention ou implantations | Les skills de services locaux et de commerce |
| Signaux d'effectif (photos du personnel, « notre équipe », nombre d'implantations) | Un recoupement de la réponse d'entretien, jamais un substitut à celle-ci |
| Positionnement tarifaire (premium, économique, milieu de gamme — déduit, jamais deviné en chiffre) | Les skills de proposition et de marketing |
| Les mots qu'ils utilisent pour leur propre métier | Alimente `shared/voice-profile.md` directement — c'est du vrai texte écrit de la main du dirigeant, avant même la lecture d'un seul e-mail |
| Couleurs de marque (fond dominante / accent, d'après le CSS du site lui-même) | L'artefact d'accueil et tous ceux qui suivent, selon `shared/artifact-style.md` |
| Une police déclarée (font-family), si elle est facile à trouver | Idem — appliquée seulement si elle se résout sur Google Fonts ; sinon tu l'ignores, tu ne luttes jamais contre la CSP |

**N'infère rien que le site ne dise pas réellement.** « Ça a l'air premium »
tiré d'une photo, c'est une supposition ; « les prix démarrent à 200 € »
imprimé sur une page tarifs, c'est un fait. Garde les deux séparés dans ce que
tuAffiches en retour — signale ce qui est inféré plutôt que lu.

---

## Montrer ce qui a été trouvé

Montre toujours le résultat avant de tout stocker, et garde-le court — un mur
de faits extraits est pire que l'entretien qu'il était censé remplacer.

```
J'ai lu ton site. Ça donne : dépannage et entretien de CVC commercial,
agglomération de Denver, l'intervention le jour même compte beaucoup pour
toi — c'est écrit sur chaque page. J'ai trouvé un vert profond et un slab
serif dans ta marque.

Quelque chose cloche, ou je dois m'en servir aussi pour tes rapports ?
```

**Traite une correction comme attendue, pas comme un échec.** Les sites
deviennent obsolètes, et un dirigeant qui repère un détail faux en dix
secondes est exactement l'intérêt de montrer le brouillon au lieu de le
stocker en silence.

---

## Extraction des jetons de marque

Récupère les deux ou trois couleurs qui reviennent vraiment sur tout le site —
généralement visibles dans un en-tête, un bouton ou le fond d'un logo — ainsi
que toute police déclarée dans la feuille de style de la page elle-même.
N'invente pas une palette à partir d'une seule photo ; n'extrais que ce qui est
structurellement présent dans le CSS du site ou dans du balisage répété.

**Applique seulement sur un oui.** Montre la découverte dans le même message
que le résumé de l'entreprise (voir ci-dessus), et ne branche les couleurs et
la police dans les jetons de l'artefact d'accueil (`shared/artifact-style.md`)
que si le dirigeant confirme. Si la police déclarée par le site ne se résout
pas sur Google Fonts, garde silencieusement le choix par défaut de la maison —
ne montre jamais une police cassée comme si elle fonctionnait.

Stocke les valeurs résolues — pas le scraping brut — dans les champs Couleurs
de marque et Logo du bloc `## Business context` (format dans
[onboard-checklist.md](onboard-checklist.md)), pour que chaque artefact de
skill ultérieur lise les mêmes jetons finalisés sans les redériver.

---

## Quand il n'y a pas de site web, ou que le dirigeant passe

Ne dis rien n'est perdu — passe directement à l'entretien. Cette étape est un
raccourci quand il existe, jamais une obligation :

```
Pas de souci — je vais juste te poser quelques questions à la place.
```