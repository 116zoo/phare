---
name: build-agent
description: >
  Transforme une tâche que le dirigeant refait à la main en un skill nommé et
  réutilisable, qu'il peut déclencher par son nom ou placer sur une
  planification. Détermine ce qui varie et ce qui reste fixe, écrit le skill avec
  des points de validation aux bons endroits, l'enregistre auprès du routeur, et
  le partage avec l'équipe. À utiliser dès que le dirigeant décrit une
  repetitive dont il voudrait qu'elle soit automatique — « je fais ça chaque
  semaine », « tu te souviens comment faire », « automatise ça pour moi »,
  « transforme ça en workflow », « je veux que ça arrive chaque lundi ». Saisis-le
  quand il décrit une routine, même sans demander d'automatisation.
  [EN] Use whenever the owner describes a repetitive manual task they wish were
  automatic — "I do this every week," "automate this for me," "build me an
  agent," "turn this into a workflow."
allowed-tools: Read, WebFetch
---

> Language rule: see `shared/language.md`.

# Construire un agent

Transforme ce que le dirigeant fait chaque semaine en quelque chose qu'il demande par son nom.

C'est ce qui évite au plugin d'avoir à livrer le workflow de chaque secteur. Aucun catalogue ne peut couvrir la routine de permis d'un entrepreneur de fosses septiques ni le rapprochement des commissions d'une agence d'assurance. Ces dirigeants-là peuvent les construire eux-mêmes.

## Étape 1 — Observer ça se faire, ou l'écouter décrire

Deux points de départ, et le premier est bien meilleur.

**Idéal : il vient de le faire dans cette conversation.** Si le dirigeant a déroulé la tâche avec toi — sorti les fichiers, pris les décisions, corrigé deux fois — cette transcription est la spécification. Extrais-la au lieu de le réinterroger. Les corrections qu'il a faites sont la partie la plus précieuse, parce qu'elles encodent un jugement que le dirigeant n'aurait jamais pensé à formuler.

**Sinon : il la décrit.** Demande-lui de dérouler la dernière fois où il l'a faite, concrètement. Les détails réels battent toujours une description abstraite — « mardi dernier j'ai sorti le fichier assureur, je l'ai rapproché de ce qu'on avait réservé et j'ai relancé six écarts » t'en apprend davantage que « je rapproche les commissions ».

Lis `reference/capture.md` pour obtenir une image complète sans interrogatoire.

## Étape 2 — Séparer ce qui varie de ce qui reste fixe

C'est tout le métier de cette étape. Un skill qui code en dur les détails de mardi dernier ne fonctionne que mardi dernier.

Pour chaque partie de la tâche, décide :

- **Fixe** — la séquence, les sources, le format de sortie, les règles
- **Variable** — les dates, les noms, les montants, quel fichier, quel client
- **Jugement** — les parties où le dirigeant décide, qui deviennent des portes de validation

Les corrections que le dirigeant a faites en déroulant la tâche marquent en général les points de jugement. Quand quelqu'un dit « non, pas celui-là — nous sautons tout ce qui est sous 50 € », c'est une règle. Quand il dit « hmm, ça dépend », c'est une porte de validation.

## Étape 3 — Trouver les portes de validation

Chaque étape qui envoie, dépense, publie ou supprime a besoin d'une porte. Chaque étape où le dirigeant a hésité en a besoin aussi.

Ne mets pas une porte partout — un skill qui demande la permission neuf fois est pire que de le faire à la main. Mets une porte sur ce qui est conséquent et ce qui est ambigu, et laisse le reste tourner.

Lis `reference/skill_authoring.md` pour savoir où placer les portes et comment les formuler.

## Étape 4 — L'écrire

Produis un vrai skill dans la même forme que tout le reste de ce plugin : un `SKILL.md` avec frontmatter et étapes numérotées, plus un dossier `reference/` si le détail le justifie.

Exigences qu'il doit remplir, comme tout skill livré :

- Le nom et le dossier correspondent, en minuscules avec des tirets
- La description dit ce qu'il fait **et** quand le déclencher, à la troisième personne
- Un vrai repli pour quand un connecteur manque
- Des portes de validation sur tout ce qui est conséquent
- N'invente jamais un chiffre ; une donnée manquante est signalée comme manquante

