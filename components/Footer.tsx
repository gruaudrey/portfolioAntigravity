
import React from 'react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToSection = (id: string) => {
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
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold text-slate-900">Audrey Gruneisen</span>
            <span className="text-sm text-blue-600 font-medium tracking-wide">Chef de Projet IA</span>
          </div>
          
          <div className="flex space-x-6">
            <button onClick={() => scrollToSection('about')} className="text-slate-500 hover:text-blue-600 transition-colors">À propos</button>
            <button onClick={() => scrollToSection('projects')} className="text-slate-500 hover:text-blue-600 transition-colors">Projets</button>
            <button onClick={() => scrollToSection('skills')} className="text-slate-500 hover:text-blue-600 transition-colors">Compétences</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-500 hover:text-blue-600 transition-colors">Contact</button>
          </div>

          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} {profile.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
