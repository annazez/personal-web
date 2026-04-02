import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getLangFromUrl } from '../../src/i18n/utils.ts';

describe('getLangFromUrl', () => {
  test('returns correct language for supported language prefixes', () => {
    assert.equal(getLangFromUrl(new URL('http://localhost/en/about')), 'en');
    assert.equal(getLangFromUrl(new URL('http://localhost/cs/about')), 'cs');
  });

  test('returns default language for unsupported language prefixes', () => {
    assert.equal(getLangFromUrl(new URL('http://localhost/fr/about')), 'en');
    assert.equal(getLangFromUrl(new URL('http://localhost/de/about')), 'en');
  });

  test('returns default language for root path', () => {
    assert.equal(getLangFromUrl(new URL('http://localhost/')), 'en');
  });

  test('returns default language for paths without language prefixes', () => {
    assert.equal(getLangFromUrl(new URL('http://localhost/about')), 'en');
    assert.equal(getLangFromUrl(new URL('http://localhost/contact/us')), 'en');
  });

  test('handles trailing slashes correctly', () => {
    assert.equal(getLangFromUrl(new URL('http://localhost/en')), 'en');
    assert.equal(getLangFromUrl(new URL('http://localhost/en/')), 'en');
  });

  test('parses absolute URLs correctly and ignores domain', () => {
    assert.equal(getLangFromUrl(new URL('https://annazezulka.com/cs/portfolio')), 'cs');
    assert.equal(getLangFromUrl(new URL('https://en.wikipedia.org/wiki/Main_Page')), 'en');
  });

  test('handles case sensitivity (returns default for uppercase)', () => {
    // Current implementation does exact match, so uppercase will fall back to default
    assert.equal(getLangFromUrl(new URL('http://localhost/EN/about')), 'en');
    assert.equal(getLangFromUrl(new URL('http://localhost/CS/about')), 'en');
  });
});
