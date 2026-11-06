---
name: lead-triage
allowed-tools: Read, WebFetch
description: >
  Qualifie les leads entrants : jours fériés FR, Bloctel avant appel B2C.
  [EN] Qualifies inbound leads: French holidays, Bloctel.
---

> Language rule: see `shared/language.md`.

# Tri des leads

## Démarrage rapide

Récupère les leads entrants depuis HubSpot, les note, et remonte une liste
d'appels hiérarchisée avec des points de discussion. Rédige les relances et
propose des créneaux — n'envoie ni ne réserve jamais sans validation du
dirigeant.

```
Utilisateur : « priorise mes leads »
→ Récupérer les contacts : étape de cycle de vie Lead ou MQL, statut ≠ Unqualified
→ Noter chaque lead sur engagement, adéquation entreprise, urgence, récence
→ Renvoyer la liste triée (taille adaptée au volume) avec points de discussion
→ Proposer de rédiger les relances et de suggérer des créneaux
```

## Déroulé

1. **Récupérer les leads depuis HubSpot.** Récupérer les contacts dont
   `lifecyclestage` = `Lead` ou `MQL` et `hs_lead_status` ≠ `Unqualified`.
   Utiliser la liste de champs dans
   [reference/hubspot-scoring.md](reference/hubspot-scoring.md). Si HubSpot est
   indisponible — non installé, non connecté ou en erreur — ne pas t'arrêter. Le
   dire clairement et suivre la voie « Sans HubSpot ? » en bas de ce fichier :
   demander un export CSV ou une liste approximative collée, et noter celle-ci.
   - **Vérification du portail vide.** Si l'extraction renvoie zéro contact quel
     que soit le cycle de vie, le portail est vide, pas mal filtré. Le dire en
     une ligne, proposer la configuration propre à HubSpot (`manage_onboarding`,
     action `SET_GOAL`) ou la voie « Sans HubSpot ? », et ne pas diagnostiquer des
     étapes de cycle de vie sur un portail qui ne contient rien. Le compte est le
     test : `get_user_details` renvoie un indicateur `onboarded`, mais un portail
     peut afficher `onboarded: false` tout en contenant des centaines de
     contacts, donc l'indicateur seul ne tranche jamais.

2. **Clarifier si le déclencheur est ambigu.** Si l'utilisateur a seulement dit
   « pipeline » sans qualificatif, demander : « *Vue rapide du pipeline (étapes
   des affaires + valeur totale) ou liste d'appels priorisée ?* » — puis router
   en conséquence. Ne pas noter des leads sur un simple « pipeline ».

