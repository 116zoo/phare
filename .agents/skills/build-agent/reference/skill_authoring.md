# Rédiger un skill

La structure qu'un skill construit doit suivre pour fonctionner comme tout le
reste de ce plugin.

---

## Forme

```
skills/<name>/
  SKILL.md              obligatoire — frontmatter + étapes numérotées
  reference/            facultatif — le détail chargé à la demande
    <topic>.md
```

Pas de répertoire `tests/`. Ce plugin ne les utilise pas, et un lien vers un
répertoire inexistant est une référence cassée.

---

## Frontmatter

```yaml
---
name: <correspond exactement au dossier — minuscules, tirets, pas de tirets bas>
description: >
  <Ce qu'il fait, puis quand le déclencher. Troisième personne. Un paragraphe.>
allowed-tools: Read, WebFetch
---
```

`allowed-tools` pré-approuve des outils ; il n'en accorde pas de nouveaux. Ne
déclare que ce qu'utilisent les étapes du skill — `Read, WebFetch` couvre un
skill qui lit des fichiers et récupère des pages. N'ajoute jamais `Bash` à un
skill qui n'exécute aucune commande shell.

Seuls ces champs sont sûrs : `name`, `description`, `allowed-tools`, `license`,
`metadata`, `compatibility`, `version`. Tout autre chose risque de faire rejeter
le fichier par l'analyseur syntaxique.

**Deux motifs cassent l'analyseur YAML de Cowork.** Évite les deux :

- Une description contenant à la fois des crochets et des barres verticales. Écris l'usage en prose.
- Un placeholder encadré de gras — deux astérisques autour d'un mot entre crochets — surtout à l'intérieur d'un bloc de code fermé. Utilise plutôt des chevrons simples.

---

## La description est le déclencheur

C'est le seul élément qui décide si le skill se déclenche. Bien le formuler
compte plus que tout le reste du corps.

Il faut les deux moitiés :

- **Ce qu'il fait** — concret, à la troisième personne
- **Quand le déclencher** — les formulations que le dirigeant utilise réellement

Utilise les mots du dirigeant. S'il dit « le fichier de la compagnie », la
description dit fichier de la compagnie. Une formulation générique laisse le
skill inutilisé pendant que le dirigeant fait la tâche à la main.

Mieux vaut trop déclencher. Un skill qui se déclenche alors qu'il ne fallait pas
coûte une phrase. Un skill qui reste silencieux alors qu'il le fallait coûte
l'après-midi au dirigeant, qui en conclut que tout le dispositif ne marche pas.

```
À éviter : Rapproche les données de commissions.

À faire :  Rapproche le fichier de commissions mensuel de la compagnie de ce qui
            est enregistré dans le CRM, signale tout écart supérieur à 5 €, et
            rédige un e-mail de relance par compagnie. À utiliser dès que le
            dirigeant mentionne les commissions, le fichier de la compagnie, le
            rapprochement de ce qui leur est dû, ou dit que le relevé mensuel
            est arrivé.
```

---

## Structure du corps

Des étapes numérotées, comme le reste du plugin :

```markdown
# <Nom du skill>

<Une ou deux lignes sur ce à quoi cela sert et pourquoi c'est important.>

## Étape 1 — <groupe verbal>

<Ce qu'il faut faire. Explique pourquoi là où la raison n'est pas évidente.>

## Étape 2 — <groupe verbal>

...

## Ce qu'il ne faut pas faire

- **<L'erreur>** — <pourquoi c'est important>

## Fichiers de référence

- `reference/<file>.md` — <ce qu'il contient et quand le lire>
```

Environ 125 lignes maximum. Le détail va dans `reference/`, qui ne se charge que
si nécessaire.

**Explique le raisonnement.** Un skill qui dit « vérifie toujours X » sera suivi
à la lettre et cassera sur le cas limite. Celui qui dit « vérifie X, parce que
Y arrive sinon » sera géré intelligemment quand la situation est légèrement
différente.

---

## Où placer les points de validation

Valide tout ce qui :

- **Envoie** — e-mail, message, facture, tout ce qu'un tiers peut voir
- **Dépense** — commandes, paiements, budget publicitaire
- **Publie** — posts, annonces, contenu public
- **Supprime ou écrase** — tout ce qui n'est pas récupérable
- **Engage** — dates, prix, périmètre

Ne valide pas la lecture, le calcul, la rédaction ou la création de fichiers
internes.

Un point de validation énonce ce qui va se passer avant de demander :

```
À faire : 6 e-mails de relance, un par compagnie, totalisant 2 340 € d'écarts,
          depuis ton adresse. On les envoie ?

À éviter : Prêt à continuer ?
```

La mauvaise version demande au dirigeant d'approuver quelque chose qu'il ne peut
pas voir. Ce n'est pas un consentement, c'est un coup de tampon, et la première
fois que ça dérape, il cesse de faire confiance à tous les points de validation
du plugin.

**Trois à cinq points de validation dans un skill, c'est sain.** Neuf, c'est pire
que de faire la tâche à la main.

---

## Le repli est obligatoire

Tout skill fonctionne avec zéro connecteur. C'est une exigence de conception
impérative, pas un supplément — cette audience a trop de dispersion d'outils pour
que ce soit autrement.

Le repli est généralement l'un de ceux-ci :

- Téléverser un CSV ou un XLSX
- Coller le texte
- Transférer l'e-mail
- Faire une recherche web
- Produire des fichiers que le dirigeant enverra lui-même

Énonce-le clairement plutôt qu'avec des excuses :

```
Pas de connecteur pour ton portail de la compagnie. Transfère-moi l'e-mail du
relevé mensuel et je fais le reste — même sortie, une étape en plus pour toi.
```

---

## Les règles que tout skill construit hérite

**N'invente jamais un chiffre.** Une donnée manquante est signalée comme
manquante, par son nom. Les dirigeants transmettent ces sorties à leurs banques
et à leurs experts-comptables.

**Écris dans le vocabulaire du dirigeant.** Pas celui de la comptabilité, pas
celui du marketing.

**Un chemin privilégié, plus une porte de sortie.** N'offre pas trois options.

**Nomme l'enregistrement précis.** « Certains écarts » est inutilisable. « 412 €
sur le fichier Continental, ligne 34 » est actionnable.

**Respecte la voix du dirigeant quand tu rédiges pour lui.** Si le skill
construit rédige quoi que ce soit au nom du dirigeant — e-mail, post, réponse,
lettre — son étape de rédaction doit d'abord lire [le profil vocal
partagé](../../../shared/voice-profile.md), écrit depuis un SKILL.md comme le
chemin situé deux niveaux au-dessus vers `shared/voice-profile.md`. Ajoute le
nouveau skill au tableau des lecteurs de ce fichier pour qu'une correction faite
une fois par le dirigeant vaille partout.

---

## L'enregistrer

Ajoute le skill à la table de routage de `smb-router` avec les formulations de
déclenchement que le dirigeant utilise réellement, et tout connecteur dont il a
besoin. Le routeur refuse de router vers un skill dont le connecteur requis n'est
pas connecté, donc ce champ compte.

Propose ensuite une planification si la tâche est récurrente. La planification est
ce qui transforme « un skill que je pourrais lancer » en « quelque chose qui se
produit sans moi ».