# generation_prompt_nano_banana

![License MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script-green)
![Runtime](https://img.shields.io/badge/Google%20Apps%20Script-V8-green)
![Author](https://img.shields.io/badge/Auteur-Fabrice%20Faucheux-orange)

**Générateur de Prompt (JSON) automatisé via Google Forms.**

Ce projet Google Apps Script permet de générer des prompts structurés au format JSON (optimisés pour des outils de génération d'images par IA) à partir de réponses simples fournies dans un Google Form. Le résultat est automatiquement formaté et envoyé par email à l'utilisateur.

## 🚀 Fonctionnalités Clés

* **Création Automatique de Formulaire** : Script dédié pour générer un Google Form complet avec toutes les questions nécessaires (Description, Style, Ambiance, Ratio, etc.).
* **Traitement Intelligent** : Nettoyage des entrées utilisateurs et extraction des métadonnées (ex: extraction du ratio "16:9" depuis une chaîne plus longue).
* **Génération JSON** : Construction d'un objet JSON standardisé contenant le prompt complet, les paramètres techniques et les exclusions (negative prompts).
* **Notification Email** : Envoi instantané du code JSON formaté (avec coloration syntaxique simulée) directement dans la boîte mail de l'utilisateur.

## 🛠️ Installation et Configuration

### Prérequis
* Un compte Google (Google Drive, Gmail).

### Installation Manuelle

1.  Créez un nouveau projet de script sur [script.google.com](https://script.google.com/).
2.  Copiez le contenu du fichier `Code.js` de ce dépôt dans l'éditeur Apps Script.
3.  Sauvegardez le projet (`Ctrl + S` ou `Cmd + S`).

### Configuration

#### Étape 1 : Créer le Formulaire
1.  Dans l'éditeur de script, sélectionnez la fonction `creerFormulaireFrancais` dans la barre d'outils.
2.  Cliquez sur **Exécuter**.
3.  Acceptez les autorisations demandées (accès à Forms, Drive, Mail).
4.  Une fois le script terminé, l'URL d'édition du formulaire s'affichera dans le journal d'exécution (Logger).

#### Étape 2 : Mettre en place le Déclencheur (Trigger)
Pour que le script réagisse à chaque réponse :
1.  Allez dans la section **Déclencheurs** (icône de réveil) du projet Apps Script.
2.  Cliquez sur **Ajouter un déclencheur**.
3.  Configurez comme suit :
    * Fonction à exécuter : `soumettreFormulaire` (ou `onFormSubmit`).
    * Déploiement : `Tête` (Head).
    * Source de l'événement : `À partir du formulaire`.
    * Type d'événement : `Lors de l'envoi du formulaire`.
4.  Sauvegardez.

## 📦 Structure du Projet

* `Code.js` : Contient la logique principale de réception des données et d'envoi d'email, ainsi que la fonction d'initialisation du formulaire.
* `README.md` : Documentation du projet.
* `LICENSE` : Licence MIT.

## 📝 Exemple de Sortie JSON

```json
{
    "action": "generate",
    "prompt": {
        "subject": "Un chien de type berger australien qui fait de la luge",
        "style": "Cinématographique",
        "atmosphere": "Heure Dorée (Lumière chaude du soir)",
        "full_text": "Un chien de type berger australien qui fait de la luge, style Cinématographique, ambiance Heure Dorée (Lumière chaude du soir). Haute résolution."
    },
    "parameters": {
        "aspect_ratio": "16:9",
        "negative_prompt": "flou, mauvaise qualité, texte, filigrane, déformé"
    }
}
