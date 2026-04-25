const en = {
  'role.title': 'Junior Full-stack Web Developer',
  'hero.manifesto':
    'I design systems that are fast, accessible, and built to last - not just today, but for whoever comes after me.',
  'home.contactLabel': 'Contact',
  'home.contactTitle': "Let's talk",
  'home.contact': 'Have a project in mind, or just want to say hello?',
  'home.contactCta': 'Get in touch',
  'home.social.linkedin': 'LinkedIn',
  'home.social.signal': 'Signal',
  'site.name': 'Anna Zezulka',
  'footer.lastUpdated': 'Last updated:',
  'footer.navigation': 'Footer links',
  'footer.siteQuality': 'Site quality',
  'footer.sourceCode': 'Source code on Codeberg',
  'footer.humansTxt': 'Humans.txt',
  'footer.pgpPublicKey': 'PGP public key',
  'hero.minimalByDesign': 'Minimal by design.',
  'projects.title': 'Projects',
  'projects.subtitle':
    'A selection of work that demonstrates my approach to architecture and design.',
  'projects.more': 'View all projects',
  'projects.visit': 'Visit',
  'projects.source': 'Code',
  'projects.carousel.previous': 'Previous project',
  'projects.carousel.next': 'Next project',
  'projects.carousel.slide': 'Go to slide',
  readCaseStudy: 'Read case study',
  'projects.telperion.description':
    "An NGO's broken website was making their climate education work invisible. I designed and delivered a complete Jamstack ecosystem: bilingual i18n routing, automated email workflows, WCAG-compliant accessibility validated in CI, and fully static output that requires no server. The NGO now owns an independent, high-performance presence built to last.",
  'projects.mentalHealth.description':
    'Architecture design for a multidisciplinary wellbeing platform for the Czech market. Covers mood tracking (RULER method), digital diary, sleep monitoring, and a crisis intervention module - with clinically-grounded personalisation via WHO-5, GAD-7, and PHQ-9 questionnaires. Currently in architecture design phase.',
  back: 'Back',
  feedTitle: 'Anna Zezulka – Projects',
  feedDescription: 'Case studies and project write-ups.',
  'layout.skipToMain': 'Skip to main content',
  'ui.themeToggle': 'Theme mode',
  'ui.themeLight': 'Light',
  'ui.themeDark': 'Dark',
  'ui.themeSystem': 'System',
  'ui.mobileNavigationLabel': 'Navigation',
  'ui.languageNavigation': 'Language',
  'index.chooseLanguage': 'Choose language:',
  '404.title': 'System Node Not Found',
  '404.message':
    "The architecture you are looking for has been moved or doesn't exist in this dimension.",
  '404.languagePrompt': 'Choose a language:',
  'print.banner': '[ ARCHITECTURAL SPECIFICATION // SYSTEM: ANNA ZEZULKA // RENDER: PRINT ]',
  'seo.home': 'Home',
  'seo.quality': 'Site quality',
  'seo.404': 'Not Found',
  'quality.title': 'Site quality',
  'quality.summary':
    'Latest Lighthouse CI snapshot generated in the delivery pipeline for transparency and technical review.',
  'quality.details': 'Details',
  'footer.carbonFootprint': 'Carbon footprint:',
  'footer.loading': 'calculating...',
  '404.return': 'Home',
} as const;

export type TranslationKey = keyof typeof en;
export type TranslationDictionary = Record<TranslationKey, string>;

export default en;
