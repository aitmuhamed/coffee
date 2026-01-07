
'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CartItem } from '../types';
import { ICONS } from '../constants';
import { translations } from '../i18n/translations';
import PriceDisplay from './PriceDisplay';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, sizeLabel?: string) => void;
  onUpdateQuantity: (id: string, sizeLabel: string | undefined, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const lang = useSelector((state: RootState) => state.language.current);
  const currency = useSelector((state: RootState) => state.currency);
  const theme = useSelector((state: RootState) => state.theme.current);
  const t = translations[lang].cart;
  
  const totalUSD = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const processingFeeUSD = items.length > 0 ? 1.50 : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className={`relative w-full max-w-md ${theme === 'dark' ? 'bg-[#1a1210] border-l border-white/5' : 'bg-white'} h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out`}>
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'} flex justify-between items-center`}>
          <div>
            <h2 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-coffee-dark'}`}>{t.title}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{items.length} {t.items}</p>
          </div>
          <button onClick={onClose} className={`p-2 ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-100'} rounded-full transition-colors`}>
            <ICONS.Close className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className={`w-20 h-20 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} rounded-full flex items-center justify-center mb-6`}>
                <ICONS.Cart className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-light">{t.empty}</p>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.id}-${item.selectedSize?.label || 'default'}`} className="flex gap-4 group">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-coffee-dark'} text-sm`}>
                        {item.name} {item.selectedSize && <span className="text-coffee-light ml-1 font-serif italic text-xs">({item.selectedSize.label})</span>}
                      </h4>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id, item.selectedSize?.label)}
                      className="text-gray-300 hover:text-red-400 p-1"
                    >
                      <ICONS.Close className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className={`flex items-center space-x-3 ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-gray-50 text-gray-800'} rounded-lg p-1`}>
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedSize?.label, -1)} className="w-6 h-6 font-bold text-xs">-</button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedSize?.label, 1)} className="w-6 h-6 font-bold text-xs">+</button>
                    </div>
                    <PriceDisplay usdPrice={item.price * item.quantity} currency={currency} lang={lang} className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-coffee-dark'} text-sm`} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={`p-6 border-t ${theme === 'dark' ? 'border-white/5 bg-black/20' : 'border-gray-100 bg-gray-50/50'}`}>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-500">{t.subtotal}</span>
              <PriceDisplay usdPrice={totalUSD} currency={currency} lang={lang} className={theme === 'dark' ? 'text-gray-300' : ''} />
            </div>
            <div className="flex justify-between mb-6 text-sm">
              <span className="text-gray-500">{t.fee}</span>
              <PriceDisplay usdPrice={processingFeeUSD} currency={currency} lang={lang} className={theme === 'dark' ? 'text-gray-300' : ''} />
            </div>
            <div className="flex justify-between mb-8">
              <span className={`text-xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-coffee-dark'}`}>{t.total}</span>
              <PriceDisplay usdPrice={totalUSD + processingFeeUSD} currency={currency} lang={lang} className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-coffee-dark'}`} />
            </div>
            <button className={`w-full ${theme === 'dark' ? 'bg-white text-black' : 'bg-coffee-dark text-white'} py-5 rounded-2xl font-bold hover:bg-coffee-light hover:text-white transition-all shadow-xl uppercase text-[10px] tracking-[0.2em]`}>
              {t.checkout}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
