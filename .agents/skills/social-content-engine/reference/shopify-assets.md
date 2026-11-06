# Données produit Shopify vers le contenu

Quand Shopify est connecté, les photos produit, les titres, les descriptions et
les prix arrivent directement dans les champs de design et dans les textes. Cela
supprime les deux étapes où les dirigeants lâchent prise : chercher une photo, et
ressaisir un prix qu'ils recopient ensuite de travers.

---

## Ce qu'il faut récupérer

Lis les produits et leurs variantes. Les champs qui comptent :

| Champ Shopify | Usage |
|---|---|
| `title` | Emplacement du titre, sujet du texte |
| `body_html` | Source de la ligne « bénéfice » — retirer les balises, jamais coller le HTML brut |
| `images[].src` | Emplacements d'image du design |
| `variants[].price` | Prix dans le texte ou dans un emplacement prix |
| `variants[].compare_at_price` | Seule source d'une mention « avant / maintenant » |
| `variants[].inventory_quantity` | Le mettre ou non en avant |
| `tags`, `product_type` | Regrouper les produits par thème |

---

## Transformer un produit en post

1. **Choisis les produits qui méritent un post.** Écarte tout produit en rupture
   ou dont le stock est trop juste pour couvrir la période de publication. Un
   produit en rupture mis en avant un mardi devient une réclamation client le
   mercredi.
2. **Fais entrer l'image dans Canva.** Téléverse depuis l'URL d'image Shopify,
   sonde le job de téléversement jusqu'au succès, et note l'ID d'asset renvoyé.
   Cet ID est la seule valeur qu'un champ image d'autofill accepte.
3. **Écris la ligne « bénéfice » à partir de la description, pas avec elle.** Les
   descriptions produit sont écrites pour une fiche produit, pas pour un fil.
   Extraire l'élément concret et laisser le reste.
4. **Reporter le prix tel quel.** Copie le chiffre depuis la réponse de l'API. Ne
   pas l'arrondir, ne pas le convertir, ne pas déduire un prix de vente.

---

## Règles de prix et de mentions

Un prix erroné dans un post public est l'erreur la plus coûteuse que ce skill
puisse commettre. Le dirigeant ne peut plus la corriger discrètement une fois que
cent personnes l'ont vue.

- Ne cite que les prix que le connecteur a réellement renvoyés.
- Ne dis « avant X, maintenant Y » que si `compare_at_price` existe et dépasse
  `price`. Ne calcule jamais un pourcentage de remise que Shopify n'a pas
  sous-entendu.
- N'écris jamais « stock limité » ou « bientôt épuisé » si le chiffre de stock ne
  le justifie pas.
- S'il manque un prix, dis-le et demande. Ne te rabats pas sur le dernier prix vu
  lors d'une session précédente — les prix changent et le calendrier vit
  longtemps.

---

## Plusieurs produits dans un même design

Les grilles produit et les carrousels ont un emplacement d'image par produit.
Énumère-les individuellement et associe chacun à un produit précis avant de
générer :

```
Emplacement Product1_Image → « Split mini 18 kBTU »  → asset_id confirmé
Emplacement Product2_Image → « Thermostat connecté » → asset_id confirmé
Emplacement Product3_Image → —                       → MANQUANT, demander au dirigeant
```

Ne remplis jamais un emplacement avec une photo répétée sans demander. Trois
vignettes identiques dans une grille « trois produits » se lisent comme une
erreur, parce que c'en est une.

---

## Sans Shopify

Le repli, c'est le dossier photo du dirigeant plus ce qu'indique le brief. C'est
un chemin complet — il coûte simplement un téléversement et un prix saisi à la
main, et ce prix doit ensuite être confirmé à voix haute avant toute publication.