**Écris-le dans les termes du dirigeant, pas en langage métier générique.** S'il l'appelle « le fichier assureur », le skill dit fichier assureur. Un skill rempli de vocabulaire inconnu, il ne lui confiera pas une exécution sans surveillance.

## Étape 5 — Le tester sur un cas réel, avant qu'il s'y fie

Lance le nouveau skill sur un cas dont le dirigeant connaît déjà la réponse — idéalement celui qu'il vient de dérouler. Montre la sortie à côté de ce qu'il a obtenu à la main.

C'est l'étape qui décide si le skill sera utilisé. Un dirigeant qui l'a vu reproduire un résultat connu bon le planifiera. Un autre le lancera à la main et le vérifiera à chaque fois, ce qui n'économise rien.

Si ça ne correspond pas, corrige le skill et relance-le. Ne demande pas au dirigeant d'accepter une approximation.

## Étape 6 — Enregistrer et fixer la cadence

Ajoute-le à `smb-router` pour que les demandes formulées simplement l'atteignent, et note les phrases déclencheuses que le dirigeant utilise réellement.

Si c'est une tâche récurrente, propose de la planifier. La planification est ce qui transforme « un skill que je pourrais lancer » en « quelque chose qui arrive sans moi », ce qui est le résultat qu'il voulait.

## Étape 7 — Le partager, avec validation

Propose de le partager avec l'équipe. Dis ce que partager signifie : qui l'obtient, quelles données il peut atteindre, et ce qu'il peut faire sans surveillance.

**Sois précis sur le risque quand un skill envoie, dépense ou écrit.** Un skill qui envoie des mails à des clients, lancé pour quelqu'un qui ne l'a pas construit et qui ignore ses hypothèses, est un vrai danger. Recommande le brouillon uniquement pour les skills partagés qui envoient quoi que ce soit.

**Contrat de réponse (obligatoire).**

Chaque réponse se clôture par les deux éléments sans lesquels le skill n'est
pas « nommé et planifiable » :

1. **Le déclencheur** — propose un nom court (comment le dirigeant le
   déclenchera par son nom, ex. « mes marges Shopify ») **et** un horizon : à
   quelle fréquence / quel horaire il doit tourner (ex. « chaque vendredi
   matin »). Si la tâche est unique et non récurrente, dis-le et n'invente pas
   d'horaire.
2. **Les questions posées** — quand le dirigeant n'a pas déroulé la tâche dans
   cette conversation, liste explicitement les questions à lui poser pour
   capturer chaque étape et les données / fichiers de chaque étape (quelles
   données, quoi exactement, comment tu le fais aujourd'hui). N'écris pas le
   skill avant que ces détails ne soient posés.

## Ce qu'il ne faut pas faire

- **Ne réinterroge pas sur une tâche qu'il vient de dérouler.** La transcription est la spécification.
- **Ne code pas l'exemple en dur.** Les noms, dates et montants varient ; la séquence, non.
- **Ne mets pas une porte à chaque étape.** Neuf validations valent pire que de le faire à la main.
- **Ne saute pas le test.** Un skill non testé sera vérifié à la main pour toujours, ce qui n'économise rien.
- **Ne l'écris pas en langage métier générique.** Ses mots, sinon il ne lui fera pas confiance.
- **Ne construis rien qui envoie ou dépense sans portes de validation.** Jamais, quoi que le dirigeant demande.

## Après la construction

Le dirigeant a maintenant un skill nommé qu'il peut déclencher ou planifier. Si le nouveau skill a buté sur un outil qui n'est pas connecté, « connecte-moi mon ERP » (`build-connector`) est l'étape suivante naturelle — elle transforme le système manquant en source fonctionnelle. Également proches : « fais-moi le brief » pour intégrer la nouvelle sortie au tableau quotidien, et « brief du lundi » si le skill doit alimenter le briefing hebdomadaire. Propose au plus trois, et saute toute offre déjà refusée lors de cette session.

## Fichiers de référence

- `reference/capture.md` — obtenir une image complète de la tâche sans interrogatoire
- `reference/skill_authoring.md` — la structure, le frontmatter, et où placer les portes de validation
- `reference/gotchas.md` — les modes de défaillance qui produisent un skill que personne n'utilise
