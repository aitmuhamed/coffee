
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import cartReducer from './cartSlice';
import languageReducer from './languageSlice';
import currencyReducer from './currencySlice';
import galleryReducer from './gallerySlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    language: languageReducer,
    currency: currencyReducer,
    gallery: galleryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
