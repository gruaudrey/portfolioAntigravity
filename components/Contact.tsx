
import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { Profile } from '../types';

interface ContactProps {
  profile: Profile;
  onSendMessage: (msg: { name: string; email: string; message: string }) => void;
}

const Contact: React.FC<ContactProps> = ({ profile, onSendMessage }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(formData);
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-20">
        
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Travaillons ensemble</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Vous avez un projet IA ambitieux ou besoin d'automatiser vos flux de connaissances ? Envoyez-moi un message.
            </p>
          </div>

          <div className="space-y-4">
            <a href={`mailto:${profile.email}`} className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/5 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-50 text-violet-600 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors"><Mail size={22} /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</span>
                  <span className="font-bold text-slate-900">{profile.email}</span>
                </div>
              </div>
            </a>

            <a href={profile.linkedin} target="_blank" className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-violet-600 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-50 text-violet-600 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors"><Linkedin size={22} /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect</span>
                  <span className="font-bold text-slate-900">LinkedIn Profile</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom Complet</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none font-bold"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none font-bold"
                  placeholder="john@company.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-50 transition-all outline-none font-medium resize-none"
                placeholder="Comment puis-je vous aider ?"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={sent}
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${
                sent ? 'bg-green-500 text-white shadow-lg shadow-green-200 scale-[0.98]' : 'bg-slate-900 text-white hover:bg-violet-600 shadow-xl shadow-violet-100'
              }`}
            >
              {sent ? 'Message envoyé' : 'Envoyer le message'}
              {!sent && <Send size={20} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;