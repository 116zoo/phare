# Notation HubSpot — lead-triage

Noms des champs, poids de notation et valeurs par défaut de l'ICP.

---

## Champs à récupérer

| Champ HubSpot | Utilisation |
|---|---|
| `firstname`, `lastname` | Affichage |
| `company` | Affichage. Souvent vide — préférer le `name` de l'entreprise associée, ci-dessous. |
| `email` | Destinataire du brouillon de relance |
| `lifecyclestage` | Filtre (garder Lead, MQL) |
| `hs_lead_status` | Filtre (exclure Unqualified) + départage |
| `jobtitle` | Départage sur l'autorité |
| `hs_buying_role` | Départage sur l'autorité |
| `num_associated_deals` | Départage — un lead auquel des affaires sont rattachées passe avant un lead sans affaires |
| `hs_is_unworked` | Départage — `true` signifie que personne ne l'a encore touché |
| `createdate` | Urgence — âge du lead |
| `notes_last_updated` | Pénalité de récence. HubSpot libelle ce champ « Last Activity Date ». Il n'existe pas de `hs_last_activity_date` sur l'objet contact — n'en cherche pas. |
| `num_notes` | Pré-filtre pour la récupération des corps de notes ci-dessous — un simple compte ne peut pas déclencher le signal par mot-clé |
| `hs_sales_email_last_replied` | Engagement — signal de réponse |
| `hs_email_open` | Engagement — nombre d'ouvertures (à n'utiliser que sur les 30 derniers jours) |
| `hs_analytics_last_visit_timestamp` | Engagement — visite du site |
| `num_contacted_notes` | Engagement — volume de prospection |

### Les champs d'adéquation entreprise sont sur la fiche ENTREPRISE, pas sur le contact

`industry` et `numemployees` existent sur l'objet contact mais sont presque
jamais renseignés. Les copies remplies vivent sur l'entreprise associée au
contact. Récupère celles-ci :

| Champ ENTREPRISE | Utilisation |
|---|---|
| `name` | Affichage — le vrai nom de l'entreprise |
| `industry` | Adéquation entreprise |
| `numberofemployees` | Adéquation entreprise — effectif exact |
| `hs_employee_range` | Adéquation entreprise — repli quand `numberofemployees` est vide |

Récupère l'entreprise associée pour chaque lead, puis lis l'adéquation sur cette
fiche. Ne reviens au `industry` / `numemployees` du niveau contact qu'en
l'absence totale d'entreprise associée.

### La branche d'enrichissement : quand il n'y a pas d'entreprise associée

Quand aucun lead d'un portail n'a d'association
entreprise, l'adéquation entreprise vaut 5 partout et la dimension ne
contribue à rien. Avec un connecteur de données prospects connecté — Apollo ou
Clay, pairs au sens de `../../../shared/connector-neutrality.md` — comble le
trou avec le domaine email du lead au lieu de lui attribuer une note plate :

1. Rassembler les leads sans entreprise associée et disposant d'un domaine
   email professionnel (laisse de côté gmail, outlook, yahoo, icloud et
   consorts — il n'y a rien à enrichir).
2. **Annonce le compte et demande une seule fois.** L'enrichissement est
   facturé à l'appel : chaque ligne consomme des crédits. *« 32 leads n'ont pas
   d'entreprise au dossier. Les enrichir à partir de leurs domaines email coûte
   environ 32 crédits dans Clay. Je lance ? »* Ne le lance que sur un oui pour
   cette exécution ; un non signifie que l'échelle plate ci-dessous s'applique à
   ces lignes.
3. Enrichir par domaine :
   - **Clay :** `find-and-enrich-company` par domaine, en lisant le secteur et
     l'effectif dans les data points d'entreprise renvoyés. Passe par lots avec
     `find-and-enrich-list-of-contacts` quand le connecteur le propose pour
     l'ensemble du set.
   - **Apollo :** `apollo_organizations_enrich` par domaine, en lisant
     `industry` et `estimated_num_employees`.
4. Note l'adéquation entreprise à partir des valeurs enrichies en utilisant le
   même tableau que pour une entreprise associée. Marque ces lignes
   « adéquation par enrichissement » dans les réserves.
5. **Ne réécris jamais les champs enrichis dans le CRM depuis ce skill.**
   Propose-le ensuite comme un passage d'hygiène `crm-autopilot`, derrière sa
   garde d'écriture, si le dirigeant veut que les fiches entreprise soient
   créées.

Sans connecteur de données prospects, ou en cas de refus, c'est l'échelle de
note plate qui s'applique.

### Récupérer les corps de notes pour le scan d'urgence (« Fetch note bodies »)

Les mots-clés d'urgence vivent dans le *corps* des notes, et les corps de notes
sont des engagements — ils n'arrivent jamais avec l'extraction des propriétés du
contact. `num_notes` indique seulement qu'une note existe ; le signal par mot-clé
à +15 ne peut pas se déclencher tant que les corps ne sont pas réellement lus.

Comment faire sans saturer l'API :

1. Note d'abord chaque lead *sans* le signal par mot-clé des notes (score
   provisoire).
