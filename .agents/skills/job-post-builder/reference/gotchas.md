# Pièges

## 1. État de connexion DocuSign

✗ **À éviter :** Claude navigue vers `https://app.docusign.com` et essaie aussitôt de
téléverser la lettre de proposition sans vérifier si l'utilisateur est connecté.

✓ **À faire :** dès que tu as navigué vers DocuSign, vérifie s'il y a un écran de
connexion. Si une demande de connexion apparaît, mets-toi en pause et demande à
l'utilisateur de se connecter, puis attends sa confirmation avant de continuer.

**Pourquoi c'est important :** DocuSign redirige en silence les sessions non authentifiées. Si
la vérification est sautée, l'automatisation essaie de cliquer sur des éléments d'interface
qui n'existent pas et échoue en plein parcours, sans message d'erreur clair.

---

## 2. Informations candidat manquantes avant d'ouvrir le navigateur

✗ **À éviter :** Claude arrive en Phase 6, ouvre DocuSign dans Chrome, et demande en plein
parcours : « Quelle est l'adresse e-mail du candidat ? »

✓ **À faire :** si l'utilisateur a choisi la remise via DocuSign en Phase 1, récupère le
nom complet et l'adresse e-mail du candidat avant le début de la Phase 6 — soit en Phase 1,
soit à la fin de la Phase 5. N'entre jamais dans le parcours navigateur sans les deux.

**Pourquoi c'est important :** interrompre une session navigateur ouverte pour collecter des
données manquantes casse l'état de l'automatisation et désoriente l'utilisateur.

---

## 3. Redemander un contexte que l'utilisateur a déjà fourni

✗ **À éviter :** l'utilisateur dit « il nous faut un senior PM, 100 % télétravail,
160 000 – 180 000 € » et la Phase 1 demande quand même l'intitulé du poste, le lieu et la
rémunération.

✓ **À faire :** extrais l'intitulé, le lieu et la rémunération du message, confirme-les en
une seule phrase, et ne demande que les champs réellement manquants.

**Pourquoi c'est important :** la compétence exige explicitement « une seule question de
précision plutôt qu'un long formulaire ». Les questions redondantes brisent la confiance et
ralentissent le processus.

---

## 4. Étendre en silence le format existant de l'utilisateur

✗ **À éviter :** l'utilisateur a une offre d'emploi en 3 sections. Claude produit une offre
en 7 sections sur la base de `job-post-structure.md` sans demander.

✓ **À faire :** mets le format existant de l'utilisateur en regard de la référence,
identifie les sections manquantes, et pose une seule question : « Ton offre actuelle a X et
Y — veux-ce que j'ajoute Z, ou je garde ton format ? »

**Pourquoi c'est important :** le format de l'utilisateur fait foi. Le remplacer en silence
peut entrer en conflit avec des normes internes RH ou juridiques qu'il n'a pas mentionnées.

---

## 5. Inventer des chiffres de rémunération

✗ **À éviter :** aucune fourchette n'ayant été fournie, Claude écrit « 120 000 – 150 000 €
selon l'expérience » dans l'offre d'emploi ou la lettre de proposition.

✓ **À faire :** si la rémunération n'est pas fournie, supprime entièrement la fourchette de
l'offre d'emploi. Dans la lettre de proposition, utilise `[SALAIRE ANNUEL — à confirmer avec
la RH]` comme emplacement entre crochets.

**Pourquoi c'est important :** inventer des chiffres de rémunération crée une responsabilité
juridique et RH. Les instructions de la compétence sont explicites : « N'invente pas de
fourchette. »