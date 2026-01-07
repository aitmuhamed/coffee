
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem, CartItem, SizeOption } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToCart: (state, action: PayloadAction<{ item: MenuItem; size?: SizeOption; quantity?: number }>) => {
      const { item, size, quantity = 1 } = action.payload;
      const existing = state.items.find(i => 
        i.id === item.id && 
        (size ? i.selectedSize?.label === size.label : !i.selectedSize)
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ 
          ...item, 
          quantity, 
          selectedSize: size,
          price: size ? size.price : item.price 
        });
      }
      state.isOpen = true;
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; sizeLabel?: string }>) => {
      state.items = state.items.filter(item => 
        !(item.id === action.payload.id && item.selectedSize?.label === action.payload.sizeLabel)
      );
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; sizeLabel?: string; delta: number }>) => {
      const item = state.items.find(i => 
        i.id === action.payload.id && i.selectedSize?.label === action.payload.sizeLabel
      );
      if (item) {
        item.quantity = Math.max(1, item.quantity + action.payload.delta);
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { toggleCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
