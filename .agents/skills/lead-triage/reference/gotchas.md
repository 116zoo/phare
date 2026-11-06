# Cas limites — lead-triage

---

## Piège : « Pipeline » seul déclenche le scoring complet alors que l'utilisateur veut juste un état des lieux

**Pourquoi c'est important :** « Pipeline » seul est ambigu — le dirigeant peut vouloir les totaux par étape d'affaires, pas une liste d'appels notée.

### ✗ À éviter
```
Utilisateur : « comment va mon pipeline ? »
Claude : [lance le scoring complet, renvoie une liste de 12 leads classés]
```

### ✓ À faire
```
Utilisateur : « comment va mon pipeline ? »
Claude : « Vue rapide du pipeline (étapes des affaires + valeur totale) ou
         liste d'appels priorisée pour aujourd'hui ? »
```

---

## Piège : des données d'engagement périmées gonflent les scores

**Pourquoi c'est important :** `hs_email_open` est cumulatif — des ouvertures
issues d'une campagne vieille d'un an font passer un lead froid pour un lead
chaud.

### ✗ À éviter
```
Le lead a 20 ouvertures (toutes d'il y a 11 mois). Il obtient 25/25 sur
l'engagement.
Il ressort en #1. Le dirigeant l'appelle ; le lead n'a aucun souvenir de la marque.
```

### ✓ À faire
```
Plafonne les signaux d'engagement à 30 jours. Si tous les signaux datent de
plus de 30 jours, score d'engagement = 0 et point de discussion :
« Les signaux d'engagement sont périmés (dernier : [date]) — à traiter
comme une prospection à froid. »
```

---

## Piège : les clients apparaissent dans la liste de leads

**Pourquoi c'est important :** appeler un `Customer` ou un `Evangelist` comme
prospect est gênant.

### ✗ À éviter
```
Filtre de cycle de vie non appliqué → un client existant apparaît en #2 sur la liste.
```

### ✓ À faire
```
Filtre strictement : lifecyclestage = Lead ou MQL uniquement.
Si un contact a un cycle de vie vide, l'inclus avec un indicateur d'alerte :
« ⚠ Cycle de vie non défini — vérifie qu'il s'agit bien d'un lead avant d'appeler. »
```

---

## Piège : proposer des créneaux qui entrent en conflit avec des événements existants

**Pourquoi c'est important :** proposer un horaire où le dirigeant est déjà
booké détruit immédiatement la confiance.

### ✗ À éviter
```
Claude propose « mardi 14 h – 14 h 30 » sans vérifier Calendar.
Le dirigeant a déjà un appel client sur ce créneau.
```

### ✓ À faire
```
Récupère les événements Calendar des deux prochains jours ouvrés avant de
proposer le moindre créneau.
Ne propose que des fenêtres sans événement existant, avec une marge de ±15 minutes.
Si aucune fenêtre libre n'existe, dis-le et propose de chercher plus loin.
```