// src/store/slices/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'vi' | 'en';

interface LanguageState {
  lang: Language;
}

const storedLang =
  typeof window !== 'undefined' ? localStorage.getItem('lang') : null;

const initialState: LanguageState = {
  lang: (storedLang as Language) || 'vi',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<Language>) => {
      state.lang = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('lang', action.payload);
      }
    },
  },
});

export const { setLang } = languageSlice.actions;
export default languageSlice.reducer;
