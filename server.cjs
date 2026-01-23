
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/save', (req, res) => {
    const data = req.body;

    if (!data || !data.profile || !data.projects || !data.skills || !data.tools) {
        return res.status(400).send('Données incomplètes');
    }

    // Reconstruction du fichier constants.ts
    // On utilise JSON.stringify pour formater les données
    const fileContent = `import { Profile, Project, Skill, SkillLevel, SkillCategory, Tool, ToolCategory } from './types';

export const INITIAL_PROFILE: Profile = ${JSON.stringify(data.profile, null, 2)};

export const INITIAL_PROJECTS: Project[] = ${JSON.stringify(data.projects, null, 2)};

export const INITIAL_SKILLS: Skill[] = ${JSON.stringify(data.skills, null, 2)};

export const INITIAL_TOOLS: Tool[] = ${JSON.stringify(data.tools, null, 2)};
`;

    try {
        fs.writeFileSync(path.join(__dirname, 'constants.ts'), fileContent, 'utf8');
        console.log('constants.ts mis à jour avec succès !');
        res.status(200).send('Sauvegarde réussie');
    } catch (error) {
        console.error('Erreur lors de l\'écriture du fichier:', error);
        res.status(500).send('Erreur serveur');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur de sauvegarde démarré sur http://localhost:${PORT}`);
});
