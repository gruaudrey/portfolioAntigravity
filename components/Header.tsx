
import React from 'react';
import { Settings, Menu, X, Cpu } from 'lucide-react';
import { Profile } from '../types';

interface HeaderProps {
  profile: Profile;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ profile, onAdminClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'À propos', id: 'about' },
    { name: 'Projets', id: 'projects' },
    { name: 'Compétences', id: 'skills' },
    { name: 'Outils', id: 'tools' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-violet-100/50">
      {/* Background Dot Pattern inside header for tech feel */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.2] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 hover:opacity-70 transition-all group"
          >
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white group-hover:bg-violet-500 transition-colors">
              <Cpu size={20} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-extrabold text-slate-900 leading-none tracking-tight">{profile.name}</span>
              <span className="text-[10px] font-bold text-violet-500 uppercase tracking-[0.15em] mt-1">{profile.title}</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-5 py-2 text-slate-600 hover:text-violet-600 font-bold text-sm transition-all rounded-full hover:bg-violet-50/50"
              >
                {link.name}
              </button>
            ))}
            <div className="w-px h-6 bg-slate-200 mx-4"></div>
            <button
              onClick={onAdminClick}
              className="p-2.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all"
              title="Admin"
            >
              <Settings size={18} />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 text-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full px-3 py-4 text-base font-bold text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-2xl"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={onAdminClick}
              className="w-full py-4 text-slate-400 font-bold text-sm"
            >
              Paramètres Administrateur
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;