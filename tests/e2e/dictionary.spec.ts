import { test, expect } from '@playwright/test';
import { getValidLanguageCode } from '../../src/i18n/dictionary';

test.describe('i18n dictionary utilities', () => {
  test('getValidLanguageCode returns correct language code for valid inputs', () => {
    expect(getValidLanguageCode('en')).toBe('en');
    expect(getValidLanguageCode('cs')).toBe('cs');
  });

  test('getValidLanguageCode returns default language for invalid inputs', () => {
    expect(getValidLanguageCode('fr')).toBe('en');
    expect(getValidLanguageCode('es')).toBe('en');
    expect(getValidLanguageCode('')).toBe('en');
  });

  test('getValidLanguageCode returns default language for undefined', () => {
    expect(getValidLanguageCode(undefined)).toBe('en');
  });
});
