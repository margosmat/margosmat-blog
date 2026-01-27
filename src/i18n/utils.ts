import en from './en.json';
import pl from './pl.json';

export const languages = {
    en: 'English',
    pl: 'Polski',
};

export const defaultLang = 'en';

export const ui = {
    en,
    pl,
} as const;

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}
