# Seuils

Les seuils rouge / jaune / vert de chaque section du pouls. Ce sont des valeurs par
défaut pour une PME — ajuste-les aux objectifs et au plan réels du dirigeant.

Tout seuil encore marqué « # TODO : à confirmer avec le dirigeant » doit produire une
note en haut de la première sortie de pouls, pour que le dirigeant sache qu'il faut le
régler.

Les seuils de montant sont dans la devise de l'entreprise
(`../../../shared/currency-and-locale.md`) : « 200 » veut dire 200 dans la devise
dans laquelle l'entreprise facture. Ce sont des lignes d'attention, pas des seuils
légaux, et ils n'ont pas besoin d'être convertis.

---

## Trésorerie et finance

**Autonomie de trésorerie**
- 🟢 ≥ 6 mois  # TODO : à confirmer avec le dirigeant
- 🟡 3–6 mois
- 🔴 < 3 mois

**Tendance du chiffre d'affaires (mensuelle)**
- 🟢 ≥ 0 % (stable ou en croissance)
- 🟡 de -5 % à 0 %
- 🔴 < -5 %

**Balance âgée clients**
- 🟢 Aucune facture de plus de 31 jours de retard
- 🟡 Au moins une facture avec 31–60 jours de retard
- 🔴 Au moins une facture avec 60+ jours de retard OU total de la tranche 61+ > 10 % des créances clients

**Seuil d'impayé** : toute facture unitaire avec plus de 30 jours de retard est nommée
explicitement dans le pouls — pas seulement comptée.

---

## Revenus et ventes

**Tendance des ventes sur 7 jours (vs. les 7 jours précédents)**
- 🟢 ≥ 0 %
- 🟡 de -10 % à 0 %
- 🔴 < -10 %

**Transactions échouées**
- 🟡 Au moins une transaction échouée > 200
- 🔴 Au moins une transaction échouée > 1 000, ou 3 échecs ou plus dans la semaine

---

## Entonnoir

**Couverture de l'entonnoir** (entonnoir pondéré ÷ objectif mensuel de chiffre d'affaires)  # TODO : à confirmer avec le dirigeant
- 🟢 ≥ 2x l'objectif mensuel
- 🟡 1–2x
- 🔴 < 1x

**Affaire figée** : aucune activité depuis 7 jours ou plus → signaler  # TODO : le dirigeant peut préférer 14 jours
**Affaire décalée** : affaire ouverte dont la date de clôture est dans le passé → toujours signaler

---

## Liste de surveillance

Aucun seuil numérique — toute escalade ou réclamation par mail ou sur Slack est
remontée. La gravité est contextuelle ; remonte et laisse le dirigeant décider.

---

## Consolidation du statut global

Le statut global du pouls est le pire statut de section. Exception : si un risque
individuel nomme un client précis avec un montant et une échéance sous 7 jours,
consolider en 🔴 quels que soient les couleurs de section.

---

## Quand les régler

Reviens sur ces seuils après 4 semaines d'usage. Les valeurs par défaut sont des
points de départ prudents — une entreprise saine aura l'impression d'être toujours
🟢. Resserre-les pour refléter là où le dirigeant veut vraiment agir.