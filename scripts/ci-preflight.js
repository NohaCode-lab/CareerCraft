/* global process */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--------------------------------------------------');
console.log('🚀 CareerCraft CI Runtime Preflight Gate');
console.log('--------------------------------------------------\n');

let hasError = false;

// 1. Verify Node.js Major Version (Node 24.x)
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.replace(/^v/, '').split('.')[0], 10);

console.log(`ℹ️  Runtime Environment Check:`);
console.log(`    - Node.js Version: ${nodeVersion}`);
console.log(`    - Working Directory: ${process.cwd()}`);

if (majorVersion !== 24) {
  console.error(`❌  FAIL: Invalid Node.js major version. Expected Node 24.x, got ${nodeVersion}`);
  hasError = true;
} else {
  console.log(`✓   Node.js version 24.x validated (${nodeVersion})`);
}

// 2. Verify Lockfiles Existence
console.log(`\nℹ️  Lockfile Integrity Check:`);
const requiredLockfiles = [
  path.join(rootDir, 'package-lock.json'),
  path.join(rootDir, 'backend', 'package-lock.json'),
];

for (const lockfile of requiredLockfiles) {
  const relativePath = path.relative(rootDir, lockfile);
  if (fs.existsSync(lockfile)) {
    console.log(`✓   Lockfile found: ${relativePath}`);
  } else {
    console.error(`❌  FAIL: Required lockfile missing: ${relativePath}`);
    hasError = true;
  }
}

console.log('\n--------------------------------------------------');
if (hasError) {
  console.error('Result: FAILED — Preflight runtime/lockfile contract violated.');
  process.exit(1);
} else {
  console.log('Result: PASSED — Preflight gate checks succeeded.');
  console.log('--------------------------------------------------\n');
  process.exit(0);
}
