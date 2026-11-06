# Utiliser Zapier

Le chemin de construction quand la découverte n'a trouvé aucun connecteur Claude
natif. Ce fichier couvre l'utilisation du serveur MCP Zapier lui-même :
s'authentifier, vérifier si une application ou une action existe, connecter le
compte de l'application, activer exactement les actions nommées par le
périmètre, tester sur le cas d'usage réel du dirigeant défini à l'étape 1 du
skill, et la facture de tâches.

---

## Deux modes — dis lequel, à voix haute

**Actions à la demande (le mode par défaut).** Le serveur MCP de Zapier expose
les actions de l'outil, et Claude ne les appelle que lorsqu'un skill s'exécute.
Rien n'est planifié, rien ne tourne en boucle, aucun Zap n'apparaît dans le
tableau de bord du dirigeant, et les tâches ne sont consommées qu'à l'usage réel.
C'est ce dont la plupart des périmètres ont besoin — une extraction de prospects
au moment du brief du matin, une consultation d'enregistrement quand le dirigeant
le demande. Toutes les étapes ci-dessous sont dans ce mode.

**Un Zap (l'exception).** Une automatisation permanente chez Zapier qui tourne
sans Claude — un événement se déclenche, le Zap agit, jour et nuit. N'en
construis un que si le dirigeant a besoin que quelque chose se passe pendant que
personne ne parle à Claude. Il continue de tourner et de facturer tout seul,
donc il est nommé explicitement à l'étape de consentement, nommé de façon à être
identifiable dans le tableau de bord du dirigeant dans six mois (« Claude :
ordres de travail ouverts ServiceTrade », pas « Zap 47 »), et activé seulement
après qu'un test a réussi.

Les dirigeants entendent « Zapier » et imaginent des Zaps. Si la construction
porte sur des actions à la demande, dis-le — « pas de Zap, rien ne tourne en
arrière-plan, Zapier n'est que le tuyau » — sinon le dirigeant se demandera
quelle machinerie invisible a été installée.

---

## Étape 1 — S'authentifier auprès de Zapier

Vérifie si la connexion est déjà établie avant toute chose : appelle `ToolSearch`
pour `discover_zapier_actions`. Si rien ne correspond — si seule une paire
d'outils `authenticate` / `complete_authentication` apparaît — Zapier n'est pas
encore connecté.

**Si ce n'est pas connecté :** appelle l'outil d'authentification Zapier de la
plateforme. Il renvoie une URL d'autorisation — transmets-la au dirigeant et
demande-lui de la valider dans son navigateur. Le reste de l'ensemble d'outils
devient disponible automatiquement une fois l'opération terminée. Si la page de
redirection affiche une erreur, fais réessayer au dirigeant depuis la page de
paramètres du connecteur ; ne lui demande jamais de coller l'URL de rappel ni un
code d'autorisation dans la discussion — cela mettrait un identifiant dans la
transcription, ce qu'interdit l'étape 3 du skill.

Cela n'authentifie que la connexion à la plateforme Zapier — ce n'est **pas** encore
l'application spécifique (ServiceTrade, QuickBooks, ou autre). C'est l'étape 3
ci-dessous, et c'est une étape distincte par application.

---

## Étape 2 — Vérifier que l'application et l'action existent

Appelle `discover_zapier_actions` avec le nom exact du produit de l'étape 1 du
skill, et relis les comptes renvoyés : totaux des actions de
lecture/écriture/recherche et catégorie. Si rien ne revient, l'application n'est
pas sur Zapier — continue avec `discovery.md`, section 3. **`selected_api` doit
provenir tel quel de cet appel — ne le devine jamais et ne le construis pas.**
L'exemple même de Zapier : Gmail est `GoogleMailV2CLIAPI`, pas `GmailCLIAPI`.

Puis choisis les actions dans le périmètre, pas sur la page de l'application :
trouve l'action de recherche ou de lecture, et le moins d'actions d'écriture
possible, qui fournissent exactement ce que l'étape 1 a défini, et ignore tout
ce que l'application propose par ailleurs. Vérifie les champs de chaque action
avant de promettre quoi que ce soit — si le périmètre du dirigeant exige un
champ que l'action ne renvoie pas, c'est un écart à signaler avant de construire,
pas après. Une application présente sur Zapier mais dépourvue de l'action dont le
périmètre a besoin n'est pas une correspondance ; dis pourquoi, clairement, et
continue avec `discovery.md`, section 3.

---

## Étape 3 — Connecter le compte de l'application

Appelle `manage_zapier_connections` avec le `selected_api` de l'étape 2 pour
vérifier la connexion. S'il n'en existe aucune, il renvoie une URL
d'authentification (Zapier l'appelle `connectAuthUrl` dans son propre message
d'erreur) — transmets-la au dirigeant et demande-lui de confirmer une fois la
connexion faite depuis la page Zapier. Le dirigeant se connecte à son outil sur la
page Zapier, jamais dans la discussion ; rien ne peut tourner tant qu'il ne l'a
pas fait, ce qui fait du clic le moment naturel du consentement. Ensuite :

1. Appeler `list_zapier_connections` pour trouver le nouveau `connection_id`.
2. Rappeler `manage_zapier_connections` avec ce `connection_id` comme
   `default_connection_id`. **Une application exige une connexion par défaut avant
   que l'une de ses actions puisse s'exécuter — même s'il n'existe qu'une seule
   connexion.** C'est voulu : Zapier fait choisir le dirigeant en connaissance de
   cause, plutôt que de choisir silencieusement quand plusieurs comptes existent.
3. **Si le dirigeant a plusieurs comptes pour la même application** (deux espaces
   de travail Slack, un Gmail personnel et un Gmail professionnel), ne te batte
   pas pour savoir lequel est par défaut — passe plutôt le `connection_id` propre
   à cette connexion à chaque appel `execute_zapier_read_action` /
   `execute_zapier_write_action`.

---

## Étape 4 — Activer l'action, puis réduire au périmètre

Appelle `enable_zapier_action` avec le `selected_api` et l'action précise choisie
à l'étape 2, plus `app_display_name` pour que les confirmations affichent
« Gmail », jamais un identifiant d'API brut.

**Activer ne fonctionne pas comme un menu.** Un appel d'activation sans action
nommée active toutes les actions de l'application — y compris la suppression,
l'envoi d'email et la requête d'API brute — et activer une seule action peut
déclencher un lot d'actions liées (demander une action « find » peut en activer
quatre). Donc, à chaque fois : activer, puis appeler `inspect_zapier_actions`
pour relire ce qui est réellement actif, puis `disable_zapier_action` sur tout ce
que le périmètre n'a pas nommé. La liste livrée correspond exactement au périmètre
approuvé — un dirigeant qui a approuvé des extractions de prospects en lecture
seule ne doit pas se retrouver avec une action de suppression active dont il n'a
jamais entendu parler.

