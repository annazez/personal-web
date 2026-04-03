import assert from 'node:assert';
import { describe, it } from 'node:test';
import { SITE_URL } from '../../src/config.ts';

describe('config', () => {
  describe('SITE_URL', () => {
    it('should be a valid URL', () => {
      assert.strictEqual(typeof SITE_URL, 'string');
      assert.ok(SITE_URL.startsWith('http://') || SITE_URL.startsWith('https://'));
      assert.ok(new URL(SITE_URL).hostname);
    });
  });
});
