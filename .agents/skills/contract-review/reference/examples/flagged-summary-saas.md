# Exemple : synthèse signalée d’un accord fournisseur SaaS

Un exemple travaillé de sortie de contract-review. Contrat : un accord d’abonnement SaaS d’un éditeur de logiciels de taille moyenne.

---

## Entrée

> « Relis cet accord SaaS avant que je signe. Nous sommes un cabinet de conseil de 12 personnes. »

Contrat : accord d’abonnement SaaS de 18 pages, modèle de l’éditeur, droit applicable : Californie.

---

## Sortie

### 📋 Synthèse du contrat

Abonnement SaaS de 12 mois, renouvelé automatiquement chaque année. L’éditeur fournit un logiciel de gestion de projet. Tu payes 2 400 €/an, facturés mensuellement. L’éditeur héberge les données ; tu es propriétaire de tes données mais accordes à l’éditeur une licence large pour les utiliser aux fins d’« amélioration du produit ». Tu peux résilier avec un préavis de 30 jours, mais tu dois les honoraires jusqu’au terme du contrat.

---

### 🔴 Points rouges (à contester avant de signer)

**1. Responsabilité non plafonnée**

> *« EN AUCUN CAS LA RESPONSABILITÉ DE L’ÉDITEUR NE POURRA EXCÉDER LES MONTANTS EFFECTIVEMENT PAYÉS PAR LE CLIENT AU COURS DES TROIS (3) MOIS PRÉCÉDANT LA DEMANDE. »*

**Problème :** trois mois d’honoraires, cela fait 600 €. Si une fuite de données chez l’éditeur expose les données de ton client, ton recours est plafonné à 600 €, quels que soient les dommages réels. Pour un cabinet de conseil qui traite des informations clients, c’est insuffisant.

**Demande :** un plafond à 12 mois d’honoraires payés (2 400 €), ou un plancher fixe de 50 000 € pour les incidents de sécurité des données. Formulation suggérée :

> *« La responsabilité totale de l’éditeur ne pourra excéder le montant le plus élevé entre (a) les honoraires payés au cours des douze (12) mois précédant la demande et (b) 50 000 € pour les demandes résultant d’incidents de sécurité des données. »*

---

**2. Renouvellement automatique avec un préavis de désengagement de 60 jours**

> *« Le présent contrat sera renouvelé automatiquement pour des périodes successives d’un an, sauf si l’une des parties adresse une notification écrite de non-renouvellement au moins soixante (60) jours avant la fin de la période en cours. »*

**Problème :** tu disposes d’une fenêtre de 60 jours pour te désengager. Tu la manques et tu es engagé pour une année de plus. Avec un contrat à 2 400 €/an, c’est facile à négliger.

**Demande :** réduire à 30 jours, ou ajouter une obligation de rappel de la part de l’éditeur. À défaut, mets dès maintenant la date de désengagement dans ton agenda (1er avril 2027 si la signature a lieu le 1er mai 2026).

---

### 🟡 Points jaunes (à négocier si possible)

**3. Licence large sur les données**

> *« Le Client accorde à l’Éditeur une licence non exclusive et mondiale pour utiliser, traiter et analyser les Données du Client afin d’améliorer les produits et services de l’Éditeur. »*

**Préoccupation :** l’éditeur peut utiliser tes données — y compris les données de projet de tes clients — pour entraîner son produit. Cela peut entrer en conflit avec tes obligations de confidentialité envers tes clients.

**Demande :** restreindre à des données d’usage agrégées et anonymisées. Formulation suggérée :

> *«… limitée à des données agrégées et dépersonnalisées, et excluant expressément toute Donnée du Client identifiant les clients ou projets du Client. »*

---

**4. Aucun délai de régularisation avant résiliation pour faute**

> *« L’éditeur peut résilier immédiatement le présent contrat en cas de manquement grave du Client. »*

**Préoccupation :** l’éditeur peut couper l’accès immédiatement pour tout « manquement grave », sans aucune chance de le corriger. Aucune définition du caractère « grave ». Tu pourrais perdre l’accès à tes données en cours de projet.

**Demande :** un délai de régularisation de 15 jours. Formule suggérée : *«… sur notification écrite et si le Client ne régularise pas ce manquement dans les quinze (15) jours. »*

---

### 🟢 Points clés à noter

- **Paiement :** mensuel, débité automatiquement. Garde ta carte à jour, sinon le service est suspendu immédiatement.
- **Portabilité des données :** tu peux exporter tes données à tout moment et pendant les 30 jours suivant la résiliation. Prépare l’export avant toute résiliation.
- **Droit applicable :** Californie. Tout litige relève des tribunaux du comté de Santa Clara.
- **SLA de disponibilité :** 99,5 % mensuel. Les compensations sont créditées sur ton compte, pas remboursées en espèces.

---

### 💡 Guide de négociation

| Point | Demande | Argumentaire |
|------|-----|-------------|
| Plafond de responsabilité | Porter à 12 mois (2 400 €) ou 50 000 € pour les incidents de sécurité | « Nous traitons des données clients — le plafond de responsabilité doit refléter le risque réel » |
| Fenêtre de renouvellement | Réduire à 30 jours | « 60 jours, c’est court pour une petite équipe — 30 jours est plus courant » |
| Licence sur les données | Restreindre aux données anonymisées / agrégées | « Nos contrats clients limitent la manière dont nous partageons les données de leurs projets » |
| Régularisation avant résiliation | Ajouter un délai de 15 jours | « Nous avons besoin d’une chance de corriger les problèmes avant que l’accès soit coupé » |

---

*Ceci n’est pas un conseil juridique. Pour toute décision engageante, consulte un avocat.*

---

## DOCX annoté

Un DOCX annoté avec les modifications suggérées, marquées au format des modifications suivies, a été exporté vers : `contract-review-redline-2026-05-01.docx`
