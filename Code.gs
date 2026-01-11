function onFormSubmit(e) {
  // Sécurité : Si on lance le script manuellement (sans passer par le formulaire), on arrête.
  if (!e || !e.namedValues) {
    Logger.log("Erreur : Ce script doit être déclenché par l'envoi du formulaire.");
    return;
  }

  const answers = e.namedValues;
  
  // Fonction utilitaire pour récupérer une valeur sans planter
  // Elle nettoie aussi les réponses (enlève les espaces vides)
  const getVal = (key, defaultVal = "") => {
    return (answers[key] && answers[key][0]) ? answers[key][0].trim() : defaultVal;
  };

  // --- RÉCUPÉRATION DES DONNÉES (CORRIGÉE) ---
  
  // 1. Description
  const description = getVal('Description du sujet');
  
  // 2. Style
  const style = getVal('Style Artistique', 'Cinématographique');
  
  // 3. Ambiance
  const mood = getVal('Ambiance & Éclairage', 'Standard');
  
  // 4. Format (Extraction du ratio ex: "16:9")
  let rawRatio = getVal('Format de l\'image', '16:9');
  const ratio = rawRatio.split(' ')[0]; 

  // 5. Negative Prompt (C'est ici qu'était l'erreur précédente)
  const negative = getVal('Exclusions (Negative Prompt)');
  
  // 6. Email
  const emailRecipient = getVal('Votre adresse Email');

  // Si pas d'email, on arrête tout
  if (!emailRecipient) return;

  // --- CRÉATION DU JSON ---
  
  const promptData = {
    "action": "generate",
    "prompt": {
      "subject": description,
      "style": style,
      "atmosphere": mood,
      "full_text": `${description}, style ${style}, ambiance ${mood}. Haute résolution.`
    },
    "parameters": {
      "aspect_ratio": ratio,
      "negative_prompt": negative || "flou, mauvaise qualité, texte, filigrane, déformé"
    }
  };

  const jsonString = JSON.stringify(promptData, null, 4);

  // --- ENVOI EMAIL ---
  
  const subject = "🎨 Votre Prompt JSON est prêt";
  const htmlBody = `
    <div style="font-family: sans-serif; color: #333;">
      <h3>Bonjour, voici votre prompt généré :</h3>
      <p><strong>Sujet :</strong> ${description}</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
        <pre style="white-space: pre-wrap; font-family: monospace; color: #0066cc;">${jsonString}</pre>
      </div>
      <p style="font-size: 0.9em; color: #666;">Copiez le code bleu ci-dessus.</p>
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: emailRecipient,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (error) {
    Logger.log("Erreur d'envoi d'email : " + error.toString());
  }
}
