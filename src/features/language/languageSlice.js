// src/features/language/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialLang =
  new URLSearchParams(window.location.search).get("lang") ||
  localStorage.getItem("lang") ||
  "en";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: initialLang,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
    },
    toggleLanguage: (state) => {
      state.lang = state.lang === "en" ? "mm" : "en";
      localStorage.setItem("lang", state.lang);
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
