# Gabarit de sortie

Résumé dans le chat d'abord, XLSX ensuite, écriture dans le CRM seulement après approbation.

---

## Résumé dans le chat

```
## Liste de prospects — <nombre> entreprises

<Une phrase sur ce que le profil a finalement donné.>

### Commence par celles-ci

1. **<Entreprise>** — <taille, localisation> · <le signal, avec sa date et sa source>
   <Nom du contact, fonction, comment le joindre>
2. ...

<Jusqu'à 10.>

### À propos de cette liste

Construite à partir de <n> de tes clients. Profil : <une ligne>.
Sourcée via <Apollo | recherche web>. <nombre> entreprises atteignaient le
seuil ; <n> autres ont été trouvées et écartées pour une adéquation trop faible.

<Liste complète jointe en XLSX avec toutes les colonnes.>
```

Dix dans le chat, c'est le bon nombre. C'est ce qu'un dirigeant va réellement lire avant de décider si la liste vaut quelque chose.

---

## Exemple travaillé

```
## Liste de prospects — 47 entreprises

Vos meilleurs clients sont des gestionnaires d'immeubles commerciaux de 3 à
15 bâtiments dans un rayon de 40 km, arrivés par recommandation — pas les
interventions d'urgence résidentielles qui font l'essentiel de votre volume.

### Commence par celles-ci

1. **Ridgeline Property Group** — 6 bâtiments, 30 km · Dépôt de permis pour un
   7e le 14 mars (registre départemental). Le prestataire CVC actuel a trois
   avis de 2 étoiles ce trimestre.
   Dana Whitfield, directrice des services généraux · ligne directe vérifiée

2. **Corwin & Bay Management** — 9 bâtiments, 18 km · Recrute un Facilities
   Manager, publié le 2 avril. Partage un locataire avec votre client Alder
   Street Partners — introduction Warm possible.
   Marcus Ilo, directeur des opérations · email inféré, non vérifié

3. **Fairmount Commercial** — 4 bâtiments, 37 km · Ouverture de son deuxième
   site en février.
   Contact inconnu — uniquement la ligne générale

### À propos de cette liste

Construite à partir de 340 de vos clients. Profil : gestionnaires d'immeubles
commerciaux, 3–15 bâtiments, dans un rayon de 40 km, arrivées par recommandation,
premier contrat de maintenance.
Sourcée via recherche web (Apollo non connecté) — dépôts de permis
départementaux, fichier de l'association de gestionnaires d'immeubles et
plateformes d'avis.
47 entreprises atteignaient le seuil ; 61 autres ont été trouvées et écartées
pour une adéquation trop faible.

Liste complète jointe en XLSX.
```

Note la ligne 3. Contact inconnu, conservée quand même, marquée honnêtement. Le dirigeant les connaît peut-être déjà.

---

## Colonnes du XLSX

Dans cet ordre. Les six premières sont celles qui servent ; le reste est de la preuve.

| Colonne | Notes |
|---|---|
| `Rank` | 1 à n |
| `Company` | |
| `Why now` | Le signal, en une phrase, avec sa date |
| `Contact` | Nom et fonction, ou « inconnu » |
| `Contact route` | Email, téléphone, ou le chemin pour en trouver un |
| `Contact confidence` | `verified` · `inferred` · `unknown` |
| `Fit score` | 0–10 |
| `Signal score` | 0–10 |
| `Reachability score` | 0–10 |
| `Total score` | |
| `Size` | Effectif, sites, ou tranche de chiffre d'affaires |
| `Location` | Ville et distance par rapport au dirigeant |
| `Signal source` | D'où vient le déclencheur, avec un lien s'il existe |
| `Warm path` | Client en commun ou relation, s'il y en a une |
| `Notes` | Tout ce qui ne rentre pas ci-dessus |

Fige la ligne d'en-tête. Trie par score total décroissant. Formate les scores en nombres, pas en texte.

---

## L'écriture dans le CRM

Seulement après un oui explicite, et seulement après avoir dit exactement ce qui va se passer :

```
Prêt à ajouter dans HubSpot : 47 entreprises et 39 contacts, étiquetés
"prospect-list-2026-07". Rien d'existant n'est modifié. Dis « go » et je les crée.
```

Nomme l'étiquette. Confirme que rien d'existant n'est touché. Un mauvais import en masse demande des heures à défaire, et le dirigeant n'a aucun moyen de le prévisualiser lui-même.

S'il refuse, le XLSX est le livrable. C'est un résultat complet, pas un résultat partiel.

---

## La confiance du contact n'est pas optionnelle

Chaque ligne de contact porte son niveau de confiance.

- **`verified`** — l'adresse ou le numéro provient d'une source qui le confirme
- **`inferred`** — construit d'après un schéma, par exemple un format d'adresse standard
- **`unknown`** — aucun moyen de contact trouvé

Envoyer en volume à des adresses inférées, c'est ainsi qu'un domaine se fait signaler comme spam. Ce dégât dure des mois et il touche aussi l'email du dirigeant vers ses vrais clients. Marque-le pour que l'étape de prospection puisse le traiter différemment.