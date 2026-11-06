---
name: marketing-monday
allowed-tools: Read, WebFetch
description: >
  Planifie les actions marketing de la semaine. Meta et Google Ads via
  Zapier. SEO local FR. B2B : LinkedIn, salons.
  [EN] Weekly marketing actions.
---

> Language rule: see `shared/language.md`.

Exécute le brief de croissance hebdomadaire en enchaînant deux skills —
`growth-pulse` pour savoir si le moteur fonctionne et `review-reputation` pour
savoir ce que disent les clients — puis en ajoutant un balayage de concurrence
natif web. Les trois parties alimentent un brief fusionné unique ; ce n'est pas
trois rapports agrafés ensemble.

Connecteurs : n'importe lequel de PayPal, Shopify ou HubSpot suffit pour
s'exécuter. Apollo, Clay, Mailchimp, Square, Stripe et TikTok Ads ajoutent chacun
une couche. TikTok Ads apporte la couche payante de l'étape 1 via growth-pulse :
dépense de la semaine passée, résultats et coût par résultat à côté de la
tendance des ventes, rapportés comme la déclaration propre de la plateforme,
à côté du nombre de leads du CRM, jamais fusionnés
(`../growth-pulse/reference/data_sources.md`). Mailchimp apporte le canal email
de l'étape 1 (son appel `get_capabilities` exige `user_request` et un
`category` ; `../../shared/connector-call-shapes.md`) — analyses de campagne avec
attribution de revenu et chiffres de croissance d'audience. Il est en lecture
seule dans ce brief : rien n'est rédigé ni envoyé depuis ici, et son revenu
attribué est rapporté comme la déclaration propre du canal email, à côté des
chiffres de plateforme et de CRM, jamais fusionné en un seul chiffre. Sans aucun
d'eux, des exports CSV et des avis collés font l'entrée, et le balayage de
concurrence s'exécute en natif web, sans connecteur du tout.

Fenêtre par défaut : les 7 derniers jours pour le pouls, les 90 derniers jours
pour les avis, et depuis la dernière exécution pour la liste de surveillance
concurrentielle.

## Étape 1 — Le moteur fonctionne-t-il (growth-pulse)

Déclencher le déroulé du skill `growth-pulse`. Extraire tous les connecteurs en
un seul lot parallèle ; une exécution en série est une attente que personne ne vit
deux fois.

**Entre :** ce qui est connecté, ou des exports. **Sort :** tendance par canal,
conversion de l'entonnoir, retour des campagnes, performance des produits et
sentiment — chacun avec un statut, et tout ce qui manque marqué « n/d » plutôt
que silencieusement retiré.

**Transmission :** reprendre la phrase unique qui explique la période, plus la
plus forte chute de l'entonnoir et tout produit portant l'ensemble de la tendance.
Ne pas faire entrer le tableau de bord complet à cinq vues dans le brief fusionné.

**Aucune garde ici.** La commande a été invoquée ; l'exécuter. Lire des données
n'est pas une action qui mérite une approbation.

## Étape 2 — Ce que disent les clients (review-reputation)

Déclencher le déroulé du skill `review-reputation`.

**Entre :** avis publics, litiges PayPal, tickets HubSpot, fils d'email de
plainte, et avis collés ou exportés quand rien ne les lit directement. **Sort :**
trois à cinq thèmes avec citations verbatim, avis nécessitant une réponse, et
clients devenus silencieux.

**Transmission :** reprendre les thèmes et le sens de la note. Transmettre les
réponses rédigées comme une file d'approbation distincte, pas comme contenu du
brief.

**Garde :** rien ne est publié publiquement sans que le dirigeant l'ait lu
d'abord, un avis à la fois. Cette garde survit intacte à la chaîne — un brief
fusionné ne devient pas une approbation générale pour répondre à la place du
dirigeant.

Si la liste des clients silencieux mérite d'être travaillée, désigner
`/reactiver-clients` plutôt que de commencer des brouillons de reconquête dans ce
brief.

## Étape 3 — Ce qu'ont fait les concurrents (recherche web)

