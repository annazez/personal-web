import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST_DIR = 'dist';
const failures = [];

function collectHtmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectHtmlFiles(fullPath);
    }

    return entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

function toDistTarget(urlPath) {
  const normalizedPath = urlPath.endsWith('/') ? `${urlPath}index.html` : urlPath;
  const hasExtension = /\/[^/]+\.[^/]+$/.test(normalizedPath);
  return join(DIST_DIR, hasExtension ? normalizedPath : `${normalizedPath}/index.html`);
}

if (!existsSync(DIST_DIR)) {
  failures.push('Missing dist/. Run npm run build before npm run test:static.');
} else {
  const htmlFiles = collectHtmlFiles(DIST_DIR);

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const label = relative(DIST_DIR, file);

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    if (duplicateIds.length > 0) {
      failures.push(`${label}: duplicate id(s): ${duplicateIds.join(', ')}`);
    }

    const canonicalCount = [...html.matchAll(/<link\s+rel="canonical"\s+/g)].length;
    if (canonicalCount !== 1) {
      failures.push(`${label}: expected 1 canonical link, found ${canonicalCount}`);
    }

    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const urlPath = match[1];
      if (urlPath.startsWith('//')) {
        continue;
      }

      const target = toDistTarget(urlPath);
      if (!existsSync(target)) {
        failures.push(`${label}: missing internal target ${urlPath}`);
        continue;
      }

      if (!statSync(target).isFile() && !existsSync(join(target, 'index.html'))) {
        failures.push(`${label}: internal target is not a file or routed directory ${urlPath}`);
      }
    }
  }

  if (!existsSync(join(DIST_DIR, 'og-image.jpg'))) {
    failures.push('Missing dist/og-image.jpg used by OpenGraph/Twitter metadata.');
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Static output checks passed.');
