# Rafraîchissement du catalogue

La passe produits en masse pour les boutiques. Note chaque produit, réécris les pires, applique par lots approuvés.

Shopify et Wix sont les chemins connectés. Wix expose une API de site complète en lecture/écriture, donc un rafraîchissement en masse du catalogue et du site s'applique directement là-bas, exactement comme sur Shopify — la notation, l'ordre par chiffre d'affaires et les garde-fous par lot ci-dessous sont identiques sur les deux.

Sans l'un ni l'autre, travaille à partir d'un export CSV de produits et rends un CSV corrigé pour import — la notation et la réécriture sont encore une fois identiques.

---

## Ce qui est noté

Quatre champs par produit, chacun réussi ou échoué avec un motif.

| Champ | Réussi quand |
|---|---|
| Titre | Dit ce qu'est le produit en termes simples. Ni un simple SKU, ni un tas de mots-clés. Sous environ 70 caractères |
| Description | Répond à ce qu'est le produit, à ce qu'il s'adapte à, à ce qui est inclus et à ce qui le distingue. Au moins quelques vraies phrases |
| Texte alternatif des images | Présent sur chaque image et descriptif de l'image. Pas le titre du produit recopié |
| Titre et description SEO | Présents, uniques, sous les limites de longueur, distincts du titre du produit |

Un cinquième contrôle qui vaut la peine d'être lancé : **des descriptions dupliquées**. Les boutiques ont régulièrement le même paragraphe sur quarante produits. Signale les groupes.

---

## La passe de notation

Lance-la sur tout le catalogue d'abord, avant d'écrire quoi que ce soit. Le dirigeant a besoin de voir l'ampleur du problème.

```
Analyse du catalogue — 412 produits

Description SEO manquante            318   77 %
Texte alternatif manquant ou dupliqué  287   70 %
Description sous 40 mots              201   49 %
Texte de description dupliqué          94   23 %  (11 groupes)
Titre réduit à un simple SKU           38    9 %

Entièrement complet                    41   10 %

Les 25 pires par chiffre d'affaires : 19 n'ont aucun champ SEO et 22 n'ont
aucun texte alternatif. Ce sont ceux-là qui perdent de l'argent, donc ils
passent en premier.
```

**Classe par chiffre d'affaires, pas par note.** Corriger un produit qui vend une unité par an est une perte de temps pour l'attention du dirigeant. Trie par unités vendues ou par chiffre d'affaires sur les 90 derniers jours et commence par le haut. Dis-le : c'est ce que tu fais.

---

## La réécriture

Lis [le profil de voix partagé](../../../shared/voice-profile.md). Le texte produit porte la voix de la boutique autant que l'e-mail.

**Titres.** Ce que c'est, puis le détail qui distingue. Marque, modèle, dimensions et matière quand elles comptent pour l'acheteur.

```
Mauvais : HVAC-FLT-2025-B
Mauvais : Meilleur filtre à air premium haute qualité pour chaudière et clim HVAC MERV 13 pas cher
Bon :     Filtre à plis MERV 13 pour chaudière — 20x25x1, lot de 6
```

**Descriptions.** La première phrase dit ce que c'est et à qui ça s'adresse. Puis les détails — dimensions, compatibilité, contenu du colis, durée de vie. Puis tout ce qui distingue réellement le produit.

```
Filtre à plis MERV 13 pour chaudières standard 20x25x1 et retours de clim.
Capture le pollen, la poussière, les squames d'animaux et les particules de
fumée jusqu'à 0,3 micron — la granulométrie que cherchent les personnes
allergiques. Six filtres, environ un an de couverture avec le changement
recommandé tous les 60 jours. Convient à la plupart des systèmes résidentiels
fabriqués après 1995 ; mesure ton filtre actuel avant de commander.
```

**Texte alternatif.** Décris l'image, pour quelqu'un qui ne peut pas la voir. C'est d'abord une exigence d'accessibilité, et ensuite un bénéfice pour la recherche.

```
Mauvais : acheter filtre MERV 13 en ligne meilleur prix
Bon :     Filtre à plis blanc pour chaudière, vue de face, montrant les
          dimensions 20x25x1 imprimées sur le cadre en carton
```

**N'invente jamais de faits sur un produit.** Dimensions, matières, compatibilité, certifications et pays d'origine viennent des données produit existantes ou du dirigeant. Quand elles manquent, écris autour et signale-le — « liste de compatibilité nécessaire pour 14 produits » — plutôt que de deviner. Une indication de compatibilité erronée génère des retours.

---

## Approbation par lot

**Des lots de 20 à 25. Chaque lot obtient son propre oui.** Un motif de réécriture qui semblait correct sur trois échantillons et qui est faux sur 400 produits, c'est un très long après-midi d'annulation.

Avant le premier lot, montre trois exemples complets avant/après et fais valider le motif. Ajuster l'approche sur trois produits ne coûte rien.

```
Lot 3 sur 17 — produits 51-75, classés par chiffre d'affaires sur 90 jours

Modifié :     25 titres, 25 descriptions, 61 textes alternatifs, 25 descriptions SEO
Exemple :     <3 paires complètes avant/après>
Non touché :  prix, stock, variantes, collections, statut de publication
Réversible :  Oui — valeurs d'origine sauvegardées dans catalog-backup-2026-07-27.csv

Appliquer ces 25 ?
```

Les règles qui gardent cela sûr :

- **Sauvegarde les originaux avant la première écriture.** Un CSV des valeurs actuelles, toujours, sans exception.
- **Ne touche jamais au prix, au stock, aux variantes ni au statut de publication.** Ce skill modifie la façon dont les produits sont décrits. Rien d'autre.
- **Arrête-toi à la première surprise.** Si une écriture échoue ou si un champ revient différent de ce qui a été envoyé, arrête l'exécution et fais un rapport au lieu de continuer sur les lots restants.
- **Rends compte par lot.** Appliqués, ignorés, échoués, avec les noms de produits.

---

## Données structurées pour les produits

Une fois les descriptions nettoyées, ajoute le schema `Product` avec `Offer`. La plupart des plateformes de boutique le génèrent — vérifie ce qui existe déjà avant d'ajouter un second bloc, contradictoire.

Ne balise que ce qui est vrai et visible : prix, disponibilité, marque, SKU et notes qui proviennent de vrais avis affichés sur la page.

---

## Sans Shopify ni Wix

Demande l'export de produits — la plupart des plateformes en ont un — et renvoie un fichier corrigé pour import.

Dis clairement la marche à suivre : « Exporte tes produits en CSV, envoie-moi le fichier et je te renvoie une version avec les titres, les descriptions, les textes alternatifs et les champs SEO réécrits. Tu l'importes et tu vérifies les premiers avant de le laisser tourner. »

Même notation, même ordre par chiffre d'affaires, même découpage par lots à la relecture. La seule différence, c'est que le dirigeant clique sur importer.