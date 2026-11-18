-- ============================================================
-- SECURISATION DE L'ADMIN : Supabase Auth + règles RLS strictes
-- ============================================================
-- A exécuter UNE SEULE FOIS dans Supabase > SQL Editor,
-- APRES avoir créé votre utilisateur (Authentication > Users)
-- et vérifié que la connexion fonctionne sur le site.
--
-- Résultat :
--   - Tout le monde peut LIRE le portfolio et ENVOYER un message de contact.
--   - Seule l'administratrice (e-mail ci-dessous) peut MODIFIER le portfolio
--     et LIRE / SUPPRIMER les messages.
--   - La table admin_config (ancien mot de passe en clair) n'est plus accessible.
-- ============================================================

-- 1. Fonction "est-ce l'administratrice ?"
--    >>> Remplacez l'e-mail ci-dessous par celui de votre utilisateur Supabase <<<
CREATE OR REPLACE FUNCTION public.is_portfolio_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT coalesce(auth.jwt() ->> 'email', '') = 'gruneisenaudrey@gmail.com';
$$;

-- 2. Supprimer TOUTES les anciennes règles (y compris les règles ouvertes à tous)
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('portfolio_data', 'contact_messages', 'admin_config')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

ALTER TABLE public.portfolio_data   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_config     ENABLE ROW LEVEL SECURITY;

-- 3. portfolio_data : lecture publique, écriture administratrice uniquement
CREATE POLICY "portfolio lecture publique"
  ON public.portfolio_data FOR SELECT
  USING (true);

CREATE POLICY "portfolio ecriture admin"
  ON public.portfolio_data FOR INSERT
  WITH CHECK (public.is_portfolio_admin());

CREATE POLICY "portfolio modification admin"
  ON public.portfolio_data FOR UPDATE
  USING (public.is_portfolio_admin())
  WITH CHECK (public.is_portfolio_admin());

CREATE POLICY "portfolio suppression admin"
  ON public.portfolio_data FOR DELETE
  USING (public.is_portfolio_admin());

-- 4. contact_messages : envoi public (avec limites), lecture/suppression admin
CREATE POLICY "messages envoi public"
  ON public.contact_messages FOR INSERT
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(message) BETWEEN 1 AND 5000
  );

CREATE POLICY "messages lecture admin"
  ON public.contact_messages FOR SELECT
  USING (public.is_portfolio_admin());

CREATE POLICY "messages suppression admin"
  ON public.contact_messages FOR DELETE
  USING (public.is_portfolio_admin());

-- 5. admin_config : aucune règle = personne ne peut la lire via l'API.
--    (Vous pourrez supprimer cette table plus tard : DROP TABLE public.admin_config;)

-- 6. Vérification : doit afficher les règles ci-dessus, et aucune règle "true" en écriture
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;
