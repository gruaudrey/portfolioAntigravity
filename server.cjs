
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

    // Gestion de la photo séparée
    const photoData = data.profile.photoUrl;
    if (photoData && photoData.startsWith('data:')) {
        const photoContent = `export const PHOTO_DATA = "${photoData}";`;
        try {
            fs.writeFileSync(path.join(__dirname, 'photo.ts'), photoContent, 'utf8');
        } catch (e) {
            console.error("Erreur ecriture photo.ts", e);
        }
    }

    // Préparation du profil pour constants.ts sans la photo en dur
    const profileForConstants = { ...data.profile };
    profileForConstants.photoUrl = "%%%PHOTO_DATA%%%";

    const profileString = JSON.stringify(profileForConstants, null, 2).replace('"%%%PHOTO_DATA%%%"', 'PHOTO_DATA');

    // Reconstruction du fichier constants.ts
    const fileContent = `import { Profile, Project, Skill, SkillLevel, SkillCategory, Tool, ToolCategory } from './types';
import { PHOTO_DATA } from './photo';

export const INITIAL_PROFILE: Profile = ${profileString};

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
