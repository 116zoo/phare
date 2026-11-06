# Pièges

Cas limites de l’analyse contractuelle. Paires « Bien » / « Mauvais ».

---

## Piège : signaler des clauses standard comme un point rouge

**Pourquoi c’est important :** trop signaler entraîne l’utilisateur à ignorer le résumé. Si tout est un point rouge, rien ne l’est.

### ✗ Mauvais

```
Le contrat contient une clause de confidentialité (NDA) bilatérale standard,
durée 2 ans.
Claude : « 🔴 Point rouge : la clause de confidentialité impose des obligations
aux deux parties. »
```

Un NDA bilatéral standard relève du marché. Le signaler comme point rouge détruit le rapport signal/bruit.

### ✓ Bon

```
Le contrat contient une clause de confidentialité (NDA) bilatérale standard,
durée 2 ans.
Claude : [passe ; ne signale pas]
```

Réserve les points rouges aux clauses véritablement non standard. Si une clause relève du modèle et qu’elle est équitable, omets-la.

---

## Piège : les clauses absentes ne sont pas absentes de l’analyse

**Pourquoi c’est important :** pour les PME, l’absence de protections standard (plafond de responsabilité, processus d’avenant, renonciation aux dommages indirects) est souvent plus dangereuse qu’une clause défavorable — la position juridique par défaut comble le vide, généralement en faveur de la contrepartie.

### ✗ Mauvais

```
Le contrat ne comporte aucun plafond de responsabilité.
Claude : [aucune mention ; n’analyse que les clauses présentes]
```

L’utilisateur signe en pensant que la responsabilité est limitée. Elle ne l’est pas.

### ✓ Bon

```
Le contrat ne comporte aucun plafond de responsabilité.
Claude : « 🔴 Manquant : aucun plafond de responsabilité. Ce contrat ne contient
aucune clause de limitation de responsabilité. En droit commun, ton exposition
est illimitée. La pratique courante consiste à plafonner aux honoraires payés
sur les 12 mois précédents. Je suggère d’ajouter : ‘La responsabilité totale de
chaque partie ne pourra excéder les honoraires payés ou exigibles au cours des
12 mois précédant la demande.’ »
```

Traite les clauses standard mais absentes comme des points rouges. Étiquette-les explicitement « Manquant ».

---

## Piège : gros PDF tronqués en cours d’analyse

**Pourquoi c’est important :** les contrats de plus de 20 à 30 pages ont souvent les termes les plus dangereux dans les annexes, les tableaux ou les « bons de commande », à la fin. Si le PDF n’est lu que jusqu’à la page 15, des termes clés passent silencieusement inaperçus.

### ✗ Mauvais

```
Le skill lit les pages 1–10 d’une MSA de 40 pages. Les annexes A–D (à partir
de la page 28) contiennent la cession de propriété intellectuelle et le plafond
de responsabilité. Le skill produit un résumé « propre ».
```

### ✓ Bon

```
Lis le PDF par blocs : pages 1–10, 11–20, 21–40. Analyse tous les blocs avant de
produire le résumé. Si un titre de section mentionne « Annexe », « Pièce » ou
« Appendice », signale-le explicitement et vérifie qu’il a bien été lu.
```

Lis toujours le document en entier. Utilise le paramètre `pages` pour découper les gros PDF.

---

## Piège : modèle de la contrepartie contre projet négocié

**Pourquoi c’est important :** les recommandations doivent correspondre au contexte de négociation. Contester fermement le premier projet d’une start-up n’est pas la même chose que contester le modèle achats d’un Fortune 500 — ce dernier est souvent non négociable sur 80 % de ses termes.

### ✗ Mauvais

```
Accord fournisseur Fortune 500 avec conditions d’achat standard.
Claude : « 🔴 Cette condition de paiement à 60 jours devrait être renégociée à
         30 jours. Leur équipe juridique acceptera probablement la
         modification. »
```

Une recommandation irréaliste gaspille le capital politique de l’utilisateur.

### ✓ Bon

```
Claude : « 🟡 Conditions de paiement à 60 jours. C’est plus long que l’usage
         (30 jours est la norme), mais fréquent dans les modèles achats des
         grandes entreprises. Demander 45 jours comme compromis vaut la peine
         — ils peuvent accepter, en particulier pour des prestations
         récurrentes. Note : s’il s’agit d’un modèle Fortune 500, les
         conditions de paiement sont souvent non négociables lors de la première
         collaboration. »
```

Adapte la recommandation au rapport de force. Étiquette-la en jaune, pas en rouge. Prends acte de la réalité.
