# Exemple détaillé — cash-flow-snapshot

**Scénario :** petite entreprise de services. QuickBooks + PayPal connectés. Trois
clients actifs, une paie mensuelle, un loyer de bureau.

---

## Données d'entrée (extraites des connecteurs)

**Balance âgée des créances clients (QuickBooks) :**

| Client       | Facture | Montant   | Échéance | Jours d'encours |
|---|---|---|---|---|
| Acme Corp    | INV-112 | 8 400 €   | 10 avril | 12              |
| BlueSky LLC  | INV-108 | 14 200 €  | 22 avril | 0               |
| Crestwood Inc| INV-115 | 6 000 €   | 5 mai    | —               |

**Délai de règlement historique (d'après les règlements PayPal) :**

| Client       | Délai moyen | Écart-type | Paiements à l'historique |
|---|---|---|---|
| Acme Corp    | 18 jours    | 4 jours    | 11                      |
| BlueSky LLC  | 7 jours     | 2 jours    | 8                       |
| Crestwood Inc| 12 jours    | 5 jours    | 6                       |

**Coûts fixes (dettes fournisseurs récurrentes QuickBooks) :**
- Paie : 22 000 € — le 15 avril
- Loyer : 3 200 € — le 1er mai
- Abonnements logiciels : 480 € — le 1er mai

---

## Sortie de l'étape 3 — dates d'encaissement ajustées

| Client       | Montant facture | Date d'encaissement ajustée | Notes                          |
|---|---|---|---|
| Acme Corp    | 8 400 €         | 28 avril                    | Échéance 10 avril + délai moyen 18 j |
| BlueSky LLC  | 14 200 €        | 29 avril                    | Échéance 22 avril + délai moyen 7 j  |
| Crestwood Inc| 6 000 €         | 17 mai                      | Échéance 5 mai + délai moyen 12 j    |

---

## Sortie de l'étape 4 — prévision 30/60/90 jours

Calcul de la borne de confiance :
- Écart-type moyen pondéré : 3,6 jours
- Délai moyen pondéré : 12,7 jours
- band_pct = 3,6 / 12,7 = **28,3 %**

| Fenêtre | Encaissements attendus | Décaissements attendus | Net        | Bas (−28 %) | Haut (+28 %) |
|---|---|---|---|---|---|
| 0–30 j    | 22 600 €      | 22 000 €      | +600 €    | −5 928 €    | +7 128 €     |
| 31–60 j   | 6 000 €       | 3 680 €       | +2 320 €  | +1 670 €    | +2 970 €     |
| 61–90 j   | 0 €           | 0 €           | 0 €       | —           | —            |

---

## Sortie de l'étape 5 — risques signalés

1. **Tension sur la paie :** la paie (22 000 €) tombe le 15 avril. Encaissements sur la
   borne basse jusqu'au 14 avril : 0 € (les deux encaissements clients tombent les
   28–29 avril). Risque de déficit : jusqu'à 22 000 €.
   *Recommandation : confirmer le calendrier d'encaissement avec Acme et BlueSky
   avant le 14 avril.*

2. **Risque payeur tardif :** Acme Corp paie historiquement avec 18 jours de retard.
   Sa facture de 8 400 € (échue le 10 avril) glisse au 28 avril — après la paie.

---

## Sortie de l'étape 6 — résumé dans le fil de discussion

```
Flux de trésorerie — 23 avril → 21 juillet 2026
Sources : QuickBooks, PayPal

              Attendu    Bas        Haut
Net 30 jours : +600 €     −5 928 €   +7 128 €
Net 60 jours : +2 320 €   +1 670 €   +2 970 €
Net 90 jours : 0 €        —          —

⚠ 2 risques signalés :
  • Tension sur la paie : la paie de 22 000 € tombe le 15 avril ; les encaissements
    clients ne rentrent pas avant les 28–29 avril. Risque de déficit sur la borne
    basse : jusqu'à 22 000 €.
  • Payeur tardif : Acme Corp (délai moyen de 18 jours) décale 8 400 € au-delà de
    la date de paie.

Borne de confiance : ±28 % (d'après la variance historique des règlements sur
3 clients).

Cette prévision s'appuie sur les créances clients et les dettes fournisseurs
QuickBooks et sur l'historique de règlement PayPal. Elle ne remplace pas un conseil
comptable — vérifie avec ton expert-comptable avant toute décision de financement.
```

**XLSX :** `cash-flow-snapshot-2026-04-23.xlsx` — onglets Synthèse / Détail / Risques.