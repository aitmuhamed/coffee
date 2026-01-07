
'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MenuItem, SizeOption } from '../types';
import { translations } from '../i18n/translations';
import { ICONS } from '../constants';
import PriceDisplay from './PriceDisplay';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (payload: { item: MenuItem; size?: SizeOption; quantity: number }) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose, onAddToCart }) => {
  const lang = useSelector((state: RootState) => state.language.current);
  const currency = useSelector((state: RootState) => state.currency);
  const t = translations[lang].menu;
  const itemTranslations = translations[lang].menuItems;
  const categoryLabels = translations[lang].categories;
  
  const [isClosing, setIsClosing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(undefined);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      // Set default size if available
      setSelectedSize(item.sizes ? item.sizes[0] : undefined);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [item]);

  if (!item) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const translated = itemTranslations[item.id as keyof typeof itemTranslations] || { name: item.name, desc: item.description };
  const currentPrice = selectedSize ? selectedSize.price : item.price;

  const getStats = (category: string) => {
    switch(category) {
      case 'Coffee': return { notes: 'Toffee, Citrus, Floral', method: 'Espresso / Filter', intensity: 'Medium' };
      case 'Tea': return { notes: 'Grassy, Umami, Sweet', method: 'Steeped', intensity: 'Low' };
      case 'Cake':
      case 'Pastry': return { notes: 'Buttery, Sweet, Rich', method: 'Baked Daily', intensity: 'Treat' };
      case 'Brunch': return { notes: 'Savoury, Fresh, Umami', method: 'Made to Order', intensity: 'Main' };
      default: return { notes: 'Balanced, Fresh', method: 'Artisanal', intensity: 'Medium' };
    }
  };

  const stats = getStats(item.category);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        className="absolute inset-0 bg-coffee-dark/80 backdrop-blur-md"
        onClick={handleClose}
      ></div>
      
      <div className={`relative bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 transform ${isClosing ? 'scale-95 translate-y-8 opacity-0' : 'scale-100 translate-y-0 opacity-100'}`}>
        <button 
          onClick={handleClose}
          className="absolute top-8 right-8 z-30 bg-white/90 backdrop-blur-md p-3 rounded-full text-coffee-dark hover:bg-coffee-dark hover:text-white transition-all shadow-lg active:scale-90"
        >
          <ICONS.Close className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[90vh] lg:h-[700px]">
          {/* Image Section */}
          <div className="lg:w-1/2 relative h-[350px] lg:h-auto overflow-hidden group">
            <img 
              src={item.image} 
              alt={translated.name}
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
            <div className="absolute bottom-8 left-8 text-white z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] bg-coffee-light/90 px-3 py-1.5 rounded-full mb-3 inline-block">
                {categoryLabels[item.category as keyof typeof categoryLabels]}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 md:p-14 overflow-y-auto no-scrollbar flex flex-col">
            <div className="flex-1">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-dark mb-4 leading-tight">
                  {translated.name}
                </h2>
                <div className="flex items-center space-x-3">
                  <PriceDisplay usdPrice={currentPrice} currency={currency} lang={lang} className="text-3xl font-bold text-coffee-light" />
                  <span className="text-sm text-gray-400 font-light italic">per serving</span>
                </div>
              </div>

              {/* Size Selector */}
              {item.sizes && (
                <div className="mb-10">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Select Size</h4>
                  <div className="flex gap-3">
                    {item.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 flex flex-col items-center py-3 px-4 rounded-2xl border transition-all ${
                          selectedSize?.label === size.label 
                            ? 'bg-coffee-dark text-white border-coffee-dark shadow-lg shadow-coffee-dark/10' 
                            : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-sm font-bold mb-1">{size.label}</span>
                        <PriceDisplay usdPrice={size.price} currency={currency} lang={lang} className="text-[10px] font-medium opacity-80" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-10 mb-12">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Description</h4>
                  <p className="text-gray-500 text-lg font-light leading-relaxed">
                    {translated.desc}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-8 py-8 border-y border-gray-100">
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Tasting Notes</h4>
                    <p className="text-sm text-coffee-dark font-medium leading-snug">{stats.notes}</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Brew Stats</h4>
                    <p className="text-sm text-coffee-dark font-medium leading-snug">{stats.method}</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Intensity</h4>
                    <p className="text-sm text-coffee-dark font-medium leading-snug">{stats.intensity}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                     <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">Quantity</h4>
                     <div className="flex items-center space-x-6 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-coffee-dark transition-colors font-bold text-xl"
                        >-</button>
                        <span className="text-lg font-bold w-6 text-center text-coffee-dark">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-coffee-dark transition-colors font-bold text-xl"
                        >+</button>
                     </div>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">Subtotal</h4>
                    <PriceDisplay usdPrice={currentPrice * quantity} currency={currency} lang={lang} className="text-2xl font-bold text-coffee-dark" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 mt-auto">
              <button 
                onClick={() => { 
                  onAddToCart({ item, size: selectedSize, quantity }); 
                  handleClose(); 
                }}
                className="flex-1 bg-coffee-dark text-white py-5 rounded-2xl font-bold hover:bg-coffee-light transition-all shadow-2xl shadow-coffee-dark/20 uppercase text-[11px] tracking-[0.2em] flex items-center justify-center space-x-3 active:scale-[0.98]"
              >
                <ICONS.Cart className="w-5 h-5" />
                <span>{t.add}</span>
              </button>
            </div>
            
            <p className="mt-8 text-center text-[9px] text-gray-300 uppercase tracking-[0.3em] font-bold">
              57 Coffee House • Est. 2024 • Pure Extraction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
