# Règles d'anomalies

Chaque contrôle, le moment où il se déclenche, et les mots à employer. Tous lèvent un
signalement auprès du dirigeant. **Aucun d'eux ne corrige quoi que ce soit.**

---

## Pourquoi les signalements ne se corrigent jamais seuls

Un badge de sortie oublié a exactement une seule bonne réponse, et elle se trouve chez
le salarié et chez le dirigeant. Un système qui complète par 17 h 00 parce que c'est
l'heure habituelle produit un bulletin de paie qui paraît parfaitement normal et qui est
faux. Personne ne le remarque, car le rapport affiche une journée propre de 8 heures.

Signaler coûte dix secondes au dirigeant. Deviner coûte à quelqu'un son juste paie et
coûte au dirigeant la confiance de toute l'équipe dans le système.

---

## Les contrôles

### Pointages manquants ou incohérents

- **Badge d'entrée, pas de badge de sortie.** Heures inconnues pour ce poste. Se déclenche toujours.
- **Badge de sortie, pas de badge d'entrée.** Même traitement.
- **Poste de durée nulle.** Entrée et sortie à quelques minutes d'intervalle. C'est le plus souvent un double badgeage ; la question est quand même posée.
- **Postes qui se chevauchent pour une même personne.** Deux saisies qui couvrent la même plage horaire. Jamais fusionnés.

> Marcus, jeudi 12/03 : badge à l'entrée à 6 h 40, aucun badge de sortie. Heures inconnues. Qu'a-t-il fait ?

### Anomalies d'heures

- **Heures supplémentaires au-delà du profil habituel de la personne** — se déclenche au-delà de 125 % de sa moyenne glissante sur les 4 dernières périodes, ou pour toute heure supplémentaire chez quelqu'un qui n'en fait d'habitude pas.
- **Total d'heures supérieur au planning** de plus de 10 %, lorsqu'un planning existe.
- **Zéro heure pour quelqu'un qui travaille d'habitude.** Souvent une feuille d'heures manquante, parfois une rupture de contrat passée sous silence.
- **Plus de 16 heures sur une journée.** Presque toujours une erreur de pointage, parfois réel.
- **Tout poste unique de plus de 12 heures — se déclenche dès la première exécution, sans aucun historique.**
  Chaque autre contrôle d'heures a besoin d'une référence, d'un planning ou d'une politique
  affichée pour pouvoir être comparé ; lors d'une première exécution, ils restent donc tous
  muets et un poste de 19 heures passe droit vers un bulletin de paie. Celui-ci n'a besoin de
  rien de tout cela. Douze heures, c'est assez long pour mériter une phrase même si le poste
  s'avère réel, et c'est la règle qui attrape le badge de sortie oublié qu'aucune autre règle
  ne voit encore.

  > Marcus affiche un poste de 19 heures mardi, de 5 h 10 à 0 h 20. C'est ta première
  > exécution, je n'ai donc rien pour le comparer — vraie journée longue, ou un pointage
  > qu'il a oublié de clôturer ?
- **Sept jours consécutifs travaillés** — compte pour la fatigue et, selon la convention applicable, pour la majoration.

> Dee a pointé 14,5 h supplémentaires. Sa moyenne sur quatre périodes est de 2 h. Cela fait
> 12,5 heures au-dessus de la normale, environ 560 € de plus. Réel, ou un problème de pointage ?

### Anomalies de configuration de la paie

- **Taux modifié depuis la dernière exécution.** Se déclenche sur toute variation, à la hausse comme à la baisse, avec les deux taux et la date d'effet.
- **Statut modifié** — de l'horaire au forfait, ou du salarié à l'indépendant.
- **Nouvelle personne sans enregistrement d'embauche.**
- **Personne présente à la dernière exécution mais absente de celle-ci.**
- **Congés pris au-delà du solde disponible.** Le solde est celui de la source de paie (Payfit `get_time_off_balances` ; soldes de politique dans Silae), jamais une estimation tirée de règles de provision.
- **Salarié au forfait avec des heures pointées** qui suggèrent une semaine partielle non payée.

> Le taux de Luis indique 32,00 € sur cette période, 29,50 € sur la précédente. Si cette
> augmentation est réelle, je la retiens. Sinon, c'est 100 € par semaine dont je préfère te
> demander.

### Contrôles croisés

- **Le brut a varié de plus de 10 % par rapport à la période précédente** au niveau de la paie, avec la cause nommée.
- **Des heures de main-d'œuvre qui ne se rapprochent pas des heures par chantier**, lorsque l'entreprise suit la main-d'œuvre par chantier.
- **Un chantier avec de la main-d'œuvre imputée mais sans ordre de travail actif.**

---

## Comment formuler un signalement

Quatre parties, toujours :

1. **Qui** — le nom de la personne
2. **Quand** — la date ou le poste précis
3. **Quoi** — les deux chiffres quand il y en a deux
4. **Ce que ça coûte** — l'impact en euros, quand il peut être calculé honnêtement

Un signalement sans nom ni date est du bruit. Un signalement sans montant est difficile à
prioriser. Un signalement avec un montant inventé est pire que pas de signalement du tout — si
les heures sont inconnues, le coût est inconnu, et c'est cela qu'il faut dire.

---

## Présenter les signalements

Groupe par personne, pas par type de signalement. Le dirigeant pense en personnes : « qu'est-ce
qui se passe avec Marcus », pas « montre-moi tous les pointages manquants ».

Classe les personnes par taille de question ouverte — d'abord les heures inconnues, puis les
écarts de montant importants, puis tout le reste.

Pose chaque question séparément et note la réponse. Tout regrouper dans une seule confirmation
vide l'objectif, parce que le dirigeant va survoler.

---

## Cas limites du calcul des heures supplémentaires

| Situation | Traitement |
|---|---|
| Changement de taux en pleine semaine | La majoration d'heures supplémentaires utilise le taux moyen pondéré de la semaine, sauf indication contraire du dirigeant |
| Deux taux sur une même semaine (atelier vs terrain) | Idem — moyenne pondérée, en précisant les taux retenus |
| Majoration calculée au quotient journalier | La règle du dirigeant prévaut. S'il n'en a formulé aucune, applique les heures supplémentaires hebdomadaires et dis-le explicitement |
| Poste traversant minuit | Les heures appartiennent au jour de début, sauf si la politique du dirigeant diffère |
| Congés payés sur une semaine avec heures supplémentaires | Les congés payés ne comptent généralement pas dans les heures supplémentaires. Énonce l'hypothèse retenue |
| Majoration jours fériés | Uniquement si le dirigeant a une politique écrite. Jamais supposée |

**Chaque fois qu'une règle est supposée plutôt qu'énoncée, précise laquelle a été appliquée.**
Un dirigeant qui voit « heures supplémentaires hebdomadaires appliquées, aucune règle
journalière au dossier » peut corriger en cinq secondes. Un dirigeant qui ne voit qu'un total,
non.