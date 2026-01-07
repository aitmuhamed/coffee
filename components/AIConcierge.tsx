
'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getCoffeeRecommendation } from '../services/geminiService';
import { translations } from '../i18n/translations';
import { ICONS } from '../constants';

const AIConcierge: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.current);
  const currency = useSelector((state: RootState) => state.currency);
  const t = translations[lang].ai;
  
  const [mood, setMood] = useState('');
  const [pref, setPref] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood || !pref) return;
    setLoading(true);
    const result = await getCoffeeRecommendation(mood, pref, lang, currency.code);
    setRecommendation(result || "Error getting recommendation");
    setLoading(false);
  };

  return (
    <div className="bg-coffee-dark rounded-[2.5rem] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-light opacity-5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <div className="inline-flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-full text-[9px] font-bold text-coffee-light mb-6 border border-white/5">
            <ICONS.Sparkles className="w-3 h-3" />
            <span className="tracking-[0.2em]">{t.tag}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-6 leading-tight">
             {t.title.split('Today')[0]}
             <span className="text-coffee-light block mt-1 italic">{t.title.includes('Today') ? 'Today?' : ''}</span>
             {t.title.includes('өнөөдөр') ? <span className="text-coffee-light italic block mt-1">өнөөдөр?</span> : ''}
             {t.title.includes('сегодня') ? <span className="text-coffee-light italic block mt-1">сегодня?</span> : ''}
          </h2>
          <p className="text-gray-400 font-light text-base mb-8 leading-relaxed">
            {t.desc}
          </p>
          
          <form onSubmit={handleAsk} className="space-y-3">
            <input 
              type="text" 
              placeholder={t.placeholder1}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-coffee-light transition-all placeholder:text-white/20"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
            />
            <input 
              type="text" 
              placeholder={t.placeholder2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-coffee-light transition-all placeholder:text-white/20"
              value={pref}
              onChange={(e) => setPref(e.target.value)}
              required
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-3.5 bg-coffee-light text-white font-bold rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 text-[10px] uppercase tracking-widest mt-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ICONS.Sparkles className="w-4 h-4" />
                  <span>{t.btn}</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="flex-1 w-full">
          {recommendation ? (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <h4 className="text-coffee-light font-bold text-[9px] uppercase tracking-widest mb-4">{t.choice}</h4>
              <p className="text-sm md:text-base font-serif italic leading-relaxed text-gray-100">
                "{recommendation}"
              </p>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-coffee-light/40 flex items-center justify-center font-serif text-white text-base">57</div>
                  <div>
                    <p className="font-bold text-[10px] uppercase tracking-widest text-gray-400">{t.footer}</p>
                  </div>
                </div>
                <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest">Pricing in {currency.code}</div>
              </div>
            </div>
          ) : (
            <div className="h-64 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-600 text-center p-8">
              <ICONS.Sparkles className="w-6 h-6 opacity-10 mb-2" />
              <p className="font-light text-xs italic tracking-widest uppercase opacity-40">Ready to consult</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIConcierge;
