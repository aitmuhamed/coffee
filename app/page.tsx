
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { addToCart, removeFromCart, updateQuantity, toggleCart } from '../store/cartSlice';
import { fetchRates } from '../store/currencySlice';
import { translations } from '../i18n/translations';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MenuSection from '../components/MenuSection';
import GallerySection from '../components/GallerySection';
import AIConcierge from '../components/AIConcierge';
import ContactSection from '../components/ContactSection';
import CartDrawer from '../components/CartDrawer';
import AdminPanel from '../components/AdminPanel';

const Footer = () => {
  const lang = useSelector((state: RootState) => state.language.current);
  const currency = useSelector((state: RootState) => state.currency);
  const t = translations[lang].footer;

  return (
    <footer className="bg-coffee-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-serif font-bold tracking-tighter">57</span>
              <span className="mx-3 w-px h-5 bg-white/20"></span>
              <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-coffee-light">Coffee House</span>
            </div>
            <p className="text-gray-400 max-w-sm font-light leading-relaxed text-sm">
              {t.desc}
            </p>
            <div className="mt-8 flex flex-col space-y-2">
               <button onClick={() => window.location.hash = '#/admin'} className="text-left text-gray-600 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest">{t.dashboard}</button>
               {currency.lastUpdated && (
                 <p className="text-[8px] text-white/20 uppercase tracking-[0.2em]">
                   Live Rates updated: {new Date(currency.lastUpdated).toLocaleDateString()}
                 </p>
               )}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[9px] uppercase tracking-[0.3em] text-coffee-light">{t.location}</h4>
            <p className="text-gray-400 leading-relaxed font-light text-xs">
              57 Artisan Way,<br />
              Metropolis District, NY 10001
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[9px] uppercase tracking-[0.3em] text-coffee-light">{t.hours}</h4>
            <div className="space-y-1.5 text-gray-400 font-light text-xs">
              <p className="flex justify-between"><span>{t.monFri}:</span> <span className="text-white/40">07:00 — 20:00</span></p>
              <p className="flex justify-between"><span>{t.satSun}:</span> <span className="text-white/40">08:00 — 21:00</span></p>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex justify-center text-gray-500 text-[9px] tracking-[0.2em] uppercase font-bold">
          <p>© 2024 57 Coffee House. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.current);
  const t = translations[lang].about;

  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 mb-32">
        <AIConcierge />
      </div>

      <section id="menu">
        <MenuSection onAddToCart={(payload) => dispatch(addToCart(payload))} />
      </section>

      <section id="about" className="py-24 md:py-32 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070" 
                  alt="Brewing excellence" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-coffee-light/20 rounded-2xl -z-10"></div>
            </div>
            <div>
              <span className="text-coffee-light font-bold text-[10px] uppercase tracking-[0.3em] mb-4 inline-block">{t.tag}</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-coffee-dark mb-8 leading-tight">
                {t.title.split('Meets')[0]}
                <span className="italic block text-coffee-light/80 mt-1">
                   {t.title.includes('Meets') ? 'Meets Artisan.' : ''}
                   {t.title.includes('Уламжлал') ? 'ба Уламжлал.' : ''}
                   {t.title.includes('Шеберлік') ? 'және Шеберлік.' : ''}
                   {t.title.includes('мастерство') ? 'и мастерство.' : ''}
                </span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed font-light">
                {t.desc}
              </p>
              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-5">
                  <div className="w-10 h-10 rounded-full border border-coffee-light/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-coffee-light text-xs font-bold">01</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-coffee-dark uppercase tracking-widest mb-1">{t.feat1_title}</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">{t.feat1_desc}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5">
                  <div className="w-10 h-10 rounded-full border border-coffee-light/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-coffee-light text-xs font-bold">02</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-coffee-dark uppercase tracking-widest mb-1">{t.feat2_title}</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">{t.feat2_desc}</p>
                  </div>
                </div>
              </div>
              <a 
                href="#menu" 
                className="inline-block border border-coffee-dark text-coffee-dark px-10 py-3.5 rounded-full font-bold hover:bg-coffee-dark hover:text-white transition-all text-[10px] tracking-[0.2em] uppercase"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <GallerySection />

      <ContactSection />
    </>
  );
};

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.cart.isOpen);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(fetchRates());
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#/admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartToggle={() => dispatch(toggleCart())} 
      />
      
      {isAdmin ? <AdminPanel /> : <><LandingPage /><Footer /></>}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => dispatch(toggleCart())} 
        items={cartItems}
        onRemove={(id, sizeLabel) => dispatch(removeFromCart({ id, sizeLabel }))}
        onUpdateQuantity={(id, sizeLabel, delta) => dispatch(updateQuantity({ id, sizeLabel, delta }))}
      />
    </div>
  );
}
