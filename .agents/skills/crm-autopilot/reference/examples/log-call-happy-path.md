# Exemple : journaliser un appel avec un contact manquant

Scénario déroulé pour le chemin appel — l'événement d'agenda compte trois participants, dont un n'est pas encore dans HubSpot.

## Préparation

- L'utilisateur vient de terminer un Google Meet de 30 minutes intitulé « Acme — technical deep dive » à 10h00
- Participants sur l'invitation d'agenda : l'utilisateur, `sarah.lin@acme.com`, `ben.rivera@acme.com`
- Sarah Lin est un contact HubSpot existant sur l'affaire « Acme Q2 Expansion »
- Ben Rivera n'est PAS dans HubSpot
- L'affaire Acme Q2 Expansion est la seule affaire ouverte de Sarah

## Ce que dit l'utilisateur

> « Journalise cet appel. »

## Comportement du skill

**Étape 1 — Identifier l'intention.**
Chemin appel. Aucun événement nommé — repli sur la réunion terminée la plus récente, dans les dernières 24 heures.

**Étape 2 — Rassembler le contexte.**
Retrouve l'événement « Acme — technical deep dive » de 10h00. Confirme avec l'utilisateur avant d'aller plus loin :

> « Je journalise l'appel "Acme — technical deep dive" de ce matin à 10h00 — c'est bien ça ? »

L'utilisateur confirme.

Lit les détails de l'événement : 30 minutes, participants externes `sarah.lin@acme.com` et `ben.rivera@acme.com`. Aucune description sur l'événement.

**Étape 3 — Résoudre le contact et l'affaire.**
- Recherche `sarah.lin@acme.com` → existe (Sarah Lin, sur Acme Q2 Expansion).
- Recherche `ben.rivera@acme.com` → n'existe pas.
- Annonce la création du contact :

> « Ben Rivera (ben.rivera@acme.com) n'est pas dans HubSpot. Je crée le contact et je le rattache à l'affaire Acme Q2 Expansion. »

Crée le contact avec `email`, `firstname: Ben`, `lastname: Rivera`, `company: Acme` (déduit du domaine de l'email). Le rattache à l'affaire.

Résolution de l'affaire : la seule affaire ouverte de Sarah est Acme Q2 Expansion — correspondance sans ambiguïté.

**Étape 4 — Exécuter.**
Écrit une activité d'appel sur Acme Q2 Expansion :
- `hs_call_title` : Acme — technical deep dive
- `hs_call_body` : « Réunion tenue ; notes à ajouter. » (Aucune description sur l'événement d'agenda ; la valeur provisoire est signalée à l'utilisateur pour qu'il sache qu'il faut ajouter du détail.)
- `hs_call_duration` : 30 min
- `hs_timestamp` : 10h00 aujourd'hui
- Contacts rattachés : Sarah Lin, Ben Rivera
- Affaire rattachée : Acme Q2 Expansion

**Étape 5 — Porte d'approbation.**
Création du contact annoncée avant écriture. L'écriture de l'activité est faite dans le flux, conformément à la demande explicite « journalise cet appel » de l'utilisateur.

**Étape 6 — Rendre compte.**

> Activité d'appel journalisée sur Acme Q2 Expansion :
> « Acme — technical deep dive » (30 min, 10h00)
> Contact créé : Ben Rivera (ben.rivera@acme.com) — rattaché à l'affaire.
> Le corps de l'appel est une valeur provisoire — ajoute tes notes si tu veux les voir sur la chronologie de l'affaire.
> [HubSpot : Acme Q2 Expansion]

## Ce que cet exemple illustre

- Repli sur la réunion la plus récente quand l'utilisateur ne précise pas d'événement
- Confirmation avant d'agir sur un contexte déduit
- Création de contact avec entreprise déduite du domaine de l'email
- Corps provisoire avec notification de l'utilisateur quand il n'existe pas de notes de réunion
- Rattachement de plusieurs contacts (existant + nouvellement créé) à la même activité