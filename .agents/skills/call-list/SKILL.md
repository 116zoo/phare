---
name: call-list
allowed-tools: Read, WebFetch
description: >
  Prépare la liste d'appels du jour : jours fériés FR, Bloctel B2C.
  [EN] Prepares today's call list.
---

> Language rule: see `shared/language.md`.

Lance la priorisation des leads. Parcourt le pipeline, classe par urgence et par
opportunité, récupère le contexte email pertinent, et prépare le dirigeant à
appeler.

Analyser les arguments :
- `--n` (par défaut : `5`) — nombre de leads à faire remonter (1 à 10)
- `--date` (par défaut : aujourd'hui) — date pour laquelle construire la liste
  d'appels (`AAAA-MM-JJ`)

## Étape 1 — Parcours du pipeline (lead-triage)

Exécuter le déroulé du skill `lead-triage` pour l'extraction et la notation — il
porte la liste des champs HubSpot, le modèle à quatre dimensions, la
récupération des corps de notes pour l'urgence, le garde des scores plats et la
branche d'enrichissement (avec Apollo ou Clay connecté, adéquation entreprise
pour les leads sans entreprise au dossier — facturée à l'appel, donc
lead-triage pose une fois la question du coût en crédits ; transmettre cette
question au dirigeant plutôt que d'y répondre). Ne rien reconstruire ici. Puis
récupérer dans Mail les fils de email de chaque lead retenu (3 derniers emails
par contact) pour les points de discussion.

## Étape 2 — Trier et sélectionner le top N

Reprendre le classement de lead-triage et sélectionner les `--n` premiers —
exactement `--n` quand autant de leads existent, quelle que soit la taille du
pipeline. En cas d'égalité, préférer les leads présentant des signaux entrants
sans réponse. Si lead-triage signale des scores plats, présenter son ordre par
faits CRM et le dire.

Pour chaque lead sélectionné, produire une fiche d'appel :

```
{rang}. {Nom du contact} — {Entreprise}
Affaire : {code devise} {montant} | Étape : {étape} | Dernier contact : {X} jours
Signal : {activité la plus récente}

POINTS DE DISCUSSION
• {point tiré du contexte email / affaire}
• {point tiré du contexte email / affaire}
• {question ouverte à poser}

OBJECTIF DE CET APPEL : {une phrase — passer à l'étape suivante / réactiver / closer}
```

## Étape 3 — Créneau d'agenda

Pour chaque lead de la liste, proposer de bloquer 20 minutes dans l'agenda du
dirigeant à la date cible.

Montrer les entrées d'agenda proposées :
```
{créneau} — Appel : {Nom du contact} ({Entreprise})
```

Attendre la confirmation du dirigeant sur les appels à bloquer avant de créer
les événements d'agenda.

## Étape 4 — Relances

Pour tout lead ayant un email sans réponse de plus de 3 jours, rédiger une
relance brève :
```
Objet : Re : {objet du fil}

Bonjour {prénom},

{Une phrase faisant référence à l'échange précédent}. {Une phrase avec une
prochaine étape ou une question claire}.

{Formule de politesse}
```

## Pannes de connecteur

Si HubSpot est injoignable, s'arrêter et prévenir le dirigeant — la notation des
leads exige des données CRM. Si Mail est injoignable, passer la récupération du
contexte email à l'étape 1 et les relances de l'étape 4, et noter « Mail non
connecté — contexte email et relances ignorés » dans la sortie ; le blocage
d'agenda de l'étape 3 a quand même lieu. Si Google Calendar est injoignable,
passer le blocage d'agenda et le signaler. Si le connecteur de données prospects
est injoignable ou si le dirigeant refuse le coût d'enrichissement, l'adéquation
entreprise reste plate pour les leads sans entreprise au dossier — le dire dans
la sortie plutôt que de présenter l'ordre comme un classement par adéquation.

## Gardes de validation

- **Ne jamais envoyer d'email automatiquement.** Présenter les brouillons pour
  validation du dirigeant uniquement.
- **Ne jamais créer de créneau d'agenda sans confirmation** — montrer d'abord la
  liste proposée.
- **Ne jamais mettre à jour automatiquement les étapes d'affaires HubSpot.**

## Sortie

Présenter la liste d'appels triée avec ses trames de conversation. Montrer
ensuite les créneaux d'agenda proposés et demander confirmation. Puis montrer les
relances et demander lesquelles envoyer.

À côté du résumé dans la conversation — **sans jamais le remplacer** — rendre la
liste sous forme d'artefact FICHE D'APPELS au style maison
 (`../../shared/artifact-style.md`) : quelque chose que le dirigeant imprime et
 utilise en composant. Lignes lisibles à l'impression, une par lead, chacune avec
 l'objectif de l'appel et deux ou trois points de discussion courts, plus une
 ligne de résultat vide pour noter à la main. C'est une feuille de travail, pas
 un tableau de bord — pas de tuiles de statistiques, pas de graphiques.

## Proposition de clôture

Terminer par une ligne sur ce qui a été construit, puis l'étape suivante la
plus pertinente avec sa formulation déclencheuse — généralement « rédiger cette
prospection » (`outreach-composer`) pour les leads qu'il vaut mieux joindre par
email que par un appel. Deux autres au plus : « remplir mon entonnoir »
(`/remplir-pipeline`) ou « mettre à jour le CRM » (`crm-autopilot`). Trois au
maximum, en omitant ce que le dirigeant a refusé plus tôt dans la session.

## Utiliser un outil qui n'est pas listé

Les connecteurs nommés dans ce skill sont les chemins testés, pas une muraille.
Si le dirigeant veut que ce flux utilise un outil non connecté ou non listé,
proposer `build-connector` — il vérifie d'abord l'annuaire des connecteurs et se
connecte via Zapier sinon, jamais en construisant à la main contre une API brute.
Une fois la connexion en place, l'outil rejoint ce skill comme tout connecteur
optionnel, sous les mêmes gardes de validation.
