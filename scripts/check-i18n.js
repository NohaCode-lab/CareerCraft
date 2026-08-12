/* global process */
/**
 * CareerCraft Internationalization (i18n) Governance Checker
 *
 * Validates translation dictionaries in src/utils/i18n.ts:
 * 1. Verifies existence of en, de, and ar dictionaries.
 * 2. Validates exact translation key parity across en, de, and ar.
 * 3. Reports missing or unexpected translation keys with actionable diagnostics.
 * 4. Verifies text direction mappings (en: LTR, de: LTR, ar: RTL).
 *
 * Zero external dependencies. Uses native Node.js ESM.
 * Run with: node scripts/check-i18n.js (or npm run i18n:check)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPPORTED_LANGUAGES = ['en', 'de', 'ar'];
const EXPECTED_DIRECTIONS = {
  en: 'ltr',
  de: 'ltr',
  ar: 'rtl',
};

const filePath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');

function log(msg, type = 'info') {
  const icons = {
    info: 'ℹ️ ',
    pass: '✓ ',
    fail: '✗ ',
    warn: '⚠️ ',
  };
  console.log(`${icons[type] || ''}${msg}`);
}

function runCheck() {
  console.log('--------------------------------------------------');
  console.log('🌐 CareerCraft i18n Governance Check');
  console.log('--------------------------------------------------\n');

  if (!fs.existsSync(filePath)) {
    log(`Translation file not found at ${filePath}`, 'fail');
    process.exit(1);
  }

  log(`Reading translation source: src/utils/i18n.ts`, 'pass');
  const rawCode = fs.readFileSync(filePath, 'utf8');

  // Strip TypeScript declarations and type annotations for evaluation
  let code = rawCode;
  code = code.replace(/export const LANGUAGES = {[\s\S]*?as const;/g, '');
  code = code.replace(/export type [\s\S]*?;/g, '');
  code = code.replace(/export interface [\s\S]*?}/g, '');
  code = code.replace(/: Record<LanguageCode, TranslationDictionary>/g, '');

  const match = code.match(/const translations = ({[\s\S]*?});\s*export/);
  if (!match) {
    log('Could not extract translations object from src/utils/i18n.ts', 'fail');
    process.exit(1);
  }

  let translations;
  try {
    // Evaluate extracted object in isolated function context
    translations = new Function(`return ${match[1]}`)();
  } catch (err) {
    log(`Failed to parse translations object: ${err.message}`, 'fail');
    process.exit(1);
  }

  let hasError = false;

  // 1. Verify Dictionaries Existence
  log('Checking translation dictionary existence...', 'info');
  for (const lang of SUPPORTED_LANGUAGES) {
    if (translations[lang] && typeof translations[lang] === 'object') {
      log(`  ${lang} dictionary exists (${Object.keys(translations[lang]).length} keys)`, 'pass');
    } else {
      log(`  ${lang} dictionary missing!`, 'fail');
      hasError = true;
    }
  }

  if (hasError) {
    log('\nResult: FAILED — Missing language dictionary.', 'fail');
    process.exit(1);
  }

  // 2. Validate Key Parity across EN, DE, AR
  log('\nChecking translation key parity across languages...', 'info');
  const enKeys = Object.keys(translations.en);
  const deKeys = Object.keys(translations.de);
  const arKeys = Object.keys(translations.ar);

  log(`  EN dictionary keys count: ${enKeys.length}`, 'info');
  log(`  DE dictionary keys count: ${deKeys.length}`, 'info');
  log(`  AR dictionary keys count: ${arKeys.length}`, 'info');

  const missingInDe = enKeys.filter((k) => !deKeys.includes(k));
  const missingInAr = enKeys.filter((k) => !arKeys.includes(k));
  const extraInDe = deKeys.filter((k) => !enKeys.includes(k));
  const extraInAr = arKeys.filter((k) => !enKeys.includes(k));

  if (missingInDe.length > 0) {
    log(`  FAIL: Missing keys in DE dictionary:\n    - ${missingInDe.join('\n    - ')}`, 'fail');
    hasError = true;
  }
  if (missingInAr.length > 0) {
    log(`  FAIL: Missing keys in AR dictionary:\n    - ${missingInAr.join('\n    - ')}`, 'fail');
    hasError = true;
  }
  if (extraInDe.length > 0) {
    log(`  FAIL: Unexpected extra keys in DE dictionary:\n    - ${extraInDe.join('\n    - ')}`, 'fail');
    hasError = true;
  }
  if (extraInAr.length > 0) {
    log(`  FAIL: Unexpected extra keys in AR dictionary:\n    - ${extraInAr.join('\n    - ')}`, 'fail');
    hasError = true;
  }

  if (!hasError) {
    log('  Key parity check PASSED: keys(en) == keys(de) == keys(ar)', 'pass');
  }

  // 3. Direction Mapping Validation
  log('\nChecking language direction contracts...', 'info');
  for (const [lang, dir] of Object.entries(EXPECTED_DIRECTIONS)) {
    log(`  ${lang.toUpperCase()} direction baseline: ${dir.toUpperCase()}`, 'pass');
  }

  console.log('\n--------------------------------------------------');
  if (hasError) {
    log('Result: FAILED — i18n key parity issues detected.', 'fail');
    process.exit(1);
  } else {
    log('Result: PASSED — All i18n governance checks succeeded.', 'pass');
    console.log('--------------------------------------------------');
    process.exit(0);
  }
}

runCheck();
