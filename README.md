# 🚀 Portfolio Audrey Gruneisen - Chef de Projet IA

Portfolio professionnel moderne avec panneau d'administration intégré pour gérer facilement vos projets, compétences et informations de profil.

## ✨ Fonctionnalités

- 🎨 **Interface moderne** avec design premium et animations fluides
- 🔐 **Panneau Admin** pour modifier facilement le contenu
- 💾 **Sauvegarde automatique** des modifications
- 📱 **Responsive** - S'adapte à tous les écrans
- 🎯 **Sections dynamiques** : Projets, Compétences, À propos, Contact
- 📧 **Formulaire de contact** fonctionnel
- 🖼️ **Upload d'images** directement depuis le panneau admin

## 🛠️ Technologies Utilisées

- **React 19** - Framework JavaScript
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Lucide React** - Icônes modernes
- **CSS Vanilla** - Styling personnalisé

## 📦 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes

1. **Cloner le repository**
   ```bash
   git clone https://github.com/VOTRE_USERNAME/portfolio-audrey-gruneisen.git
   cd portfolio-audrey-gruneisen
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🎮 Utilisation du Panneau Admin

### Accès au Mode Admin

1. Cliquez sur l'icône **cadenas** 🔒 en haut à droite du portfolio
2. Entrez le mot de passe : `admin123`
3. Vous accédez maintenant au panneau d'administration

### Modifier vos informations

Le panneau admin vous permet de modifier :

- ✅ **Profil** : Nom, titre, bio, photo, liens sociaux
- ✅ **Projets** : Ajouter/modifier/supprimer des projets avec images
- ✅ **Compétences** : Gérer vos expertises et niveaux
- ✅ **Hero Tags** : Vos chiffres clés et statistiques
- ✅ **Messages** : Consulter les messages reçus via le formulaire

### Sauvegarder les modifications

1. Après vos modifications, cliquez sur **"SAUVEGARDER LES MODIFICATIONS"** (bouton vert)
2. Les modifications sont automatiquement enregistrées dans `constants.ts`
3. Vos changements sont maintenant permanents ! ✨

**Note** : Les modifications sont d'abord stockées dans le localStorage de votre navigateur. Pour les rendre permanentes et visibles par tous, utilisez le bouton de sauvegarde.

## 🚀 Déploiement

### Netlify (Recommandé)

1. **Créer un compte** sur [Netlify](https://www.netlify.com/)
2. **Connecter votre repo GitHub**
3. **Configurer le build** :
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Déployer** 🎉

### Vercel

1. **Créer un compte** sur [Vercel](https://vercel.com/)
2. **Importer le projet** depuis GitHub
3. Vercel détecte automatiquement Vite
4. **Déployer** 🎉

## 📁 Structure du Projet

```
portfolio-audrey-gruneisen/
│
├── components/          # Composants React
│   ├── AdminPanel.tsx   # Panneau d'administration
│   ├── Hero.tsx         # Section hero
│   ├── Projects.tsx     # Section projets
│   ├── Skills.tsx       # Section compétences
│   ├── About.tsx        # Section à propos
│   ├── Contact.tsx      # Formulaire de contact
│   ├── Header.tsx       # En-tête
│   └── Footer.tsx       # Pied de page
│
├── constants.ts         # Données du portfolio
├── types.ts             # Types TypeScript
├── App.tsx              # Composant principal
├── index.tsx            # Point d'entrée
├── vite.config.ts       # Configuration Vite
├── package.json         # Dépendances
└── README.md            # Documentation (ce fichier)
```

## 🔧 Scripts Disponibles

```bash
npm run dev      # Lance le serveur de développement
npm run build    # Crée la version de production
npm run preview  # Prévisualise la version de production
```

## 🔐 Sécurité

**Important** : Le mot de passe du panneau admin est défini dans `App.tsx`. 

Pour changer le mot de passe :
1. Ouvrez `App.tsx`
2. Trouvez la ligne `const ADMIN_PASSWORD = 'admin123';`
3. Changez `'admin123'` par votre mot de passe
4. **Avant de déployer en production**, utilisez un mot de passe fort !

## 📝 Personnalisation

### Modifier les couleurs

Les couleurs principales sont définies dans les fichiers CSS des composants. Cherchez les classes commençant par `bg-` et `text-` pour les modifier.

### Ajouter des sections

1. Créez un nouveau composant dans le dossier `components/`
2. Importez-le dans `App.tsx`
3. Ajoutez-le dans le JSX

## 🤝 Contributions

Ce projet est personnel, mais les suggestions sont les bienvenues !

## 📄 Licence

MIT License - Libre d'utilisation

## 👩‍💼 Contact

**Audrey Gruneisen** - Chef de Projet IA

- LinkedIn : [Votre profil LinkedIn]
- Email : [Votre email]
- Portfolio : [URL de votre portfolio en ligne]

---

⭐ Si ce projet vous aide, n'hésitez pas à lui donner une étoile sur GitHub !
