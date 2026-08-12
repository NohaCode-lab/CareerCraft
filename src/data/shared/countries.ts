export interface CountryItem {
  code: string;
  name: string;
  label: string;
  region: string;
  currency: string;
  locale: string;
  flag: string;
}

export const countries: CountryItem[] = [
  {
    code: 'DE',
    name: 'Germany',
    label: 'Germany',
    region: 'EUROPE',
    currency: 'EUR',
    locale: 'de-DE',
    flag: '🇩🇪',
  },
  {
    code: 'NL',
    name: 'Netherlands',
    label: 'Netherlands',
    region: 'EUROPE',
    currency: 'EUR',
    locale: 'nl-NL',
    flag: '🇳🇱',
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    label: 'Luxembourg',
    region: 'EUROPE',
    currency: 'EUR',
    locale: 'fr-LU',
    flag: '🇱🇺',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    label: 'UAE',
    region: 'MIDDLE_EAST',
    currency: 'AED',
    locale: 'ar-AE',
    flag: '🇦🇪',
  },
  {
    code: 'EG',
    name: 'Egypt',
    label: 'Egypt',
    region: 'MIDDLE_EAST',
    currency: 'EGP',
    locale: 'ar-EG',
    flag: '🇪🇬',
  },
  {
    code: 'EU',
    name: 'Europe / Remote',
    label: 'Europe / Remote',
    region: 'REMOTE',
    currency: 'EUR',
    locale: 'en-EU',
    flag: '🌍',
  },
];
