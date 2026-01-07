
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'en' | 'mn' | 'kk' | 'ru';

interface LanguageState {
  current: Language;
}

const initialState: LanguageState = {
  current: (localStorage.getItem('lang') as Language) || 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.current = action.payload;
      localStorage.setItem('lang', action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
