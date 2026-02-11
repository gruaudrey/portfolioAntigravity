-- Script pour corriger les politiques RLS
-- À exécuter dans le SQL Editor de Supabase

-- ========== SUPPRIMER TOUTES LES ANCIENNES POLITIQUES ==========

-- Politiques pour portfolio_data
DROP POLICY IF EXISTS "Lecture publique du portfolio" ON portfolio_data;
DROP POLICY IF EXISTS "Modification admin uniquement" ON portfolio_data;

-- Politiques pour contact_messages
DROP POLICY IF EXISTS "Insertion publique des messages" ON contact_messages;
DROP POLICY IF EXISTS "Lecture admin uniquement" ON contact_messages;

-- Politiques pour admin_config
DROP POLICY IF EXISTS "Lecture admin uniquement config" ON admin_config;
DROP POLICY IF EXISTS "Modification admin uniquement config" ON admin_config;

-- ========== CRÉER LES NOUVELLES POLITIQUES ==========

-- Portfolio_data : Permettre toutes les opérations (lecture et écriture)
CREATE POLICY "Permettre toutes les opérations"
  ON portfolio_data
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Contact_messages : Permettre l'insertion et la lecture
CREATE POLICY "Permettre insertion et lecture des messages"
  ON contact_messages
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Admin_config : Permettre la lecture uniquement
CREATE POLICY "Permettre la lecture de la config"
  ON admin_config
  FOR SELECT
  USING (true);
