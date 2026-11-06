# Référence de l'API Canva Connect

URL de base : `https://api.canva.com/rest/v1`  
Auth : jeton Bearer (OAuth 2.0). Scopes nécessaires : `design:content:read`, `design:content:write`, `asset:read`, `asset:write`, `brandtemplate:content:read` (Enterprise uniquement).

---

## Sommaire

1. [Exigences par formule](#exigences-par-formule)
2. [Templates de marque (Enterprise)](#templates-de-marque-enterprise)
3. [Autofill (Enterprise)](#autofill-enterprise)
4. [Copie de design (Pro/Teams)](#copie-de-design-proteams)
5. [Envoi de ressources](#envoi-de-ressources)
6. [Export](#export)
7. [Codes d'erreur](#codes-erreur)

---

## Exigences par formule

| Fonctionnalité | Free | Pro | Teams | Enterprise |
|---------|------|-----|-------|------------|
| Créer des designs | ✓ | ✓ | ✓ | ✓ |
| Lister ses propres designs | ✓ | ✓ | ✓ | ✓ |
| Templates de marque (lecture) | — | — | — | ✓ |
| Autofill de templates de marque | — | — | — | ✓ |
| Envoi de ressources (kit de marque) | — | — | — | ✓ |
| Envoi de ressources (utilisateur) | — | ✓ | ✓ | ✓ |

---

## Templates de marque (Enterprise)

**Lister les templates de marque :**
```
GET /brand-templates?query={keyword}&ownership=organization
```
Champs de réponse utiles :
- `id` — à passer à l'autofill
- `title` — nom lisible
- `thumbnail.url` — image d'aperçu
- `dataset[].label` — libellés des champs d'autofill (par ex. « Headline », « ProductName »)

Filtre sur `title` contenant le mot-clé du type de ressource (par ex. « square post », « story », « email header »).

---

## Autofill (Enterprise)

Remplit les champs variables d'un template de marque et crée un nouveau design :

```
POST /autofills
{
  "brand_template_id": "<template_id>",
  "title": "Summer Sale — Post 1",
  "data": {
    "Headline": { "type": "text", "text": "Summer Sale: 30% off candles" },
    "ProductImage": { "type": "image", "asset_id": "<uploaded_asset_id>" }
  }
}
```

Réponse : `{ "job": { "id": "<job_id>", "status": "queued" } }`

Sonde `GET /autofills/{job_id}` jusqu'à `status == "success"`. La réponse
inclut `result.design.id` — utilise-le pour l'export.

---

## Copie de design (Pro/Teams)

Il n'existe aucun endpoint direct « copier un template » pour les utilisateurs
Pro/Teams. Déroulé :

1. `GET /designs?ownership=any&query={template name}` — lister les designs par nom
2. Monttrer les 3 premiers à l'utilisateur ; obtenir sa confirmation
3. `POST /designs` avec `asset_type` pour créer un design vierge aux bonnes
   dimensions, puis décrire ce que l'utilisateur doit mettre à jour manuellement
   dans Canva.

La génération de ressources en Pro/Teams est semi-manuelle : Claude crée la
coque du design et remplit ce que l'API permet ; l'utilisateur applique dans
Canva les modifications propres à sa marque puis renvoie l'ID du design pour
l'export.

---

## Envoi de ressources

À utiliser quand le brief référence des photos produits stockées sur le Bureau
de l'utilisateur ou dans son système de fichiers.

**Étape 1 — Initialiser l'envoi :**
```
POST /asset-uploads
{ "name_base64": "<base64(filename)>", "types": ["image/jpeg"] }
```
Réponse : `{ "job": { "id": "<job_id>" }, "upload_url": "<presigned_s3_url>" }` 

**Étape 2 — Envoyer le fichier :**
```
PUT <upload_url>
Content-Type: image/jpeg
Body: <raw file bytes>
```

**Étape 3 — Sonder jusqu'à disponibilité :**
`GET /asset-uploads/{job_id}` → attendre `status == "success"` → récupérer `asset.id`.

Taille de fichier maximale : 100 MB. Types pris en charge : `image/jpeg`, `image/png`, `image/webp`.

---

## Export

**Pourquoi exporter chaque design :** la vignette renvoyée par l'autofill à
`design.canva.ai/...` est une URL CDN authentifiée de courte durée — elle expire
en quelques minutes et s'affiche comme un placeholder cassé « Afficher l'image »
si on l'intègre dans une image markdown après expiration. La sortie de
`POST /exports` est une **URL permanente**, sûre à intégrer dans les aperçus de
chat, à joindre aux posts HubSpot et à partager avec le dirigeant.

Exporte toujours chaque design après sa génération, avant d'afficher les
aperçus.

```
POST /exports
{
  "design_id": "<design_id>",
  "format": {
    "type": "png",
    "export_quality": "regular",
    "pages": [1]
  }
}
```

Sonde `GET /exports/{job_id}` jusqu'à `status == "success"`. La réponse inclut
`urls[]` — utilise `urls[0]` comme lien d'aperçu et comme URL de pièce jointe
HubSpot.

**Équivalents Canva MCP** (quand tu utilises le connecteur Canva de Cowork au
lieu du REST direct) :

| Besoin | Outil MCP | Retourne |
|------|---------|---------|
| URL d'aperçu permanente | `export-design` | URL de téléchargement permanente (sûre à intégrer) |
| Vignette par page (plus stable que la réponse d'autofill, non permanente) | `get-design-thumbnail` | URL de vignette de page |
| Métadonnées du design uniquement | `get-design` | Titre, propriétaire, nombre de pages, vignette |
| Envoi depuis la machine du dirigeant | `upload-asset-from-url` | `asset_id` (une URL par appel) |

**Choix du format par canal :**

| Canal | Type | Dimensions |
|---------|------|-----------|
| Flux Instagram | `png` | 1080×1080 (carré) |
| Story / couverture Reels Instagram | `png` | 1080×1920 |
| Flux Facebook | `png` | 1200×630 |
| En-tête d'email | `png` | 600×200 |

---

## Limites de débit et budget de génération

**Limite stricte :** 100 requêtes par minute et par token.

**Coût par design :** ~5 appels API — 1 `POST /autofills` + 1 `POST /exports`
+ ~3 tours de sondage (`GET /autofills/{job_id}`, `GET /exports/{job_id}`).
La cadence de sondage doit être de 3 à 5 secondes ; sonder plus vite brûle du
quota sans accélérer l'achèvement.

**Plafond de sécurité :** ~15 à 20 designs par minute laisse une marge
confortable sous le plafond de 100 req/min.

**Rythme recommandé (utilisé à l'Étape 3) :**

```
3 candidats par ligne × 1 ligne à la fois × 30 s d'écart entre les lignes
= 6 designs (~30 appels API) toutes les 30 secondes
= 12 designs / minute, environ la moitié du plafond
```

**Formule de budget en phase préparatoire :**

```
total_designs = (lignes Canva) × (candidats par ligne, 3 par défaut)
total_api_calls ≈ total_designs × 5
generation_time ≈ (total_designs / 12) minutes
```

**Schéma de recul sur `RATE_LIMIT_EXCEEDED` :**

1. Première occurrence dans une session → attendre 60 s, réessayer ce seul
   candidat. Traite l'erreur comme un pic transitoire.
2. Deuxième occurrence dans la même session, ou toute erreur `quota_exceeded` /
   de plafond quotidien → arrêter la génération et afficher l'avancement au
   dirigeant. Ne pas réessayer. Le skill demande au dirigeant s'il faut (a)
   passer à 1 candidat par ligne restante, (b) mettre en pause et reprendre dans
   60 minutes, ou (c) arrêter et passer aux légendes avec ce qui est déjà
   généré.

---

## Codes d'erreur

| Code | Signification | Conduite à tenir |
|------|---------|-----------|
| `PERMISSION_DENIED` | Scope manquant ou mauvaise formule | Vérifie la formule ; demande à l'utilisateur de reconnecter Canva avec les bons scopes |
| `DESIGN_NOT_FOUND` | Mauvais design ID | Reliste les designs et confirme l'ID |
| `AUTOFILL_FIELD_NOT_FOUND` | Nom de champ du template incohérent | Appelle `GET /brand-templates/{id}` et relis `dataset[].label` |
| `RATE_LIMIT_EXCEEDED` | Trop de requêtes | Première occurrence : attendre 60 s, réessayer une fois. Deuxième occurrence : arrêter et demander au dirigeant (voir Limites de débit ci-dessus) |
| `JOB_FAILED` | Échec du job asynchrone | Vérifie `job.error.message` ; cause fréquente : ressource trop volumineuse |