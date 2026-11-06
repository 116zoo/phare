# Liste de contrôle de l'audit

Tout ce qu'il faut vérifier lors d'une exploration, et comment classer ce qui en ressort.

Cela fonctionne sur n'importe quel site public, sans connecteur. Récupère les pages, lis le HTML et consigne ce qui s'y trouve.

---

## Ce qu'il faut récupérer

| Cible | Pourquoi |
|---|---|
| Page d'accueil | Titres, promesses principales, données structurées, navigation |
| Chaque page de service ou de catégorie | Les pages qui doivent se positionner sur ce que les clients cherchent |
| Pages de localisation | La recherche locale dépend de leur existence et de leur singularité |
| Contact et à propos | Où vivent les horaires, l'adresse, la zone d'intervention et les références |
| Blog ou ressources, publications récentes | Si le contenu est à jour et s'il répond à de vraies questions |
| `/robots.txt` | Les règles pour les robots, y compris les robots d'IA |
| `/sitemap.xml` | Si les pages sont découvrables, tout simplement |
| `/llms.txt` | Généralement absent — c'est un constat |

Nomme tout ce qui est injoignable. Une 404 sur une page liée depuis le menu principal est un constat à elle seule.

---

## Vérifications techniques

| Contrôle | À quoi ressemble la réussite |
|---|---|
| Règles robots | Aucune interdiction globale qui bloquerait par mégarde les robots de recherche ou d'IA |
| Sitemap | Présent, à jour, listant de vraies URL, référencé dans robots.txt |
| HTTPS | Tout le site, aucun contenu mixte |
| Affichage sans JavaScript | Contenu principal présent dans la réponse HTML brute |
| Balises canoniques | Une par page, pointant sur elle-même sauf consolidation volontaire |
| Affichage mobile | Lisible et tactile à la largeur d'un téléphone |
| Vitesse des pages | Contenu principal visible en quelques secondes sur une connexion normale |
| Liens cassés | Aucun dans la navigation principale ni sur les pages qui rapportent |
| Contenu dupliqué | Pas le même paragraphe sur dix pages de localisation avec la ville échangée |

---

## Vérifications par page

| Contrôle | À quoi ressemble la réussite |
|---|---|
| Balise title | Présente, unique, sous environ 60 caractères, dit ce qu'est la page |
| Meta description | Présente, unique, sous environ 155 caractères, semble écrite par un humain |
| H1 | Exactement une, conforme au sujet de la page |
| Ordre des titres | H2 et H3 dans un imbrication logique, pas choisis pour leur apparence |
| Texte alternatif des images | Descriptif de l'image, pas une liste de mots-clés |
| Liens internes | Pages qui rapportent accessibles en deux clics depuis la page d'accueil |
| Nombre de mots | Assez pour répondre à la question. Aucun chiffre cible — le maigre est un symptôme, pas la maladie |
| Coordonnées | Nom, adresse et téléphone identiques sur toutes les pages |

---

## Vérifications du contenu

- Chaque page répond-elle à une question qu'un client taperait ou poserait tout haut ?
- Les informations dont un client a besoin — fourchette de prix, zone d'intervention, horaires, ce qui est inclus — sont-elles énoncées clairement, ou noyées dans de la prose marketing ?
- Quelque chose est-il contredit ailleurs sur le site ? Deux numéros de téléphone différents, c'est fréquent et coûteux.
- Quelque chose est-il périmé ? Les prix, le personnel, les zones d'intervention, l'année de copyright.
- Existe-t-il une page pour chaque prestation réelle, ou une seule page qui liste tout ?

---

## Vérifications hors site

| Source | Pourquoi c'est important |
|---|---|
| Google Business Profile | Revendiqué, complet, horaires corrects, catégories justes |
| Annuaires du secteur | Des fiches propres au métier que lisent à la fois les assistants et la recherche |
| Plateformes d'avis | Présence et fraîcheur, pas seulement le nombre d'étoiles |
| Citations locales | Nom, adresse et téléphone identiques à ceux du site |

Des informations qui ne correspondent pas d'une fiche à l'autre sont l'une des causes les plus fréquentes d'une entreprise décrite de travers, à la fois par la recherche et par les assistants.

---

## Notation

Note chaque constat sur deux axes. Classe d'abord par impact.

| Impact | Signification |
|---|---|
| Élevé | Bloque totalement la découverte, ou affirme quelque chose de faux sur l'entreprise |
| Moyen | Réduit la performance d'une page ou la précision avec laquelle elle est comprise |
| Faible | Amélioration réelle, sans urgence |

| Effort | Signification |
|---|---|
| Petit | Un fichier, un champ, moins d'une heure |
| Moyen | Une réécriture de page ou un lot de modifications |
| Grand | Structurel — nouvelles pages, changement de gabarit, développeur |

L'ordre habituel, valable pour la plupart des petits sites :

1. Débloquer les robots bloqués par inadvertance — impact élevé, petit effort
2. Corriger le contenu qui ne s'affiche qu'en JavaScript — impact élevé, effort variable
3. Rectifier les faits faux ou contradictoires — impact élevé, petit effort
4. Ajouter les données structurées schema.org — impact élevé, petit effort
5. Publier llms.txt — impact moyen, petit effort
6. Revendiquer et compléter les fiches d'entreprise — impact élevé, effort moyen
7. Corriger les titres et meta descriptions — impact moyen, petit effort
8. Réécrire les contenus maigres ou qui ne répondent à rien — impact élevé, grand effort

---

## Rédiger le rapport d'audit

Cinq constats dans le corps. Tout le reste en annexe.

```
Okonkwo Mechanical — Audit de visibilité dans la recherche et l'IA
Exploré le 2026-07-27 · 14 pages · okonkwomechanical.com

En une phrase : le site se lit très bien pour les humains, mais les robots d'IA
sont bloqués par une ligne de robots.txt et il n'y a aucune donnée structurée
nulle part, donc les assistants ne peuvent confirmer aucun fait de base sur
l'entreprise.

Corrige ces cinq points, dans cet ordre :

1. robots.txt bloque GPTBot et ClaudeBot         Impact élevé · 10 minutes
2. Aucun balisage schema.org sur les pages       Impact élevé · 1 heure
3. Zone d'intervention « tri-state », sans villes Impact élevé · 30 minutes
4. Horaires du Google Business Profile faux      Impact élevé · 15 minutes
5. Aucun llms.txt                                Impact moyen · 20 minutes

Neuf autres constats en annexe, aucun urgent.

Ce que je n'ai pas pu vérifier : le portail client à /account est derrière une
connexion.
```

**Aucun score global.** Un nombre unique invite à la comparaison avec le numéro d'un concurrent qui n'existe pas, et masque la correction qui compte.