Exécuter cette branche en ligne — elle ne demande aucun connecteur. Consulter la
liste de surveillance des concurrents enregistrée par le dirigeant (ou demander
trois ou quatre noms la première fois, puis les enregistrer) et balayer les
sources publiques : leur site et pages tarifaires, activité sociale et
publicitaire, offres d'emploi, et presse. Ajouter les notes gagné-perdu de
HubSpot quand HubSpot est connecté.

**Sort :** ce qui a changé, avec faits observés et inférences étiquetés séparément
et tout daté. Ne jamais présenter une inférence comme une observation.

**Transmission :** ne reprendre que les changements notables. Une semaine calme se
rapporte comme une semaine calme — trois lignes, sans remplissage. Cette honnêteté
est ce qui rend la semaine où quelque chose se produit vraiment marquante.

**Garde :** rien n'agit sur le renseignement. Un mouvement de prix ou une
campagne relève de la décision du dirigeant.

## Étape 4 — Fusionner en un brief

C'est l'étape qui rend la commande digne d'exister, donc ne pas la raccourcir.

La sortie est **une page**, pas trois sections livrées intactes. Lire les trois
entrées ensemble et chercher où elles s'expliquent mutuellement. Les liaisons qui
comptent généralement :

- Un sentiment qui glisse pendant que le revenu tient est le signal d'alerte
  précoce qui apparaît dans le chiffre d'affaires deux mois plus tard.
- Un mouvement de prix d'un concurrent sur un produit dont la marge est déjà
  mince est une décision, pas une note.
- Un taux de réussite en baisse avec un volume de leads solide, plus des
  réclamations d'avis sur le délai de réponse, est une seule histoire racontée
  deux fois.
- Une liste de clients silencieux qui grossit en même temps qu'un nouveau point
  de vente concurrent, c'est de l'attrition avec une cause nommée.

Structure :

1. **En tête** — la seule chose qui compte cette semaine, en une phrase
2. **Comment la croissance a performé** — les chiffres, chacun avec sa
   comparaison
3. **Ce qu'ont dit les clients** — les thèmes avec citations verbatim
4. **Ce qui a changé autour de vous** — les mouvements des concurrents, observés
   et datés
5. **Faites ces trois choses cette semaine** — exactement trois, classées par
   taille d'impact