Si un appel échoue encore avec un message comme :

```
Aucune connexion par défaut n'est définie pour Outreach, ce qui est requis avant
d'exécuter ses actions.
```

L'étape 3 ci-dessus n'a pas été completed — le message d'erreur nomme lui-même la
correction ; suis-la au lieu d'y voir une impasse.

---

## Étape 5 — Tester sur le cas d'usage réel du dirigeant

1. Appeler `inspect_zapier_actions` avec le `tool_name` de l'action de lecture
   choisie à l'étape 2, pour obtenir son schéma de paramètres exact.
2. **Résous les correspondances ambiguës avec soin.** Si le dirigeant a donné
   une information partielle ou ambiguë — un prénom, un terme de recherche avec
   plusieurs correspondances proches — une consultation qui renvoie un seul
   résultat ne prouve pas que c'est le bon. Énumère les candidats et laisse le
   dirigeant choisir plutôt que de deviner.
3. Appeler `execute_zapier_read_action`, montrer les données réelles qu'elle a
   extraites, et demander si elles sont correctes. C'est le seul moyen de
   confirmer que la connexion lit ses vraies données et que rien n'a échappé
   silencieusement au mapping.

**Les actions d'écriture passent le même examen, plus une garde de confirmation.**
Elles ont des effets réels, souvent irréversibles — confirme la cible dès qu'il y
a le moindre doute, et chaque écriture obtient une garde de validation, quels que
soient les demandes du dirigeant.

---

## Estimer la facture de tâches

Zapier facture à la tâche — en gros, chaque appel `execute_zapier_*_action` qui
s'exécute. L'estimation est présentée au dirigeant avant toute construction.

1. **Volume :** combien d'appels par mois, à partir des chiffres du dirigeant à
   l'étape 1. 40 ordres de travail par jour font environ 1 200 par mois.
2. **Palier :** voir `zapier.com/pricing.md` pour les offres et les quotas de
   tâches actuels. **N'annonce jamais un tarif de mémoire** — Zapier modifie
   régulièrement ses paliers et ses quotas.
