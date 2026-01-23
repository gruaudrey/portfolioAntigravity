const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'constants.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remplacer l'image base64 du projet 2
content = content.replace(/"imageUrl":\s*"data:image\/png;base64,[^"]+"/g, '"imageUrl": PHOTO_PROJET_2');

// 2. Corriger les accents
content = content.replace(/AvancÃ©/g, 'Avancé')
    .replace(/IntermÃ©diaire/g, 'Intermédiaire')
    .replace(/SystÃ¨mes/g, 'Systèmes')
    .replace(/ModÃ¨les/g, 'Modèles')
    .replace(/StratÃ©gie/g, 'Stratégie')
    .replace(/CrÃ©ation/g, 'Création')
    .replace(/PÃ©dagogie/g, 'Pédagogie')
    .replace(/PÃ©dagogique/g, 'Pédagogique')
    .replace(/MÃ©thode/g, 'Méthode');

// 3. Ajouter INITIAL_TOOLS si manquant
if (!content.includes('export const INITIAL_TOOLS')) {
    content += `

export const INITIAL_TOOLS: Tool[] = [
  {
    id: '1',
    name: 'VS Code',
    icon: 'code',
    category: 'Développement'
  },
  {
    id: '2',
    name: 'Git',
    icon: 'git-branch',
    category: 'Développement'
  }
];
`;
}

// 4. Assurer les imports
if (!content.includes('import { PHOTO_PROJET_2 }')) {
    content = "import { PHOTO_PROJET_2 } from './photoProjet2';\n" + content;
}
if (!content.includes('import { PHOTO_DATA }')) {
    content = "import { PHOTO_DATA } from './photo';\n" + content;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fichier constants.ts réparé avec succès.');
