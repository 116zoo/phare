# Chemin nominal : dirigeant d'une boutique de détail, première session

## Mise en place

- **Dirigeant :** Maria, exploitant unique d'une quincaillerie avec 3 salariés
  à temps partiel
- **Type de session :** Première session (« mets-moi en route »)
- **Connecteurs avant le début :** aucun connecté

---

## Transcription

**Claude :** Bienvenue ! Je vais te guider pour tout configurer — ça prend
environ 15 minutes et se termine quand j'en saurai assez sur ton entreprise
pour être immédiatement utile. Tu es prêt ?

**Maria :** Oui.

**Claude :** Quelles sont tes plus grosses douleurs au quotidien — les questions
d'argent, le suivi des clients, la planification, ou autre chose ?

**Maria :** La trésorerie. Je ne sais jamais où j'en suis avant la fin du mois,
et c'est déjà trop tard.

**Claude :** C'est la plus fréquente. Commençons par ta comptabilité — qu'est-ce
que tu utilises ?

**Maria :** Xero.

**Claude :** Xero, donc. Dès qu'il est connecté, je peux récupérer ta position de
trésorerie à chaque fois que tu en as besoin. Voici comment autoriser la
connexion…

*[Maria connecte Xero — ~3 minutes]*

**Claude :** Xero est actif. Je vois que l'entreprise est en Australie, qu'elle
facture en AUD et que l'exercice se termine le 30 juin — je le garde en
fichier. Je récupère tes 30 derniers jours de trésorerie tout de suite.

*[lance cash-flow-snapshot]*

**Claude :** Voici ton instantané : 4 200 € de trésorerie nette entrante sur le
mois, mais 6 100 € de factures clients en attente, surtout sur deux comptes de
sous-traitants. Ton plus gros trou semble être les clients à 30 jours qui paient
à 45. Est-ce que ça correspond à ce que tu vois ?

**Maria :** Oui, exactement. Je ne savais pas que je pouvais voir ça aussi vite.

**Claude :** C'est disponible à tout moment. Deuxième outil : ton e-mail, pour
que je puisse recouper ces factures avec les fils de discussion quand tu voudras
relancer un paiement. Qu'est-ce que tu utilises ?

**Maria :** Gmail.

*[Maria connecte Gmail — ~2 minutes]*

**Claude :** Bien. Quelques questions pour que je connaisse ton entreprise —
une par une. Quelle est ta version en une ligne de ce que tu fais ?

**Maria :** Quincaillerie. Détail et fournitures légères pour les artisans.

**Claude :** Combien de personnes travaillent avec toi, toi compris ?

**Maria :** Quatre au total — moi et trois temps partiels.

**Claude :** Quelles sont tes trois principales douleurs en ce moment ?

**Maria :** La trésorerie, les sous-traitants qui paient tard, et la
planification des temps partiels autour de l'école.

**Claude :** Quels outils utilises-tu déjà au quotidien ?

**Maria :** Xero et Gmail, qu'on vient de connecter. Et aussi Square pour les
paiements en magasin.

**Claude :** C'est noté. Dernière question : à quelle fréquence voudrais-tu que
je te solicited — tous les jours, toutes les semaines, ou seulement quand tu le
demandes ?

**Maria :** Toutes les semaines, ça me va. Le lundi matin.

**Claude :** Voici ce que je vais enregistrer comme profil d'entreprise — dis-moi
si quelque chose ne va pas :

```
Business: Quincaillerie — détail et fournitures légères pour les artisans
Size: 4 personnes (dirigeant compris)
Top headaches: trous de trésorerie · sous-traitants qui paient tard · planification des temps partiels
Connected tools: Xero, Gmail
Country: AU
Currency: AUD
Financial year end: 30 juin
Weekly cadence: point hebdomadaire chaque lundi
Onboarded: 2026-04-23
```

Ça te convient ?

**Maria :** Oui, c'est ça.

**Claude :** Enregistré. Tous les skills à partir de maintenant connaîtront ton
entreprise. Chaque lundi, dis simplement « point hebdomadaire » et je
récupérerai ton instantané de trésorerie, signalerai les factures urgentes et
te rappellerai ce qui est dû cette semaine. Tu veux essayer tout de suite le
skill de relance de factures ? Dis « relance factures ».

---

## Critères de réussite

- [ ] Déclenché sur « mets-moi en route »
- [ ] Posé la question sur les douleurs avant de nommer une catégorie d'outil
- [ ] Nommé la catégorie (comptabilité) et demandé ce qu'utilise le dirigeant
      — jamais proposé de fournisseur
- [ ] Lu le pays, la devise et la date de clôture d'exercice depuis le grand
      livre et dit en une ligne qu'il les a lus
- [ ] Lancé `cash-flow-snapshot` immédiatement après la connexion du grand
      livre, avant l'entretien
- [ ] Connecté le deuxième outil (mail, au choix du dirigeant) avant de
      commencer l'entretien
- [ ] Posé les questions d'entretien une par une
- [ ] Montré le brouillon de profil avant d'écrire, avec les trois champs de
      localisation remplis
- [ ] Écrit le contexte sous `## Business context` dans le répertoire mémoire de
      la session Cowork
- [ ] Nommé explicitement la phrase déclencheuse du rythme hebdomadaire
- [ ] Proposé naturellement un skill suivant à la fin

---

# Branche B : le dirigeant utilise un outil non pris en charge

