function creerFormulaireFrancais() {
  // 1. Création du formulaire avec titre en français
  const form = FormApp.create('Générateur de Prompt (JSON)');
  form.setDescription('Remplissez ce formulaire pour recevoir votre code JSON formaté par email.');

  // 2. Question : Description (Paragraphe)
  form.addParagraphTextItem()
      .setTitle('Description du sujet')
      .setHelpText('Décrivez ce que l\'image doit représenter (ex: un chat astronaute sur la lune).')
      .setRequired(true);

  // 3. Question : Style (Liste Déroulante traduite)
  const styleItem = form.addListItem();
  styleItem.setTitle('Style Artistique')
           .setChoiceValues([
             'Photoréaliste', 
             'Cinématographique', 
             'Anime / Manga', 
             'Art Numérique (Digital Art)', 
             'Peinture à l\'huile', 
             'Aquarelle', 
             'Cyberpunk', 
             'Steampunk', 
             'Rendu 3D (Unreal Engine)', 
             'Concept Art',
             'Pixel Art',
             'Macro Photographie',
             'Minimaliste',
             'Fantasy / Médiéval'
           ])
           .setRequired(true);

  // 4. Question : Ambiance / Lumière (Liste Déroulante traduite)
  const moodItem = form.addListItem();
  moodItem.setTitle('Ambiance & Éclairage')
          .setChoiceValues([
             'Standard / Équilibrée',
             'Heure Dorée (Lumière chaude du soir)',
             'Heure Bleue (Crépuscule)',
             'Sombre & Moody (Dramatique)',
             'Néon / Futuriste',
             'Éclairage Studio (Propre)',
             'Lumière Volumétrique (Rayons divins)',
             'Tons Pastel (Douceur)',
             'Horreur / Angoissant',
             'Lumière Naturelle'
          ])
          .setRequired(true);

  // 5. Question : Format / Ratio
  const ratioItem = form.addListItem();
  ratioItem.setTitle('Format de l\'image')
           .setChoiceValues([
             '16:9 (Paysage / Cinéma)', 
             '1:1 (Carré / Instagram)', 
             '9:16 (Portrait / Story / TikTok)', 
             '4:3 (Photo classique)', 
             '21:9 (Ultra-Large)'
           ])
           .setRequired(true);

  // 6. Question : Negative Prompt
  form.addParagraphTextItem()
      .setTitle('Exclusions (Negative Prompt)')
      .setHelpText('Ce que vous ne voulez PAS voir (ex: flou, texte, déformé). Laissez vide si sans importance.');

  // 7. Question : Email
  const emailItem = form.addTextItem();
  emailItem.setTitle('Votre adresse Email')
           .setRequired(true);
  
  // Validation pour forcer une adresse email valide
  const emailValidation = FormApp.createTextValidation()
      .setHelpText('Merci d\'entrer une adresse email valide.')
      .requireTextIsEmail()
      .build();
  emailItem.setValidation(emailValidation);

  Logger.log('Formulaire FR créé : ' + form.getEditUrl());
}
