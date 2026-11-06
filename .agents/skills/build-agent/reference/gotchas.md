# Pièges

Les modes de défaillance qui produisent un skill que personne n'utilise, ou qui
fait des dégâts sans surveillance.

---

## Piège : réinterroger sur une tâche qu'il vient de dérouler

**Pourquoi c'est important :** le dirigeant a passé vingt minutes à faire la
tâche avec toi. Commencer par « alors, raconte-moi ton process » revient à dire
qu'aucune de ces vingt minutes n'avait retenu ton attention.

### À éviter

```
Dirigeant : « C'était très bien — tu peux te souvenir de la façon de faire ? »
Claude : « Bien sûr ! Commençons par comprendre ton flux de travail. Quels
           systèmes utilises-tu pour les données de commissions ? »
```

### À faire

```
Claude : « Voici ce que je crois comprendre : [la séquence, les règles tirées des
           corrections]. C'est ça ? »
```

La trace est la spécification. Les corrections sont les règles métier.

---

## Piège : figer l'exemple

**Pourquoi c'est important :** un skill construit autour de mardi dernier ne
fonctionne qu'une fois. Le dirigeant l'exécute le mois suivant, obtient une
absurdité, et ne l'ouvre plus jamais.

### À éviter

```
Récupérer le fichier de commissions de la compagnie Continental pour juin et le
rapprocher des 34 polices enregistrées.
```

### À faire

```
Récupérer le fichier de commissions de la compagnie pour le mois en cours depuis
l'e-mail de relevé.
Rapprocher chaque ligne des polices enregistrées dans le CRM pour la période.
```

Fixe : la séquence, les sources, les règles. Variable : le mois, la compagnie,
les nombres.

---

## Piège : mettre un point de validation à chaque étape

**Pourquoi c'est important :** un skill qui demande neuf fois est plus lent que
de faire la tâche à la main. Le dirigeant cesse de l'utiliser sans arriver à
expliquer pourquoi.

### À éviter

Validation avant de récupérer le fichier, avant le rapprochement, avant le
signalement, avant la rédaction, avant chaque e-mail.

### À faire

Valide les envois et les jugements ambigus. Laisse tourner la lecture, le
rapprochement, le calcul et la rédaction :

```
6 e-mails de relance, un par compagnie, 2 340 € d'écarts, depuis ton adresse.
On les envoie ?
```

Un seul point de validation, au moment qui compte.

---

## Piège : un point de validation vague

**Pourquoi c'est important :** « Prêt à continuer ? » demande au dirigeant
d'approuver quelque chose d'invisible. La première fois que ça dérape, tous les
points de validation du plugin perdent leur crédibilité.

### À éviter

```
J'ai préparé les e-mails. Prêt à continuer ?
```

### À faire

Indique le nombre, les destinataires, les montants et le compte depuis lequel il
envoie. Un consentement n'a de valeur que s'il est éclairé.

---

## Piège : sauter le test

**Pourquoi c'est important :** un dirigeant qui n'a pas vu le skill reproduire
une réponse connue et juste vérifiera sa sortie à la main à chaque fois. Cela ne
fait gagner rien, et il finira par cesser de l'utiliser.

### À éviter

Construire, enregistrer, lui dire que c'est prêt.

### À faire

Passe-le sur le cas qu'il a déroulé, et montre les deux :

```
Je l'ai lancé sur le fichier de juin — celui que tu viens de faire à la main.

J'ai retrouvé les 6 mêmes écarts, les mêmes montants. Il a aussi signalé un 7e
de 61 € sur le fichier Meridian que tu as sauté. Était-ce voulu, ou faut-il
l'ajouter aux règles ?
```

Cette dernière question est ce qui permet au skill de récupérer une règle qui
lui manquait.

---

## Piège : un langage commercial générique

**Pourquoi c'est important :** un skill rédigé dans un vocabulaire que le
dirigeant n'emploie pas donne l'impression d'appartenir à quelqu'un d'autre. Il ne
lui confiera pas un traitement sans surveillance — c'était justement tout l'enjeu.

### À éviter

```
Rapprocher les écarts de comptabilisation des revenus des engagements enregistrés.
```

### À faire

```
Rapprocher le fichier de la compagnie de ce qui est enregistré et signaler tout
écart supérieur à 5 €.
```

---

## Piège : un skill partagé qui envoie

**Pourquoi c'est important :** un skill qui envoie des e-mails à des clients,
exécuté par quelqu'un qui ne l'a pas construit et qui ignore ses hypothèses,
constitue un vrai danger. Le dirigeant qui le partage ne pense pas à ça.

### À éviter

```
Partagé avec ton équipe.
```

### À faire

```
Je le partage avec Teri et Marcus. À savoir : il envoie des e-mails depuis
l'adresse de celui qui l'exécute, et il suppose la règle de non-envoi sous 50 €
que tu as définie.

Je recommande de le passer en brouillon uniquement pour eux — ils reliraient et
enverraient eux-mêmes, au lieu que ça parte tout seul. À toi de voir.
```

---

## Piège : construire un skill qui existe déjà

**Pourquoi c'est important :** un doublon encombr le routeur, concurrence le
skill livré sur les mêmes déclencheurs, et ne sera maintenu par personne.

### À éviter

Construire « relancer les factures impayées » à partir de zéro.

### À faire

```
C'est proche de ce que fait déjà `invoice-chase`. Veux-tu que je vérifie si ça
couvre ton cas avant qu'on construise autre chose ?
```

---

## Piège : un skill qui en cache quatre

**Pourquoi c'est important :** un skill qui couvre tout un processus de fin de
mois casse de façon difficile à isoler, et un skill que le dirigeant ne sait pas
déboguer, il l'abandonne.

### À éviter

Accepter « automatise ma clôture de mois » comme un seul skill.

### À faire

Nomme le découpage et commence par la pièce la plus lourde :

```
Cela fait trois choses : le rapprochement, la relance des manques et la
rédaction de la synthèse.
On commence par le rapprochement ? C'est la partie qui prend le plus de temps, et
les deux autres deviennent plus faciles une fois qu'elle existe.
```

---

## Piège : aucun repli

**Pourquoi c'est important :** un skill qui exige un connecteur auquel le
dirigeant risque de perdre l'accès casse en silence. Cette audience change
d'outils sans cesse.

### À éviter

Le skill suppose que le connecteur vers le portail de la compagnie existe.

### À faire

```
Pas de connecteur pour ton portail de la compagnie. Transfère-moi le relevé
mensuel et je fais le reste — même sortie, une étape en plus.
```