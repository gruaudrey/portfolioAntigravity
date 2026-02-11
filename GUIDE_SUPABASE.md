# Guide d'installation Supabase pour le Portfolio

## Étape 1 : Créer un compte Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Créez un nouveau projet

## Étape 2 : Créer les tables dans Supabase

1. Dans votre projet Supabase, allez dans **SQL Editor**
2. Cliquez sur **New Query**
3. Copiez et collez le contenu du fichier `supabase-setup.sql`
4. Exécutez la requête (bouton **Run**)

## Étape 3 : Récupérer les clés d'API

1. Dans votre projet Supabase, allez dans **Settings** \u003e **API**
2. Copiez les valeurs suivantes :
   - **Project URL** (URL du projet)
   - **anon public** (clé publique anonyme)

## Étape 4 : Configurer les variables d'environnement

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Remplacez les valeurs suivantes :
   ```
   VITE_SUPABASE_URL=votre_url_de_projet
   VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
   ```

## Étape 5 : Tester l'application

1. Redémarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Ouvrez l'application dans votre navigateur

3. Testez les fonctionnalités :
   - Connexion au panneau admin (mot de passe : `admin123`)
   - Modification des données
   - Ajout d'un message de contact

## Étape 6 : Vérifier les données dans Supabase

1. Retournez dans votre projet Supabase
2. Allez dans **Table Editor**
3. Vérifiez que les données sont bien enregistrées dans les tables :
   - `portfolio_data`
   - `contact_messages`
   - `admin_config`

## Notes importantes

### Sécurité

- Les politiques RLS (Row Level Security) sont activées par défaut
- La lecture des données du portfolio est publique
- L'écriture nécessite une authentification
- Pour une meilleure sécurité, vous devriez :
  1. Utiliser l'authentification Supabase au lieu du mot de passe en dur
  2. Créer un utilisateur admin dans Supabase Auth
  3. Modifier les politiques RLS en conséquence

### Migration des données existantes

Si vous avez déjà des données dans le localStorage :

1. Connectez-vous au panneau admin
2. Les données du localStorage seront automatiquement chargées
3. Modifiez quelque chose (même minime)
4. Les données seront sauvegardées dans Supabase
5. Vérifiez dans Supabase que les données sont bien là

### Dépannage

**Erreur : "Les variables d'environnement Supabase ne sont pas définies"**
- Vérifiez que le fichier `.env.local` est bien à la racine du projet
- Vérifiez que les variables commencent par `VITE_`
- Redémarrez le serveur de développement

**Erreur : "Erreur lors de la sauvegarde dans Supabase"**
- Vérifiez que les tables ont bien été créées
- Vérifiez les politiques RLS
- Consultez la console du navigateur pour plus de détails

**Les données ne se chargent pas**
- Vérifiez que les tables contiennent des données
- Vérifiez les politiques RLS (lecture publique activée)
- Consultez la console du navigateur pour les erreurs

## Prochaines étapes recommandées

1. **Authentification sécurisée** : Remplacer le mot de passe en dur par Supabase Auth
2. **Backup automatique** : Configurer des sauvegardes automatiques dans Supabase
3. **Monitoring** : Activer les logs et le monitoring dans Supabase
4. **Optimisation** : Ajouter des index sur les colonnes fréquemment interrogées
