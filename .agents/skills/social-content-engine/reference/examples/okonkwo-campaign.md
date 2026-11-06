# Exemple déroulé — Okonkwo Mechanical, juillet

Ray Okonkwo dirige Okonkwo Mechanical, une entreprise de CVC de quatre
techniciens. Canva Pro est connecté. Pas de Shopify (c'est une entreprise de
services, pas du commerce). HubSpot est sur Starter : la programmation social
n'est donc pas disponible et c'est le chemin CSV qui s'exécute.

Le profil de voix est déjà construit et c'est celui de
`../../../../shared/voice-profile.md` : phrases courtes, contractions,
« le boulot » plutôt que « solutions », jamais « contacte-nous ».

---

## Exécution 1 — le calendrier permanent

```
Dirigeant : « On est absents sur Facebook. Tu peux nous faire republier ? »
```

Ouvre le calendrier existant. Il n'y en a pas encore, dis-le donc et fixe un
rythme avant de rédiger quoi que ce soit :

```
Rien en fichier pour l'instant : c'est le premier calendrier.

Vous êtes quatre techniciens avec une personne à l'administration, donc trois
posts par semaine c'est réaliste et deux c'est confortable. Je partirais sur
deux, et j'ajouterais le troisième une fois que c'est calé. Ça te va ?
```

Ray choisit deux par semaine sur 30 jours, Facebook et Instagram. Huit posts,
plus un email sur les renouvellements de contrat d'entretien.

Calendrier présenté, avec la colonne Path qui fait son travail :

| Date | Canal | Path | Thème | Type de visuel | Angle |
|---|---|---|---|---|---|
| 8 juil. | Instagram fil | Canva (social) | Utile | Post carré | « ce que signifie ce bruit de ferraille » |
| 8 juil. | Facebook | Réutilisation du post IG du 8 juil. | Utile | 1200×630 | identique |
| 11 juil. | Email | Texte seul | Offre | Corps d'email | « ton contrat se renouvelle le 1er août » |
| 15 juil. | Instagram fil | Canva (social) | Preuve | Post carré | Installation Kirby Street, avant / après |
| 18 juil. | Instagram fil | Canva (social) | Offre | Post carré | « les créneaux de révision de juillet sont ouverts » |
| 22 juil. | Instagram fil | Canva (social) | Humain | Post carré | Marcus rejoint l'équipe |
| 25 juil. | Instagram fil | Canva (social) | Utile | Post carré | « pourquoi l'étage est toujours plus chaud » |
| 29 juil. | Instagram fil | Canva (social) | Preuve | Post carré | Plan commercial six bâtiments |

Redire la répartition avant de continuer :

```
Six lignes passent par Canva. Une ligne est une réutilisation du design du
8 juil., elle ne coûte donc aucune génération. Une ligne est un email en texte
seul. Je verrouille ? »
```

---

## Le budget de génération

```
Budget de génération pour ce lot :
  Lignes Canva :         6
  Candidats par ligne :  3
  Total de designs :     18
  Appels API (approx.) : ~90

La limite de Canva est de 100 requêtes par minute. En traitant une ligne à la
fois avec 30 secondes d'écart, cela prend environ 2 minutes. Je lance ?
```

Ray dit oui au réglage par défaut. Verrouillé à 3 pour la session.

---

## Inventaire des emplacements — là où le premier problème est apparu

Le post de preuve du 15 juil. utilise un template avant/après à deux images. Ray
a envoyé une photo.

```
Le template avant/après a 2 emplacements d'image — Before_Image et
After_Image. Tu m'as envoyé une photo (kirby_after.jpg). Comment remplir
Before_Image ?

  1. Tu m'envoies la photo « avant »
  2. On passe sur un template mono-image pour ce post
```

Il retrouve la photo d'avant. Les deux téléversements sont sondés jusqu'au
succès, les deux ID d'asset sont notés, et seulement ensuite la génération
démarre. Sans cela, le deuxième emplacement aurait affiché un paysage générique
et le post aurait paru terminé.

