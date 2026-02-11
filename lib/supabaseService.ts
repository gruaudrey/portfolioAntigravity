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

        return data || [];
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
        const newMessage = {
            name: message.name,
            email: message.email,
            message: message.message,
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('contact_messages')
            .insert(newMessage)
            .select()
            .single();

        if (error) {
            console.error('Erreur lors de l\'ajout du message:', error);
            return null;
        }

        // Convertir le format Supabase vers notre format ContactMessage
        return {
            id: data.id.toString(),
            name: data.name,
            email: data.email,
            message: data.message,
            date: new Date(data.created_at).toLocaleString()
        };
    } catch (error) {
        console.error('Erreur inattendue:', error);
        return null;
    }
}

// ==================== AUTHENTIFICATION ====================

/**
 * Vérifie le mot de passe admin
 * Note: Pour plus de sécurité, vous devriez utiliser l'authentification Supabase
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
    try {
        const { data, error } = await supabase
            .from('admin_config')
            .select('password_hash')
            .single();

        if (error) {
            console.error('Erreur lors de la vérification:', error);
            // Fallback sur le mot de passe en dur pour la compatibilité
            return password === 'admin123';
        }

        // Pour l'instant, on compare directement (à améliorer avec bcrypt côté serveur)
        return data?.password_hash === password;
    } catch (error) {
        console.error('Erreur inattendue:', error);
        return password === 'admin123';
    }
}
