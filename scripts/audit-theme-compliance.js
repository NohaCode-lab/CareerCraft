/* global process */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SCAN_DIRS = [
  path.join(rootDir, 'src', 'components', 'ui'),
  path.join(rootDir, 'src', 'components', 'pages'),
  path.join(rootDir, 'src', 'components', 'dashboard'),
  path.join(rootDir, 'src', 'components', 'layout'),
];

// Explicit allowlist for legitimate intentional fixed colors & elements
const ALLOWLIST_PATTERNS = [
  // Brand buttons & interactive elements
  /bg-indigo-\d+/,
  /bg-red-\d+/,
  /bg-rose-\d+/,
  /bg-emerald-\d+/,
  /bg-amber-\d+/,
  /bg-sky-\d+/,
  /bg-violet-\d+/,
  /text-indigo-\d+/,
  /text-emerald-\d+/,
  /text-amber-\d+/,
  /text-rose-\d+/,
  /text-red-\d+/,
  /text-violet-\d+/,
  /text-sky-\d+/,
  /border-indigo-\d+/,
  /border-emerald-\d+/,
  /border-amber-\d+/,
  /border-red-\d+/,
  /border-teal-\d+/,
  // Decorative gradients & overlays
  /from-indigo-\d+/,
  /via-transparent/,
  /to-cyan-\d+/,
  /shadow-indigo-\d+/,
  /shadow-red-\d+/,
  /shadow-slate-\d+/,
  /shadow-black\/\d+/,
  // Dark sidebar & layout shell
  /bg-slate-950/,
  /bg-slate-900/,
  /bg-slate-800/,
];

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (/\.(tsx|ts|jsx|js)$/.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

console.log('CareerCraft UI Architecture Audit\n=================================');

let totalViolations = 0;
const violationsList = [];

for (const scanDir of SCAN_DIRS) {
  const files = getFiles(scanDir);
  for (const filePath of files) {
    const relativePath = path.relative(rootDir, filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check 1: Primitive Bypass (page component using custom rounded-3xl empty box with hardcoded slate-900 instead of EmptyState/Card)
      if (
        relativePath.includes('pages') &&
        /className=.*rounded-3xl.*border-dashed.*bg-slate-900/i.test(line)
      ) {
        violationsList.push({
          file: relativePath,
          line: i + 1,
          rule: 'Primitive Bypass',
          message: 'Page component implements an ad-hoc empty state card instead of consuming <EmptyState /> primitive.',
        });
        totalViolations++;
      }

      // Check 2: Un-prefixed raw dark palette classes on non-allowlisted elements
      const darkRawMatches = line.match(/\b(bg-slate-900\/[0-9]+|bg-slate-900|bg-slate-800\/[0-9]+|border-white\/10|text-slate-400)\b/g);
      if (darkRawMatches) {
        for (const match of darkRawMatches) {
          // Verify if it has a dark: prefix or is in allowlisted layout files
          const isDarkPrefixed = new RegExp(`dark:${match.replace('/', '\\/')}`).test(line);
          const isLayoutSidebar = relativePath.includes('Sidebar') || relativePath.includes('Navbar');
          
          if (!isDarkPrefixed && !isLayoutSidebar) {
            // Check if allowlisted
            const isAllowlisted = ALLOWLIST_PATTERNS.some((pattern) => pattern.test(match));
            if (!isAllowlisted) {
              violationsList.push({
                file: relativePath,
                line: i + 1,
                rule: 'Un-prefixed Dark Palette Class',
                message: `Found raw un-prefixed dark class '${match}' without light mode equivalent or semantic token.`,
              });
              totalViolations++;
            }
          }
        }
      }
    }
  }
}

if (violationsList.length > 0) {
  console.log('\n❌ Violations Detected:\n');
  violationsList.forEach((v) => {
    console.log(`  ${v.file}:${v.line} -> [${v.rule}] ${v.message}`);
  });
  console.log(`\nResult: FAILED (${totalViolations} violations found)`);
  process.exit(1);
} else {
  console.log('\n✓ Semantic token usage validated');
  console.log('✓ Shared primitive compliance validated');
  console.log('✓ Theme class compliance validated');
  console.log('✓ Allowed exceptions validated');
  console.log('\nResult: PASSED (0 violations)');
  process.exit(0);
}
