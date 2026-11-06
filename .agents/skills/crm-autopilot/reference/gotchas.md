# Pièges

Les cas limites où le skill `crm-autopilot` a le plus de chances de produire de mauvaises données dans le CRM. Chaque entrée suit le schéma Bon / Mauvais.

---

## Piège : créer un contact en double quand l'email est déjà dans HubSpot avec une casse différente

**Pourquoi c'est important :** HubSpot dédoublonne sur correspondance exacte d'email. `Sarah.Lin@acme.com` et `sarah.lin@acme.com` sont traités comme distincts, et un dirigeant qui a déjà créé l'un verra apparaître un doublon silencieux. Cela détruit la confiance que le dirigeant porte au skill.

### ✗ Mauvais

> Recherche de `Sarah.Lin@acme.com` dans HubSpot — aucun résultat. Création d'un nouveau contact : Sarah Lin (Sarah.Lin@acme.com).

Le nouveau contact est créé ; le contact `sarah.lin@acme.com` existant du dirigeant a désormais un doublon.

### ✓ Bon

> Recherche de `sarah.lin@acme.com` dans HubSpot (insensible à la casse) — aucun résultat. Création d'un nouveau contact : Sarah Lin (sarah.lin@acme.com). Annoncée avant écriture.

Normalise toujours l'email en minuscules avant la recherche. Annonce la création pour que le dirigeant puisse rattraper les oublis.

---

## Piège : écrire le fil d'emails complet comme corps de l'activité

**Pourquoi c'est important :** les activités HubSpot sont des surfaces de signal à parcourir rapidement, pas des archives de transcriptions. Un fil de 12 messages collé dans le corps de l'activité ne sert à rien ; un résumé de trois phrases sur ce qui a été convenu est actionnable.

### ✗ Mauvais

> **Corps de l'activité :**
> *De : Sarah Lin — jeu. 9 avr.…*
> *Bonjour ! Je reviens vers toi après notre appel ; voici les spécifications que nous avons évoquées…*
> *[1 200 mots de plus]*

Le dirigeant passe dessus à chaque fois.

### ✓ Bon

> **Corps de l'activité :** Sarah a confirmé le périmètre de l'extension du T2 — 50 sièges, 18 000 € de CA annuel, démarrage le 1er juin. Elle enverra le cahier des charges signé d'ici vendredi. Aucune question ouverte.

Le résumé nomme les décisions, les chiffres et la prochaine étape.

---

## Piège : créer automatiquement une affaire quand la bonne ne peut pas être résolue

**Pourquoi c'est important :** les affaires en double sont très difficiles à démêler dans HubSpot — elles divisent l'historique d'activité, brouillent les rapports, et le dirigeant s'en rend compte en général des semaines plus tard, quand une prévision ne colle pas.

### ✗ Mauvais

> Aucune affaire ouverte trouvée pour Sarah Lin chez Acme. Création d'une nouvelle affaire : « Acme — nouvelle opportunité », et journalisation de l'appel dessus.

Il y a maintenant deux affaires Acme, et le dirigeant n'a aucune idée de laquelle est la vraie.

### ✓ Bon

> Aucune affaire ouverte trouvée pour Sarah Lin chez Acme. Sur quelle affaire dois-je journaliser cela ? Options : (1) Extension Acme T2 (close-won en février), (2) Renouvellement Acme 2027 (ouverte). Ou veux-tu ne rien journaliser pour l'instant ?

Demande. Ne crée jamais une affaire à la place du dirigeant.

---

## Piège : résoudre contre un portail vide

**Pourquoi c'est important :** un portail HubSpot tout neuf renvoie zéro contact et zéro affaire, et chaque étape de résolution « échoue » ensuite d'une manière qui ressemble à un problème de données. Le skill se met à proposer des contacts à créer et des affaires où journaliser, et le dirigeant se retrouve avec un CRM rempli par un passage de journalisation au lieu de l'être par sa propre configuration.

### ✗ Mauvais

> Aucun contact trouvé pour sarah@acme.com. Création du contact. Aucune affaire ouverte trouvée — sur quelle affaire dois-je journaliser cela ? (aucune listée)

Le portail ne contient rien. Il n'y a aucune affaire à choisir.

### ✓ Bon

> Ton CRM ne contient encore ni contacts ni affaires — il a l'air tout neuf. Je peux garder ce journal d'appels dans le CRM tableur jusqu'à ce qu'il soit alimenté (sur HubSpot, je peux aussi lancer sa configuration). Tu préfères lequel ?

Vérifie d'abord les compteurs (étape 3). Un portail vide est une question de configuration, pas un problème de résolution. N'utilise pas l'indicateur `onboarded` de `get_user_details` comme test : un portail rempli de contacts peut toujours renvoyer `onboarded: false`. L'indicateur dit si la configuration guidée de HubSpot a été exécutée, pas s'il y a des données.

---

## Piège : proposer un changement d'étape d'affaire sur la base du langage d'un email

**Pourquoi c'est important :** « nous avançons » dans un email ne signifie pas toujours « passer en close-won ». Les clients le disent quand ils avancent dans leur évaluation, ou dans une étape d'achats. Le dirigeant a un contexte que le skill n'a pas. Faire avancer l'étape automatiquement est destructeur pour le pipeline.

### ✗ Mauvais

> L'email de Sarah indique « nous avançons ». Proposition de passer `dealstage` → Closed Won. Écriture immédiate.

### ✓ Bon

> Signalement : l'email du 18 avril de Sarah (« nous avançons dans l'évaluation d'Anthropic ») peut indiquer un mouvement d'étape. L'étape actuelle est « Proposal Sent ». Veux-tu la faire avancer ? Je ne changerai pas l'étape sans ton accord explicite.

Mets les éléments de preuve en avant, retiens l'écriture.

---

## Piège : écraser une prochaine étape définie par le dirigeant pendant le nettoyage

**Pourquoi c'est important :** le dirigeant a pu fixer une prochaine étape qui traduit un contexte que le skill ne voit pas — un appel téléphonique, un fil Slack, une note privée. L'écraser parce qu'un email récent suggère autre chose efface un vrai travail.

### ✗ Mauvais

> `hs_next_step` indique actuellement « attendre la revue juridique ». Le dernier email de Sarah indique « planifions la revue tarifaire ». Mise à jour de `hs_next_step` en « planifier la revue tarifaire ».

### ✓ Bon

> `hs_next_step` indique actuellement « attendre la revue juridique » (défini par toi il y a 3 jours). L'email de Sarah du 19 avril suggère qu'une revue tarifaire est également nécessaire. Je propose d'ajouter ou de remplacer ? Actuel → Proposé : « attendre la revue juridique » → « attendre la revue juridique ; puis planifier la revue tarifaire. » Tu approuves ?

Affiche la valeur actuelle, propose explicitement le changement, attends l'approbation.