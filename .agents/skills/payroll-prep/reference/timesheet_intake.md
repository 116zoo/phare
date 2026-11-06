# Collecte des feuilles d'heures

Définir la période, l'effectif, et récupérer les heures là où qu'elles se trouvent.

---

## Paramétrage de la période

Confirme les quatre éléments avant toute récupération :

- **Début et fin de période** — dates incluses
- **Date de paie** — date à laquelle l'argent tombe réellement
- **Fréquence de paie** — hebdomadaire, quinmadaire, bimensuelle, mensuelle
- **Qui est dans cette paie** — l'équipe horaire, les salariés au forfait, ou les deux

La quinmadaire et la bimensuelle sont sans arrêt confondues. La quinmadaire, c'est tous les quinze
jours, 26 paies par an. La bimensuelle, c'est le 15 et le dernier jour du mois, 24 paies. Si le
dirigeant dit « deux fois par mois » et que la période précédente allait du 1er au 14, demande au
lieu de supposer.

**Les bornes de la période comptent surtout en fin de mois.** Une semaine à cheval sur le 31 a des
heures dans deux mois pour l'analytique, mais un seul bulletin de paie. Laisse la période de paie
entière et laisse la synchronisation comptable gérer le partage.

---

## Effectif

Récupère la liste des salariés actifs et compare-la à la dernière paie.

| Changement | Conduite à tenir |
|---|---|
| Embauche en cours de période | Confirme la date de début et que les heures antérieures sont exclues |
| Départ | Confirme la date de départ, le solde de congés payés dû s'il y a lieu, et si les règles applicables imposent un autre délai pour le dernier bulletin |
| En congé | Confirme congé payé ou non payé, et si des congés payés sont consommés |
| Personne payée la période précédente et absente maintenant | Signale-le. Soit un départ que personne n'a enregistré, soit une feuille d'heures manquante |
| Nouvelle personne sans enregistrement d'embauche | Signale-le. Ne paie jamais quelqu'un qui n'est pas à l'effectif |

---

## Source : Payfit

Avant toute récupération, appelle `list_payroll_blockers` et traduis les blocages en langage
courant conformément à l'étape 2 du SKILL.md — ils déterminent si la paie se prépare dans Payfit ou
se livre sous forme de fiche de paie.

Puis appelle `list_employees` et `list_pay_schedules`. L'une des deux renvoyant une liste vide sur
une entreprise qui déclare un effectif, ou un appel des blocages qui échoue, signifie que la source
ne répond pas — abandonne la voie Payfit et dis-le ; la fiche de paie devient le résultat.

Récupère, outil par outil :

| Entrée | Outil | Lecture |
|---|---|---|
| Heures | `list_time_records` (début et fin de période) | Vérifie `source` d'abord. `native` : postes avec badge d'entrée, badge de sortie, pauses. `third_party` : feuilles d'heures ; `get_time_sheet` sur l'identifiant de niveau supérieur d'une feuille d'heures pour les lignes par jour. `none` : pas d'heures ici, utilise la voie tableur. |
| Congés pris | `list_time_off_requests` (période, `status: approved`) | Chaque jour approuvé est payé en congés payés ou en arrêt maladie, pas en heures travaillées. En attente = signalement. Les commentaires sont masqués par l'outil ; ne les réclame pas. |
| Soldes | `get_time_off_balances` | Disponibles, acquis, consommés, en attente par politique. Les noms de politique exigent la portée time-off-policies ; sans elle, rapproche sur l'uuid de la politique. Alimente le contrôle de dépassement de solde. |
| Effectif, taux, qualifications | `list_employees` et ses rémunérations | Le statut d'emploi et l'indicatif actif sont deux champs distincts (ci-dessous). |
| Paie précédente | `list_payrolls`, `get_payroll` | Les totaux par personne de la dernière paie traitée, pour la comparaison. |

Un pointage manquant que le dirigeant complète s'écrit avec `record_time`, conformément à l'étape 2
du SKILL.md — uniquement des heures indiquées par le dirigeant, montrées en premier. Les paramètres
obligatoires et les pièges d'identifiant et de relecture figurent dans la ligne `record_time` de
`../../../shared/connector-call-shapes.md` ; ce fichier ne les répète pas.

