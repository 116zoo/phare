# DocuSign : récupérer les contrats à analyser

Utilise le connecteur MCP DocuSign pour récupérer les enveloppes en attente de signature.

## Récupérer les enveloppes en attente

Utilise `getEnvelopes` pour lister les enveloppes au statut `sent` ou `delivered` (en attente d’action du destinataire) :

```
Outil : getEnvelopes
Params : { status: "sent" }  // ou "delivered"
```

Renvoie une liste d’enveloppes avec : `envelopeId`, `emailSubject`, `createdDateTime`, `status`, `recipients`.

## Télécharger le document depuis l’enveloppe

Utilise `getEnvelope` avec l’`envelopeId` pour obtenir le détail complet de l’enveloppe, puis télécharge le document pour le lire.

## Ce qu’il ne faut PAS faire

- N’appelle jamais `triggerWorkflow` ni aucune action qui fait avancer l’enveloppe dans le processus de signature.
- N’appelle jamais `updateEnvelope` pour modifier le document.
- N’appelle jamais `createEnvelope` — ce skill ne fait que la revue.

## Repli

Si DocuSign n’est pas connecté ou si l’enveloppe est introuvable :

```
« DocuSign n’est pas connecté — colle le texte du contrat ou joins le fichier
directement. »
```
