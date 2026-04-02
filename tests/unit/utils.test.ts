import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getLangFromUrl, useTranslations } from '../../src/i18n/utils.ts';
import { defaultLang, dictionary } from '../../src/i18n/dictionary.ts';

describe('i18n utils', () => {
  describe('getLangFromUrl', () => {
    it('should return "en" for URL with /en/ prefix', () => {
      const url = new URL('https://example.com/en/about');
      assert.strictEqual(getLangFromUrl(url), 'en');
    });

    it('should return "cs" for URL with /cs/ prefix', () => {
      const url = new URL('https://example.com/cs/about');
      assert.strictEqual(getLangFromUrl(url), 'cs');
    });

    it('should return default language for URL with unsupported language prefix', () => {
      const url = new URL('https://example.com/fr/about');
      assert.strictEqual(getLangFromUrl(url), defaultLang);
    });

    it('should return default language for URL with no language prefix', () => {
      const url = new URL('https://example.com/about');
      assert.strictEqual(getLangFromUrl(url), defaultLang);
    });

    it('should return default language for root URL', () => {
      const url = new URL('https://example.com/');
      assert.strictEqual(getLangFromUrl(url), defaultLang);
    });
  });

  describe('useTranslations', () => {
    it('should return correct translation for English', () => {
      const t = useTranslations('en');
      assert.strictEqual(t('seo.home'), 'Home');
    });

    it('should return correct translation for Czech', () => {
      const t = useTranslations('cs');
      assert.strictEqual(t('seo.home'), 'Domů');
    });

    it('should fallback to default language if translation is missing in the target dictionary', () => {
      const t = useTranslations('cs');
      const testKey = 'seo.home' as const;
      const originalCsValue = dictionary.cs[testKey];

      delete (dictionary.cs as Partial<typeof dictionary.cs>)[testKey];

      try {
        assert.strictEqual(dictionary.cs[testKey], undefined);
        assert.strictEqual(t(testKey), dictionary[defaultLang][testKey]);
      } finally {
        dictionary.cs[testKey] = originalCsValue;
      }
    });
  });
});
