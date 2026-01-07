
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

interface ThemeState {
  current: Theme;
}

const initialState: ThemeState = {
  current: (localStorage.getItem('theme') as Theme) || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.current = state.current === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.current);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.current = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