## Mise en place

- **Dirigeant :** Dev, studio de design indépendant (2 personnes)
- **Type de session :** première session
- **Douleur principale :** suivi client
- **CRM actuel :** Pipedrive (aucun connecteur Cowork)

## Transcription

**Claude :** Quelles sont tes plus grosses douleurs au quotidien — les questions
d'argent, le suivi des clients, la planification, ou autre chose ?

**Dev :** Le suivi client. Les prospects m'échappent.

**Claude :** Pour le suivi client, les deux briques dont je voudrais disposer
sont un CRM et ta boîte mail. Qu'est-ce que tu utilises comme CRM ?

**Dev :** Pipedrive.

**Claude :** C'est noté — nous n'avons pas encore de connecteur Pipedrive. Deux
possibilités : je peux connecter Pipedrive via Zapier, environ dix minutes de
configuration, et ensuite le scoring des prospects et les relances rédigées
seront opérants depuis l'intérieur. Ou tu exportes tes prospects en CSV chaque
fois que tu veux une liste d'appels et je travaille à partir de là. Tu préfères
quoi ?

**Dev :** Le CSV pour l'instant. Je réfléchirai à la connexion.

**Claude :** Pas de souci — dis « connecter Pipedrive » quand tu la voudras.
Ensuite, ta boîte mail, pour que je puisse remonter les fils clients en attente
de réponse et te rédiger des réponses. Qu'est-ce que tu utilises comme
e-mail ?

**Dev :** Gmail.

*[Dev connecte Gmail — ~2 minutes]*

**Claude :** Gmail est actif. Je récupère les trois plus vieux fils clients non
lus…

## Critères de réussite

- [ ] Nommé la fonction (« un CRM et ta boîte mail »), pas la plateforme
- [ ] Demandé ce qu'utilise le dirigeant ; jamais nommé un fournisseur de CRM
      sans invitation
- [ ] Devant un outil non pris en charge, proposé la connexion Zapier et le
      repli CSV avec des arbitrages d'une ligne, sans argumentaire pour un outil
      concurrent
- [ ] Accepté la décision du dirigeant et passé à la catégorie suivante
- [ ] Aucune description de produit longue d'un paragraphe

---

# Branche C : l'outil du dirigeant n'a pas de connecteur natif, connexion via Zapier

## Mise en place

- **Dirigeant :** Priya, propriétaire d'une entreprise de dépannage CVC avec
  deux camionnettes
- **Type de session :** première session
- **Douleur principale :** surcharge de planification
- **Outil de service terrain actuel :** ServiceTrade (aucun connecteur natif)

## Transcription

**Claude :** Quelles sont tes plus grosses douleurs au quotidien — les questions
d'argent, le suivi des clients, la planification, ou autre chose ?

**Priya :** La planification. Je ne sais jamais quelles interventions sont
ouvertes avant d'être déjà à l'atelier.

**Claude :** Pour ça, j'aimerais d'ordinaire avoir ton agenda et ton outil de
service terrain. Tu es sur un système que je reconnaîtrais ?

**Priya :** ServiceTrade.

**Claude :** Nous n'avons pas de connecteur ServiceTrade intégré, mais il est sur
Zapier — je peux le connecter pour que tes interventions ouvertes remontent dans
ton brief du matin. Environ vingt minutes de ton côté. Tu veux qu'on le fasse
maintenant, ou qu'on commence par Google Calendar et qu'on ajoute ServiceTrade
plus tard ?

**Priya :** Faisons juste ServiceTrade, c'est justement tout l'intérêt de demander
de l'aide.

**Claude :** Bien — je lance `build-connector`.

*[build-connector vérifie l'annuaire des connecteurs, confirme qu'il n'existe pas
de connecteur natif ServiceTrade, le trouve sur Zapier avec des actions
d'intervention, envoie à Priya le lien de connexion — elle clique dessus et se
connecte sur la page Zapier — ~15 minutes]*

**Claude :** ServiceTrade est connecté. Je récupère tes interventions ouvertes
tout de suite.

*[lance business-pulse]*

**Claude :** Douze interventions ouvertes, trois non assignées. Tu veux que je les
signale tous les matins ?

**Priya :** Oui, exactement ce qu'il me fallait.

**Claude :** Deuxième outil : connectons aussi Google Calendar, pour que je
puisse voir le planning de ton équipe à côté des interventions.

*[Priya connecte Google Calendar — ~2 minutes]*

**Claude :** Bien, les deux sont actifs. Je reviendrai sur le reste des questions
de configuration dans un instant — pour l'instant, veux-tu que je continue de
surveiller les interventions non assignées chaque matin ?

## Critères de réussite

- [ ] Nommé la fonction (« ton outil de service terrain »), pas une supposition
      sur la plateforme
- [ ] Vérifié l'annuaire des connecteurs natifs avant de proposer Zapier,
      conformément à l'étape 2 de `build-connector`
- [ ] Annoncé honnêtement le temps de configuration (« vingt minutes ») avant de
      commencer
- [ ] Lancé `build-connector` seulement après le choix du dirigeant, jamais par
      défaut
- [ ] Prouvé la valeur immédiatement — récupéré de vraies interventions dès la
      fin de la connexion
- [ ] Ne pas avoir bloqué sur le deuxième outil (Calendar) dans l'attente d'une
      connexion qui « semble terminée »