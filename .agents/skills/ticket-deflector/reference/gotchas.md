# Pièges — ticket-deflector

Les cas limites où ce skill est le plus susceptible de se tromper.

---

## Piège : coller à la voix du dirigeant, pas à un ton « professionnel » générique

**Pourquoi c'est important :** la valeur de ce skill, c'est que les réponses sonnent comme si le dirigeant les avait écrites. Un brouillon d'entreprise insipide sera réécrit de zéro — un effort perdu.

### ✗ Mauvais

> Madame, Monsieur,
>
> Merci de nous avoir contactés. Nous nous excusons pour tout désagrément et nous nous engageons à résoudre votre problème dans les meilleurs délais. Merci de prévoir 3 à 5 jours ouvrés pour le traitement.
>
> Cordialement, Service client

### ✓ Bon

Lis d'abord `../../../shared/voice-profile.md` et rédige dans le registre réel du dirigeant. Si ce fichier ne contient encore aucun profil, suis sa consigne « Quand il n'y a pas d'exemple » — demande trois e-mails dont le dirigeant était satisfait. S'il refuse ou n'a rien sous la main, écris simplement et dis que le brouillon n'a pas de voix, plutôt que d'inventer une personnalité. Un dirigeant bref et direct obtient un brouillon bref et direct. Un dirigeant chaleureux et bavard obtient de la chaleur et ses tics de ponctuation conservés.

---

## Piège : signaler les données manquantes en ligne, pas à la fin

**Pourquoi c'est important :** si PayPal n'a aucune transaction correspondante et que le brouillon dit « votre remboursement de 64,00 € est en cours de traitement », le dirigeant enverra une affirmation fausse. Les données manquantes doivent être visibles à l'endroit précis où elles affectent le message.

### ✗ Mauvais

Rédige la réponse comme si toutes les données étaient disponibles, puis ajoute une note de bas de page : « Note : je n'ai trouvé aucune transaction PayPal. »

### ✓ Bon

Insère l'avertissement de donnée manquante dans le brouillon, à la phrase exacte où il compte :

> Bonjour Sarah, merci de nous avoir contactés. J'ai examiné votre commande *[Note : aucune transaction PayPal trouvée pour cette adresse e-mail — vérifie l'ID de commande avant d'envoyer]* et je veux régler ça.

Le dirigeant voit le problème avant de cliquer sur envoyer.

---

## Piège : plusieurs transactions PayPal pour le même client

**Pourquoi c'est important :** un client avec deux commandes — l'une remboursée, l'autre non — casse une recherche par « la plus récente » et produit le mauvais brouillon.

### ✗ Mauvais

Choisir automatiquement la transaction la plus récente et continuer sans prévenir le dirigeant.

### ✓ Bon

Montre toutes les transactions correspondantes et mets en pause :

> *« J'ai trouvé 2 transactions PayPal pour ce client : (1) 49,00 € · 2026-03-14 · Terminé · (2) 129,00 € · 2026-04-01 · Terminé. De laquelle s'agit-il ? »*

Attends la confirmation du dirigeant avant de rédiger le brouillon.