> **SEO local (brique obligatoire du plan) :** le brief réserve toujours une
> place au SEO local — fiches Google Business (notes, photos, réponses d'avis)
> et les actions locales de la semaine (maillage local, actualisation de la
> fiche). Un plan de semaine sans aucune brique SEO local est incomplet, même
> si le budget est mince ; c'est la brique à faible coût qui maintient la
> visibilité de proximité.

Chaque action a besoin de quoi faire, du chiffre de ce brief qui la justifie, et
de ce qu'elle vaut à peu près. Classer par impact, pas par facilité — le dirigeant
peut juger ce qui est facile ; seul le brief peut dire ce qui est gros.

Si la réponse honnête est que rien ne doit changer, le dire. Un brief qui fabrique
trois actions chaque semaine apprend au dirigeant à les ignorer toutes.

## Étape 5 — Proposer la cadence, une fois

Proposer de l'exécuter chaque semaine. Demander une fois. Sur un oui, fixer la
programmation et confirmer le jour et l'heure. À un non ou sans réponse, passer à
la suite et ne pas redemander dans la même exécution.

Chaque exécution programmée se compare à la précédente et fait avancer la
référence, parce que le changement n'a de sens que par rapport à une référence.

## Gardes de validation (doivent tenir)

- Aucune réponse publique à un avis n'est publiée sans approbation avis par avis.
- Aucun envoi de message de reconquête depuis cette commande — cela relève de
  `/reactiver-clients`.
- Aucune action de prix ou de campagne n'est prise sur la base de renseignement
  concurrentiel. Recommander et s'arrêter.
- La cadence n'est fixée que sur un oui explicite.
- Si un connecteur échoue, le nommer dans la ligne des sources et continuer. Un
  trou nommé est une information ; un trou silencieux ressemble à une bonne
  nouvelle.

## Ce qu'il ne faut pas faire

- **Ne pas agrafer trois rapports ensemble.** Le livrable est un brief fusionné
  avec trois actions à la fin. Si la sortie se lit comme une section croissance,
  puis une section avis, puis une section concurrence sans phrase de liaison, elle
  a échoué.
- **Ne pas gonfler une semaine calme.** « Rien d'essentiel n'a changé » protège la
  crédibilité de la semaine où il y a eu quelque chose.
- **Ne pas inventer d'attribution ni de mouvement concurrentiel.** Les deux se
  répètent ensuite à d'autres personnes.
- **Ne pas présenter la valeur prévisionnelle du CRM comme du revenu.** Les
  valeurs d'affaires sont des espoirs ; les factures sont des faits.
- **Ne pas demander à propos de la programmation plus d'une fois.**
- **Ne pas dépasser trois actions.** Quatre, c'est une liste de tâches que personne
  ne fait.
- **Ne pas lire les charges ou la marge depuis le résumé P&L de QuickBooks.** Son
  `totalExpenses` peut valoir zéro face à des lignes réelles ; totaliser les lignes
  ou `monthlyBreakdown` (`../../shared/quickbooks-report-traps.md`, piège 2).

## Sortie

Une page dans la conversation, avec les trois actions en dernier. Proposer une
fois de l'enregistrer en fichier ou de le publier sur Slack, puis cesser de
demander.

Livrer également le brief fusionné selon la préférence de sortie enregistrée —
jamais par défaut en fichier markdown. Vérifier le champ `Output preference` du
bloc `## Business context` (règle du guide de style partagé,
`../../shared/artifact-style.md`) :

- **Artefact visuel (par défaut) :** rendre le brief en page HTML au style
  maison. Une page, calquée sur la fusion : tuiles de statistiques de croissance
  pour les chiffres d'en tête, un panneau de thèmes de sentiment avec citations
  verbatim, la liste des changements concurrents datée et étiquetée observée ou
  déduite, et en dernier un panneau des trois actions. Le résumé dans la
  conversation reste — l'artefact est complémentaire, jamais l'unique copie.
- **Préférence docx / md / notion / canva :** livrer le même contenu sous cette
  forme — un fichier DOCX ou markdown, une page Notion créée via le connecteur
  (destination nommée, jamais d'écrasement), ou un Canva Doc via le connecteur
  Canva (un nouveau design par exécution, nommé avec la date ; les tableaux
  deviennent des listes) ; retomber sur l'artefact visuel si Notion ou Canva
  n'est pas connecté — en le disant.
- **Best for skill :** utiliser l'artefact visuel — un brief hebdomadaire se
  parcourt, il ne s'archive pas.

## Proposition de clôture

Terminer par une ligne sur ce qui a été livré — l'en-tête de la semaine et les
trois actions. Puis proposer l'étape suivante la plus pertinente avec sa
formulation déclencheuse exacte, généralement « réactiver les clients silencieux »
(`/reactiver-clients`) quand la liste des clients silencieux mérite d'être
travaillée. Proposer au plus deux autres, prises dans la table du routeur, comme
« que dois-je mettre en avant ? » (`content-strategy`) ou « qui dois-je appeler ? »
(`lead-triage`). Trois propositions au maximum, et ne jamais reproposer ce que le
dirigeant a déjà refusé dans cette session.

## Utiliser un outil qui n'est pas listé

Les connecteurs nommés dans ce skill sont les chemins testés, pas une muraille.
Si le dirigeant veut que ce flux utilise un outil non connecté ou non listé,
proposer `build-connector` — il vérifie d'abord l'annuaire des connecteurs et se
connecte via Zapier sinon, jamais en construisant à la main contre une API brute.
Une fois la connexion en place, l'outil rejoint ce skill comme tout connecteur
optionnel, sous les mêmes gardes de validation.

## Lien cluster Shopify
Cette compétence dialogue avec la boutique en ligne via `shopify-marketing` (hub : `shopify-hub`, doc : [AI Toolkit](../../shared/shopify-ai-toolkit.md)).
