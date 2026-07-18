import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ar from '../locales/ar.json';

const translations = { en, fr, ar };

const LocaleContext = createContext(null);

function translateValue(locale, key, params = {}) {
    const message = translations[locale]?.[key] ?? translations.en[key] ?? key;
    return Object.entries(params).reduce((acc, [name, value]) => acc.replace(new RegExp(`\\{${name}\\}`, 'g'), String(value)), message);
}

function resolveLocale(initial) {
    if (typeof window === 'undefined') return initial;
    return window.localStorage.getItem('growup-locale') || initial;
}

export function LocaleProvider({ children }) {
    const [locale, setLocale] = useState(() => resolveLocale('en'));

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('growup-locale', locale);
        }
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }, [locale]);

    const t = (key, params = {}) => translateValue(locale, key, params);

    const value = useMemo(
        () => ({ locale, setLocale, t, languages: { en: 'EN', fr: 'FR', ar: 'AR' } }),
        [locale]
    );

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        return { locale: 'en', setLocale: () => { }, t: (key, params = {}) => translateValue('en', key, params), languages: { en: 'EN', fr: 'FR', ar: 'AR' } };
    }
    return context;
}
