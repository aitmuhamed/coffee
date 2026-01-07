
'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { translations } from '../i18n/translations';

const GallerySection: React.FC = () => {
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.language.current);
  const images = useSelector((state: RootState) => state.gallery.images);
  const t = translations[lang].gallery;

  return (
    <section id="gallery" className="py-24 md:py-32 bg-white relative">
      {/* Floating Back Button for dedicated page feel */}
      <button 
        onClick={() => navigate('/')}
        className="fixed bottom-10 left-10 z-40 bg-coffee-dark text-white px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl hover:bg-coffee-light transition-all transform hover:scale-110 active:scale-95 flex items-center space-x-2"
      >
        <span>←</span>
        <span>Home</span>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-coffee-light font-bold text-[10px] uppercase tracking-[0.3em] mb-4 inline-block">{t.tag}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-coffee-dark mb-6 tracking-tight">{t.title}</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-light leading-relaxed">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {images.map((img, idx) => {
            // Create visual variation in card spans for a dynamic "Bento" layout
            const isWide = (idx % 7 === 1) || (idx % 7 === 5);
            const isTall = (idx % 7 === 0) || (idx % 7 === 4);
            
            return (
              <div 
                key={img.id}
                className={`relative group overflow-hidden rounded-[2rem] shadow-sm transition-all duration-700 hover:shadow-2xl ${
                  isWide ? 'col-span-2' : ''
                } ${
                  isTall ? 'row-span-2' : ''
                }`}
              >
                <img 
                  src={img.url} 
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110 will-change-transform"
                />
                <div className="absolute inset-0 bg-coffee-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                   <div className="text-center p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white font-serif italic text-lg md:text-2xl mb-2">{img.caption}</p>
                      <div className="w-8 h-px bg-coffee-light mx-auto"></div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
