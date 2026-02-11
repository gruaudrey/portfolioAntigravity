-- ==========================================
-- SCRIPT SQL POUR CRÉER LES TABLES SUPABASE
-- ==========================================
-- Copiez et exécutez ce script dans l'éditeur SQL de Supabase
-- (Dashboard > SQL Editor > New Query)

-- 1. Table pour stocker les données du portfolio
CREATE TABLE IF NOT EXISTS portfolio_data (
  id INTEGER PRIMARY KEY DEFAULT 1,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_portfolio_updated ON portfolio_data(updated_at);

-- 2. Table pour stocker les messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances des requêtes triées par date
CREATE INDEX IF NOT EXISTS idx_messages_created ON contact_messages(created_at DESC);

-- 3. Table pour la configuration admin (optionnel)
CREATE TABLE IF NOT EXISTS admin_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  password_hash TEXT NOT NULL DEFAULT 'admin123',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- ==========================================
-- POLITIQUES DE SÉCURITÉ (RLS - Row Level Security)
-- ==========================================

-- Activer RLS sur toutes les tables
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;

-- Politique pour portfolio_data
-- Lecture publique (pour afficher le portfolio)
CREATE POLICY "Lecture publique du portfolio"
  ON portfolio_data
  FOR SELECT
  USING (true);

-- Écriture réservée aux utilisateurs authentifiés (admin)
CREATE POLICY "Modification admin uniquement"
  ON portfolio_data
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Politique pour contact_messages
-- Insertion publique (pour envoyer des messages)
CREATE POLICY "Insertion publique des messages"
  ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Lecture réservée aux admins
CREATE POLICY "Lecture admin des messages"
  ON contact_messages
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Politique pour admin_config
-- Lecture et modification réservées aux admins
CREATE POLICY "Admin config - admin uniquement"
  ON admin_config
  FOR ALL
  USING (auth.role() = 'authenticated');

-- ==========================================
-- DONNÉES INITIALES (optionnel)
-- ==========================================

-- Insérer une configuration admin par défaut
INSERT INTO admin_config (id, password_hash)
VALUES (1, 'admin123')
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- FONCTIONS UTILITAIRES
-- ==========================================

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour portfolio_data
CREATE TRIGGER update_portfolio_data_updated_at
  BEFORE UPDATE ON portfolio_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour admin_config
CREATE TRIGGER update_admin_config_updated_at
  BEFORE UPDATE ON admin_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- VÉRIFICATION
-- ==========================================

-- Vérifier que les tables ont été créées
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('portfolio_data', 'contact_messages', 'admin_config');
