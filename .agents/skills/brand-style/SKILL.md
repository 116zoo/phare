---
name: brand-style
description: >
  Définit l'identité visuelle du dirigeant et le format de ses livrables, que
  toutes les pages et tous les documents du plugin suivent ensuite. Capture la
  marque depuis un lien de site ou une description en mots simples — jamais un
  code hex ni un dépôt de fichier — prévisualise le rendu sur une page
  d'exemple, demande comment il veut recevoir ses livrables (artefacts
  visuels, Word, markdown, Notion, Canva, ou le meilleur pour chaque skill),
  puis enregistre le tout dans le profil d'entreprise. Lancé pendant
  smb-onboard à la première configuration, puis utilisable seul. À utiliser
  quand le dirigeant dit « mets à jour ma marque », « on a changé de logo »,
  « change mes couleurs », « je veux des documents Word », ou parle de
  l'apparence ou du format de ce que le plugin lui remet.
  [EN] Use when the owner says "update my brand," "we rebranded," "change my
  colors," "make the reports match our new look," or anything about the look or
  format of what the plugin hands them.
allowed-tools: Read, WebFetch
---

> Language rule: see `shared/language.md`.

# Identité visuelle

Un seul endroit où le dirigeant règle l'apparence de tout et le mode de
livraison. À configurer une fois pendant l'onboarding, puis modifiable à tout
moment en une phrase.

## Étape 1 — Montrer ce qui est déjà défini

Lire le bloc `## Business context`. Si Couleurs de marque, Logo ou Préférence
de sortie existent, les restituer d'abord en mots simples : « Là, tes pages
utilisent un vert profond et du crème avec ton logo feuille, et tu reçois des
pages visuelles. Qu'est-ce qui change ? » Un dirigeant qui change un seul point
ne doit pas devoir répondre au reste.

Si rien n'est encore enregistré (premier passage, en général dans
`smb-onboard`), passer directement à la capture.

## Étape 2 — Capturer la marque sans friction

Deux chemins, tous deux presque gratuits pour le dirigeant :

- **Un lien de site.** Récupérer le site (WebFetch) et en extraire l'URL du
  logo, les couleurs principales (depuis le CSS, le thème ou l'image
  d'aperçu social) et la signature. Le dirigeant ne fait que coller le lien.
  Méthode détaillée dans
  [`../smb-onboard/reference/website-research.md`](../smb-onboard/reference/website-research.md).
- **Une description en mots simples.** « Vert forêt et crème », « bleu marine
  et gris chaud », « comme un cabinet d'avocat moderne ». Traduis toi-même les
  mots en couleurs réelles.

**Ne jamais demander de code hex, de sélecteur de couleur ni de dépôt de
fichier.** Une identité coûte un lien collé ou une phrase dite, pas plus.
« Passer » est toujours une réponse acceptable et signifie le défaut neutre.

## Étape 3 — Prévisualiser avant d'enregistrer

Rendre une petite page d'exemple en artefact HTML, au style maison
(`../../shared/artifact-style.md`), avec la marque candidate appliquée — un
titre, une tuile de statistique, un court tableau, une pastille d'état — pour
que le dirigeant voie le rendu sur de vrais composants et non sur un nuancier.
Poser une seule question : « Ça correspond ? »

S'il ajuste (« vert plus foncé », « moins de crème »), appliquer et
re-afficher. Cette boucle est peu coûteuse ; une marque fausse sur toutes les
pages futures ne l'est pas.

## Étape 4 — Demander comment recevoir les livrables

Le choix à six branches, proposé en choix multiple (à sauter si le dirigeant
est venu uniquement changer les couleurs et que la préférence existe déjà) :

1. **Artefacts visuels** — pages stylées consultables ici (par défaut)
2. **Documents Word** — fichiers DOCX à télécharger
3. **Markdown** — fichiers .md à télécharger
4. **Notion** — pages créées dans son espace Notion (connecteur Notion requis ;
   demander où elles doivent se placer)
5. **Canva** — Canva Docs créés dans son compte Canva (connecteur Canva requis ;
   s'il est connecté, lancer `list-brand-kits` et demander une fois quel kit de
   marque appliquer, ou aucun ; sinon le premier skill qui livre vers Canva le
   demandera)
6. **Le meilleur pour le skill** — chaque skill choisit ce qui convient

Enregistrer la réponse telle quelle parmi : `visual artifacts`, `docx`, `md`,
`notion`, `canva`, `best for skill`. S'il choisit Notion ou Canva et que le
connecteur correspondant n'est pas connecté, enregistrer quand même, dire que
les livrables basculent sur les artefacts visuels en attendant, et proposer de
l'aider à le connecter.

## Étape 5 — Enregistrer, avec validation

Montrer ce qui va être enregistré — Site, Couleurs de marque, Logo, Préférence
de sortie, et kit de marque Canva (nom et identifiant) si la préférence est
Canva — et attendre le oui. Mettre à jour uniquement ces champs dans le bloc
`## Business context`, en reprenant les noms de champs exacts de
[`../smb-onboard/reference/onboard-checklist.md`](../smb-onboard/reference/onboard-checklist.md).
Ne jamais toucher aux autres champs, et ne jamais écraser en silence.

Terminer sur l'effet, pas sur la mécanique : « C'est fait — toutes les pages et
tous les documents suivront désormais la nouvelle identité. »

## Ce qu'il ne faut pas faire

- **Ne pas demander de code hex, de sélecteur ni de dépôt.** Un lien ou une
  phrase, toujours.
- **Ne pas relancer tout l'interrogatoire.** Ce skill change l'apparence et la
  livraison, rien d'autre — un dirigeant qui dit « mets à jour ma marque » ne
  resigne pas un onboarding complet.
- **Ne pas enregistrer sans la prévisualisation et le oui.** Une marque
  appliquée à toutes les pages futures mérite une confirmation.
- **Ne pas restyler les anciens livrables.** Le changement s'applique à
  partir de maintenant ; ne jamais prétendre que des documents passés ont été
  mis à jour.

## Après la mise à jour

Une ligne sur ce qui a changé. L'étape suivante naturelle est de le voir en
vrai : proposer « brief du lundi » (`/brief-lundi`) ou « comment va
l'entreprise ? » (`business-pulse`) pour que la première page brandée arrive
immédiatement. Jamais plus de trois propositions ; jamais deux fois une
proposition refusée dans la session.
