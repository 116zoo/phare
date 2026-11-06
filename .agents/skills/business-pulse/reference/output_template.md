# Gabarit de sortie

Voici la structure exacte que chaque pouls doit suivre. Ne réordonne pas les sections.
Ne supprime une section que si son connecteur n'a renvoyé aucune donnée — ne laisse
jamais un en-tête vide.

Les variables entre `{{accolades doubles}}` sont des espaces réservés — remplace-les par
les valeurs calculées. Convention des flèches : ▲ en hausse, ▼ en baisse, ▬ stable
(variation < 1 %). Affiche toujours la valeur de l'écart après la flèche.

`{{CCY}}` est le code ISO de la devise de l'entreprise, repris du bloc
`## Contexte entreprise` (`../../../shared/currency-and-locale.md`) — par exemple
`EUR`. N'émets jamais un `€` seul.

---

```markdown
# Pouls de l'entreprise — {{jour, date du mois, année}}

**Global : {{🟢|🟡|🔴}} {{statut en une ligne, ex. « Trésorerie saine, une facture échue à surveiller. »}}**

## L'essentiel

- {{Fait le plus important, appuyé sur un chiffre, ex. « Solde de trésorerie 84 000 €, en baisse de 6 000 € sur la semaine — deux gros paiements fournisseurs sont passés. »}}
- {{Second fait le plus important, ex. « 3 400 € d'Acme Corp ont 47 jours de retard — aucune réponse depuis le 12 mars. »}}
- {{Troisième, ex. « Entonnoir pondéré 128 000 € ; deux affaires refroidies cette semaine. »}}

---

## 💰 Trésorerie et finance — {{🟢|🟡|🔴}}

- **Solde de trésorerie** : {{CCY}} {{BALANCE}} ({{▲|▼|▬}} {{CCY}} {{DELTA}} sur la semaine)
- **CA du mois** : {{CCY}} {{MTD}} vs. {{CCY}} {{PRIOR_MTD}} le mois dernier ({{▲|▼|▬}} {{PCT}} %)
- **Créances clients ouvertes** : {{CCY}} {{AR_TOTAL}} sur {{N}} factures ouvertes

**Balance âgée clients**
- 0–30 jours : {{CCY}} {{AR_0_30}}
- 31–60 jours : {{CCY}} {{AR_31_60}} {{🟡 si non nul}}
- 61+ jours : {{CCY}} {{AR_61}} {{🔴 si non nul}}

**Échus > 30 jours**
- {{client}} — {{CCY}} {{montant}} ({{jours}} jours de retard)
- {{client}} — {{CCY}} {{montant}} ({{jours}} jours)

---

## 📈 Revenus et ventes — {{🟢|🟡|🔴}}

- **Règlements sur 7 jours** : {{CCY}} {{SETTLEMENTS}} ({{▲|▼|▬}} {{PCT}} % vs. 7 jours précédents)
- **PayPal** : {{CCY}} {{PAYPAL_TOTAL}} | **Square** : {{CCY}} {{SQUARE_TOTAL}} {{à omettre si non connecté}}

**Transactions inhabituelles**
- {{montant}} — {{contrepartie}} — {{statut : échouée / en attente / importante}}
- {{ou « Aucune transaction inhabituelle cette semaine. »}}

---

## 🔮 Entonnoir — {{🟢|🟡|🔴}}

- **Entonnoir pondéré** : {{CCY}} {{WEIGHTED}} ({{▲|▼|▬}} {{CCY}} {{DELTA}} sur la semaine)
- **Couverture vs. objectif** : {{RATIO}}x l'objectif mensuel {{🟢|🟡|🔴}}
- **Gagnées cette semaine** : {{CCY}} {{CW}} sur {{N}} affaires
- **Nouvelles affaires créées** : {{N}} ({{CCY}} {{TOTAL}})

**Affaires à surveiller**
- {{nom de l'affaire}} — {{étape}} — {{raison : refroidie / décalée / bloquée}}
- {{ou « Aucune affaire signalée cette semaine. »}}

---

## 📅 Cette semaine

- {{Réunion / échéance — partie externe, pourquoi c'est important}}
- {{Réunion / échéance}}
- {{Réunion / échéance}}
{{3 à 5 points max. Supprime le bruit d'agenda interne.}}

---

## ✉️ Liste de surveillance

- {{expéditeur / source}} — {{résumé en une ligne de ce qui demande attention}}
- {{expéditeur / source}} — {{résumé}}
{{Ou : « Aucun fil urgent détecté. » — écris-le explicitement pour que le dirigeant sache que la vérification a eu lieu.}}

---

## ⚠️ Priorité n° 1

{{Une chose précise à traiter aujourd'hui. Nomme les montants, les personnes, les
échéances. Pas « revoir la trésorerie » — dis « La facture de 4 200 € d'Acme Corp a
23 jours de retard. Appelle Sarah Chen au 415-555-0192 aujourd'hui. »}}

---

## Annexe

**Fenêtre** : {{plage de dates}}

**Sources extraites** : {{liste des connecteurs qui ont renvoyé des données}}

**Sources indisponibles** : {{liste avec le motif, ex. « Gmail — erreur d'authentification » ou « Zoho Desk — non connecté »}}

**Seuils utilisés** : {{signale tout seuil encore marqué TODO et laissé à sa valeur par défaut}}
```

---

## Règles de mise en forme

1. **Montants** : le code devise de l'entreprise, puis le chiffre — `EUR 43 k` pour les
   milliers, `EUR 1,2 M` pour les millions. Pas de décimales inutiles, jamais de symbole
   seul.
2. **Pourcentages** : une décimale pour les tendances (ex. « ▲ 8,3 % »), des entiers
   ailleurs.
3. **Dates** : lisibles par un humain dans la prose, au format du pays du dirigeant
   (« 14 avr. » pour la plupart des pays, « avr. 14 » pour les États-Unis —
   `../../../shared/currency-and-locale.md`) ; format ISO dans les métadonnées
   (« 2026-04-14 »).
4. **Espacement des flèches** : `▲ 2 000 €` et non `▲2 000 €`.
5. **Longueur** : vise une page. Deux pages maximum. Si une section enfle, resserre la
   prose.