---

## Génération, ligne par ligne

La ligne 1 déclenche trois candidats en parallèle, exporte les trois en PNG
permanents, et chacun est regardé. Le candidat 2 revient avec le titre en texte
lorem par défaut du template — c'est ce seul candidat qui est régénéré, pas la
ligne. Trois bonnes options sont présentées en un seul carrousel, Ray en choisit
une, puis 30 secondes de pause avant la ligne 2.

À la ligne 4, Canva renvoie une erreur de limite de débit. Premier cas de la
session : on attend 60 secondes et on rejoue ce seul candidat. Ça passe. Rien
n'est annoncé à Ray pour un pic transitoire ; cela coûte une minute et aucune
décision.

S'il y avait eu un second cas, l'exécution se serait arrêtée et aurait demandé :

```
Canva nous bride. Où on en est :
  Générés :  posts 1-4 (12 designs)
  Restants : posts 5-6 (6 designs pas encore générés)

  1. Passer à un seul candidat pour les deux derniers — terminé maintenant
  2. Faire une pause et reprendre dans une heure quand le quota se recharge
  3. S'arrêter ici et passer aux textes avec ce qu'on a
```

---

## Les textes, dans la voix de Ray

Ancré sur le profil avant chaque texte, pas seulement avant le premier.

8 juil., Instagram :

```
Ce bruit de ferraille quand la clim se déclenche, c'est généralement la
turbine, pas le compresseur. Réparation peu coûteuse si tu le prends tôt.
Coûteuse sinon.

Si le tien fait ça, envoie-nous une vidéo — on arrive souvent à trancher au son.

#hvac #okonkwomechanical #entretienmaison
```

Phrases courtes, contractions, on va droit au but dès la deuxième ligne. Ce qu'il
ne dit pas : « contacte-nous », « on est ravis », « solutions ». Ces mots sont sur
sa liste d'interdits, et ce sont les premiers qu'il aurait signalés.

11 juil., email, texte seul, pas de Canva à proximité :

```
Objet : Ton contrat d'entretien se renouvelle le 1er août
Pré-en-tête : Rien à faire sauf si tu veux le changer

Bonjour Dana,

Réponse directe : ton contrat se renouvelle le 1er août au même tarif que
l'an dernier. Rien à faire de ton côté.

Si tu as ajouté un appareil ou si tu veux passer sur le contrat commercial,
dis-le-moi avant le 25 et je l'ajuste.

Merci, Ray
```

---

## Programmation

HubSpot Starter signifie pas de programmation social, donc c'est le chemin CSV
qui s'exécute :

```
Ton abonnement HubSpot n'inclut pas la programmation social, voici donc un CSV
que tu peux importer dans Buffer ou Later — mêmes dates, mêmes textes, mêmes
images :

  content-calendar-july.csv

Deux choses à savoir avant l'import :
  - La ligne Facebook du 8 juil. réutilise l'image Instagram, recadrée en 1200×630
  - Rien n'est publié tant que tu n'as pas importé le fichier et lancé la
    programmation

L'email du 11 juil. est ci-dessus. Colle-le dans ton outil d'email quand tu
seras prêt — je ne l'ai mis en file nulle part.
```

---

## Exécution 2 — trois semaines plus tard

Le calendrier est ouvert d'abord, pas reconstruit :

```
Depuis la dernière fois :
  Publiés :      6 posts (8 juil. – 25 juil.)
  Encore en file : 2 posts (jusqu'au 29 juil.)
  Trou à partir du : 30 juil.

L'avant/après de Kirby Street a nettement été le post le plus commenté.
Je complète à partir du 30 juil. avec plus de posts de preuve, toujours deux
par semaine ?
```

C'est toute la différence entre un générateur de campagnes et une opération de
contenu.