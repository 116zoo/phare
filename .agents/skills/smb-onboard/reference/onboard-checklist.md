# Liste de contrôle d'onboarding

## Les sept questions d'entretien

Pose-les une par une. Attends la réponse complète avant de passer à la
suivante. Une relance est acceptable si une réponse est vague ; n'insiste pas
davantage.

1. **Secteur et type d'entreprise.** « Quel type d'entreprise diriges-tu ? Donne-moi la version en une ligne. »
2. **Effectif.** « Combien de personnes travaillent avec toi, toi compris ? »
3. **Les trois principales douleurs.** « Quelles sont tes trois plus grosses douleurs en ce moment — ce qui te mange du temps ou t'empêche de dormir ? »
4. **Outils déjà utilisés.** « Quels outils utilises-tu déjà au quotidien ? Ton logiciel de comptabilité, ton e-mail, ta boutique en ligne ou ta caisse, un CRM, le chat d'équipe… » Demande par catégorie, jamais par nom de produit. C'est le dirigeant qui nomme les fournisseurs.
5. **Rythme préféré.** « Comment veux-tu que je te solicited — tous les jours, toutes les semaines, ou seulement quand tu le demandes ? »
6. **Site web et look de marque.** Lance le flux capture-et-apercu du skill `brand-style` (étapes 2 à 3 là-bas) : un lien de site collé récupère automatiquement le logo, les couleurs et la signature ; sans site, une description en mots simples (« vert forêt et crème ») est traduite en couleurs. Jamais de codes hex, de sélecteurs ni de dépôts. La page d'accueil de l'étape 6 sert aussi d'aperçu en direct.
7. **Format de sortie.** Lance l'étape 4 de `brand-style` — le choix multiple à six options : artefacts visuels (par défaut) / documents Word / markdown / pages Notion / Canva Docs / le meilleur pour le skill. Enregistre la réponse telle quelle parmi : `visual artifacts`, `docx`, `md`, `notion`, `canva`, `best for skill`.

Si le dirigeant manque de temps, compresse en questions 1, 3 et 4 — ces trois-là
alimentent le plus de skills en aval. Les questions sautées gardent leurs
valeurs par défaut (pages visuelles pour la sortie).

---

## Matrice de priorité des connecteurs

Fais correspondre la douleur annoncée par le dirigeant avec les deux
**catégories** d'outils à connecter en premier. Le plugin ne recommande jamais
un fournisseur dans une catégorie (`../../../shared/connector-neutrality.md`) :
il demande ce que le dirigeant utilise déjà, et connecte cela.

| Douleur principale | Première catégorie | Deuxième catégorie | Recette de preuve de valeur |
|---|---|---|---|
| Trésorerie / facturation | Grand livre comptable | Paiements ou point de vente | `cash-flow-snapshot` |
| Suivi client | CRM | Mail | `lead-triage` — le gain rapide côté croissance, classe qui rappeler en premier |
| Recrutement / offres d'emploi | Mail | Calendar | `job-post-builder` |
| Rester organisé | Bureau (configuration de dossiers) | Mail | Démonstration de l'arborescence de dossiers du Bureau |
| Surcharge de planification | Calendar | Mail | `business-pulse` |
| Vente en ligne / stock | Boutique en ligne ou point de vente (porte commandes et stock) | Grand livre comptable | `inventory-planner` |
| Général / unsure | Mail | Grand livre comptable | `cash-flow-snapshot` |

Une troisième catégorie facultative pour la ligne suivi client : **données
prospects et enrichissement**, qui complète la taille d'entreprise et le secteur
quand les prospects du CRM ne portent aucune fiche société. Elle est facturée au
comptage (crédits par ligne), elle n'est donc jamais la première demande et
jamais nommée par fournisseur ici — si le dirigeant en a déjà une, connecte-la
après le CRM et `lead-triage` l'utilise ; sinon la recette tourne sans.

