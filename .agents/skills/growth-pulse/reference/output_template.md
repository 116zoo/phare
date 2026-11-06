# Gabarit de sortie

Une page. L'histoire d'abord, les chiffres dessous, trois actions à la fin.

---

## Structure

```
## Pouls de croissance — <période>

<Une phrase : ce que cette période dit vraiment du moteur de croissance.>

### Les chiffres

**Revenu** — <valeur>, <écart> · <répartition par canal en une ligne>
**Leads** — <nombre>, <écart> · <première source>
**Taux de réussite** — <pourcentage>, <écart>
**Retour publicitaire** — <multiple> sur <dépense> · <coût par lead, avec tendance>
**Sentiment** — <score>, <écart> · <signal de litige ou de départ>

### Ce qui fonctionne

- <Précis, avec le chiffre>

### Ce qui ne fonctionne pas

- <Précis, avec le chiffre et la cause probable>

### Fais ces trois choses

1. **<Action>** — <pourquoi, en citant le chiffre> · <ce qu'elle vaut>
2. **<Action>** — <pourquoi> · <ce qu'elle vaut>
3. **<Action>** — <pourquoi> · <ce qu'elle vaut>

<Annexe : sources indisponibles cette fois, s'il y en a.>
```

Supprime toute section dépourvue de données. N'imprime jamais un en-tête vide.

---

## Exemple complet

```
## Pouls de croissance — Juillet

Le volume de leads est le meilleur de l'année, et l'entonnoir les perd à
l'étape du devis.

### Les chiffres

**Revenu** — 86 400 €, en hausse de 4 % par rapport à juin · 61 % direct, 24 % social payant, 15 % parrainage
**Leads** — 112, en hausse de 38 % par rapport à juin · le social payant est la première source avec 47
**Taux de réussite** — 11 %, en baisse depuis 19 %
**Retour publicitaire** — 2,1x sur 3 200 € · coût par lead 18 €, en baisse depuis 31 €
**Sentiment** — 4,4 étoiles, stable · 1 litige, sans changement

### Ce qui fonctionne

- Le social payant n'a jamais été aussi performant. Le coût par lead a chuté de
  42 % à 18 € et le volume a presque doublé. Le renouvellement des créations le
  12 juin en est très probablement la cause.
- Le revenu de parrainage est en hausse de 22 % sans aucune dépense derrière.

### Ce qui ne fonctionne pas

- 38 % de leads en plus ont produit 4 % de revenu en plus. L'entonnoir les perd :
  68 leads sont arrivés à l'étape du devis et 12 ont été conclus. C'est sur ce
  seul maillon que la croissance s'est évaporée.
- La première réponse médiane arrive à 31 heures. Les leads du social payant
  arrivent à toute heure et attendent une nuit entière.

### Fais ces trois choses

1. **Reprends le suivi après l'étape du devis.** 56 affaires chiffrées sont
   restées sans suite le mois dernier. Au montant moyen actuel de 740 € par
   affaire, en récupérer seulement un quart représente ~10 000 €. C'est le plus
   gros chiffre de la page.
2. **Réponds plus vite aux demandes entrantes.** 31 heures avant la première
   réponse sur des leads qui coûtent 18 € chacun. Des réponses le jour même
   déplaceraient probablement le taux de réussite plus que n'importe quelle
   nouvelle campagne.
3. **Maintiens la dépense social payant où elle est.** Elle fonctionne, mais ne
   passe pas encore à l'échelle — un mois de données supplémentaire dira si
   18 € par lead tient à plus fort volume.

Sources indisponibles cette fois : Google Ads (non connecté ici — exporte un CSV
et je l'ajouterai la prochaine fois).
```

Remarque la forme. Le titre nomme le problème. Les actions sont classées par
l'argent, pas par la facilité. La troisième action est un « ne fais rien pour
l'instant » délibéré, et c'est une vraie recommandation.

---

## Quand la réponse honnête est « stable »

Ne fabrique pas de drame. Un mois calme doit se lire calme :

```
## Pouls de croissance — Juillet

Rien n'a beaucoup bougé. Revenu, leads et taux de réussite ne s'écartent que de
quelques points par rapport à juin, et le sentiment est inchangé.

...

### Fais ces trois choses

1. **Rien d'urgent cette semaine.** Le moteur est stable. La seule chose qui
   mérite d'être surveillée est la part du parrainage, qui progresse depuis
   trois mois d'affilée sans aucun effort derrière elle — cela vaut un test
   délibéré le mois prochain.
```

Un pouls qui fabrique trois actions urgentes chaque semaine apprend au dirigeant
à ne plus le lire.

---

## Quand des données manquent

Nomme-le une fois, en bas, et dis ce qui le corrigerait :

```
Sources indisponibles cette fois : HubSpot (authentification expirée —
reconnecte et la conversion de l'entonnoir revient), Google Ads (non connecté
ici — exporte le CSV des campagnes).
```

Ne fais jamais apparaître une erreur de connecteur au milieu du brief, et ne
laisse jamais une source manquante supprimer une section sans un mot.