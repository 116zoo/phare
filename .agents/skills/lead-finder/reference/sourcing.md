# Sourcer des sosies

Deux chemins. Apollo quand il est connecté, la recherche web quand il ne l'est pas. Les deux produisent une vraie liste.

---

## Avec Apollo

Le chemin principal. Filtre sur les dimensions du profil, puis récupère les contacts et les signaux dans la même passe.

Filtres utiles, par ordre approximatif de valeur pour ce segment :

- Secteur d'activité et sous-secteur
- Tranche d'effectif
- Rayon géographique autour du dirigeant
- Technologies utilisées, quand elles indiquent une adéquation
- Activité de recrutement récente
- Financement ou changement de propriétaire

Récupère les contacts par fonction plutôt que par nom. Pour des cibles SMB, les fonctions de décideur qui méritent une recherche sont : dirigeant, président, directeur général, directeur des opérations et responsable des services généraux. Les intitulés varient énormément d'un métier à l'autre — regarde comment les contacts existants du dirigeant sont nommés, et cherche sur ces intitulés-là.

**Clay** est un pair d'Apollo (`../../../shared/connector-neutrality.md`) : c'est celui qui est connecté qui lance la recherche. Même approche, outil différent — `find-and-enrich-company` pour les entreprises sosies, `find-and-enrich-contacts-at-company` pour les personnes. Les deux sont facturés à l'usage ; annonce les crédits estimés avant de lancer la recherche.

---

## Sans Apollo — recherche web

Plus lente, plus courte, et souvent de meilleure qualité ligne par ligne parce que chaque entreprise a réellement été regardée. Ne traite pas cela comme un résultat dégradé.

### Sources générales

- Annuaires des membres d'associations professionnelles — généralement la meilleure source
- Registres d'entreprises et de licences départementaux
- Listes de membres de chambres de commerce
- Plateformes d'avis, filtrées par catégorie et par géographie
- Recherche d'entreprises sur LinkedIn
- Actualités locales : expansions, ouvertures et distinctions

### Par secteur

| Secteur | Où se trouve la liste |
|---|---|
| Métiers manuels et bâtiment | Bases de données de licences d'artisan, dépôts de permis, fichiers des associations d'entrepreneurs |
| Santé | Annuaires des professionnels de santé départementaux, listes des associations de praticiens, registres d'autorisation d'établissement |
| Restauration et commerce de détail | Bases de données des contrôles sanitaires, annuaires des plateformes de livraison, annuaires de centres commerciaux et de quartiers |
| Services aux entreprises | Annuaires des ordres professionnels et des associations d'experts-comptables, palmarès du secteur |
| Industrie | Annuaires de fournisseurs, listes d'exposants de salons, registres sectoriels |
| Organisations à but non lucratif | Bases de données de financeurs, registres associatifs départementaux, déclarations fiscales des fondations |
| Gestion d'immeubles | Registres fonciers, fichiers des associations de copropriétaires, sites d'annonces |

**Les dépôts de permis et de licences sont la source la plus sous-estimée pour les métiers manuels.** Ils sont publics, datés, et un dépôt constitue en soi un signal d'achat.

### Trouver des contacts sans fournisseur de données

- Pages « équipe » et « à propos » du site de l'entreprise
- Documents publics qui nomment les dirigeants
- Listes de membres d'associations, qui contiennent souvent un contact nommé
- Réponses aux avis, souvent signées du dirigeant

Quand un contact ne peut pas être trouvé, garde l'entreprise et marque le contact comme inconnu. Ne supprime pas une entreprise qui correspond bien parce que le nom manque — le dirigeant la connaît peut-être déjà.

---

## Combien de lignes

Vise 40 à 60 entreprises.

Une extraction de cinq cents lignes a l'air impressive et finit ignorée, parce que le dirigeant ne sait pas par lesquelles commencer et que l'effort pour le découvrir dépasse l'effort du processus manuel initial. Quarante lignes recherchées, chacune avec une raison, sont travaillées.

Si le profil est réellement étroit et qu'il n'existe que 12 entreprises, livre 12 et dis-le. Une liste courte et honnête va très bien. La gonfler avec des correspondances médiocres pour atteindre un nombre détruit le classement — qui est l'intégralité de la valeur du livrable.

---

## Vérification

Avant qu'une ligne n'aille sur la liste, confirme que l'entreprise existe toujours et qu'elle correspond toujours. Les annuaires vieillissent, les entreprises ferment, et une liste truffée d'entreprises mortes est abandonnée après le troisième retour.

Vérifie que le site web répond et que l'entreprise a l'air active. C'est rapide, et c'est la différence entre une liste qui sera travaillée et une liste qui sera supprimée.