**Comment remplir une catégorie.** Demande ce que le dirigeant utilise pour
elle : *« Qu'est-ce que tu utilises pour la comptabilité ? »* Puis l'un des
trois, dans cet ordre, énoncé une fois avec l'arbitrage en une ligne :

1. **Nous avons le connecteur** (voir le tableau des catégories dans
   `../../../shared/connector-neutrality.md`) — guide la connexion.
2. **Nous ne l'avons pas** — propose `build-connector`, qui vérifie l'annuaire
   des connecteurs et se connecte via Zapier sinon. Dis ce que la connexion
   débloque et ce qu'elle te coûte en temps de configuration.
3. **Il ne veut pas la connexion Zapier, ou n'a aucun outil dans cette
   catégorie** — lance le chemin sans connecteur de la recette (CSV, texte
   collé) et passe à la catégorie suivante. Nomme la catégorie, pas un produit,
   en disant ce qui la rendrait plus profonde.

Ne suggère jamais au dirigeant de changer d'outil. S'il demande « lequel je
devrais prendre ? », c'est une invitation explicite : décris ce que chaque
connecteur de la catégorie débloque, avec le même nombre de mots pour chacun,
par ordre alphabétique, et laisse le choix lui-même.

---

## Choix de la recette

Lance la recette de preuve de valeur immédiatement après que le **premier**
connecteur est actif — n'attends pas le deuxième. Si des connecteurs sont déjà
actifs au démarrage de la session, lance la recette correspondant à la douleur
principale du dirigeant avant de commencer l'entretien. Par catégorie, quel que
soit le connecteur qui la comble :

1. N'importe quel grand livre comptable, ou n'importe quel connecteur de paiements / point de vente → `cash-flow-snapshot`
2. N'importe quel CRM → `lead-triage` (classe les prospects ouverts, recommande les rappels du jour — rien n'est réécrit)
3. N'importe quel connecteur de boutique en ligne ou de point de vente qui porte commandes et stock → `inventory-planner` (un connecteur de paiement seul, sans données de stock, relève du niveau 1)
4. N'importe quel connecteur mail → cherche les e-mails non lus liés à des factures, remontes les 3 principaux
5. Calendar → `business-pulse`
6. Bureau uniquement → parcourt la configuration des dossiers du Bureau, crée la structure recommandée

### Notes de configuration propres à un connecteur

Ce sont des étapes techniques dont un connecteur a besoin avant que sa recette
puisse tourner. Ce ne sont pas des préférences.

