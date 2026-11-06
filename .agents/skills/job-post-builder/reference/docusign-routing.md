# Acheminer la lettre de proposition vers DocuSign

Phase 6 uniquement, et seulement si l'utilisateur a choisi DocuSign en Phase 1.

Passe par Claude dans Chrome pour piloter l'interface de DocuSign, afin que le dirigeant
n'ait pas à toucher DocuSign à la main.

---

## La règle absolue

**L'enveloppe est enregistrée comme brouillon et jamais envoyée.** La Phase 6 ne franchit
pas « Save as draft » sans que l'utilisateur ait explicitement confirmé qu'il a relu
l'enveloppe et veut qu'elle parte. Une lettre de proposition qui arrive chez un candidat
avant que le dirigeant l'ait lue est irrécupérable.

---

## Pourquoi le navigateur et pas l'API

L'API DocuSign n'accepte un document que depuis un modèle déjà présent dans le compte, ou
depuis une URL qu'elle peut récupérer sans identifiants. Elle n'accepte pas de téléversement
de fichier. Une lettre de proposition nomme une personne et indique sa rémunération : la
mettre en ligne à une adresse accessible publiquement pour satisfaire le connecteur n'est
une option à aucun moment.

Le parcours navigateur contourne cela : le fichier est téléversé depuis la session
connectée de l'utilisateur, et rien n'est jamais publié. C'est pourquoi cette phase est
écrite comme un parcours d'interface.

---

## Le parcours navigateur

1. Navigue vers `https://app.docusign.com`. L'utilisateur doit déjà être connecté. Si un
   écran de connexion apparaît, mets-toi en pause et demande-lui de se connecter, puis
   continue.
2. Clique sur **Start**, puis **Send an Envelope**. Selon la version de l'interface, le
   libellé peut être **New** ou **Use a Template**.
3. **Téléverse la lettre de proposition.** Clique sur « Upload Documents » et téléverse le
   fichier `[Role]-Offer-Letter.docx` créé en Phase 5.
4. **Ajoute le signataire.** Dans Recipients, ajoute le candidat comme signataire avec le
   rôle « Signer ». Demande son nom et son adresse e-mail s'ils n'ont pas déjà été fournis.
5. **Ajoute l'expéditeur en copie (CC)** si l'utilisateur souhaite un exemplaire. Demande-lui
   en cas de doute.
6. **Renseigne l'objet :** `Offre d'embauche — [Intitulé du poste] chez [Nom de l'entreprise]`
7. **Ajoute un message.** Deux lignes chaleureuses au candidat, par son prénom : satisfait
   de prolonger l'offre, à relire et signer quand il peut, questions bienvenues.
8. **Place les champs de signature.** Sur le document, place un champ Signature et un champ
   Date Signed sur la ligne d'acceptation du candidat, en bas de la lettre.
9. **Enregistre comme brouillon.** N'envoie pas.

Puis transmets le lien du brouillon et demande à l'utilisateur de vérifier le placement des
signatures et de confirmer ici quand il est prêt à envoyer.

---

## Solution de repli

Si DocuSign est indisponible ou si le parcours navigateur échoue à une étape, rédige un
brouillon d'e-mail via le connecteur mail connecté (Gmail ou Microsoft 365), avec la lettre
de proposition en pièce jointe et une note demandant de la téléverser manuellement dans
DocuSign.

**Montre le brouillon à l'utilisateur avant l'envoi.** Le repli ne baisse pas le niveau
d'approbation ; c'est la même barrière, atteinte autrement.

Si aucune des deux voies ne fonctionne, le `.docx` sur le disque constitue un résultat
complet. Dis que l'acheminement n'a pas eu lieu et remets le fichier.