2. Récupère les notes associées uniquement pour les ~25 premiers leads par score
   provisoire — ou pour tous les leads dont `num_notes` > 0 quand moins de 25
   ont des notes.
3. Tire les notes via l'association contact → notes et lis le corps de la note
   (`hs_note_body`). Une page de notes par lead, de la plus récente à la plus
   ancienne, suffit.
4. Scanne les corps à la recherche des mots-clés d'urgence et renote avec le
   +15 là où un mot-clé apparaît. Mentionne dans les réserves que des notes
   existaient mais n'ont pas été récupérées (au-delà du plafond) plutôt que de
   prétendre qu'elles ne contenaient rien.

---

## Modèle de notation (0–100 composite)

Quatre dimensions, chacune de 0 à 25. La somme donne le composite.

### Engagement (0–25)

Ne compte que les signaux des 30 derniers jours. Les signaux plus anciens
valent 0.

| Signal | Points |
|---|---|
| Réponse à un email dans les 14 derniers jours | +15 |
| Ouverture d'un email dans les 7 derniers jours (sans réponse) | +8 |
| Visite du site dans les 7 derniers jours | +5 |
| >3 tentatives de prospection, sans réponse | −5 |

### Adéquation entreprise (0–25)

ICP par défaut si le dirigeant n'en a pas formulé un : tout secteur, 1 à 50
salariés.

| Correspondance | Points |
|---|---|
| Secteur et taille correspondent tous deux à l'ICP | 25 |
| La taille correspond, secteur inconnu | 15 |
| Le secteur correspond, taille inconnue | 12 |
| Ni l'un ni l'autre ne correspond, ou les deux inconnus | 5 |

### Urgence (0–25)

| Signal | Points |
|---|---|
| La note contient « urgent », « ASAP », « échéance », « budget validé » — exige la récupération des corps de notes ci-dessus ; `num_notes` seul ne peut pas déclencher ce signal | +15 |
| Âge du lead 7–21 jours (fenêtre optimale de relance) | +10 |
| Âge du lead <7 jours | +5 |
| Âge du lead >60 jours | −5 |

### Pénalité de récence (retirée du composite)

| Dernière activité | Retirer |
|---|---|
| Il y a moins de 24 heures | −25 |
| Il y a 1 à 3 jours | −10 |
| Il y a 4 à 7 jours | −5 |
| Il y a plus de 7 jours | 0 |

---

## ICP personnalisé (surcharge à l'exécution)

Si le dirigeant formule un ICP à l'exécution (« cible : SaaS, 10 à 100
salariés »), applique-le uniquement pour cette session.

---

## Quand les scores sortent à plat

Un CRM sans aucun engagement enregistré note tous les leads de la même façon :
dix leads, dix composites identiques à 0. Trier des scores identiques produit un
ordre arbitraire, et présenter cet ordre comme une liste de priorités est pire
que de ne rien dire.

**Vérifie ce cas avant d'afficher une liste classée.** Si le composite le plus
haut et le plus bas diffèrent de moins de 10 points, le modèle n'a rien séparé.
Dis-le clairement :

> *« Ces leads obtiennent presque le même score — ton CRM n'a aucun email, appel
> ni visite de site enregistré pour eux, les signaux d'engagement et
> d'adéquation sont donc tous vides. Voici leur ordre selon ce que le CRM sait
> réellement. »*

Puis ordonne selon cette échelle plutôt que selon le composite, et étiquette-la
comme telle :

1. `hs_lead_status` — `NEW` avant `IN_PROGRESS` avant vide
2. `hs_is_unworked` = `true` — personne ne l'a encore touché
3. `hs_buying_role` — contient `DECISION_MAKER`, puis `CHAMPION`, puis le reste
4. `jobtitle` — mots d'ancienneté (VP, Director, Head, Chief, Owner, Manager)
5. `num_associated_deals` ≥ 1 — affaires déjà rattachées
6. `createdate` — le plus récent en premier

**Ne présente jamais l'ordre de l'échelle comme un score.** Affiche-le comme
« ordonné par signal CRM » et supprime entièrement la colonne de score
numérique, pour que le dirigeant ne lise pas une précision qui n'existe pas.