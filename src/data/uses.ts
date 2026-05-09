/**
 * /uses page data — IndieWeb tradition (see uses.tech).
 *
 * Each category maps to a Surface card on the page.
 * Items with a `url` will render as external links via toSafeExternalUrl.
 */

export interface UsesItem {
  name: string;
  note?: string;
  url?: string;
}

export interface UsesCategory {
  /** Translation key for the category heading, e.g. 'uses.cat.hardware' */
  categoryKey: string;
  items: UsesItem[];
}

const uses: UsesCategory[] = [
  {
    categoryKey: 'uses.cat.hardware',
    items: [{ name: 'Framework 13 Pro', url: 'https://frame.work' }, { name: 'Pixel 8a' }],
  },
  {
    categoryKey: 'uses.cat.os',
    items: [
      { name: 'Fedora Silverblue', url: 'https://fedoraproject.org/silverblue/' },
      { name: 'GrapheneOS', url: 'https://grapheneos.org' },
    ],
  },
  {
    categoryKey: 'uses.cat.editor',
    items: [{ name: 'Zed', url: 'https://zed.dev' }],
  },
  {
    categoryKey: 'uses.cat.languages',
    items: [
      { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
      { name: 'Svelte', url: 'https://svelte.dev' },
      { name: 'Astro', url: 'https://astro.build' },
      { name: 'Node.js', url: 'https://nodejs.org' },
      { name: 'Rust', url: 'https://www.rust-lang.org' },
    ],
  },
  {
    categoryKey: 'uses.cat.git',
    items: [{ name: 'Codeberg', url: 'https://codeberg.org' }],
  },
];

export default uses;
