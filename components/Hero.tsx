
'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { translations } from '../i18n/translations';
import { HERO_CAROUSEL_IMAGES } from '../constants';

const Hero: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.current);
  const t = translations[lang].hero;
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {HERO_CAROUSEL_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img.url} 
              alt={`57 Coffee House - ${img.caption}`} 
              className={`w-full h-full object-cover transition-transform duration-[8s] ease-linear ${
                idx === currentIdx ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark/80 via-coffee-dark/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-1.5 h-1.5 rounded-full bg-coffee-light animate-pulse"></span>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{t.tag}</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-serif font-bold leading-tight mb-8 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {t.title.split('.')[0]}
            <span className="text-coffee-light italic block mt-2 opacity-90">{t.title.split('.')[1] || ''}</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-200/70 mb-10 leading-relaxed font-light max-w-lg animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            {t.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <a 
              href="#menu" 
              className="bg-coffee-light text-white px-12 py-5 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-coffee-dark transition-all text-center shadow-2xl shadow-coffee-light/20"
            >
              {t.cta1}
            </a>
            <a 
              href="#about" 
              className="group border border-white/20 backdrop-blur-sm text-white px-12 py-5 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all text-center flex items-center justify-center space-x-3"
            >
              <span>{t.cta2}</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
        {HERO_CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`h-0.5 transition-all duration-500 ${
              idx === currentIdx ? 'w-12 bg-coffee-light' : 'w-6 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
