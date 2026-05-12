import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'save-constants-api',
        configureServer(server) {
          server.middlewares.use('/api/save-constants', async (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  const fileContent = `import { Profile, Project, Skill, SkillLevel, SkillCategory } from './types';

export const INITIAL_PROFILE: Profile = ${JSON.stringify(data.profile, null, 2)};

export const INITIAL_PROJECTS: Project[] = ${JSON.stringify(data.projects, null, 2)};

export const INITIAL_SKILLS: Skill[] = ${JSON.stringify(data.skills, null, 2)};
`;

                  const constantsPath = path.resolve(__dirname, 'constants.ts');
                  fs.writeFileSync(constantsPath, fileContent, 'utf-8');

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: 'Fichier constants.ts mis à jour avec succès !' }));
                } catch (error) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: false, message: error.message }));
                }
              });
            } else {
              res.writeHead(405, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
            }
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-supabase': ['@supabase/supabase-js'],
            'vendor-icons': ['lucide-react'],
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
