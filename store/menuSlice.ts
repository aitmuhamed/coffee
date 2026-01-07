
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '../types';
import { MENU_ITEMS as initialItems } from '../constants';

interface MenuState {
  items: MenuItem[];
}

const initialState: MenuState = {
  items: initialItems,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, deleteItem } = menuSlice.actions;
export default menuSlice.reducer;
