# Référence — mise en file des campagnes HubSpot

Prérequis : **HubSpot Marketing Hub Professional** (ou supérieur).  
URL de base : `https://api.hubapi.com`  
Auth : jeton Bearer (OAuth 2.0 ou jeton d'application privée).

---

## Sommaire

1. [Vérification de la formule](#vérification-de-la-formule)
2. [Créer une campagne](#créer-une-campagne)
3. [Créer un post social](#créer-un-post-social)
4. [Vérifier la file planifiée](#vérifier-la-file-planifiée)
5. [Repli CSV (utilisateurs non-Professional)](#repli-csv-utilisateurs-non-professional)
6. [Référence des champs](#référence-des-champs)

---

## Vérification de la formule

Si tu ne sais pas si l'utilisateur a Marketing Hub Professional :

```
GET /crm/v3/objects/companies?limit=1
```

Vérifie le `subscriptionType` du compte. Si l'API renvoie un 403 sur les
endpoints sociaux, dis à l'utilisateur : « La mise en file de campagnes
HubSpot exige Marketing Hub Professional. Ton offre actuelle ne l'inclut pas. Je
peu exporter un CSV de planification à la place — ça te conviendrait ? »

---

## Créer une campagne

```
POST /marketing/v3/campaigns
{
  "name": "Summer Sale 2026 — Social",
  "startDate": "2026-06-01",
  "endDate":   "2026-06-30",
  "currencyCode": "<Devise issue du bloc Business context, par ex. EUR>",
  "utm": {
    "source": "social",
    "medium": "owned",
    "campaign": "summer-sale-2026"
  }
}
```

Réponse : `{ "id": "<campaign_id>", ... }` — garde-la pour l'association des
posts sociaux.

---

## Créer un post social

Un appel par ligne de calendrier. Mets en file avec `SCHEDULED`, jamais
`PUBLISHED`.

```
POST /marketing/v3/social/posts
{
  "campaignId": "<campaign_id>",
  "channelId":  "<hubspot_channel_id>",
  "content": {
    "body": "<approved caption text>"
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

**`channelId`** — l'ID de compte HubSpot Social (pas le nom de la plateforme).
Récupère les comptes connectés :
```
GET /marketing/v3/social/channels
```
Fais la correspondance via `type` (`INSTAGRAM`, `FACEBOOK`, `TWITTER`, `LINKEDIN`) et utilise le champ `id`.

**`scheduledAt`** — doit être dans le futur (par rapport à l'heure de l'appel
API). Utilise midi en heure locale du fuseau du dirigeant, sauf indication
contraire.

---

## Vérifier la file planifiée

Après avoir mis tous les posts en file :

```
GET /marketing/v3/social/posts?status=SCHEDULED&campaignId=<campaign_id>
```

Affiche les résultats dans un tableau : date, canal, 60 premiers caractères de
la légende, statut. Donne l'URL directe de la campagne HubSpot :
`https://app.hubspot.com/content/{portalId}/social/campaigns/{campaign_id}`

Dis à l'utilisateur : « Les posts sont planifiés et se publieront
automatiquement. Tu peux annuler ou modifier n'importe quel post dans HubSpot
avant l'heure d'envoi. »

---

## Repli CSV (utilisateurs non-Professional)

Quand la mise en file HubSpot n'est pas disponible, exporte un CSV que
l'utilisateur pourra importer dans Buffer, Later ou son planificateur de
choix.

En-têtes de colonnes :
```
Date,Time,Channel,Caption,ImageURL,Status
```

Exemple de ligne :
```
2026-06-03,10:00 AM CDT,Instagram,"Summer Sale: 30% off candles ☀️ ...",https://canva.com/export/...,Scheduled
```

Dis à l'utilisateur : « Ton offre HubSpot n'inclut pas la mise en file
sociale, j'ai donc préparé un CSV de planification. Tu peux l'importer dans
Buffer ou Later. [chemin du fichier] »

---

## Référence des champs

| Champ | Type | Notes |
|-------|------|-------|
| `campaignId` | string | UUID renvoyé à la création de la campagne |
| `channelId` | string | Issu de `GET /social/channels` |
| `content.body` | string | Texte de la légende ; 2 000 caractères max |
| `scheduledAt` | ISO 8601 | Doit être dans le futur ; inclure le décalage de fuseau horaire |
| `attachments[].url` | string | URL publique (l'URL d'export Canva convient) |
| `status` | enum | Toujours `"SCHEDULED"` — jamais `"PUBLISHED"` |