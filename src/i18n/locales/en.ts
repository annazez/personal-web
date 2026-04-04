const en = {
  'role.title': 'Software Architect',
  'hero.manifesto':
    'I design systems that are fast, accessible, and built to last - not just today, but for whoever comes after me.',
  'home.contact': 'Have a project in mind, or just want to say hello?',
  'home.contactCta': 'Get in touch →',
  'footer.lastUpdated': 'Last updated:',
  'hero.minimalByDesign': 'Minimal by design.',
  'hero.inventory': 'Inventory',
  'projects.title': 'Projects',
  'projects.subtitle':
    'A selection of work that demonstrates my approach to architecture and design.',
  'projects.visit': 'Visit',
  'projects.source': 'Code',
  readCaseStudy: 'Read case study',
  'projects.telperion.description':
    'Telperion had a broken, inaccessible website that made their climate education work invisible online. I rebuilt it from scratch - bilingual, fully accessible (WCAG), statically generated with Astro, and documented with an architecture guide so future contributors can take over without friction. The result is a fast, sustainable site that the organization fully owns and can maintain independently.',
  'projects.personalWeb.description':
    'My personal portfolio website. A minimalist, privacy-first design with fast performance, zero tracking, and clean architecture.',
  'projects.mentalHealth.description': 'Work in progress.',
  back: 'Back',
  feedTitle: 'Anna Zezulka – Projects',
  feedDescription: 'Case studies and project write-ups.',
  'seo.home': 'Home',
  'seo.workspace': 'Inventory',
  'seo.404': 'Not Found',
  'footer.downloadCv': 'Download CV',
  'footer.carbonFootprint': 'Carbon footprint:',
  'footer.loading': 'calculating...',
  '404.message': 'Page not found',
  '404.return': 'Home',
} as const;

export type TranslationKey = keyof typeof en;
export type TranslationDictionary = Record<TranslationKey, string>;

export default en;
