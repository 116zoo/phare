# Référence de l'API Canva Connect

URL de base : `https://api.canva.com/rest/v1`  
Authentification : jeton Bearer (OAuth 2.0). Portées requises : `design:content:read`, `design:content:write`, `asset:read`, `asset:write`, `brandtemplate:content:read` (Enterprise uniquement).

---

## Sommaire

1. [Exigences par palier](#exigences-par-palier)
2. [Modèles de marque (Enterprise)](#modeles-de-marque-enterprise)
3. [Autofill (Enterprise)](#autofill-enterprise)
4. [Copie de design (Pro/Teams)](#copie-de-design-proteams)
5. [Téléversement d'un asset](#televersement-dun-asset)
6. [Export](#export)
7. [Codes d'erreur](#codes-derreur)

---

## Exigences par palier

| Fonctionnalité | Free | Pro | Teams | Enterprise |
|---------|------|-----|-------|------------|
| Créer des designs | ✓ | ✓ | ✓ | ✓ |
| Lister ses propres designs | ✓ | ✓ | ✓ | ✓ |
| Modèles de marque (lecture) | — | — | — | ✓ |
| Autofill de modèles de marque | — | — | — | ✓ |
| Téléversement d'un asset (brand kit) | — | — | — | ✓ |
| Téléversement d'un asset (utilisateur) | — | ✓ | ✓ | ✓ |

---

## Modèles de marque (Enterprise)

**Lister les modèles de marque :**
```
GET /brand-templates?query={keyword}&ownership=organization
```
Champs utiles de la réponse :
- `id` — à passer à l'autofill
- `title` — nom lisible par un humain
- `thumbnail.url` — image d'aperçu
- `dataset[].label` — libellés des champs d'autofill (p. ex. « Headline », « ProductName »)

Filtre sur `title` contenant le mot-clé du type de visuel (p. ex. « square post », « story », « email header »).

---

## Autofill (Enterprise)

Remplit les champs variables d'un modèle de marque et crée un nouveau design :

```
POST /autofills
{
  "brand_template_id": "<template_id>",
  "title": "Soldes d'été — Post 1",
  "data": {
    "Headline": { "type": "text", "text": "Soldes d'été : -30 % sur les bougies" },
    "ProductImage": { "type": "image", "asset_id": "<uploaded_asset_id>" }
  }
}
```

Réponse : `{ "job": { "id": "<job_id>", "status": "queued" } }`

Interroge `GET /autofills/{job_id}` jusqu'à `status == "success"`. La réponse
inclut `result.design.id` — à utiliser pour l'export.

---

## Copie de design (Pro/Teams)

Il n'existe pas d'endpoint direct de « copie de template » pour les utilisateurs
Pro/Teams. Processus :

1. `GET /designs?ownership=any&query={template name}` — lister les designs par nom
2. Montrer les 3 premiers à l'utilisateur ; obtenir sa confirmation
3. `POST /designs` avec `asset_type` pour créer un design vierge aux bonnes
   dimensions, puis décrire ce que l'utilisateur devra modifier manuellement dans
   Canva.

La génération d'assets en Pro/Teams est semi-manuelle : Claude crée la coque du
design et remplit ce que l'API autorise ; l'utilisateur applique dans Canva les
modifications propres à sa marque et renvoie l'ID du design pour l'export.

---

## Téléversement d'un asset

À utiliser quand le brief référence des photos produit stockées sur le Bureau de
l'utilisateur ou dans son système de fichiers.

**Étape 1 — Initialiser le téléversement :**
```
POST /asset-uploads
{ "name_base64": "<base64(filename)>", "types": ["image/jpeg"] }
```
Réponse : `{ "job": { "id": "<job_id>" }, "upload_url": "<presigned_s3_url>" }` 

**Étape 2 — Téléverser le fichier :**
```
PUT <upload_url>
Content-Type: image/jpeg
Body: <brut du fichier>
```

**Étape 3 — Sonder jusqu'à disponibilité :**
`GET /asset-uploads/{job_id}` → attendre `status == "success"` → récupérer `asset.id`.

Taille maximale du fichier : 100 Mo. Types pris en charge : `image/jpeg`, `image/png`, `image/webp`.

---

## Export

**Pourquoi exporter chaque design :** la vignette renvoyée par la réponse
d'autofill à l'adresse `design.canva.ai/...` est une URL CDN authentifiée à durée
de vie courte — elle expire en quelques minutes et s'affiche comme un
« Show Image » cassé si on l'intègre dans une image markdown après expiration. La
sortie de `POST /exports` est une **URL permanente**, sûre à intégrer dans les
aperçus de chat, à joindre aux posts HubSpot et à partager avec le dirigeant.

Exporte toujours chaque design après la génération, avant d'afficher les aperçus.

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

Interroge `GET /exports/{job_id}` jusqu'à `status == "success"`. La réponse
inclut `urls[]` — utilise `urls[0]` comme lien d'aperçu et comme URL de pièce
jointe HubSpot.

**Équivalents MCP Canva** (quand tu utilises le connecteur Canva de Cowork au
lieu du REST direct) :

| Besoin | Outil MCP | Retour |
|------|---------|---------|
| URL d'aperçu permanente | `export-design` | URL de téléchargement permanente (sûre à intégrer) |
| Vignette par page (plus stable que la réponse d'autofill, non permanente) | `get-design-thumbnail` | URL de la vignette de page |
| Métadonnées du design uniquement | `get-design` | Titre, propriétaire, nombre de pages, vignette |
| Téléversement depuis le poste du dirigeant | `upload-asset-from-url` | `asset_id` (une URL par appel) |

**Choix du format par canal :**

| Canal | Type | Dimensions |
|---------|------|-----------|
| Instagram fil | `png` | 1080×1080 (carré) |
| Instagram story / couverture Reels | `png` | 1080×1920 |
| Fil Facebook | `png` | 1200×630 |
| En-tête d'email | `png` | 600×200 |

---

## Limites de débit et budget de génération

**Limite stricte :** 100 requêtes par minute et par jeton.

**Coût par design :** ~5 appels d'API — 1 `POST /autofills` + 1 `POST /exports`
+ ~3 tours de sondage (`GET /autofills/{job_id}`, `GET /exports/{job_id}`).
La cadence de sondage doit être de 3 à 5 secondes ; sonder plus vite brûle du
quota sans accélérer l'achèvement.

**Plafond de sécurité :** ~15 à 20 designs par minute laissent une marge
confortable sous le plafond de 100 requêtes/min.

**Rythme recommandé (utilisé à l'étape 3) :**

```
3 candidats par ligne × 1 ligne à la fois × 30 s d'écart entre les lignes
= 6 designs (~30 appels d'API) toutes les 30 secondes
= 12 designs / minute, environ la moitié du plafond
```

**Formule de budget préalable :**

```
total_designs = (lignes Canva) × (candidats par ligne, défaut 3)
total_api_calls ≈ total_designs × 5
generation_time ≈ (total_designs / 12) minutes
```

**Schéma de repli sur `RATE_LIMIT_EXCEEDED` :**

1. Premier cas dans une session → attendre 60 s, rejouer ce seul candidat.
   Traiter l'erreur comme un pic transitoire.
2. Deuxième cas dans la même session, ou toute erreur `quota_exceeded` / de
   plafond quotidien → arrêter la génération et présenter la progression au
   dirigeant. Ne pas réessayer. Le skill demande au dirigeant s'il préfère
   (a) passer à 1 candidat par ligne restante, (b) faire une pause et reprendre
   dans 60 minutes, ou (c) s'arrêter et passer aux textes avec ce qui est déjà
   généré.

---

## Codes d'erreur

| Code | Signification | Action |
|------|---------|-----------|
| `PERMISSION_DENIED` | Portée manquante ou palier incorrect | Vérifier le palier ; demander à l'utilisateur de reconnecter Canva avec les bonnes portées |
| `DESIGN_NOT_FOUND` | Mauvais ID de design | Relister les designs et confirmer l'ID |
| `AUTOFILL_FIELD_NOT_FOUND` | Nom de champ du template incohérent | Appeler `GET /brand-templates/{id}` et relire `dataset[].label` |
| `RATE_LIMIT_EXCEEDED` | Trop de requêtes | Premier cas : attendre 60 s, réessayer une fois. Second cas : arrêter et demander au dirigeant (voir Limites de débit ci-dessus) |
| `JOB_FAILED` | Job asynchrone en échec | Vérifier `job.error.message` ; cause fréquente : un asset trop volumineux |