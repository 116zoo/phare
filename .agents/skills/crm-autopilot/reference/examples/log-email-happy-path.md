# Exemple : journaliser un email sur une affaire existante (cas nominal)

Scénario déroulé pour le chemin email — le contact existe, l'affaire se résout sans ambiguïté, l'activité se journalise proprement.

## Préparation

- L'utilisateur consulte un fil d'emails dont l'objet est « Acme Q2 pricing follow-up »
- Le fil contient trois messages entre l'utilisateur et `sarah.lin@acme.com` sur les deux derniers jours
- `sarah.lin@acme.com` est un contact existant dans HubSpot
- Elle est rattachée à exactement une affaire ouverte : « Acme Q2 Expansion » (proposition envoyée, 18 000 €, date de closing le 15 mai)

## Ce que dit l'utilisateur

> « Ajoute ce fil à l'affaire. »

## Comportement du skill

**Étape 1 — Identifier l'intention.**
Chemin email (l'utilisateur a dit « ce fil »).

**Étape 2 — Rassembler le contexte.**
Lit le fil. Objet : « Acme Q2 pricing follow-up. » Dernier message (hier, 16h12) de Sarah : « *Confirmé, 50 sièges à 360 €/siège, ça marche. J'envoie le cahier des charges signé vendredi.* » Contact externe principal : `sarah.lin@acme.com`.

**Étape 3 — Résoudre le contact et l'affaire.**
Recherche `sarah.lin@acme.com` → le contact existe (Sarah Lin, Acme Corp). Trouve les affaires ouvertes rattachées à elle : exactement une, « Acme Q2 Expansion ». La correspondance est sans ambiguïté.

**Étape 4 — Exécuter.**
Écrit une activité email sur Acme Q2 Expansion :
- `hs_email_subject` : Acme Q2 pricing follow-up
- `hs_email_text` : « Sarah a confirmé 50 sièges à 360 €/siège (18 000 €). Cahier des charges signé vendredi. »
- `hs_timestamp` : hier, 16h12
- Contact rattaché : Sarah Lin
- Affaire rattachée : Acme Q2 Expansion

**Étape 5 — Porte d'approbation.**
Le contact existait déjà, pas d'annonce de création nécessaire. L'écriture de l'activité se fait dans le flux — pas de porte séparée puisque l'utilisateur l'a explicitement demandée.

**Étape 6 — Rendre compte.**

> Activité email journalisée sur Acme Q2 Expansion :
> « Sarah a confirmé 50 sièges à 360 €/siège (18 000 €). Cahier des charges signé vendredi. »
> Horodatage hier 16h12. Aucun contact créé — Sarah était déjà sur l'affaire.
> [HubSpot : Acme Q2 Expansion]

## Ce qui en fait le cas nominal

- Rattachement à une affaire unique et sans ambiguïté — aucun rapprochement approximatif nécessaire
- Le contact existait déjà — pas de flux de création
- L'objet du fil est explicite — utilisable tel quel comme titre d'activité
- Le résumé porte sur les décisions et les chiffres, pas sur la transcription complète du fil