# Gmail : trouver les pièces jointes de contrat

Utilise le connecteur MCP Gmail pour trouver les pièces jointes de contrat dans les e-mails récents.

## Chercher les e-mails de contrat

Utilise `search_threads` avec une requête ciblant les e-mails récents porteurs d’une pièce jointe :

```
Requête : "has:attachment (contract OR agreement OR NDA OR MSA OR SOW) newer_than:14d"
```

## Que faire des résultats

1. Présente une liste courte (objet, expéditeur, date) si plusieurs candidats correspondent.
2. Demande à l’utilisateur de confirmer lequel avant de télécharger.
3. Utilise `get_thread` pour récupérer le fil complet, puis localise et lis la pièce jointe.

## Repli

Si Gmail n’est pas connecté ou si aucune pièce jointe correspondante n’est trouvée :

```
« Je n’ai trouvé aucune pièce jointe de contrat récente dans Gmail — peux-tu la
transmettre ou joindre le fichier directement ? »
```

## Ce qu’il ne faut PAS faire

- Ne lis pas des e-mails sans rapport avec le contrat (pas de fouille générale de la boîte de réception).
- N’envoie aucune réponse et ne rédige aucun e-mail pendant le flux de revue.
