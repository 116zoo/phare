# Champs et types d'activité HubSpot

Les objets, propriétés et types d'activité HubSpot précis que le skill `crm-autopilot` lit et écrit. Seuls les champs listés ici sont dans le périmètre de ce skill — tout le reste de HubSpot reste intact.

## Contacts — écriture

| Champ         | Usage                                                                                  |
|---------------|----------------------------------------------------------------------------------------|
| `email`       | Identifiant principal pour la recherche et le dédoublonnage. Toujours renseigné à la création.  |
| `firstname`   | Renseigné depuis la signature d'email ou l'invitation d'agenda si elle est disponible. Laisser vide si inconnu.      |
| `lastname`    | Renseigné depuis la signature d'email ou l'invitation d'agenda si elle est disponible. Laisser vide si inconnu.      |
| `company`     | Renseigné depuis le domaine de l'email ou l'organisation de l'invitation d'agenda si elle est disponible.                 |

N'écris aucune autre propriété contact. Le responsable, l'étape du cycle de vie et la source du lead sont des champs gérés par l'utilisateur — ne les écrase jamais.

## Contacts — lecture (pour la recherche)

| Champ         | Usage                                                              |
|---------------|--------------------------------------------------------------------|
| `email`       | Clé de recherche. Correspondance exacte, insensible à la casse.                          |
| `firstname` · `lastname` · `company` | Montrés à l'utilisateur lors de la résolution d'ambiguïtés. |
| `hs_object_id`| Sert au rattachement avec les affaires et les activités.                    |

## Deals — lecture (tous les chemins de nettoyage et de résolution)

| Champ                       | Usage                                                    |
|-----------------------------|----------------------------------------------------------|
| `dealname`                  | Montré à l'utilisateur ; sert au rapprochement approximatif avec l'objet de l'email ou le sujet de la réunion |
| `dealstage`                 | Lecture seule pendant le nettoyage — signaler les écarts, ne jamais modifier |
| `amount`                    | Lu pendant le nettoyage ; signaler si un email ou une réunion récent laisse entendre un changement |
| `closedate`                 | Lu pendant le nettoyage ; signaler s'il n'est plus à jour                    |
| `hs_next_step`              | Lu et mis à jour proposé pendant le nettoyage                    |
| `hubspot_owner_id`          | Montré à l'utilisateur ; jamais modifié                     |
| `notes_last_updated`        | Sert à repérer les affaires périmées. C'est le « Last Activity Date » de HubSpot sur l'objet deal. Il n'existe pas de propriété `hs_lastactivitydate` — n'en cherche pas |
| Contacts rattachés         | Sert à déterminer si les participants d'un email ou d'une réunion récente figurent sur l'affaire |

## Deals — écriture (chemin de nettoyage uniquement, avec approbation)

| Champ           | Règle                                                             |
|-----------------|------------------------------------------------------------------|
| `hs_next_step`  | Proposer des mises à jour ; écrire uniquement sur approbation explicite de l'utilisateur          |
| `closedate`     | Proposer des mises à jour ; écrire uniquement sur approbation explicite de l'utilisateur          |
| `amount`        | Proposer des mises à jour ; écrire uniquement sur approbation explicite de l'utilisateur          |
| Rattachement de contact  | Proposer d'ajouter les participants manquants à l'affaire ; écrire uniquement après approbation |

**N'écris jamais** `dealstage`, `pipeline`, `hubspot_owner_id` ni aucune propriété personnalisée pendant le nettoyage. Ces champs sont gérés par le dirigeant.

## Activities — écriture

| Type d'activité                  | Utilisé par        | Champs renseignés                                                               |
|--------------------------------|----------------|--------------------------------------------------------------------------|
| Engagement email (`EMAIL`)     | Chemin email     | `hs_email_subject` (objet du fil), `hs_email_text` (résumé, pas le fil complet), `hs_timestamp` (horodatage du dernier message), contact(s) + affaire rattachés |
| Engagement appel (`CALL`)       | Chemin appel      | `hs_call_title` (titre de l'événement), `hs_call_body` (résumé), `hs_call_duration` (depuis l'agenda), `hs_timestamp` (début de l'événement), contact(s) + affaire rattachés |
| Note (`NOTE`)                  | Chemin nettoyage   | `hs_note_body` (pour signaler quelque chose à revoir plus tard qui n'entre dans aucun champ) |

Utilise le vocabulaire d'engagement standard de HubSpot. N'invente pas de types d'activité personnalisés.

## Règles de rattachement

- Toute activité doit être rattachée à l'affaire ET à au moins un contact.
- Si un contact est créé à la volée pendant le journalisement d'une activité, rattache-le à l'affaire dans la même opération, afin que l'activité apparaisse sur les deux chronologies, contact et affaire.
- Ne rattache pas un contact à une affaire pendant un flux de journalisation d'activité, sauf si ce contact participe réellement au fil d'emails ou à la réunion concerné.