export interface LanguageSettingItem {
  id: string;
  label: string;
  nativeLabel: string;
  direction: 'ltr' | 'rtl';
  locale: string;
  flag: string;
  isDefault: boolean;
}

export const languages: LanguageSettingItem[] = [
  {
    id: 'en',
    label: 'English',
    nativeLabel: 'English',
    direction: 'ltr',
    locale: 'en-US',
    flag: '🇺🇸',
    isDefault: true,
  },
  {
    id: 'de',
    label: 'German',
    nativeLabel: 'Deutsch',
    direction: 'ltr',
    locale: 'de-DE',
    flag: '🇩🇪',
    isDefault: false,
  },
  {
    id: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    direction: 'rtl',
    locale: 'ar-EG',
    flag: '🇪🇬',
    isDefault: false,
  },
];
