# Le CRM léger

Pour les dirigeants qui n'ont aucun CRM — une large part de ce segment. Leur dire d'acheter HubSpot n'est pas une réponse, et c'est précisément le moment où le skill cesserait d'être utile.

Construis-leur un CRM dans un tableur ou dans Notion, et tiens-le exactement de la même manière.

---

## Où il vit

**Google Sheets ou Excel** — le choix par défaut. Tout dirigeant peut l'ouvrir, le partager et l'emporter avec lui.

**Notion** — quand ils l'utilisent déjà. Mieux pour les notes, moins bon pour tout ce qui est numérique.

**Monday.com** — quand ils l'utilisent déjà, et le plus solide des trois. Les éléments du board font office
d'enregistrements, les mises à jour par colonne fonctionnent, et la chronologie du contact contient déjà
les emails, les appels, les réunions et les notes. Lecture et écriture dans les deux cas. Si le dirigeant
est dans Monday.com tous les jours, tenir ses boards à jour vaut mieux que construire un tableur qu'il
oubliera d'ouvrir.

**Un fichier local** — quand rien n'est connecté. Ça fonctionne quand même.

Demande une fois, puis arrête de demander.

---

## Structure

Quatre onglets. Résiste à l'envie d'en ajouter — chaque champ supplémentaire est un champ qui devient
périmé et qui donne au tableur l'air d'un devoir à la maison.

### Contacts

| Colonne | Notes |
|---|---|
| Nom | |
| Entreprise | |
| Email | |
| Téléphone | |
| Fonction | |
| Premier contact | Date |
| Dernier contact | Mis à jour automatiquement à chaque activité journalisée |
| Notes | |

### Affaires

| Colonne | Notes |
|---|---|
| Affaire | Nom court que le dirigeant reconnaît |
| Entreprise | |
| Contact | |
| Montant | |
| Étape | N'en garde que quatre : Nouveau, Devis envoyé, Gagnée, Perdue |
| Prochaine étape | La colonne la plus importante |
| Date de prochaine étape | |
| Dernière activité | Mise à jour automatiquement |
| Source | Comment ils ont connu l'entreprise |
| Notes | |

**Quatre étapes, pas huit.** Les dirigeants sans CRM n'ont pas besoin d'une taxonomie de pipeline ; ils ont
besoin de savoir quoi faire ensuite. Davantage d'étapes, c'est davantage d'enregistrements qui traînent
dans la mauvaise.

### Activité

| Colonne | Notes |
|---|---|
| Date | Quand c'est arrivé, pas quand c'est journalisé |
| Type | Email, appel, réunion, note |
| Contact | |
| Affaire | |
| Résumé | Trois à cinq lignes |
| Prochaine étape définie | Oui ou non |

Ajout uniquement. Ne modifie jamais l'historique — cet onglet est la trace sur laquelle le dirigeant s'appuie
quand il ne se souvient plus de ce qui a été convenu.

### File

Une vue filtrée, pas un quatrième jeu de données : toutes les affaires ouvertes sans prochaine étape, ou
dont la date de prochaine étape est dépassée. C'est l'onglet que le dirigeant ouvre réellement.

---

## Le tenir à jour

Identique au chemin HubSpot. Mêmes modes, mêmes portes d'approbation, mêmes règles.

- Journaliser l'activité à partir des emails, de l'agenda et des transcriptions
- Mettre à jour Dernier contact et Dernière activité automatiquement
- Proposer les changements de champs, ne jamais écrire l'étape ni le montant sans approbation
- Rédiger des relances sur les affaires en sommeil
- Tenir la file à jour

La seule vraie différence, c'est que résoudre un contact revient à apparier une ligne plutôt qu'à
interroger une API. Apparier d'abord sur l'adresse email, puis sur le nom et l'entreprise — et quand c'est
ambigu, demander plutôt que deviner. Une ligne fusionnée à tort est plus difficile à défaire dans un
tableur que dans un CRM.

---

## Le présenter

Ne le présente pas comme une bricole. Pour la plupart de ces dirigeants, c'est la première fois que leur
pipeline existe ailleurs que dans leur tête.

```
Tu n'as pas de CRM connecté ; je vais t'en construire un dans Sheets. Quatre
onglets — contacts, affaires, activité, et une file de ce qui attend une
prochaine étape.

Ce n'est pas un jouet. Je le tiendrai à jour exactement comme je le ferais avec
HubSpot : journaliser automatiquement tes appels et tes emails, rédiger des
relances quand une affaire se tait, et signaler tout ce qui n'a pas de prochaine
étape. Et tout ici s'exporte proprement si tu passes un jour à un vrai CRM.
```

La dernière phrase compte. Les dirigeants évitent les systèmes tableur parce qu'ils craignent d'être
coincés dedans.

---

## Quand leur suggérer de monter en gamme

Uniquement quand les données le justifient, et une seule fois :

- Plus d'environ 150 affaires ouvertes
- Plus d'une personne qui doit éditer en même temps
- Ils commencent à demander des rapports que le tableur ne sait pas faire

```
Tu es à 180 affaires ouvertes et Teri édite ce fichier aussi. C'est à peu
près le seuil où un tableur commence à te coûter plus cher qu'il ne te fait
gagner. Ça vaut le coup de regarder HubSpot — tout ce qui est ici s'exporte
directement.
```

Dis-le une fois. Ne le répète pas. Un dirigeant qui a refusé un CRM a généralement une raison, et
l'obséder est la façon dont un skill utile devient un skill pénible.