3. **Dépassement :** dis ce qui se passe au-delà de la limite — les offres
   diffèrent selon que les appels se mettent en pause ou sont facturés en
   dépassement. Une offre en pause est silencieuse ; voir « Comment ça casse ».

**S'il s'agit d'un Zap,** le calcul change : chaque étape d'action qui s'exécute
sur chaque enregistrement qui passe est une tâche, donc compte les étapes par
événement, et place une étape Filter by Zapier juste après le déclencheur, avant
toute action qui coûte une tâche, sur la condition la plus étroite que le
périmètre définit. Les exécutions filtrées coûtent moins cher que les exécutions
complètes, et la plupart des périmètres ne veulent qu'un sous-ensemble (ordres de
travail ouverts, pas tous les ordres de travail). Ce filtre est le principal
levier sur la facture mensuelle.

Si le volume rend la facturation à la tâche absurde — une extraction nocturne de
deux mille enregistrements — arrête-toi et dis-le franchement, plutôt que de
présenter une mauvaise facture Zapier comme la seule option. Ce n'est toujours
pas une raison de construire à la main contre l'API brute de l'application ; un
export planifié (`discovery.md`, section 4) est généralement la bonne réponse à ce
volume.

---

## Comment ça casse

- **Le dirigeant déconnecte le compte de l'application dans Zapier**, ce qui
  casse d'un coup tous les appels qui utilisent cette connexion.
- **Zapier déprécie une version d'un déclencheur ou d'une action**, généralement
  avec un avis dans son journal des versions, et nulle part où le dirigeant
  regarde.
- **La limite de tâches est atteinte**, ce qui peut bloquer silencieusement les
  appels selon les paramètres de l'offre du dirigeant.

La signature de la panne est la même dans les trois cas : rien ne signale
d'erreur, ça ne produit simplement rien. **Une sortie vide d'une action Zapier
est une panne tant qu'elle n'est pas prouvée vide** — vérifie
`inspect_zapier_actions` (ou, pour un Zap, son historique d'exécution) avant
d'annoncer « aucun enregistrement ».

---

## L'ensemble d'outils

| Outil | Effet |
|---|---|
| `discover_zapier_actions` | Cherche dans le catalogue d'applications de Zapier — `app` est une requête en texte libre |
| `inspect_zapier_actions` | Inspecte les applications et actions activées, et résout le schéma exact avant l'exécution. Appelle-le avant chaque appel d'exécution — ne devine jamais les noms d'actions, ils ne sont pas intuitifs et échoueront |
| `enable_zapier_action` | Active une action pour une application, à partir du `selected_api` renvoyé par `discover_zapier_actions` |
| `disable_zapier_action` | Retire une action — l'étape de réduction après chaque activation |
| `list_zapier_connections`* | Liste les comptes connectés du dirigeant pour une application |
| `manage_zapier_connections`* | Connecte un nouveau compte et/ou définit la connexion par défaut de l'application |
| `execute_zapier_read_action` | Exécute une action de recherche/lecture |
| `execute_zapier_write_action` | Exécute une action d'écriture/création — effets réels, souvent irréversibles |

\* Non documenté dans `docs.zapier.com/mcp/how-tools-work.md` (voir Références
ci-dessous), et dont dépend l'étape 3.

Les descriptions d'outils de Zapier mentionnent parfois un ancien nom,
`list_enabled_zapier_actions` — cet outil n'existe plus ; utilise
`inspect_zapier_actions` à la place.

---

## Références

**Zapier :**

- `zapier.com/apps/<slug>/integrations.md` — déclencheurs et actions par
  application
- `zapier.com/pricing.md` — paliers d'offre actuels et facturation des tâches
- `zapier.com/llms.txt` — index documentaire de Zapier lisible par machine
- `zapier.com/.well-known/ai-catalog.json` — manifeste de découverte de Zapier
  pour son serveur MCP, son SDK et son annuaire d'applications
- `docs.zapier.com/mcp/how-tools-work.md` — les méta-outils référencés
  ci-dessus, version markdown

**Claude :**

- `code.claude.com/docs/en/mcp.md` — comment Claude Code se connecte aux serveurs
  MCP et les gère, version markdown
- `support.claude.com/en/articles/13837440-use-plugins-in-claude` — comment les
  plugins, y compris les connecteurs intégrés, fonctionnent spécifiquement dans
  Claude Cowork