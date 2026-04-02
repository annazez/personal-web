const supportedLangs = ['en', 'cs'];
const defaultLang = 'en';

const preferred =
  Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language || defaultLang;

const prefLangCode = preferred.split('-')[0].toLowerCase();

const targetLang = supportedLangs.includes(prefLangCode) ? prefLangCode : defaultLang;
window.location.replace(`/${targetLang}/`);
