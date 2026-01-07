
'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { translations } from '../i18n/translations';

const ContactSection: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.current);
  const t = translations[lang].contact;

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-coffee-light font-bold text-[10px] uppercase tracking-[0.3em] mb-4 inline-block">{t.tag}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-coffee-dark mb-4 tracking-tight">{t.title}</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light leading-relaxed">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-[#faf9f6] rounded-3xl p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.name}</label>
                <input 
                  type="text" 
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white border border-gray-100 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-coffee-light transition-all placeholder:text-gray-200"
                  required
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.email}</label>
                <input 
                  type="email" 
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white border border-gray-100 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-coffee-light transition-all placeholder:text-gray-200"
                  required
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.message}</label>
                <textarea 
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-white border border-gray-100 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-coffee-light transition-all placeholder:text-gray-200 resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={submitted}
                className={`w-full py-4 rounded-xl font-bold transition-all text-[10px] tracking-widest uppercase ${
                  submitted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-coffee-dark text-white hover:bg-coffee-light shadow-md'
                }`}
              >
                {submitted ? t.sent : t.btn}
              </button>
            </form>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 rounded-3xl overflow-hidden shadow-xl relative border border-gray-100 group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113661.1614214227!2d106.786526176508!3d47.89163884175783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693db16e05d93%3A0xb86e2ea03d4f14b5!2zNTcgY29mZmVlIGhvdXNl!5e0!3m2!1sen!2smn!4v1709123456789!5m2!1sen!2smn" 
                className="w-full h-full min-h-[350px] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bottom-4 left-4 right-4 bg-coffee-dark/95 backdrop-blur-md p-5 rounded-2xl text-white border border-white/5 shadow-lg">
                 <div className="flex items-center space-x-2.5 mb-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-coffee-light animate-pulse"></div>
                   <h4 className="font-serif font-bold text-lg">{t.visit}</h4>
                 </div>
                 <p className="text-gray-400 text-[11px] font-light leading-relaxed">
                   57 Coffee House, District 1, Metropolis Center
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
