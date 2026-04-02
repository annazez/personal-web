import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isLanguageCode, getValidLanguageCode, defaultLang } from '../../src/i18n/dictionary.ts';

describe('i18n/dictionary utilities', () => {
  describe('isLanguageCode', () => {
    it('should return true for valid language codes', () => {
      assert.equal(isLanguageCode('en'), true);
      assert.equal(isLanguageCode('cs'), true);
    });

    it('should return false for invalid language codes', () => {
      assert.equal(isLanguageCode('fr'), false);
      assert.equal(isLanguageCode('de'), false);
      assert.equal(isLanguageCode('EN'), false); // case-sensitive check
      assert.equal(isLanguageCode(''), false);
      assert.equal(isLanguageCode('random'), false);
    });
  });

  describe('getValidLanguageCode', () => {
    it('should return the passed language code if it is valid', () => {
      assert.equal(getValidLanguageCode('en'), 'en');
      assert.equal(getValidLanguageCode('cs'), 'cs');
    });

    it('should return the default language code if an invalid string is passed', () => {
      assert.equal(getValidLanguageCode('fr'), defaultLang);
      assert.equal(getValidLanguageCode('invalid'), defaultLang);
      assert.equal(getValidLanguageCode('EN'), defaultLang);
      assert.equal(getValidLanguageCode(''), defaultLang);
    });

    it('should return the default language code if undefined is passed', () => {
      assert.equal(getValidLanguageCode(undefined), defaultLang);
    });
  });
});
