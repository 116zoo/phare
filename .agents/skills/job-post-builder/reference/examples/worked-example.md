# Exemple travaillé : Senior Product Manager

## Entrée

Message de l'utilisateur :
> « Nous devons recruter un Senior Product Manager pour notre équipe paiements. Il/elle portera
> la feuille de route de notre expérience de paiement. Nous voulons 5 ans minimum d'expérience
> en product management, idéalement avec un background fintech ou paiements. Télétravail possible,
> Paris de préférence. Rémunération : 160 000 – 185 000 € brut annuel. Trois tours d'entretien :
> présélection par le recruteur, approfondissement avec le responsable du recrutement, et un jury
> avec deux seniors PM. Envoie la proposition par DocuSign quand on y sera. »

---

## Phase 1 — Ce que Claude extrait

| Champ | Valeur |
|---|---|
| Intitulé du poste | Senior Product Manager |
| Équipe / périmètre | Équipe paiements |
| Responsabilités clés | Porter la feuille de route de l'expérience de paiement |
| Indispensables | 5 ans minimum d'expérience en product management |
| Souhaitables | Background fintech ou paiements |
| Lieu | Télétravail possible, Paris de préférence |
| Rémunération | 160 000 – 185 000 € brut annuel |
| Processus d'entretien | 3 tours : présélection recruteur, approfondissement RR, jury de 2 seniors PM |
| Remise de l'offre | DocuSign |

Claude confirme et pose exactement une question :
> « C'est noté — dossier de recrutement pour un senior PM sur l'équipe paiements,
> 160 000 – 185 000 €, télétravail, Paris. Une question avant de commencer : as-tu une offre
> d'emploi ou un modèle de lettre de proposition que je devrais utiliser comme point de
> départ, ou je construis de zéro ? »

---

## Sortie attendue

### `Senior-PM-Job-Post.docx`

La structure suit `../job-post-structure.md` :

1. **Accroche d'ouverture** — Pourquoi ce poste existe maintenant : l'équipe paiements
   industrialise l'expérience de paiement et a besoin de quelqu'un qui porte la feuille de
   route de bout en bout.
2. **À propos de l'entreprise** — 3 à 4 phrases (Claude demande ou déduit du contexte).
3. **À propos du poste** — À quoi ressemble la réussite dans 12 mois : un paiement plus
   rapide et plus fiable, avec un taux de conversion mesurablement supérieur.
4. **Ce que tu feras** — 5 à 6 puces, menées par des verbes d'action (par exemple « Porte
   la feuille de route du paiement, de la découverte au lancement… »).
5. **Ce que nous cherchons** — Requis : 5 ans minimum d'expérience PM, aisance avec la
   donnée, forte communication écrite. Souhaité : expérience du domaine fintech ou
   paiements.
6. **Rémunération** — 160 000 – 185 000 € de salaire brut annuel.
7. **Comment postuler** — Une phrase.

Longueur cible : 500 à 650 mots.

---

### `Senior-PM-Interview-Guide.docx`

La structure suit `../interview-guide-structure.md` :

- **Résumé du poste** — un paragraphe qui rappelle aux intervieweurs ce qu'ils évaluent.
- **Carte des étapes** — 3 étapes, un intervieweur par étape, une compétence par étape.
- **Étape 1 : présélection recruteur** — Communication, adéquation de base, logistique.
  Les questions portent sur le récit de carrière et la logistique (rémunération, date de
  début, organisation du télétravail).
- **Étape 2 : approfondissement avec le responsable du recrutement** — Prise en charge de la
  feuille de route, contexte des paiements, priorisation sous contrainte. 5 à 6 questions
  comportementales ; 2 à 3 relances chacune.
- **Étape 3 : jury de deux seniors PM** — Réparti entre les deux membres. Le membre A porte
  le jugement produit (comment ils arbitrent) ; le membre B porte la collaboration
  transverse (comment ils travaillent avec l'ingénierie et le design). Les questions sont
  attribuées à l'avance pour que le candidat n'ait pas à répondre deux fois à la même chose.
- **Grille de notation** — Ancres 1/3/5 écrites spécifiquement pour un PM paiements (pas
  génériques). Exemple pour « Prise en charge » : 5 = a identifié de lui-même un mode de
  défaillance du paiement que personne ne lui avait demandé de suivre, a piloté le correctif,
  a documenté pour l'équipe.
- **Guide de débrief** — Les intervieweurs partagent leurs notes avant la discussion ; le
  débrief se concentre sur les notes divergentes.

---

### `Senior-PM-Offer-Letter.docx`

Fondé sur `../offer-letter-template.md`. Pré-rempli dès que la donnée existe :

| Champ | Valeur |
|---|---|
| `[INTITULÉ DU POSTE]` | Senior Product Manager |
| `[SALAIRE ANNUEL]` | `160 000 – 185 000 € — confirmer le montant exact avec la RH avant l'envoi` |
| `[NOM COMPLET DU CANDIDAT]` | Laisser vide |
| `[DATE DE DÉBUT PROPOSÉE]` | Laisser vide |
| `[DATE D'EXPIRATION DE L'OFFRE]` | Laisser vide |
| Clause de résiliation à tout moment | Incluse |
| Mention de relecture juridique | Incluse |

---

## Phase 6 — Parcours navigateur attendu

1. Claude navigue vers `https://app.docusign.com` et vérifie l'état de connexion.
2. Clique sur « Start → Send an Envelope ».
3. Téléverse `Senior-PM-Offer-Letter.docx`.
4. Demande : « Quel est le nom complet et l'adresse e-mail du candidat ? »
5. Ajoute le candidat comme Signer ; ajoute l'utilisateur en CC si demandé.
6. Renseigne l'objet : `Offre d'embauche — Senior Product Manager chez [Nom de l'entreprise]`.
7. Place les champs Signature et Date Signed sur la ligne d'acceptation.
8. Enregistre comme brouillon — N'envoie PAS.
9. Renvoie l'URL du brouillon et dit à l'utilisateur de relire avant de confirmer l'envoi.

**Critères de réussite :** l'utilisateur ouvre l'URL du brouillon, voit le placement correct
des signatures, et peut envoyer en un clic. Le statut de l'enveloppe reste « Draft » tant
que l'utilisateur n'agit pas.