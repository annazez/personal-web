import assert from 'node:assert';
import { describe, it, mock } from 'node:test';

// We mock the identity module BEFORE importing external-links.ts
// so that the dynamic allowlist derivation picks up our mock.
const mockIdentity = {
  github: 'https://github.com/annazez',
  newService: 'https://new-service.com',
};

mock.module('../../../src/data/identity.ts', {
  namedExports: { identity: mockIdentity },
});

// Use dynamic import so the mock is active when the module is loaded
const { toSafeExternalUrl, toSafeInternalPath, toSafeLinkHref, isSafeLinkHref } =
  await import('../../../src/security/external-links.ts');

describe('security/external-links', () => {
  it('allows known https hosts', () => {
    assert.strictEqual(
      toSafeExternalUrl('https://github.com/annazez/telperion-web'),
      'https://github.com/annazez/telperion-web'
    );
    assert.strictEqual(toSafeExternalUrl('https://telperion.cz'), 'https://telperion.cz/');
  });

  it('automatically allows hosts from identity.ts', () => {
    assert.strictEqual(
      toSafeExternalUrl('https://new-service.com/profile'),
      'https://new-service.com/profile'
    );
  });

  it('rejects unknown hosts and unsafe protocols', () => {
    assert.strictEqual(toSafeExternalUrl('https://example.com'), undefined);
    assert.strictEqual(toSafeExternalUrl('http://github.com/annazez/telperion-web'), undefined);
    assert.strictEqual(toSafeExternalUrl('javascript:alert(1)'), undefined);
    assert.strictEqual(toSafeExternalUrl('data:text/html,hello'), undefined);
  });

  it('rejects malformed values', () => {
    assert.strictEqual(toSafeExternalUrl('not-a-url'), undefined);
    assert.strictEqual(toSafeExternalUrl(undefined), undefined);
  });

  it('allows safe internal paths without allowing protocol-relative URLs', () => {
    assert.strictEqual(toSafeInternalPath('/en/projects/'), '/en/projects/');
    assert.strictEqual(
      toSafeInternalPath('/cs/projects/lumi/?ref=test#top'),
      '/cs/projects/lumi/?ref=test#top'
    );
    assert.strictEqual(toSafeInternalPath('//example.com/path'), undefined);
    assert.strictEqual(toSafeInternalPath('projects/lumi'), undefined);
  });

  it('normalizes either safe internal paths or allowlisted external URLs', () => {
    assert.strictEqual(toSafeLinkHref('/en/projects/'), '/en/projects/');
    assert.strictEqual(toSafeLinkHref('https://telperion.cz'), 'https://telperion.cz/');
    assert.strictEqual(toSafeLinkHref('https://example.com'), undefined);
    assert.strictEqual(isSafeLinkHref('/cs/'), true);
    assert.strictEqual(isSafeLinkHref('javascript:alert(1)'), false);
  });

  it('ContentCard sanitization: returns undefined for unsafe external links', () => {
    // This replicates the logic used in ContentCard.astro
    const unsafeLink = 'https://malicious.com';
    assert.strictEqual(toSafeExternalUrl(unsafeLink), undefined);
  });
});
