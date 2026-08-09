import { describe, it, expect } from 'vitest';
import { getTranslation, t } from '../i18n';
import { LANGUAGES } from '../constants';

describe('CareerCraft Internationalization & German Localization Suite', () => {
  it('1. German dictionary (de) returns professional German career terms', () => {
    const dePack = getTranslation(LANGUAGES.DE);
    expect(dePack.cvBuilder).toBe('Lebenslauf');
    expect(dePack.experience).toBe('Berufserfahrung');
    expect(dePack.education).toBe('Ausbildung & Studium');
    expect(dePack.jobSearch).toBe('Stellensuche');
    expect(dePack.applications).toBe('Bewerbungen');
    expect(dePack.settings).toBe('Einstellungen');
  });

  it('2. English (en) and Arabic (ar) dictionaries remain functional', () => {
    const enPack = getTranslation(LANGUAGES.EN);
    const arPack = getTranslation(LANGUAGES.AR);

    expect(enPack.cvBuilder).toBe('CV Builder');
    expect(arPack.cvBuilder).toBe('منشئ السيرة الذاتية');
  });

  it('3. Fallback helper t(key) handles missing keys safely', () => {
    expect(t('cvBuilder', LANGUAGES.DE)).toBe('Lebenslauf');
    expect(t('non_existent_key', LANGUAGES.DE)).toBe('non_existent_key');
  });

  it('4. Number and Date formatting for German locale (de-DE)', () => {
    const numberFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
    const formattedSalary = numberFormatter.format(60000);
    expect(formattedSalary).toContain('60.000');

    const dateFormatter = new Intl.DateTimeFormat('de-DE');
    const formattedDate = dateFormatter.format(new Date(2026, 7, 8));
    expect(formattedDate).toBe('8.8.2026');
  });
});
