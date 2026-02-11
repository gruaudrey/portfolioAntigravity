// Script de test pour vérifier la connexion Supabase
import { supabase } from './lib/supabase.js';

console.log('=== Test de connexion Supabase ===');
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Key présente:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

// Test 1 : Vérifier les tables
console.log('\n--- Test 1: Liste des tables ---');
const { data: tables, error: tablesError } = await supabase
    .from('portfolio_data')
    .select('*')
    .limit(1);

if (tablesError) {
    console.error('Erreur:', tablesError);
} else {
    console.log('Données existantes:', tables);
}

// Test 2 : Essayer d'insérer des données
console.log('\n--- Test 2: Insertion de données de test ---');
const testData = {
    id: 1,
    content: {
        profile: { name: 'Test' },
        projects: [],
        skills: [],
        tools: []
    },
    updated_at: new Date().toISOString()
};

const { data: insertData, error: insertError } = await supabase
    .from('portfolio_data')
    .upsert(testData)
    .select();

if (insertError) {
    console.error('Erreur d\'insertion:', insertError);
} else {
    console.log('Insertion réussie:', insertData);
}