3. **Noter chaque lead.** Appliquer le modèle à quatre dimensions de
   [reference/hubspot-scoring.md](reference/hubspot-scoring.md) :
   - **Engagement** — réponses à email, ouvertures, visites du site dans
     HubSpot (30 derniers jours uniquement)
   - **Adéquation entreprise** — secteur et effectif comparés à l'ICP du
     dirigeant (par défaut : tout secteur, 1 à 50 salariés). Lire ces éléments
     sur l'entreprise associée au lead, pas sur la fiche contact — voir la
     référence de notation. Quand un lead n'a pas d'entreprise associée et qu'un
     connecteur de données prospects (Apollo ou Clay) est connecté, la branche
     d'enrichissement de la référence remplit secteur et taille à partir du
     domaine email du lead. Elle est facturée à l'appel — dire combien de lignes
     elle enrichirait et ce que cela coûte en crédits, et ne l'exécuter que sur
     un oui explicite pour cette exécution. Rien d'enrichi n'est réécrit dans le
     CRM depuis ici.
   - **Urgence** — âge du lead, durée dans l'étape, notes contenant « urgent /
     ASAP / échéance / budget validé ». La détection par mot-clé exige de
     récupérer réellement les corps de notes via l'association contact → notes —
     suivre la section « Fetch note bodies » de la référence ; le seul compte de
     notes ne peut pas la déclencher.
   - **Pénalité de récence** — retirer des points si la dernière activité date de
     moins de 24 heures (déjà travaillé aujourd'hui)

   **Puis vérifier si les notes séparent vraiment les leads.** Si le composite
   le plus haut et le plus bas diffèrent de moins de 10 points, le CRM n'a aucun
   signal pour établir un ordre. Ne pas présenter cet ordre comme un
   classement — appliquer la voie des scores plats de la référence, dire
   clairement que les signaux sont vides, et ordonner sur des faits CRM. Un
   faux classement envoie le dirigeant appeler la mauvaise personne.

4. **Construire la liste triée.** Trier par score composite décroissant. Adapter
   la taille de la liste au volume :
   - ≤10 leads → tout afficher
   - 11 à 30 leads → afficher les 5 premiers
   - >30 leads → afficher les 8 premiers

   Pour chaque lead : nom, entreprise, score, un paragraphe de points de
   discussion, résumé de la dernière activité. Si tous les signaux d'engagement
   datent de plus de 30 jours, signaler : *« Signaux d'engagement périmés —
   à traiter comme une prospection à froid. »*

5. **Proposer des relances.** Demander : *« Rédiger des relances pour certains
   d'entre eux ? »* Si oui, écrire un email par lead sélectionné dans la voix du
   dirigeant, selon [le profil de voix partagé](../../shared/voice-profile.md). Si
   ce fichier n'a pas encore de profil, suivre sa consigne « When there is no
   sample » — demander trois emails dont le dirigeant était satisfait ; s'il
   refuse, rédiger de façon neutre et dire que les brouillons sont sans voix.
   N'inventer jamais une personnalité. Montrer les brouillons ; ne pas envoyer.
   Si Mail est indisponible, remettre les brouillons dans la conversation sous
   forme objet + corps, pour que le dirigeant les colle — c'est un résultat
   complet.

6. **Rendre le tableau de tri en artefact.** Après la réponse courte dans la
   conversation — jamais à sa place — construire une page HTML au style maison
   (`../../shared/artifact-style.md`) : un tableau trié avec le score composite
   de chaque lead en chasse fixe, une pastille de statut d'urgence par ligne
   (good / warn / critical), et une ligne de points de discussion sous chaque
   lead. Si la voie des scores plats s'est déclenchée, le dire sur la page et
   passer les pastilles en neutre.

7. **Proposer des créneaux.** Demander : *« Proposer des créneaux d'appel pour
   certains d'entre eux ? »* Si oui, vérifier Calendar pour des créneaux libres
   de 30 minutes dans les deux prochains jours ouvrés (éviter les créneaux avec
   un événement existant ±15 min). Proposer deux options par lead. Ne jamais
   créer d'événement d'agenda sans validation explicite du dirigeant. Si
   Calendar est indisponible, demander au dirigeant deux ou trois créneaux qu'il
   peut proposer et utiliser ceux-ci plutôt que d'inventer des horaires.

## Gardes de validation

- **Ne jamais envoyer d'email.** Rédiger seulement ; le dirigeant envoie depuis
  sa boîte.
- **Ne jamais créer d'événement d'agenda avant validation explicite.**
- **Ne jamais changer d'étape de cycle de vie ni marquer un lead
  `Unqualified`** sauf demande explicite du dirigeant.
- **Ne jamais inclure les contacts `Customer` ou `Evangelist`** dans la liste.
- **Si aucun lead ne correspond au filtre**, expliquer pourquoi et proposer de
  vérifier quelles étapes de cycle de vie sont utilisées — ne pas fabriquer de
  liste.

## Références

- [reference/hubspot-scoring.md](reference/hubspot-scoring.md) — noms de champs
  HubSpot, poids de notation, valeurs par défaut de l'ICP
- [reference/gotchas.md](reference/gotchas.md) — cas limites : données
  périmées, zéro lead, levée d'ambiguïté sur le pipeline, contamination par des
  clients
- [reference/examples/happy-path-triage.md](reference/examples/happy-path-triage.md)
  — sortie détaillée pour une liste de 7 leads avec brouillon et créneaux

## Proposition de clôture

Terminer par une ligne sur ce que le tri a produit, puis l'étape suivante la
plus pertinente avec sa formulation déclencheuse — généralement « liste
d'appels » (`/liste-appels`) pour ajouter des créneaux autour du classement. Deux
autres au plus si elles s'appliquent : « rédiger cette prospection »
(`outreach-composer`) ou « mettre à jour le CRM » (`crm-autopilot`). Jamais plus
de trois, et ne jamais reproposer ce que le dirigeant a déjà refusé dans cette
session.

## Sans HubSpot ?

Coller ou déposer la liste des leads — un export CSV ou même une liste
approximative convient. La notation et les points de discussion se font
identiquement ; la liste d'appels triée revient sous forme de réponse et de
fichier, sans écriture dans le CRM.

## Utiliser un outil qui n'est pas listé

Les connecteurs nommés dans ce skill sont les chemins testés, pas une muraille.
Si le dirigeant veut que ce flux utilise un outil non connecté ou non listé,
proposer `build-connector` — il vérifie d'abord l'annuaire des connecteurs et se
connecte via Zapier sinon, jamais en construisant à la main contre une API brute.
Une fois la connexion en place, l'outil rejoint ce skill comme tout connecteur
optionnel, sous les mêmes gardes de validation.
