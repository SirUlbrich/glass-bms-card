import * as de from './de.json';
import * as en from './en.json';

// Typ-Sicherheit für TypeScript
const languages: any = {
  de: de,
  en: en,
};

export function localize(string: string, search = '', replace = ''): string {
  // Holt die Sprache aus dem LocalStorage oder Standard 'en'
  const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '');

  let translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated || string;
}