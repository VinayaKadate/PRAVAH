import React, { createContext, useContext, useState, useEffect } from 'react';
import { T } from '../constants/translations';
import apiClient from '../api/client';

const TranslationContext = createContext();

export function useTranslation() {
  return useContext(TranslationContext);
}

export function TranslationProvider({ children }) {
  const [lang, setLang] = useState('en');

  // Update Axios default headers whenever language changes
  useEffect(() => {
    apiClient.defaults.headers.common['Accept-Language'] = lang;
  }, [lang]);

  const t = T[lang] || T['en'];

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}
