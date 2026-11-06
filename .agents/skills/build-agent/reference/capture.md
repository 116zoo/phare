# Capturer la tâche

L'objectif est d'obtenir une image complète sans faire un interrogatoire. Si cela
ressemble au remplissage d'un formulaire, les dirigeants abandonnent en chemin.

---

## Cas idéal : ils viennent de la faire

Si la tâche a été déroulée dans cette conversation, la trace est la
spécification. Ne repars pas de zéro avec des questions.

Extrais :

- **La séquence** — ce qui s'est passé, dans quel ordre
- **Les sources** — chaque fichier, système ou endroit d'où viennent les données
- **Les décisions** — chaque point où un jugement a été exercé
- **Les corrections** — partout où le dirigeant a dit « non, en fait »

**Les corrections sont la partie la plus précieuse.** Elles encodent des règles
que le dirigeant n'aurait jamais pensé à formuler, parce que pour lui c'est
évident. « Non, saute tout ce qui est sous 50 € » est une règle métier qui
n'aurait ressorti dans aucune interview.

Confirme ensuite la forme en une passe plutôt qu'en plusieurs :

```
Voici ce que je crois comprendre :

  1. Récupérer le fichier de commissions de la compagnie depuis l'e-mail mensuel
  2. Rapprocher chaque ligne de ce qui est enregistré dans le CRM
  3. Signaler tout écart supérieur à 5 €
  4. Rédiger un e-mail de relance par écart, un par compagnie
  5. Tu relis et tu envoies

Règles que j'ai relevées : sauter tout ce qui est sous 50 €. Au-delà de 500 €, tu
veux y regarder toi-même avant que ça soit relancé.

C'est ça ?
```

Un bloc, une question.

---

## Sinon : demander sur la dernière fois

Une description abstraite produit un skill abstrait. Ancre-toi sur un cas concret :

```
Reprends-moi la dernière fois que tu as fait ça. Qu'as-tu ouvert en premier ?
```

Suis ensuite la séquence réelle. Demande ce qui s'est passé ensuite, pas ce qui
arrive d'habitude.

Les questions qui produisent les réponses les plus utiles :

- Qu'as-tu ouvert en premier ?
- D'où venait ce chiffre ?
- Qu'est-ce qui te ferait t'arrêter et réfléchir ici ?
- Qu'est-ce qui a mal tourné la dernière fois que ça s'est mal passé ?
- Qu'est-ce que tu ne voudrais jamais voir faire tout seul à ça ?

**Les deux dernières comptent le plus.** Le mode de défaillance et la limite
dure sont ce qui transforme une automatisation fragile en une automatisation que
le dirigeant laissera tourner sans surveillance.

---

## Ce qu'il faut capturer, liste de contrôle

```
Tâche :        <ce que le dirigeant appelle cela>
Déclencheur :  <ce qui le lui fait faire — une date, un e-mail, une demande>
Fréquence :    <hebdomadaire, mensuelle, ponctuelle>
Sources :      <tous les systèmes, fichiers ou boîtes mail concernés>
Séquence :     <les étapes, dans l'ordre>
Règles :       <seuils, exclusions, exceptions>
Jugement :     <où il décide, pas le processus>
Sortie :       <ce qui existe à la fin, et qui le voit>
Jamais :       <ce qu'il ne doit jamais faire seul>
Temps :        <combien de temps cela prend à la main — c'est le chiffre du ROI>
```

La ligne Temps mérite qu'on la demande explicitement. « Deux heures chaque lundi »
est ce que le dirigeant répétera quand on lui demandera si ça en valait la peine —
ce chiffre mérite d'être conservé.

---

## Combien de questions poser

Trois à cinq questions, au maximum, avant de montrer un brouillon.

Un dirigeant qui voulait gagner deux heures par semaine ne consacrera pas
quarante minutes à spécifier un skill. Va vite au brouillon — un brouillon faux
est plus facile à corriger qu'une page blanche, et la correction fournit plus
d'information que la question n'en aurait donné.

```
J'ai assez pour construire une première version. Je te fais un brouillon et tu
me dis ce qui ne va pas — plus rapide que moi qui devine avec encore plus de
questions.
```

---

## Quand la tâche est trop grosse

Certaines tâches décrites sont en réalité quatre tâches. « Gérer toute ma clôture
de mois » n'est pas un seul skill.

Dis-le, et propose le découpage :

```
Cela fait en réalité trois choses : rapprocher les comptes, relancer les manques
et rédiger la synthèse. Construire ça comme un seul skill veut dire qu'il casse
de façon difficile à diagnostiquer.

On commence par le rapprochement ? C'est la partie qui prend le plus de temps, et
les deux autres deviennent plus faciles une fois qu'elle existe.
```

Commence par la pièce qui prend le plus de temps à la main. L'élan compte plus
que l'exhaustivité ici — un dirigeant qui a un skill qui fonctionne en construit
trois autres.

---

## Quand la tâche ne devrait pas être un skill

Parfois la réponse honnête, c'est qu'un skill livré couvre déjà le besoin, ou que
la tâche varie trop pour être automatisée.

Dis-le franchement :

```
C'est proche de ce que fait déjà `invoice-chase`. Veux-tu que je regarde si ça
couvre ton cas avant qu'on construise autre chose ?
```

Ou :

```
Chacun de ces cas semble se passer différemment. Je pourrais construire quelque
chose qui gère la forme courante, mais tu devrais quand même relire chacun — ce
qui représente l'essentiel du travail. Ça en vaut la peine, ou une liste de
contrôle te servirait davantage ?
```

Construire un skill inutile coûte au dirigeant sa confiance quand il échoue, et
encombre le routeur pour toutes les demandes futures.