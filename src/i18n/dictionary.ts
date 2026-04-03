import en from './locales/en';
import cs from './locales/cs';
import type { TranslationDictionary, TranslationKey } from './locales/en';

export const languages = {
  en: 'EN',
  cs: 'CS',
} as const;

export type LanguageCode = keyof typeof languages;

export const supportedLangs: ReadonlyArray<LanguageCode> = Object.keys(
  languages
) as LanguageCode[];
export const languageEntries: ReadonlyArray<[LanguageCode, string]> = Object.entries(
  languages
) as Array<[LanguageCode, string]>;

export const defaultLang: LanguageCode = 'en';

export const dictionary: Record<LanguageCode, TranslationDictionary> = {
  en,
  cs,
};

export const langPrefixRegex = /^\/(en|cs)(?:\/|$)/;

export const routes = {
  workspace: {
    en: 'inventory',
    cs: 'inventar',
  } satisfies Record<LanguageCode, string>,
} as const;

export type { TranslationKey };

export function getValidLanguageCode(value: string | undefined): LanguageCode {
  return value === 'en' || value === 'cs' ? value : defaultLang;
}
