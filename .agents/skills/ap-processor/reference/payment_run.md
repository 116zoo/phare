# Lot de règlement

Proposer quoi payer, et la garde qui se tient devant.

---

## La garde

Préparer des factures imputées et proposer un règlement sont deux approbations distinctes, avec deux
questions distinctes.

1. **Garde d'imputation :** « Préparer 19 factures pour un total de 41 208 € en factures non réglées dans QuickBooks ? »
2. **Garde de paiement :** « Régler ces 11 factures, soit 22 140 € prélevés sur le compte d'exploitation jeudi ? »

Fusionner les deux est la pire chose que ce skill pourrait faire. Un dirigeant qui dit oui à la
comptabilité n'a pas dit oui à la sortie d'argent. Demande deux fois, toujours, même quand le
dirigeant dit « gère ça » — et s'il le dit, explique une fois pourquoi la seconde question est tout
de même posée.

**Énonce le total avant la question, pas après.** Le montant est ce sur quoi le dirigeant décide
réellement.

---

## Construire la proposition

Classe les factures dans le lot selon cette logique :

1. **Déjà échues** — tout ce qui a dépassé l'échéance, avec le nombre de jours de retard et tout risque relationnel noté
2. **Escompte pour paiement anticipé à saisir** — 2/10 net 30 sur une facture de 10 000 € représente 200 € pour 20 jours d'avance. Montre la valeur en euros, pas le code des conditions
3. **Échéance dans la fenêtre du lot** — en général les 7 à 14 jours suivants
4. **Tout le reste** — mettre de côté

Exclure automatiquement :

- Les factures avec des écarts non résolus
- Les factures dont le total est à faible confiance
- Tout ce qui a déjà été réglé par carte via Ramp ou Expensify
- Les factures en litige actif

Dis ce qui a été exclu et pourquoi. Une facture écartée en silence devient une facture tardive.

---

## Conscience de la trésorerie

Quand les données `cash-flow-snapshot` sont disponibles, affiche le solde après le lot et si la paie
passe toujours. Quand elles ne le sont pas, dis-le clairement plutôt que de laisser croire que le
lot est finançable.

Si le lot proposé doit faire descendre le solde sous le plancher fixé par le dirigeant, dis-le avant
de demander et propose une version allégée. Ne présente pas simplement un lot plus petit sans
expliquer ce qui a été mis de côté — le dirigeant doit savoir qu'un fournisseur attend.

---

## Moyens de paiement

Regroupe selon le mode de règlement de chaque fournisseur : virement, chèque, carte ou portail
fournisseur. Le dirigeant exécute le paiement dans sa banque ou son logiciel comptable ; ce skill
prépare et propose.

**Aucun paiement n'est jamais déclenché ici.** Même quand un connecteur le permettrait techniquement,
c'est le dirigeant qui appuie sur le bouton. Cette frontière vaut plus que les deux minutes
qu'elle économise.

---

## Règlements partiels et contestations

Quand le dirigeant veut ne régler qu'une partie d'une facture :

- Note le montant réglé et le montant retenu
- Rédige la note au fournisseur expliquant le règlement partiel, avec le numéro de facture et la ligne concernée — lis le profil de voix partagé dans `../../../shared/voice-profile.md` avant de l'écrire
- Mets la note en attente d'approbation
- Garde le solde contesté visible dans l'encours pour qu'il ne glisse pas discrètement vers un appel de relance

---

## Exemple travaillé

Le lot du jeudi de Ray, proposé :

- 11 factures, 22 140 € au total
- 2 échues : Johnstone 1 880 € (18 jours), Ferguson 940 € (7 jours)
- 1 escompte disponible : Watsco 6 200 € à 2/10, soit 124 € si réglée avant vendredi
- 3 mises de côté : deux avec des écarts de quantité, une avec un total illisible
- Solde après le lot, selon la photographie de trésorerie : 31 400 € ; la paie de 18 900 € passe le 15

Demandé ainsi : « Cela fait 22 140 € sortis jeudi, laissant 31 400 € pour une paie de 18 900 €
au 15. Je l'envoie ? »