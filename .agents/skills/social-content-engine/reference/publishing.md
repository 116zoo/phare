# Publication et programmation

Deux chemins, par ordre de préférence. Quel que soit celui qui s'exécute, le
post est **programmé, jamais publié** — le dirigeant garde la main sur la mise
en ligne et peut encore annuler ou modifier.

| Chemin | Quand | Ce que reçoit le dirigeant |
|---|---|---|
| HubSpot social | Marketing Hub Professional ou supérieur | Un post programmé dans la file de campagne HubSpot |
| CSV de programmation | Sans HubSpot, ou un abonnement HubSpot autre que Professional | Un CSV à importer dans Buffer, Later ou son outil |

---

## Avant toute programmation

1. **Toute date programmée doit être dans le futur.** Les calendriers construits
   il y a des semaines périment discrètement. Compare chaque date à maintenant
   et signale celles qui sont passées : « La date de publication du 8 juil. est
   déjà passée. Je la saute ou je la décale ? »
2. **Chaque URL d'asset doit être une URL d'export permanente,** pas une vignette
   de réponse d'autofill. Celles-ci expirent en quelques minutes et s'attachent
   en images cassées.
3. **Le texte doit être celui qui a été validé,** pas une version ultérieure qui
   a sauté le point de contrôle 3.

---

## Programmation des posts HubSpot Social

Nécessite : **HubSpot Marketing Hub Professional** (ou supérieur).  
URL de base : `https://api.hubapi.com`  
Authentification : jeton Bearer (OAuth 2.0 ou jeton d'application privée).

---

## Vérification du palier

Si tu n'es pas sûr que l'utilisateur dispose de Marketing Hub Professional :

```
GET /crm/v3/objects/companies?limit=1
```

Vérifie le `subscriptionType` du compte. Si l'API renvoie une 403 sur les
endpoints social, dis à l'utilisateur : « La programmation de campagnes HubSpot
demande Marketing Hub Professional. Ton abonnement actuel ne l'inclut pas. Je
peux exporter un CSV de programmation à la place — ça conviendrait ? »

---

## Créer une campagne

```
POST /marketing/v3/campaigns
{
  "name": "Soldes d'été 2026 — Social",
  "startDate": "2026-06-01",
  "endDate":   "2026-06-30",
  "currencyCode": "<Devise du bloc Business context, p. ex. EUR>",
  "utm": {
    "source": "social",
    "medium": "owned",
    "campaign": "summer-sale-2026"
  }
}
```

Réponse : `{ "id": "<campaign_id>", ... }` — à conserver pour rattacher les
posts social.

---

## Créer un post social

Un appel par ligne de calendrier. Programme en `SCHEDULED`, jamais `PUBLISHED`.

```
POST /marketing/v3/social/posts
{
  "campaignId": "<campaign_id>",
  "channelId":  "<hubspot_channel_id>",
  "content": {
    "body": "<texte validé>"
  },
  "scheduledAt": "2026-06-03T10:00:00Z",
  "attachments": [
    {
      "url": "<canva_export_png_url>"
    }
  ],
  "status": "SCHEDULED"
}
```

**`channelId`** — l'ID du compte HubSpot Social (pas le nom de la plateforme).
Récupère les comptes connectés :
```
GET /marketing/v3/social/channels
```
Filtre sur `type` (`INSTAGRAM`, `FACEBOOK`, `TWITTER`, `LINKEDIN`) et utilise le
champ `id`.

**`scheduledAt`** — doit être dans le futur (par rapport à l'heure de l'appel
API). Utilise midi dans le fuseau horaire du dirigeant, sauf indication
contraire de sa part.

---

## Vérifier la file programmée

Après avoir programmé tous les posts :

```
GET /marketing/v3/social/posts?status=SCHEDULED&campaignId=<campaign_id>
```

Présente les résultats dans un tableau : date, canal, 60 premiers caractères du
texte, statut. Fournis l'URL directe de la campagne HubSpot :
`https://app.hubspot.com/content/{portalId}/social/campaigns/{campaign_id}`

Dis à l'utilisateur : « Les posts sont programmés et publieront automatiquement.
Tu peux annuler ou modifier n'importe quel post dans HubSpot avant l'heure
d'envoi. »

---

## Repli CSV (utilisateurs non Professional)

Quand la programmation HubSpot n'est pas disponible, exporte un CSV que
l'utilisateur peut importer dans Buffer, Later ou son outil de programmation.

En-têtes de colonnes :
```
Date,Time,Channel,Caption,ImageURL,Status
```

Exemple de ligne :
```
2026-06-03,10:00 CEST,Instagram,"Soldes d'été : -30 % sur les bougies ☀️ ...",https://canva.com/export/...,Programmé
```

Dis à l'utilisateur : « J'ai préparé un CSV de programmation car ton
abonnement HubSpot n'inclut pas la programmation social. Tu peux importer ce
fichier dans Buffer ou Later. [chemin du fichier] »

---

## Référence des champs

| Champ | Type | Notes |
|-------|------|-------|
| `campaignId` | string | UUID renvoyé à la création de la campagne |
| `channelId` | string | Issu de `GET /social/channels` |
| `content.body` | string | Texte du post ; 2 000 caractères max |
| `scheduledAt` | ISO 8601 | Doit être une date future ; inclure le décalage horaire |
| `attachments[].url` | string | URL publique (l'URL d'export Canva convient) |
| `status` | enum | Toujours `"SCHEDULED"` — jamais `"PUBLISHED"` |

---

## Transmission des emails

Ce skill ne programme jamais les emails, sur aucun chemin. Présente l'objet, le
pré-en-tête et le corps validés en ligne, groupés par date d'envoi, pour que le
dirigeant les colle dans l'outil depuis lequel il envoie :

```
11 juil. — « Ton contrat d'entretien se renouvelle le 1er août »
5 août    — « Il reste deux créneaux de révision ce mois-ci »
```

C'est toute la transmission. Ne propose pas de l'envoyer, et ne construis aucun
design Canva pour cela.