
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Tools from './components/Tools';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { PortfolioData, ContactMessage } from './types';
import { INITIAL_PROFILE, INITIAL_PROJECTS, INITIAL_SKILLS } from './constants';
import { Lock, X } from 'lucide-react';
import { getPortfolioData, savePortfolioData, getContactMessages, addContactMessage, verifyAdminPassword } from './lib/supabaseService';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        tools: parsed.tools || []
      };
    }
    return {
      profile: INITIAL_PROFILE,
      projects: INITIAL_PROJECTS,
      skills: INITIAL_SKILLS,
      tools: []
    };
  });

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Charger les données depuis Supabase au démarrage
  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger les données du portfolio
        const portfolioData = await getPortfolioData();
        if (portfolioData) {
          setData(portfolioData);
          // Sauvegarder aussi dans localStorage pour le cache
          localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
        }

        // Charger les messages
        const contactMessages = await getContactMessages();
        setMessages(contactMessages);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Sauvegarder dans localStorage quand les données changent (cache local)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('portfolio_data', JSON.stringify(data));
    }
  }, [data, isLoading]);

  const handleUpdateData = async (newData: PortfolioData) => {
    setData(newData);

    // Sauvegarder dans Supabase
    try {
      const success = await savePortfolioData(newData);
      if (success) {
        console.log('Données sauvegardées dans Supabase');
      } else {
        console.error('Erreur lors de la sauvegarde dans Supabase');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleAddMessage = async (msg: Omit<ContactMessage, 'id' | 'date'>) => {
    const newMessage = await addContactMessage(msg);
    if (newMessage) {
      setMessages(prev => [newMessage, ...prev]);
    }
  };

  const handleAdminClick = () => {
    if (isAuth) {
      setIsAdminMode(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await verifyAdminPassword(password);
    if (isValid) {
      setIsAuth(true);
      setIsAdminMode(true);
      setShowLoginModal(false);
      setPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  if (isAdminMode && isAuth) {
    return (
      <AdminPanel
        data={data}
        setData={handleUpdateData}
        messages={messages}
        onExit={() => setIsAdminMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen relative">
      <Header profile={data.profile} onAdminClick={handleAdminClick} />

      <main>
        <div id="home">
          <Hero profile={data.profile} />
        </div>
        {/* L'utilisation de scroll-mt-24 assure que le titre n'est pas caché sous le header */}
        <section id="about" className="py-20 bg-white scroll-mt-20">
          <About profile={data.profile} />
        </section>
        <section id="projects" className="py-20 bg-slate-50 scroll-mt-20">
          <Projects projects={data.projects} />
        </section>
        <section id="skills" className="py-20 bg-white scroll-mt-20">
          <Skills skills={data.skills} />
        </section>
        <section id="tools" className="py-20 bg-slate-50 scroll-mt-20">
          <Tools tools={data.tools} />
        </section>
        <section id="contact" className="py-20 bg-slate-50 scroll-mt-20">
          <Contact profile={data.profile} onSendMessage={handleAddMessage} />
        </section>
      </main>

      <Footer profile={data.profile} />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Accès Administrateur</h2>
              <p className="text-slate-500 mt-2">Veuillez entrer votre mot de passe pour continuer.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl border-2 outline-none transition-all ${loginError ? 'border-red-500 focus:ring-red-100' : 'border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                    }`}
                />
                {loginError && (
                  <p className="text-red-500 text-sm font-bold mt-2 ml-2">Mot de passe incorrect.</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 hover:opacity-90 transition-all active:scale-[0.98]"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
