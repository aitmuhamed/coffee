
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../store/store';
import { setLanguage, Language } from '../store/languageSlice';
import { setCurrency } from '../store/currencySlice';
import { CurrencyCode } from '../types';
import { translations } from '../i18n/translations';
import { ICONS } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state: RootState) => state.language.current);
  const currency = useSelector((state: RootState) => state.currency);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: t.home, href: '/' },
    { name: t.menu, href: '/#menu' },
    { name: t.about, href: '/#about' },
    { name: t.gallery || 'Gallery', href: '/gallery' },
    { name: t.contact, href: '/#contact' },
  ];

  const languages: { code: Language; label: string; full: string }[] = [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'mn', label: 'MN', full: 'Монгол' },
    { code: 'kk', label: 'KK', full: 'Қазақ' },
    { code: 'ru', label: 'RU', full: 'Русский' },
  ];

  const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'USD', label: 'USD', symbol: '$' },
    { code: 'MNT', label: 'MNT', symbol: '₮' },
    { code: 'KZT', label: 'KZT', symbol: '₸' },
    { code: 'RUB', label: 'RUB', symbol: '₽' },
  ];

  const currentLangLabel = languages.find(l => l.code === lang)?.label || 'EN';

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '/gallery' || href === '/admin') {
      navigate(href);
      return;
    }

    if (href.startsWith('/#')) {
      const anchorId = href.split('#')[1];
      if (location.pathname === '/') {
        const target = document.getElementById(anchorId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const target = document.getElementById(anchorId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (href === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-700 ${
      scrolled || location.pathname !== '/' ? 'bg-white py-3 shadow-xl shadow-brand-dark/5' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a 
              href="#/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className={`flex items-center transition-all duration-300 group ${
                scrolled || location.pathname !== '/' ? 'text-coffee-dark' : 'text-white'
              }`}
            >
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-current opacity-80 group-hover:opacity-100 transition-all">
                <span className="text-2xl font-serif font-bold tracking-tighter">57</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-coffee-light"></div>
              </div>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-coffee-light ${
                  scrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white/90'
                } ${
                  (location.pathname === link.href) ? 'text-coffee-light' : ''
                }`}
              >
                {link.name}
              </a>
            ))}
            
            <div className="w-px h-4 bg-gray-500/10"></div>

            <div className="flex items-center space-x-6">
              {/* Currency Selector */}
              <div className="relative" ref={currencyRef}>
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className={`flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                    scrolled || location.pathname !== '/' ? 'text-gray-600' : 'text-white'
                  } hover:text-coffee-light`}
                >
                  <span className="text-coffee-light">{currency.symbol}</span>
                  <span>{currency.code}</span>
                  <ICONS.ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`absolute top-full right-0 mt-4 w-36 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all transform origin-top-right ${
                  isCurrencyOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}>
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { dispatch(setCurrency(c.code)); setIsCurrencyOpen(false); }}
                      className={`w-full px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest transition-colors flex justify-between items-center ${
                        currency.code === c.code ? 'text-coffee-light bg-coffee-light/5' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="text-gray-300">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                    scrolled || location.pathname !== '/' ? 'text-gray-600' : 'text-white'
                  } hover:text-coffee-light`}
                >
                  <span>{currentLangLabel}</span>
                  <ICONS.ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`absolute top-full right-0 mt-4 w-40 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all transform origin-top-right ${
                  isLangOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { dispatch(setLanguage(l.code)); setIsLangOpen(false); }}
                      className={`w-full px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        lang === l.code ? 'text-coffee-light bg-coffee-light/5' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {l.full}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={(e) => handleLinkClick(e as any, '/#menu')}
                className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                  scrolled || location.pathname !== '/'
                    ? 'bg-coffee-dark text-white hover:bg-coffee-light shadow-lg shadow-brand-dark/10' 
                    : 'bg-white text-brand-dark hover:bg-coffee-light hover:text-white'
                }`}
              >
                {t.order}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <button 
              onClick={onCartToggle}
              className={`relative p-2 transition-all transform hover:scale-110 ${
                scrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
              } hover:text-coffee-light`}
            >
              <ICONS.Cart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-coffee-light text-white text-[9px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className={`md:hidden p-2 transition-colors ${scrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ICONS.Close className="w-6 h-6" /> : <ICONS.Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white transition-all duration-500 transform ${
        isOpen ? 'translate-y-0 opacity-100 shadow-2xl' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="px-8 py-10 space-y-8">
          <div className="flex justify-between items-start border-b border-gray-50 pb-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Language</p>
              <div className="flex flex-wrap gap-4">
                {languages.map(l => (
                  <button key={l.code} onClick={() => { dispatch(setLanguage(l.code)); setIsOpen(false); }} className={`text-[11px] font-black uppercase ${lang === l.code ? 'text-coffee-light' : 'text-gray-400'}`}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Currency</p>
              <div className="flex flex-wrap gap-4">
                {currencies.map(c => (
                  <button key={c.code} onClick={() => { dispatch(setCurrency(c.code)); setIsOpen(false); }} className={`text-[11px] font-black uppercase ${currency.code === c.code ? 'text-coffee-light' : 'text-gray-400'}`}>
                    {c.symbol}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block text-2xl font-serif font-bold ${location.pathname === link.href ? 'text-coffee-light' : 'text-brand-dark'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
