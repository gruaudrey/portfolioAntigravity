# Intégration Supabase - Portfolio

## Résumé des modifications

Ce projet a été mis à jour pour utiliser **Supabase** comme base de données au lieu du localStorage. Cela permet :

✅ **Persistance des données** : Les données sont stockées dans le cloud
✅ **Accès multi-appareils** : Accédez à votre portfolio depuis n'importe où
✅ **Sécurité** : Politiques de sécurité RLS (Row Level Security)
✅ **Scalabilité** : Base de données PostgreSQL professionnelle

## Fichiers créés

1. **`lib/supabase.ts`** : Configuration du client Supabase
2. **`lib/supabaseService.ts`** : Services pour les opérations CRUD
3. **`supabase-setup.sql`** : Script SQL pour créer les tables
4. **`vite-env.d.ts`** : Types TypeScript pour les variables d'environnement
5. **`GUIDE_SUPABASE.md`** : Guide d'installation détaillé

## Fichiers modifiés

1. **`.env.local`** : Ajout des variables d'environnement Supabase
2. **`App.tsx`** : Intégration des services Supabase
3. **`package.json`** : Ajout de la dépendance `@supabase/supabase-js`

## Structure de la base de données

### Table `portfolio_data`
- Stocke toutes les données du portfolio (profil, projets, compétences, outils)
- Un seul enregistrement avec `id = 1`

### Table `contact_messages`
- Stocke tous les messages de contact
- Chaque message a un ID unique

### Table `admin_config`
- Stocke la configuration admin (mot de passe)
- Un seul enregistrement avec `id = 1`

## Installation

Suivez le guide détaillé dans **`GUIDE_SUPABASE.md`**

### Résumé rapide

1. Créer un compte Supabase
2. Créer un nouveau projet
3. Exécuter le script SQL (`supabase-setup.sql`)
4. Copier les clés d'API dans `.env.local`
5. Redémarrer le serveur de développement

## Utilisation

### Développement local

```bash
npm run dev
```

### Connexion admin

- URL : `http://localhost:5173`
- Cliquez sur l'icône de verrouillage en haut à droite
- Mot de passe par défaut : `admin123`

### Modification des données

1. Connectez-vous au panneau admin
2. Modifiez les données (projets, compétences, profil, etc.)
3. Les modifications sont automatiquement sauvegardées dans Supabase

### Consultation des données

Allez dans votre projet Supabase \u003e **Table Editor** pour voir les données en temps réel

## Sécurité

### Politiques RLS activées

- **Lecture publique** : Tout le monde peut voir le portfolio
- **Écriture protégée** : Seuls les utilisateurs authentifiés peuvent modifier

### Recommandations

Pour une sécurité optimale :

1. **Changer le mot de passe admin** dans la table `admin_config`
2. **Utiliser Supabase Auth** au lieu du mot de passe en dur
3. **Activer l'authentification à deux facteurs** sur votre compte Supabase
4. **Surveiller les logs** dans le dashboard Supabase

## Migration des données existantes

Si vous avez déjà des données dans le localStorage :

1. Les données seront automatiquement chargées au démarrage
2. Connectez-vous au panneau admin
3. Faites une modification mineure
4. Les données seront sauvegardées dans Supabase
5. Vérifiez dans Supabase que tout est bien là

## Dépannage

### Problèmes courants

**Les données ne se chargent pas**
- Vérifiez les variables d'environnement dans `.env.local`
- Vérifiez que les tables ont été créées dans Supabase
- Consultez la console du navigateur pour les erreurs

**Erreur de sauvegarde**
- Vérifiez les politiques RLS
- Vérifiez que vous êtes connecté en tant qu'admin
- Consultez les logs dans Supabase

**Erreur d'authentification**
- Vérifiez le mot de passe dans la table `admin_config`
- Par défaut : `admin123`

## Support

Pour toute question ou problème :

1. Consultez le **`GUIDE_SUPABASE.md`**
2. Vérifiez les logs dans la console du navigateur
3. Consultez la documentation Supabase : [https://supabase.com/docs](https://supabase.com/docs)

## Prochaines étapes

- [ ] Configurer Supabase Auth pour une authentification sécurisée
- [ ] Ajouter des sauvegardes automatiques
- [ ] Optimiser les requêtes avec des index
- [ ] Ajouter un système de cache côté client
- [ ] Implémenter un système de versioning des données

---

**Note** : Ce projet utilise maintenant Supabase comme base de données principale. Le localStorage est toujours utilisé comme cache local pour améliorer les performances.
