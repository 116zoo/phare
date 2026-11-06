# Synchronisation en comptabilité

Reporter la paie au grand livre après son exécution — via le connecteur lorsqu'il dispose d'un
chemin d'écriture d'écritures, sinon sous la forme d'une écriture équilibrée remise au dirigeant
ou à l'expert-comptable pour saisie. Les grand livres capables d'absorber le report via leur
connecteur forment une capacité qui change d'une version à l'autre ; vérifie avant de t'engager,
et ne désigne jamais un grand livre comme destination attendue de l'écriture.

---

## Moment de l'écriture

**Synchronise après la validation de l'exécution, jamais avant.** La paie proposée et celle qui a
réellement eu lieu diffèrent dès que le dirigeant a modifié une ligne à la dernière étape, et
reporter la proposition crée une écriture qui ne se rapprochera pas avec la banque.

Récupère les chiffres définitifs auprès du logiciel de paie chaque fois que c'est possible. Si le
dirigeant a fait la paie manuellement, demande-lui de confirmer le brut final et les montants de
cotisations avant le report.

---

## L'écriture

Une écriture de paie standard comporte les composants suivants :

| Compte | Sens | Source |
|---|---|---|
| Charges de personnel (ou coût de chantier) | Débit | Salaires bruts par salarié, ventilés |
| Cotisations patronales | Débit | Part patronale seule |
| Dettes de personnel — cotisations retenues | Crédit | Retenue sur les salariés |
| Dettes de personnel — cotisations patronales | Crédit | Part patronale |
| Banque | Crédit | Net effectivement versé |

L'écriture doit être équilibrée. Si elle ne l'est pas, quelque chose est faux dans les chiffres
source — dis-le et arrête-toi plutôt que de neutraliser la différence dans un compte d'attente.
Un équilibre forcé masque l'erreur définitivement.

---

## Analytique des chantiers

Lorsque l'entreprise suit la main-d'œuvre par chantier, ventile les charges de personnel au
prorata des heures de chantier déjà saisies sur les feuilles d'heures.

- Impute au **coût chargé complet** si le dirigeant a fourni un taux de charge. Sinon impute les salaires bruts et libelle-le comme tel.
- **N'invente jamais un taux de charge.** Une majoration de 22 % inventée fausse la marge de tous les chantiers dans la même direction invisible.
- Les heures sans chantier affecté vont en main-d'œuvre non affectée, de façon visible, pour que le dirigeant voie ce qui dérive dans ce poste. Un gros solde non affecté mérite à lui seul un signalement.

---

## Contrôle de rapprochement

Après le report, vérifie :

1. Le total des débits égale le total des crédits
2. Le net de l'écriture correspond au débit bancaire réellement opéré par le logiciel de paie
3. Les heures affectées aux chantiers totalisent les heures payées, déduction faite de ce qui n'a pas été affecté
4. La période de rattachement de l'écriture correspond à la date de paie, pas à la date de fin de période

Le point 4 attrape le chevauchement de fin de mois. Une période se terminant le 31 mars avec une
date de paie au 4 avril se reporte sur la trésorerie d'avril et, si le dirigeant constitue des
charges à payer, sur les salaires de mars. Demande quel traitement il utilise au lieu d'en choisir
un.

---

## Charges à payer

Si le dirigeant constitue des charges à payer sur les salaires en fin de mois, la part de la
période travaillée sur le mois précédent donne lieu à une écriture de constatation puis à une
extourne. Demande une fois s'il constitue des charges à payer et retiens la réponse. La plupart
des petites entreprises ne le font pas, et ajouter des charges à payer à une comptabilité qui n'en
a jamais eu rend l'année plus difficile à clôturer, pas plus facile.

---

## Ce qu'il faut confirmer en retour

Après le report, restitue clairement :

> Reporté dans QuickBooks, 20 mars : salaires 9 840 €, cotisations patronales 812 €,
> trésorerie 10 652 €.
> 7 210 € ventilés sur quatre chantiers, 2 630 € non affectés.
> L'écriture s'équilibre et correspond au débit de Payfit.

Si l'une de ces trois lignes ne colle pas, on le dit tout haut, on ne l'arrondit pas.