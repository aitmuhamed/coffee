
export type CurrencyCode = 'USD' | 'MNT' | 'KZT' | 'RUB';

export interface CurrencyState {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Rate relative to USD
  lastUpdated: string | null;
  rates: Record<CurrencyCode, number>;
  isLoading: boolean;
}

export interface SizeOption {
  label: string;
  price: number; // Price in USD
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // Default/Base price in USD
  category: 'Coffee' | 'Tea' | 'Pastry' | 'Brunch' | 'Cake';
  image: string;
  sizes?: SizeOption[];
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: SizeOption;
}

export interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
}
