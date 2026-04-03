import { dictionary, defaultLang, type LanguageCode, type TranslationKey } from './dictionary';

export function getLangFromUrl(url: URL): LanguageCode {
  const match = /^\/(en|cs)(?:\/|$)/.exec(url.pathname);
  return (match?.[1] as LanguageCode) ?? defaultLang;
}

export function useTranslations(lang: LanguageCode) {
  return function t(key: TranslationKey) {
    return dictionary[lang][key] ?? dictionary[defaultLang][key];
  };
}
