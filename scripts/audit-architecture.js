/* global process */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

let errors = [];

// Rule 1: No .js or .jsx files allowed in src/
function checkNoJsFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      checkNoJsFiles(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      errors.push(`[Rule 1 Failure] Found forbidden JavaScript file in src/: ${path.relative(rootDir, fullPath)}`);
    }
  }
}

// Rule 2: Verify Single Source of Truth for Constants
function checkConstantsIntegrity() {
  const constantsPath = path.join(srcDir, 'utils', 'constants.ts');
  if (!fs.existsSync(constantsPath)) {
    errors.push(`[Rule 2 Failure] Single source of truth constants file missing: src/utils/constants.ts`);
  }
}

// Rule 3: Check for direct unsafe patterns in src/ files
function scanFilesForPatternRules(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanFilesForPatternRules(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for legacy JS import references
      if (/from\s+['"].*\.js['"]/.test(content)) {
        errors.push(`[Rule 3 Failure] Legacy .js import found in ${path.relative(rootDir, fullPath)}`);
      }
    }
  }
}

console.log('🔍 Running Architectural Audit Gate...');
checkNoJsFiles(srcDir);
checkConstantsIntegrity();
scanFilesForPatternRules(srcDir);

if (errors.length > 0) {
  console.error('\n❌ Architectural Audit Failed with errors:');
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log('✅ Architectural Audit Passed! 0 JS files in src/, architecture contracts clean.\n');
  process.exit(0);
}
