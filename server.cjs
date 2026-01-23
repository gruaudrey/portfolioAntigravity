
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

    // 1. Gestion de la photo de profil
    const photoData = data.profile.photoUrl;
    if (photoData && photoData.startsWith('data:')) {
        const photoContent = `export const PHOTO_DATA = "${photoData}";`;
        try { fs.writeFileSync(path.join(__dirname, 'photo.ts'), photoContent, 'utf8'); } catch (e) { console.error(e); }
    }
    const profileForConstants = { ...data.profile };
    profileForConstants.photoUrl = "%%%PHOTO_DATA%%%";

    // 2. Gestion de l'image du Projet 2 (Chunker Pro)
    // On travaille sur une copie des projets pour ne pas modifier l'objet original si besoin
    const projectsForConstants = JSON.parse(JSON.stringify(data.projects));
    const projet2 = projectsForConstants.find(p => p.id === "2");

    if (projet2 && projet2.imageUrl && projet2.imageUrl.startsWith('data:')) {
        const p2Content = `export const PHOTO_PROJET_2 = "${projet2.imageUrl}";`;
        try { fs.writeFileSync(path.join(__dirname, 'photoProjet2.ts'), p2Content, 'utf8'); } catch (e) { console.error(e); }
        projet2.imageUrl = "%%%PHOTO_PROJET_2%%%";
    } else if (projet2 && !projet2.imageUrl) {
        // Si pas d'image ou url normale, on laisse ou on remet la variable si c'est ce qu'on veut (ici on gère le cas base64 entrant)
    }
    // Si l'utilisateur n'a pas touché à l'image, elle est peut-être revenue comme "%%%PHOTO_PROJET_2%%%" (peu probable via l'admin qui envoie ce qu'il a)
    // L'admin envoie TOUJOURS la "vraie" donnée (base64) car il l'a chargée. Donc le test startsWith('data:') fonctionnera à chaque sauvegarde si l'image est là.


    // 3. Préparation des chaines avec remplacement des marqueurs
    const profileString = JSON.stringify(profileForConstants, null, 2).replace('"%%%PHOTO_DATA%%%"', 'PHOTO_DATA');
    // On remplace le marqueur du projet 2 dans tout le tableau JSON
    const projectsString = JSON.stringify(projectsForConstants, null, 2).replace('"%%%PHOTO_PROJET_2%%%"', 'PHOTO_PROJET_2');


    // 4. Reconstruction du fichier constants.ts
    const fileContent = `import { Profile, Project, Skill, SkillLevel, SkillCategory, Tool, ToolCategory } from './types';
import { PHOTO_DATA } from './photo';
import { PHOTO_PROJET_2 } from './photoProjet2';

export const INITIAL_PROFILE: Profile = ${profileString};

export const INITIAL_PROJECTS: Project[] = ${projectsString};

export const INITIAL_SKILLS: Skill[] = ${JSON.stringify(data.skills, null, 2)};

export const INITIAL_TOOLS: Tool[] = ${JSON.stringify(data.tools, null, 2)};
`;

    try {
        fs.writeFileSync(path.join(__dirname, 'constants.ts'), fileContent, 'utf8');
        console.log('TOUT mis à jour avec succès (Profil + Projet 2) !');
        res.status(200).send('Sauvegarde réussie');
    } catch (error) {
        console.error('Erreur lors de l\'écriture du fichier:', error);
        res.status(500).send('Erreur serveur');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur de sauvegarde démarré sur http://localhost:${PORT}`);
});
