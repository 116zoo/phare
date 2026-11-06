# Pièges

Modes de défaillance connus du skill business-pulse. Paires mauvais / bon.

---

## Piège : QuickBooks renvoie un état inattendu

**Pourquoi c'est important :** QuickBooks peut renvoyer des résultats vides, un état
de synchronisation en cours ou une erreur d'authentification sans lever d'exception
franche. Traiter le silence comme « pas de données » fait sauter la section Trésorerie
en entier sans prévenir le dirigeant — il suppose alors que son entreprise n'a aucune
donnée QuickBooks.

### ✗ Mauvais

```
Claude : [QuickBooks renvoie une réponse vide]
         → saute silencieusement la section Trésorerie
         → le pouls ne présente aucune donnée de trésorerie ; le dirigeant conclut que QB n'est pas connecté
```

Le dirigeant passe 10 minutes à reconnecter QuickBooks avant de réaliser qu'il était
bien connecté — juste dans un état transitoire.

### ✓ Bon

```
Claude : [QuickBooks renvoie une réponse vide ou une erreur]
         → en-tête de la section Trésorerie présent avec : « non disponible — QuickBooks indisponible (erreur de synchronisation ou authentification requise) »
         → « Sources indisponibles : QuickBooks — réponse vide renvoyée » en annexe
```

Le dirigeant voit le manque explicitement et peut décider de reconnecter ou de
poursuivre avec un pouls partiel.

---

## Piège : échec d'authentification Gmail en cours de pouls

**Pourquoi c'est important :** l'authentification Gmail est instable par intermittence.
Faire apparaître une erreur d'authentification brute au milieu du pouls donne l'impression
que tout est cassé et détruit la confiance du dirigeant dans le skill.

### ✗ Mauvais

```
Claude : [erreur d'authentification Gmail au milieu de la composition]
         → « Erreur : l'authentification Gmail a échoué. Merci de te ré-authentifier. »
         → la sortie du pouls s'arrête ou affiche l'erreur brute dans la section Liste de surveillance
```

Le dirigeant voit un outil cassé, pas un briefing utile.

### ✓ Bon

```
Claude : [erreur d'authentification Gmail]
         → poursuit le pouls sans la section Liste de surveillance
         → annexe : « Gmail — erreur d'authentification ; Liste de surveillance indisponible cette fois »
         → toutes les autres sections restent intactes
```

Le pouls livre quand même de la valeur. Le dirigeant est informé, pas alarmé.

---

## Piège : demander la permission avant d'extraire les données

**Pourquoi c'est important :** la valeur centrale du skill, c'est de faire le travail
sans rebuke. Un dirigeant qui a lancé le pouls a déjà implicitement autorisé
l'extraction. Demander « dois-je vérifier QuickBooks ? » ou « ai-je le droit de lire tes
e-mails ? » vide le skill de son intérêt et détruit la confiance que le dirigeant
accorde à un assistant autonome.

### ✗ Mauvais

```
Dirigeant : « reprends-moi l'état de l'entreprise »
Claude : « Dois-je vérifier QuickBooks pour ta trésorerie ? Et ai-je le droit de regarder ton pipeline HubSpot ? »
```

Trois allers-retours supplémentaires avant que quoi que ce soit d'utile ne soit livré.

### ✓ Bon

```
Dirigeant : « reprends-moi l'état de l'entreprise »
Claude : [déclenche immédiatement tous les appels d'outils parallèles]
         → présente le pouls en une seule réponse
```

---

## Piège : l'écriture sur Slack exige une confirmation explicite

**Pourquoi c'est important :** une écriture sur Slack publie dans des canaux que
d'autres personnes voient. Publier automatiquement sans confirmation pourrait mettre le
dirigeant dans l'embarras ou inonder une équipe.

### ✗ Mauvais

```
Claude : [à la fin du pouls]
         « Je l'ai publié dans #general. »
```

Le dirigeant n'a jamais demandé de publication Slack ; toute l'équipe a maintenant les
données financières.

### ✓ Bon

```
Claude : [à la fin du pouls]
         « Veux-tu que je le publie sur Slack ? Si oui, quel canal ? »
```

L'écriture sur Slack n'a lieu qu'après un « oui + nom du canal » précis du dirigeant.
Ne suppose jamais.