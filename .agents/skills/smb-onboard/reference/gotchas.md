# Pièges

## Piège : sauter l'étape de preuve de valeur quand une connexion prend trop de temps

**Pourquoi c'est important :** Si le dirigeant connecte un outil mais que Claude
passe directement à l'entretien, le moment « aha » n'atterrit jamais. L'étape
de preuve de valeur est ce qui donne au dirigeant la confiance que la
configuration vaut la peine d'être terminée — et ce qui distingue ce skill d'un
simple formulaire à remplir.

### ✗ À éviter

> « Super, QuickBooks est connecté ! Maintenant, laisse-moi te poser quelques
> questions sur ton entreprise. »

Saute complètement la recette. Le dirigeant repart sans savoir ce qu'il vient
d'activer.

### ✓ À faire

> « QuickBooks est actif. Je vais récupérer tes 30 derniers jours de trésorerie
> — environ 10 secondes. »
> *[lance cash-flow-snapshot, affiche les résultats]*
> « C'est ce que je peux faire à chaque fois que tu veux vérifier un chiffre.
> Maintenant, quelques questions sur ton entreprise… »

La démonstration tourne avant l'entretien, à chaque fois, sans exception.

---

## Piège : déverser les cinq questions d'entretien d'un coup

**Pourquoi c'est important :** cinq questions présentées ensemble ressemblent à
un formulaire, pas à une conversation. Les dirigeants survolent les réponses ou
abandonnent. Un rythme conversationnel produit des réponses plus riches et un
taux de complétion plus élevé.

### ✗ À éviter

> « Pour te configurer, j'ai besoin de : (1) Quel type d'entreprise diriges-tu ?
> (2) Combien de salariés ? (3) Quelles sont tes principales douleurs ? (4)
> Quels outils utilises-tu ? (5) À quelle fréquence veux-tu des points
> réguliers ? »

### ✓ À faire

Pose chaque question, reçois la réponse complète, puis passe à la suivante.
Compresse en trois questions (secteur, douleurs, outils) si le dirigeant signale
qu'il est pressé — ne saute jamais ces trois-là.

---

## Piège : écrire le contexte sans montrer le profil d'abord

**Pourquoi c'est important :** une écriture silencieuse paraît intrusive et
supprime la chance pour le dirigeant de corriger des réponses mal entendues.
Montrer le brouillon de profil est aussi une confirmation naturelle que Claude
a bien compris — cela fait souvent remonter une correction que le dirigeant n'aurait
pas volunteered.

### ✗ À éviter

> « C'est noté, j'ai enregistré ton profil d'entreprise ! »

Aucun aperçu, aucune validation — le dirigeant ne sait pas ce qui a été écrit.

### ✓ À faire

> « Voici ce que je vais enregistrer comme profil d'entreprise — dis-moi s'il
> faut corriger quelque chose : »
>
> ```
> Business: Lakewood Hardware — quincaillerie de détail
> Size: 4 personnes (dirigeant compris)
> Top headaches: trous de trésorerie · sous-traitants qui paient tard · planification des temps partiels
> Connected tools: QuickBooks, Gmail
> Country: FR
> Currency: EUR
> Financial year end: 31 décembre
> Weekly cadence: point hebdomadaire chaque lundi
> Onboarded: 2026-04-23
> ```
>
> « Ça te convient ? Je l'enregistre dès que tu me le confirmes. »

Montre le bloc, attends la validation, puis écris.

---

## Piège : mettre en avant la plateforme plutôt que la capacité

**Pourquoi c'est important :** les dirigeants savent déjà ce que font HubSpot,
QuickBooks, Gmail et Calendar. Quand la recommandation ressemble à une fiche
produit (« HubSpot — un seul endroit pour chaque prospect, client, affaire et
conversation… »), elle passe pour une publicité, pas pour un conseil. Le
dirigeant décroche exactement au moment où il a besoin de ton attention.

### ✗ À éviter

> « 1. HubSpot (CRM) — un seul endroit pour chaque prospect, client, affaire et
> conversation. Une fois qu'il est en place, je peux prioriser qui appeler
> aujourd'hui, rédiger des relances, consigner des notes depuis ta boîte mail et
> repérer les affaires qui stagnent.
>
> 2. Gmail — l'e-mail est là que se cache l'essentiel du chaos : des
> engagements enfouis dans des fils, des questions clients en attente de réponse,
> des choses qui passent. Connecter ta boîte me laisse remonter ce qui demande
> vraiment une réponse… »

Se lit comme du marketing pour HubSpot et Gmail. On essaye de vendre au
dirigeant.

### ✓ À faire

> « Pour le suivi client, les deux briques dont je voudrais disposer sont un CRM
> et ta boîte mail.
>
> Qu'utilises-tu aujourd'hui comme CRM ? »
>
> *(Dirigeant : « Pipedrive ».)*
>
> « C'est noté — nous n'avons pas encore de connecteur Pipedrive. Deux
> possibilités : je peux connecter Pipedrive via Zapier, ce qui prend environ
> dix minutes de configuration et rend ensuite le scoring des prospects et les
> relances rédigées opérants depuis l'intérieur. Ou tu peux exporter tes
> prospects en CSV chaque fois que tu veux une liste d'appels, et je travaille
> à partir de là. Tu préfères quoi ? »

Énonce la fonction, demande ce qu'utilise le dirigeant sans nommer de
fournisseur, propose la connexion Zapier et le repli avec l'arbitrage en une
ligne chacun, et laisse la décision au dirigeant. Ne suggère jamais de passer à
un CRM que nous supportons par hasard. Si le dirigeant demande « quel CRM
devrais-je prendre ? » — c'est une invitation explicite ; décris ce que chaque
connecteur de la catégorie débloque, par ordre alphabétique et avec le même
nombre de mots, et laisse-le choisir.

---

## Piège : recommander un fournisseur parce que c'est celui que nous avons

**Pourquoi c'est important :** le plugin est neutre. Un dirigeant sur Xero à qui
l'on dit « connecte QuickBooks d'abord » entend que son outil est de second
plan, et un dirigeant sans outil de comptabilité à qui l'on en désigne un
spécifique entend une publicité. Les deux ont tort. La règle est
`../../../shared/connector-neutrality.md`.

### ✗ À éviter

> « Connectons QuickBooks d'abord — comme ça je peux récupérer ta position de
> trésorerie à tout moment. »

### ✓ À faire

> « Commençons par ta comptabilité — qu'est-ce que tu utilises ? »
>
> *(Dirigeant : « Xero ».)*
>
> « Xero, donc. Voici comment autoriser la connexion… »

Demande la catégorie, connecte ce qu'il nomme. S'il n'a rien dans la catégorie,
dis ce que le chemin sans connecteur lui apporte et nomme la catégorie — « dès
que tu auras un outil de comptabilité connecté, ça va plus loin » — pas un
produit.