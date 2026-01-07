
'use client';

import React, { useState, useEffect } from 'react';
import { CurrencyState } from '../types';

interface PriceDisplayProps {
  usdPrice: number;
  currency: CurrencyState;
  lang: string;
  className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ usdPrice, currency, lang, className = "" }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  // Calculate current formatted string
  const getFormatted = () => {
    const converted = usdPrice * currency.rate;
    const formatted = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'ru-RU', {
      minimumFractionDigits: currency.code === 'USD' ? 2 : 0,
      maximumFractionDigits: currency.code === 'USD' ? 2 : 0,
    }).format(converted);
    return `${currency.symbol}${formatted}`;
  };

  const current = getFormatted();

  useEffect(() => {
    // If the value changed, trigger a fade animation
    if (displayValue && displayValue !== current) {
      setIsChanging(true);
      const timer = setTimeout(() => {
        setDisplayValue(current);
        setIsChanging(false);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(current);
    }
  }, [current, displayValue]);

  return (
    <span 
      className={`inline-block transition-all duration-300 ease-out transform ${className} ${
        isChanging ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
      }`}
    >
      {displayValue}
    </span>
  );
};

export default PriceDisplay;
