import { createContext, useContext, useMemo } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, translations, translateTerm } from '../i18n/translations';

const I18N_STORAGE_KEY = 'artesanos-verdes:language';

const I18nContext = createContext(null);

function interpolate(template, values) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => String(values?.[key] ?? ''));
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useLocalStorageState(I18N_STORAGE_KEY, DEFAULT_LANGUAGE);

  const t = (key, values) => {
    const locale = translations[language] ?? translations[DEFAULT_LANGUAGE];
    const fallbackLocale = translations[DEFAULT_LANGUAGE];
    const template = locale[key] ?? fallbackLocale[key] ?? key;

    if (typeof template !== 'string') {
      return key;
    }

    return interpolate(template, values);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
      translateCategory: (category) => translateTerm('category', category, language),
      translateTag: (tag) => translateTerm('tag', tag, language),
    }),
    [language, setLanguage]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error(translations[DEFAULT_LANGUAGE].useI18nError);
  }

  return context;
}
