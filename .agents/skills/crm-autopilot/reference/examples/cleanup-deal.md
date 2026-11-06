# Exemple : nettoyer une affaire périmée

Scénario déroulé pour le chemin nettoyage — l'utilisateur demande au skill d'auditer une affaire précise, le skill remonte les constats et attend une approbation.

## Préparation

- Affaire : « Acme Q2 Expansion » — étape « Proposal Sent », montant 18 000 €, date de closing le 15 mai, prochaine étape « envoyer la grille tarifaire », `notes_last_updated` il y a 22 jours
- L'affaire a deux contacts rattachés : Sarah Lin et Ben Rivera
- Les 14 derniers jours d'emails avec Sarah comprennent un fil daté du 18 avril intitulé « Re: Acme pricing » dans lequel Sarah a confirmé la grille tarifaire et dit « nous signerons dès que notre revue juridique sera terminée, mi-juin »
- Un événement d'agenda du 20 avril intitulé « Acme — legal review walkthrough » incluait une nouvelle personne, `maria.chen@acme.com`, qui n'est ni dans HubSpot ni sur l'affaire
- Aucun email, réunion ou note ne suggère que l'affaire a changé d'étape

## Ce que dit l'utilisateur

> « Nettoie l'affaire Acme Q2 Expansion. »

## Comportement du skill

**Étape 1 — Identifier l'intention.**
Chemin nettoyage, limité à une affaire nommée.

**Étape 2 — Rassembler le contexte.**
Récupère l'enregistrement de l'affaire. Récupère les fils d'emails des 14 derniers jours impliquant Sarah et Ben. Récupère les événements d'agenda de la même période.

**Étape 3 — Résoudre.**
Affaire explicitement nommée — aucune résolution nécessaire. Contacts présents sur les emails et réunions récents : Sarah (sur l'affaire), Ben (sur l'affaire), Maria Chen (pas sur l'affaire, pas dans HubSpot).

**Étape 4 — Parcourir la liste de contrôle du nettoyage.**

Le skill n'écrit RIEN pour l'instant. Produit cette liste de contrôle :

> **Revue du nettoyage — Acme Q2 Expansion**
>
> **1. Date de dernière activité.** L'affaire indique 22 jours. Activité plus récente trouvée : email du 18 avril de Sarah (« Re: Acme pricing »), réunion du 20 avril (« Acme — legal review walkthrough »). Rien n'est journalisé dans HubSpot.
> **→ Propose :** Journaliser l'email du 18 avril et la réunion du 20 avril comme activités sur cette affaire.
>
> **2. Champ prochaine étape.** Actuellement « envoyer la grille tarifaire ». L'email du 18 avril montre que la grille a été envoyée et confirmée par Sarah.
> **→ Propose :** `hs_next_step` : « envoyer la grille tarifaire » → « attendre la validation de la revue juridique ».
>
> **3. Étape de l'affaire.** Actuellement « Proposal Sent ». Aucun élément ne indique un mouvement d'étape — Sarah a dit qu'ils signeront *après* la revue juridique. L'étape est cohérente avec la réalité.
> **→ Signalement uniquement — aucun changement.**
>
> **4. Date de closing.** Actuellement le 15 mai. L'email de Sarah du 18 avril dit « mi-juin ».
> **→ Propose :** `closedate` : 15 mai → 15 juin.
>
> **5. Montant.** Actuellement 18 000 €. L'email du 18 avril confirme 50 sièges à 360 € = 18 000 €. Aucun changement nécessaire.
> **→ Aucune action.**
>
> **6. Contacts rattachés.** Maria Chen (`maria.chen@acme.com`) a participé à la réunion de revue juridique du 20 avril. Pas sur l'affaire, pas dans HubSpot.
> **→ Propose :** Créer le contact et le rattacher à l'affaire.
>
> **7. Hygiène des notes.** Aucune note contradictoire trouvée sur les 90 derniers jours.
> **→ Aucune action.**
>
> > J'approuve les points 1, 2, 4 et 6 pour l'écriture ? Ou précise lesquels.

**Étape 5 — Porte d'approbation.**
Attend l'utilisateur. L'utilisateur répond : « *Oui pour tous sauf 4 — laisse la date de closing tranquille, elle est peut-être optimiste.* »

**Étape 6 — Exécuter les points approuvés.**
- Journalise l'email du 18 avril comme activité email
- Journalise la réunion du 20 avril comme activité d'appel avec les participants Sarah, Ben et Maria (nouvellement créée)
- Met à jour `hs_next_step` en « attendre la validation de la revue juridique »
- Ne met PAS à jour `closedate`
- Crée le contact Maria Chen et le rattache à l'affaire

**Compte rendu.**

> Modifications écrites sur Acme Q2 Expansion :
> - Activités email du 18 avril et appel du 20 avril journalisés
> - Prochaine étape mise à jour en « attendre la validation de la revue juridique »
> - Contact Maria Chen (maria.chen@acme.com) créé et ajouté à l'affaire
> - Date de closing inchangée, conformément à ta décision.
> - L'étape de l'affaire a été signalée comme cohérente avec la réalité — aucun changement nécessaire.
> [HubSpot : Acme Q2 Expansion]

## Ce que cet exemple illustre

- Chaque vérification de champ de `../cleanup-checklist.md` appliquée à une seule affaire
- Cadrage côte à côte actuel → proposé pour chaque changement proposé
- Changement d'étape correctement retenu comme simple signalement
- L'utilisateur approuve des points de façon sélective — le skill respecte exactement la sélection
- Création du contact intégrée au même cycle d'approbation