- **QuickBooks `profile_info_required` :** si QuickBooks renvoie ce statut (nom d'entreprise ou secteur manquant), utilise l'outil `quickbooks-profile-info-update` avant de lancer `cash-flow-snapshot`. Le champ `Business` attend un **secteur d'activité** (catégorie), pas le nom d'entreprise : un nom en une ligne y fait échouer l'appel. Si l'entretien a seulement donné le nom, demande le secteur en une phrase avant d'appeler l'outil. Ne saute pas la recette — collecte d'abord l'information manquante.
- **État du portail HubSpot :** avant de lancer `lead-triage` comme recette, compte les contacts avec un seul appel `search_crm_objects` (limit 1 ; lis `total`). Zéro signifie que la recette classerait une liste vide : dis-le en une ligne, propose `manage_onboarding` (action `SET_GOAL`) pour lancer la configuration propre à HubSpot, et ne lance la recette que lorsque des contacts existent — ou sur une liste de prospects collée si le dirigeant préfère. `get_user_details` renvoie aussi un indicateur `onboarded` ; traite-le comme un indice sur la configuration guidée de HubSpot, pas comme le test, parce qu'un portail avec des centaines de contacts peut toujours afficher `onboarded: false`. C'est une étape technique de préparation pour un connecteur, pas une préférence.

### Pays, devise et exercice — lis d'abord le grand livre, puis la boutique

Dès que le premier connecteur de grand livre est actif, lis la fiche
organisation avant que la recette ne tourne et remplis les trois champs de
localisation du profil sans demander : QuickBooks `company_info` ; Xero
`get_organisation_info` et `get_organisation_financial_year` ; MYOB
`myob_get_financial_year_dates` ; NetSuite `ns_getSubsidiaries` (pays et
devise ; demande la date de clôture si le connecteur ne l'expose pas) ; Zoho
Books `get_organization` (`country_code`, `currency_code` et
`fiscal_year_start_month`, un index de mois base zéro — la clôture est le
dernier jour du mois qui le précède). Prends ce que le connecteur expose.

Si aucun grand livre n'est connecté mais qu'une boutique en ligne ou un point
de vente l'est, lis sa fiche boutique à la place — Shopify `get-shop-info`
(pays et devise) ; Square la fiche commerçant via `make_api_request`
(`country`, `currency`). Ni l'un ni l'autre ne contient de date de clôture
d'exercice : demande ce seul champ pendant l'entretien — *« Quand se termine ton
exercice ? »* — ne redemande ni le pays ni la devise. Les boutiques en ligne
sont des égales ici comme partout
(`../../../shared/connector-neutrality.md`) : lis ce qui est connecté.

Si ni un grand livre ni une boutique en ligne n'est connecté, ou si la fiche
manque un champ, pose une question pendant l'entretien : *« Dans quel pays
l'entreprise est-elle, et dans quelle devise factures-tu ? »* La date de clôture
d'exercice suit la convention habituelle du pays, mais seulement après
confirmation du dirigeant. La règle et les formats de champ sont dans
`../../../shared/currency-and-locale.md`.

---

## Profil du dirigeant — format de stockage

Écris ce bloc dans le répertoire mémoire de la session Cowork sous le titre
`## Business context`. Tous les autres skills lisent cette section par
correspondance de titre. Ne renomme pas le titre et ne change pas les noms de
champs.

```markdown
## Business context

- **Business:** <version en une ligne — secteur, produit/service>
- **Size:** <nombre de personnes, dirigeant compris>
- **Top headaches:** <douleur 1> · <douleur 2> · <douleur 3>
- **Connected tools:** <liste des connecteurs actifs séparée par des virgules, par nom de produit — "Trello", jamais un nom d'enregistrement comme "small-business:trello">
- **Country:** <code ISO 3166 à deux lettres, p. ex. FR, GB, AU, NZ, CA>
- **Currency:** <code ISO 4217 dans lequel l'entreprise facture, p. ex. EUR, GBP, AUD, CHF>
- **Financial year end:** <jour et mois, p. ex. 30 juin, 31 mars, 31 décembre>
- **Weekly cadence:** <phrase déclencheuse et jour, p. ex. "point hebdomadaire chaque lundi">
- **Website:** <URL, le cas échéant>
- **Brand colors:** <couleurs primaire et secondaire, depuis le site web ou la description en mots simples du dirigeant, le cas échéant>
- **Logo:** <URL de l'image du logo récupérée depuis le site web, le cas échéant>
- **Output preference:** <"visual artifacts" (par défaut), "docx", "md", "notion", "canva", ou "best for skill">
- **Notion destination:** <la page ou la base Notion que le dirigeant a nommée pour la sortie des skills, si la préférence est "notion" ; demandée une fois, la première fois qu'un skill en a besoin>
- **Canva brand kit:** <le nom et l'identifiant du kit de marque Canva choisi par le dirigeant pour la sortie des skills, ou "none", si la préférence est "canva" ; demandé une fois, à l'étape 4 de brand-style ou la première fois qu'un skill en a besoin>
- **Onboarded:** <AAAA-MM-JJ>
```

Si un fichier mémoire existe déjà, ajoute ou mets à jour uniquement la section
`## Business context`. Ne touche à rien d'autre.

**Rapporte les sessions où le profil est plus ancien.** Si le bloc existe mais
ne contient pas les lignes Country, Currency ou Financial year end (profils
écrits avant l'existence de ces champs), lis-les depuis le grand livre si
l'un est connecté, sinon pose la seule question de localisation, et mets à jour
uniquement ces trois champs. Ne refais pas l'entretien.