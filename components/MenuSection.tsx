
'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MenuItem, SizeOption } from '../types';
import { translations } from '../i18n/translations';
import { ICONS } from '../constants';
import PriceDisplay from './PriceDisplay';
import ItemModal from './ItemModal';

interface MenuSectionProps {
  onAddToCart: (payload: { item: MenuItem; size?: SizeOption; quantity: number }) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const menuItems = useSelector((state: RootState) => state.menu.items);
  const lang = useSelector((state: RootState) => state.language.current);
  const currency = useSelector((state: RootState) => state.currency);
  const theme = useSelector((state: RootState) => state.theme.current);
  const t = translations[lang].menu;
  const itemTranslations = translations[lang].menuItems;
  const categoryLabels = translations[lang].categories;
  
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  const categories = ['All', 'Coffee', 'Tea', 'Pastry', 'Cake', 'Brunch'] as const;

  const filteredItems = menuItems.filter(item => {
    const translated = itemTranslations[item.id as keyof typeof itemTranslations] || { name: item.name };
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = translated.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-coffee-dark'} mb-4 tracking-tight`}>{t.title}</h2>
          <p className="text-gray-400 max-w-md mx-auto font-light text-sm leading-relaxed">
            {t.desc}
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8 mb-16">
          {/* Search Bar */}
          <div className="relative w-full max-w-md group">
            <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-coffee-light transition-colors" />
            <input 
              type="text" 
              placeholder={lang === 'en' ? 'Search our brews...' : 'Хайлт хийх...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white' : 'bg-gray-50 border-gray-100 text-gray-800'} border rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-coffee-light transition-all placeholder:text-gray-400`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ICONS.Close className="w-3 h-3 text-gray-400" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-7 py-2 rounded-full transition-all text-[10px] font-bold uppercase tracking-widest ${
                  activeCategory === cat 
                    ? 'bg-coffee-dark text-white shadow-md' 
                    : (theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100')
                }`}
              >
                {categoryLabels[cat as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filteredItems.map(item => {
              const translated = itemTranslations[item.id as keyof typeof itemTranslations] || { name: item.name, desc: item.description };
              return (
                <div key={item.id} className="group animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div 
                    className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-lg cursor-pointer group"
                  >
                    <img 
                      src={item.image} 
                      alt={translated.name}
                      onClick={() => setSelectedItem(item)}
                      className="w-full h-full object-cover will-change-transform transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700 pointer-events-none"></div>
                    
                    {/* Floating Quick Add Plus Button */}
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onAddToCart({ item, size: item.sizes ? item.sizes[0] : undefined, quantity: 1 }); 
                      }}
                      className="absolute bottom-4 right-4 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center text-coffee-dark hover:bg-coffee-dark hover:text-white transition-all transform hover:scale-110 active:scale-95 z-20"
                      aria-label="Quick Add"
                    >
                      <ICONS.Plus className="w-5 h-5" />
                    </button>

                    <div className={`absolute top-4 right-4 ${theme === 'dark' ? 'bg-black/80 text-white border-white/10' : 'bg-white/95 text-coffee-dark border-gray-100'} backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm flex items-center space-x-1 border`}>
                      <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                      <PriceDisplay usdPrice={item.sizes ? item.sizes[0].price : item.price} currency={currency} lang={lang} />
                    </div>
                  </div>
                  <div className="px-1">
                    <div 
                      className="flex justify-between items-baseline mb-2 cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-coffee-dark'} group-hover:text-coffee-light transition-colors`}>{translated.name}</h3>
                      <span className="text-[9px] uppercase tracking-widest text-coffee-light font-bold bg-coffee-light/5 px-2 py-0.5 rounded">
                        {categoryLabels[item.category as keyof typeof categoryLabels]}
                      </span>
                    </div>
                    <p 
                      className="text-gray-400 text-xs mb-6 line-clamp-2 leading-relaxed font-light cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      {translated.desc}
                    </p>
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/5 text-white hover:bg-white hover:text-black' : 'bg-white border-gray-100 text-coffee-dark hover:bg-coffee-dark hover:text-white'} py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-sm`}
                    >
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-20 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} rounded-[2.5rem] border border-dashed border-gray-200`}>
            <ICONS.Search className="w-8 h-8 text-gray-300 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 font-serif italic text-lg">No items found matching your selection.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 text-coffee-light font-bold text-[10px] uppercase tracking-widest hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <ItemModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onAddToCart={onAddToCart}
      />
    </section>
  );
};

export default MenuSection;
