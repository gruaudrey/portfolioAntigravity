import { supabase } from './supabase';
import { PortfolioData, ContactMessage } from '../types';

/**
 * Service pour gérer les opérations avec Supabase
 */

// ==================== PORTFOLIO DATA ====================

/**
 * Récupère les données du portfolio depuis Supabase
 */
export async function getPortfolioData(): Promise<PortfolioData | null> {
    try {
        const { data, error } = await supabase
            .from('portfolio_data')
            .select('*')
            .single();

        if (error) {
            console.error('Erreur lors de la récupération des données:', error);
            return null;
        }

        return data?.content || null;
    } catch (error) {
        console.error('Erreur inattendue:', error);
        return null;
    }
}

/**
 * Sauvegarde les données du portfolio dans Supabase
 */
export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
    try {
        // Log pour débugger
        console.log('📤 Données envoyées à Supabase:', JSON.stringify(data, null, 2));

        const { error } = await supabase
            .from('portfolio_data')
            .upsert({
                id: 1, // On utilise toujours l'ID 1 pour avoir un seul enregistrement
                content: data,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            return false;
        }

        console.log('✅ Sauvegarde réussie dans Supabase');
        return true;
    } catch (error) {
        console.error('Erreur inattendue:', error);
        return false;
    }
}

// ==================== MESSAGES ====================

/**
 * Récupère tous les messages de contact depuis Supabase
 */
export async function getContactMessages(): Promise<ContactMessage[]> {
    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erreur lors de la récupération des messages:', error);
            return [];
        }

        return (data || []).map((row: any) => ({
            id: String(row.id),
            name: row.name,
            email: row.email,
            message: row.message,
            date: new Date(row.created_at).toLocaleString()
        }));
    } catch (error) {
        console.error('Erreur inattendue:', error);
        return [];
    }
}

/**
 * Ajoute un nouveau message de contact dans Supabase
 */
export async function addContactMessage(message: Omit<ContactMessage, 'id' | 'date'>): Promise<ContactMessage | null> {
    try {
        const createdAt = new Date();

        // Pas de .select() : seul l'administratrice a le droit de relire les messages.
        const { error } = await supabase
            .from('contact_messages')
            .insert({
                name: message.name,
                email: message.email,
                message: message.message,
                created_at: createdAt.toISOString()
            });

        if (error) {
            console.error('Erreur lors de l\'ajout du message:', error);
            return null;
        }

        return {
            id: `local-${createdAt.getTime()}`,
            name: message.name,
            email: message.email,
            message: message.message,
            date: createdAt.toLocaleString()
        };
    } catch (error) {
        console.error('Erreur inattendue:', error);
        return null;
    }
}

// ==================== AUTHENTIFICATION ====================

/**
 * Connexion administratrice via Supabase Auth (e-mail + mot de passe).
 * Le mot de passe n'est stocke nulle part dans le code : il est verifie par Supabase.
 */
export async function signInAdmin(email: string, password: string): Promise<boolean> {
    try {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) {
            console.error('Connexion refusee:', error.message);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Erreur inattendue:', error);
        return false;
    }
}

export async function signOutAdmin(): Promise<void> {
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.error('Erreur lors de la deconnexion:', error);
    }
}
