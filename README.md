# generation_prompt_nano_banana

![License MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script-green)
![Runtime](https://img.shields.io/badge/Google%20Apps%20Script-V8-green)
![Author](https://img.shields.io/badge/Auteur-Fabrice%20Faucheux-orange)

**Générateur de Prompt (JSON) automatisé via Google Forms & Sheets.**

Ce projet permet de générer des prompts structurés au format JSON (optimisés pour des outils de génération d'images par IA comme Gemini ou Midjourney) à partir de réponses fournies dans un Google Form. Le résultat est formaté et envoyé par email via un script hébergé dans le tableur de réponses.

## 📂 Structure du projet

Le projet est divisé en deux scripts distincts pour plus de clarté :

1.  **`generation_formulaire.gs`** : Script utilitaire "One-shot". Il sert uniquement à créer le Google Form avec toutes les questions pré-configurées (Description, Style, Ratio, etc.).
2.  **`Code.gs`** : Le moteur du projet. Il doit être placé dans le **Google Sheet (Tableur)** qui reçoit les réponses. Il intercepte les nouvelles lignes, génère le JSON et envoie l'email.

## 🚀 Installation et configuration

### Étape 1 : Créer le Formulaire
1.  Créez un nouveau projet Apps Script autonome ("Stand-alone") ou un Google Doc temporaire.
2.  Copiez-y le code de `generation_formulaire.gs`.
3.  Exécutez la fonction `creerFormulaireFrancais()`.
4.  Récupérez l'URL d'édition du formulaire dans les logs (Affichage > Journal d'exécution).

### Étape 2 : Lier au tableur (Google Sheet)
1.  Ouvrez le formulaire créé.
2.  Allez dans l'onglet **Réponses**.
3.  Cliquez sur **Lier à Sheets** (l'icône verte) pour créer une nouvelle feuille de calcul de destination.

### Étape 3 : Installer le script  (`Code.gs`)
⚠️ **C'est l'étape cruciale.** Le script de traitement ne va pas dans le formulaire, mais dans le tableur.

1.  Ouvrez le **Google Sheet** nouvellement créé.
2.  Dans le menu, cliquez sur **Extensions** > **Apps Script**.
3.  Copiez le contenu du fichier `Code.gs` de ce dépôt dans l'éditeur.
4.  Sauvegardez le projet (`Ctrl + S`).

### Étape 4 : Activer le Déclencheur (Trigger)
Pour que le script réagisse automatiquement à chaque nouvelle réponse :
1.  Dans l'éditeur Apps Script (du Sheet), allez dans la section **Déclencheurs** (icône de réveil ⏰ sur la gauche).
2.  Cliquez sur **Ajouter un déclencheur** (bouton bleu en bas à droite).
3.  Configurez comme suit :
    * **Fonction à exécuter** : `onFormSubmit` (ou `soumettreFormulaire`).
    * **Déploiement** : `Tête` (Head).
    * **Source de l'événement** : `À partir de la feuille de calcul`.
    * **Type d'événement** : `Lors de l'envoi du formulaire`.
4.  Validez et acceptez les autorisations requises (accès à MailApp, SpreadsheetApp).

## 📝 Utilisation

Une fois configuré :
1.  L'utilisateur remplit le formulaire.
2.  Les données arrivent dans le Google Sheet.
3.  Le script `Code.gs` se déclenche instantanément.
4.  L'utilisateur reçoit un email contenant le prompt formaté en JSON prêt à l'emploi.

## 🛠️ Contenu technique

* **Extraction de données** : Nettoyage des chaînes et extraction intelligente (ex: récupération du ratio "16:9" depuis le libellé long).
* **JSON Templating** : Création d'un objet standardisé `prompt` / `parameters`.
* **Sécurité** : Vérification de la présence des champs nommés pour éviter les exécutions hors contexte.

## 📦 Structure du JSON (Réponse)

Le script joint l'image, mais fournit aussi ce JSON dans le corps du mail :

```json
{
    "action": "generate",
    "source": "Vertex AI (Imagen)",
    "prompt": {
        "full_text": "Un chien astronaute. Style artist: Cinématographique. Atmosphere: Néon..."
    },
    "parameters": {
        "aspect_ratio": "16:9"
    }
}
