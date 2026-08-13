/* global process */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--------------------------------------------------');
console.log('🛡️  CareerCraft Release Version Governance Check');
console.log('--------------------------------------------------\n');

function fail(expected, detected, source, conflictingSource, action) {
  console.error('❌  Release Version Governance: FAILED\n');
  console.error(`Expected version:   ${expected}`);
  console.error(`Detected version:   ${detected}`);
  console.error(`Source:             ${source}`);
  console.error(`Conflicting source: ${conflictingSource}\n`);
  console.error(`Required action:`);
  console.error(`${action}\n`);
  console.log('--------------------------------------------------');
  process.exit(1);
}

// Standard semver validation pattern (supports prerelease like 1.0.3-rc, 1.0.3-rc.1)
const SEMVER_REGEX = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

// 1. Read & Validate Authoritative Application Version (root package.json)
const rootPackagePath = path.join(rootDir, 'package.json');
if (!fs.existsSync(rootPackagePath)) {
  fail('package.json file', 'File missing', 'Root directory', 'package.json', 'Create package.json in repository root.');
}

let rootPkg;
try {
  rootPkg = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
} catch (e) {
  fail('Valid JSON in package.json', 'Invalid JSON', 'package.json', 'package.json', `Fix JSON syntax error in package.json: ${e.message}`);
}

const appVersion = rootPkg.version;

if (!appVersion || appVersion === '0.0.0') {
  fail(
    'Valid non-placeholder semver (e.g. 1.0.3-rc)',
    appVersion || 'undefined',
    'package.json',
    'package.json (version property)',
    'Update package.json version from initial placeholder 0.0.0 to the authoritative application version.'
  );
}

if (!SEMVER_REGEX.test(appVersion)) {
  fail(
    'Valid SemVer string (e.g. 1.0.2 or 1.0.3-rc)',
    appVersion,
    'package.json',
    'package.json (version property)',
    'Ensure package.json version conforms to Semantic Versioning (SemVer) specs.'
  );
}

// 2. Read & Validate README.md Release Representation
const readmePath = path.join(rootDir, 'README.md');
let readmeVersion = null;

if (fs.existsSync(readmePath)) {
  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  // Match shields.io release badge pattern: Release-v<version>-<color>.svg or Release-v<version>
  // Note: shields.io encodes dash '-' as '--', so 1.0.3--rc represents 1.0.3-rc
  const badgeMatch = readmeContent.match(/img\.shields\.io\/badge\/Release-v?([a-zA-Z0-9.-]+?)-[0-9a-fA-F]{6}\.svg/);
  if (badgeMatch && badgeMatch[1]) {
    readmeVersion = badgeMatch[1].replace(/--/g, '-');
  } else {
    // Fallback match for Release-v... in text or badges
    const altMatch = readmeContent.match(/Release-v([0-9]+\.[0-9]+\.[0-9]+(?:--?[a-zA-Z0-9.-]+)?)/);
    if (altMatch && altMatch[1]) {
      readmeVersion = altMatch[1].replace(/--/g, '-');
    }
  }
}

if (readmeVersion && readmeVersion !== appVersion) {
  fail(
    appVersion,
    readmeVersion,
    'package.json',
    'README.md',
    `Update README.md release badge metadata to match the authoritative application version in package.json (${appVersion}).`
  );
}

// 3. Read & Validate Backend Service Package Version (backend/package.json)
const backendPackagePath = path.join(rootDir, 'backend', 'package.json');
let backendVersion = null;

if (fs.existsSync(backendPackagePath)) {
  try {
    const backendPkg = JSON.parse(fs.readFileSync(backendPackagePath, 'utf8'));
    backendVersion = backendPkg.version;
  } catch (e) {
    fail('Valid JSON in backend/package.json', 'Invalid JSON', 'backend/package.json', 'backend/package.json', `Fix JSON syntax error in backend/package.json: ${e.message}`);
  }
}

if (!backendVersion || !SEMVER_REGEX.test(backendVersion)) {
  fail(
    'Valid SemVer string for backend service (e.g. 1.0.0)',
    backendVersion || 'undefined',
    'backend/package.json',
    'backend/package.json (version property)',
    'Ensure backend/package.json has a valid service version.'
  );
}

// 4. Validate Git Tag (Only when running in explicit release tag context)
let gitTagContext = 'None (Development Branch)';
let currentTag = null;

// Check CI environment variable first (e.g., GITHUB_REF = refs/tags/v1.0.3-rc)
if (process.env.GITHUB_REF && process.env.GITHUB_REF.startsWith('refs/tags/')) {
  currentTag = process.env.GITHUB_REF.replace('refs/tags/', '');
} else if (process.env.GIT_TAG) {
  currentTag = process.env.GIT_TAG;
} else {
  // Check git CLI for an exact tag pointing to HEAD
  try {
    const gitTagOutput = execSync('git describe --exact-match --tags HEAD', { cwd: rootDir, stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
    if (gitTagOutput) {
      currentTag = gitTagOutput;
    }
  } catch {
    // HEAD is not on an exact tag; normal development branch behavior
  }
}

if (currentTag) {
  gitTagContext = currentTag;
  const tagVersion = currentTag.startsWith('v') ? currentTag.substring(1) : currentTag;
  if (tagVersion !== appVersion) {
    fail(
      appVersion,
      tagVersion,
      'package.json',
      `Git tag (${currentTag})`,
      `Ensure the Git release tag matches the authoritative application version in package.json (${appVersion}).`
    );
  }
}

// 5. Output Audit Summary & Pass Report
console.log(`ℹ️  Version Architecture Audit:`);
console.log(`    - Authoritative Application Version (package.json): ${appVersion}`);
console.log(`    - README Release Representation (README.md):      ${readmeVersion || 'Not present'}`);
console.log(`    - Backend Service Version (backend/package.json): ${backendVersion} (Isolated Service)`);
console.log(`    - Git Tag Context:                                ${gitTagContext}`);

console.log(`\n✓   Root package.json version validated (${appVersion})`);
if (readmeVersion) {
  console.log(`✓   README release metadata synchronized (${readmeVersion})`);
}
console.log(`✓   Backend service version boundary validated (${backendVersion})`);
console.log(`✓   Git tag context verified`);

console.log('\n--------------------------------------------------');
console.log('Result: PASSED — Release version governance clean.');
console.log('--------------------------------------------------\n');

process.exit(0);
