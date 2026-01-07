
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { addToCart, removeFromCart, updateQuantity, toggleCart } from './store/cartSlice';
import { fetchRates } from './store/currencySlice';
import { translations } from './i18n/translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import AIConcierge from './components/AIConcierge';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import Logo from './components/Logo';

/**
 * ScrollToTop component ensures that navigation to new routes 
 * always starts at the top of the page.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Footer = () => {
  const lang = useSelector((state: RootState) => state.language.current);
  const currency = useSelector((state: RootState) => state.currency);
  const theme = useSelector((state: RootState) => state.theme.current);
  const t = translations[lang].footer;

  return (
    <footer className={`${theme === 'dark' ? 'bg-[#0f0a09]' : 'bg-coffee-dark'} text-white py-24 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-8">
              <Logo variant="light" className="w-16 h-16 mr-4" />
              <div>
                <span className="text-3xl font-serif font-bold tracking-tighter block leading-none">57</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-coffee-light">Coffee House</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm font-light leading-relaxed text-sm mb-10">
              {t.desc}
            </p>
            <div className="flex items-center space-x-6">
               <a href="#/admin" className="text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">{t.dashboard}</a>
               <span className="w-1 h-1 bg-white/10 rounded-full"></span>
               {currency.lastUpdated && (
                 <p className="text-[9px] text-white/20 uppercase tracking-[0.2em]">
                   Rates sync: {new Date(currency.lastUpdated).toLocaleDateString()}
                 </p>
               )}
            </div>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[11px] uppercase tracking-[0.4em] text-coffee-light opacity-80">{t.location}</h4>
            <p className="text-gray-400 leading-relaxed font-light text-sm">
              57 Artisan Square,<br />
              Glass District, Metropolis<br />
              NY 10001
            </p>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[11px] uppercase tracking-[0.4em] text-coffee-light opacity-80">{t.hours}</h4>
            <div className="space-y-3 text-gray-400 font-light text-sm">
              <p className="flex justify-between items-center">
                <span>{t.monFri}:</span> 
                <span className="h-px flex-1 mx-4 bg-white/5"></span>
                <span className="text-white/40">07:00 — 20:00</span>
              </p>
              <p className="flex justify-between items-center">
                <span>{t.satSun}:</span> 
                <span className="h-px flex-1 mx-4 bg-white/5"></span>
                <span className="text-white/40">08:00 — 21:00</span>
              </p>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex justify-center text-gray-600 text-[10px] tracking-[0.4em] uppercase font-black">
          <p>© 2024 57 FIFTY SEVEN. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.current);
  const theme = useSelector((state: RootState) => state.theme.current);
  const t = translations[lang].about;
  
  return (
    <main>
      <section id="home">
        <Hero />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 mb-32">
        <AIConcierge />
      </div>

      <section id="menu">
        <MenuSection onAddToCart={(payload) => dispatch(addToCart(payload))} />
      </section>

      <section id="about" className={`py-32 ${theme === 'dark' ? 'bg-[#1a1210]' : 'bg-[#faf9f6]'} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2070" 
                  alt="Modern glass interior" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-coffee-light/10 rounded-full blur-3xl -z-10"></div>
            </div>
            <div>
              <span className="text-coffee-light font-black text-[11px] uppercase tracking-[0.5em] mb-6 inline-block">{t.tag}</span>
              <h2 className={`text-5xl md:text-7xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-coffee-dark'} mb-10 leading-[0.9] tracking-tighter`}>
                {t.title.split('Meets')[0]}
                <span className="italic block text-coffee-light opacity-80 mt-2">
                  {t.title.includes('Meets') ? 'Meets Artisan.' : ''}
                  {t.title.includes('Уламжлал') ? 'ба Уламжлал.' : ''}
                  {t.title.includes('Шеберлік') ? 'және Шеберлік.' : ''}
                  {t.title.includes('мастерство') ? 'и мастерство.' : ''}
                </span>
              </h2>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-lg md:text-xl mb-12 leading-relaxed font-light`}>
                {t.desc}
              </p>
              <div className="space-y-8 mb-16">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full border border-coffee-light/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-coffee-light text-xs font-black">01</span>
                  </div>
                  <div>
                    <h4 className={`font-black text-xs ${theme === 'dark' ? 'text-gray-100' : 'text-coffee-dark'} uppercase tracking-widest mb-2`}>{t.feat1_title}</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">{t.feat1_desc}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full border border-coffee-light/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-coffee-light text-xs font-black">02</span>
                  </div>
                  <div>
                    <h4 className={`font-black text-xs ${theme === 'dark' ? 'text-gray-100' : 'text-coffee-dark'} uppercase tracking-widest mb-2`}>{t.feat2_title}</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">{t.feat2_desc}</p>
                  </div>
                </div>
              </div>
              <a 
                href="#menu" 
                className={`inline-flex ${theme === 'dark' ? 'bg-white text-coffee-dark' : 'bg-coffee-dark text-white'} px-12 py-5 rounded-full font-black hover:bg-coffee-light hover:text-white transition-all text-[11px] tracking-[0.3em] uppercase shadow-xl shadow-brand-dark/10`}
              >
                {t.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

const GalleryPage: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.current);
  return (
    <main className={`pt-24 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'} transition-colors duration-500`}>
      <GallerySection />
    </main>
  );
};

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.cart.isOpen);
  const theme = useSelector((state: RootState) => state.theme.current);

  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#121212]' : 'bg-[#faf9f6]'} transition-colors duration-500`}>
        <Navbar 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          onCartToggle={() => dispatch(toggleCart())} 
        />
        
        <Routes>
          <Route path="/" element={<><LandingPage /><Footer /></>} />
          <Route path="/gallery" element={<><GalleryPage /><Footer /></>} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => dispatch(toggleCart())} 
          items={cartItems}
          onRemove={(id, sizeLabel) => dispatch(removeFromCart({ id, sizeLabel }))}
          onUpdateQuantity={(id, sizeLabel, delta) => dispatch(updateQuantity({ id, sizeLabel, delta }))}
        />
      </div>
    </Router>
  );
};

export default App;
