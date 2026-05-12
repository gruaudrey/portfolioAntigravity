import { createClient } from '@supabase/supabase-js';

// Récupération des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'undefined' || !supabaseAnonKey || supabaseAnonKey === 'undefined') {
    throw new Error(
        'Variables d\'environnement Supabase manquantes.\n' +
        'Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans les variables d\'environnement Render.'
    );
}

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