Les taux viennent de Payfit, jamais de la feuille d'heures. Un taux écrit sur une feuille d'heures
papier est une note, pas un enregistrement.

---

## Source : Silae

Statut égal avec Payfit, pas une voie secondaire. Récupère la liste des salariés, le type de paie et
le taux avec sa fréquence, le statut d'emploi, les soldes de la politique de congés payés, le
calendrier de paie et sa fréquence, ainsi que la dernière paie terminée pour la comparaison avec la
période précédente. Le détail de la paie porte le brut, les heures et la source de ces heures par
salarié, ce qui permet de distinguer une saisie issue d'une feuille d'heures d'une saisie manuelle.

Ici aussi, les taux viennent de l'enregistrement de paie, jamais de la feuille d'heures.

Trois points à vérifier sur cette source :

- **Le statut d'emploi et l'indicatif actif sont deux champs distincts.** Une personne marquée active peut n'être pas sur la paie, ou être en congé payé. Lis les deux avant d'inclure qui que ce soit.
- **Un salarié peut porter plusieurs taux de paie.** La plupart sont à zéro heure. Totalise à partir du taux qui porte des heures, pas du premier renvoyé.
- **La liste des salariés est paginée.** Lis toutes les pages avant de totaliser ; une liste partielle fait discrètement manquer la personne tombée en fin de liste.

---

## Source : téléversement d'un tableur

La voie de repli, et une voie fréquente. Les petites équipes travaillent sur papier, sur un tableur
partagé, ou sur la photo d'un tableau blanc.

Accepte toute disposition raisonnable et fais la correspondance. Colonnes attendues, quels que
soient leurs intitulés :

- Nom ou identifiant du salarié
- Date
- Heure d'entrée, heure de sortie
- Minutes de pause, ou un indicateur indiquant que les pauses sont déjà déduites
- Heures, si le tableur est déjà totalisé
- Chantier, classe ou code de coût, si suivi
- Type de paie : normal, congés payés, jour férié, non payé

**Demande quelle convention le tableur utilise pour les pauses.** Un tableur qui retire déjà le
déjeuner, traité comme s'il ne le faisait pas, coûte une demi-heure par jour à tout le monde. Cette
seule question évite l'erreur de téléversement la plus fréquente qui soit.

Même si le tableur est déjà totalisé, recalcule à partir des pointages dès qu'ils existent. Si seuls
des totaux existent, utilise-les et dis-le — les contrôles d'anomalie qui dépendent des heures de
pointage ne tourneront pas, et le dirigeant doit savoir quels garde-fous sont désactivés.

---

## Normalisation

Produis une ligne par personne et par jour :

```
person | date | in | out | break_min | regular | ot | pto | holiday | job
```

Règles qui gardent cela honnête :

- Un poste traversant minuit appartient au jour où il a commencé, sauf si la politique du dirigeant dit le contraire
- Des saisies qui se chevauchent pour une même personne ne sont jamais fusionnées automatiquement — elles sont signalées
- Une ligne avec une entrée et aucune sortie donne des heures enregistrées comme inconnues, pas estimées
- L'arrondi suit la politique énoncée par le dirigeant ; sans politique, n'arrondis pas du tout

---

## Exemple travaillé

Okonkwo Mechanical, semaine se terminant le 15/03, cinq personnes dans l'équipe.

- Payfit non connecté. Ray a téléversé un tableur partagé avec heures d'entrée et de sortie, pauses non déduites.
- Confirmé : pauses de 30 minutes non payées, prises chaque jour, sans pointage.
- Effectif identique à la période précédente, sauf un nouvel apprenti, Dee, démarré mercredi.
- Une ligne pour Marcus le 12/03 indique une entrée à 6 h 40 et aucune sortie.

Restitué : 5 personnes, 214 heures lisibles, 1 poste sans badge de sortie (Marcus, jeudi), 1
nouvelle recrue dont les heures sont à confirmer (Dee, démarrée le 12/03).