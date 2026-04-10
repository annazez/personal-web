import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type LighthouseReport = {
  fetchTime?: string;
  finalDisplayedUrl?: string;
  finalUrl?: string;
  requestedUrl?: string;
  categories?: {
    performance?: { score?: number | null };
    accessibility?: { score?: number | null };
    'best-practices'?: { score?: number | null };
    seo?: { score?: number | null };
  };
  audits?: Record<string, { displayValue?: string }>;
};

type LighthousePageResult = {
  generatedAt: string | null;
  url: string | null;
  path: string;
  runs: number;
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
  lcp: string | null;
  tbt: string | null;
  cls: string | null;
  fcp: string | null;
  ttfb: string | null;
};

type LighthouseData = {
  generatedAt: string | null;
  pages: LighthousePageResult[];
};

type ParsedReport = {
  filePath: string;
  fetchTimeMs: number;
  report: LighthouseReport;
  url: string;
  path: string;
};

const currentFile = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(currentFile), '..');
const lighthouseDir = path.join(repoRoot, '.lighthouseci');
const outputFile = path.join(repoRoot, 'src', 'data', 'lighthouse.json');

const logInfo = (message: string): void => {
  process.stdout.write(`${message}\n`);
};

const logError = (message: string): void => {
  process.stderr.write(`${message}\n`);
};

const toPercentScore = (value: number | null | undefined): number | null => {
  if (typeof value !== 'number' || Number.isNaN(value)) return null;
  return Math.round(value * 100);
};

const toAveragePercentScore = (values: Array<number | null>): number | null => {
  const validValues = values.filter((value): value is number => typeof value === 'number');
  if (validValues.length === 0) {
    return null;
  }

  const sum = validValues.reduce((acc, value) => acc + value, 0);
  return Math.round(sum / validValues.length);
};

const resolveReportUrl = (report: LighthouseReport): string | null => {
  return report.finalDisplayedUrl ?? report.finalUrl ?? report.requestedUrl ?? null;
};

const toPathname = (value: string): string | null => {
  try {
    const parsed = new URL(value);
    let pathname = parsed.pathname || '/';
    const hasFileExtension = /\/[^/]+\.[^/]+$/.test(pathname);

    if (!hasFileExtension && !pathname.endsWith('/')) {
      pathname += '/';
    }

    return pathname;
  } catch {
    return null;
  }
};

const parseTimestamp = (value: string | undefined): number => {
  if (!value) {
    return 0;
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getAllLhrReports = async (): Promise<ParsedReport[]> => {
  let entries: string[] = [];

  try {
    entries = await readdir(lighthouseDir);
  } catch {
    return [];
  }

  const lhrFiles = entries.filter(file => /^lhr-.*\.json$/i.test(file));
  if (lhrFiles.length === 0) {
    return [];
  }

  const parsedReports = await Promise.all(
    lhrFiles.map(async file => {
      const filePath = path.join(lighthouseDir, file);

      try {
        const [raw, fileInfo] = await Promise.all([readFile(filePath, 'utf8'), stat(filePath)]);
        const report = JSON.parse(raw) as LighthouseReport;
        const url = resolveReportUrl(report);

        if (!url) {
          return null;
        }

        const pathname = toPathname(url);
        if (!pathname) {
          return null;
        }

        const fetchTimeMs = Math.max(
          parseTimestamp(report.fetchTime),
          Math.round(fileInfo.mtimeMs)
        );

        return {
          filePath,
          fetchTimeMs,
          report,
          url,
          path: pathname,
        } as ParsedReport;
      } catch {
        return null;
      }
    })
  );

  return parsedReports.filter((entry): entry is ParsedReport => entry !== null);
};

const extractMetric = (report: LighthouseReport, key: string): string | null => {
  return report.audits?.[key]?.displayValue ?? null;
};

const run = async (): Promise<void> => {
  const parsedReports = await getAllLhrReports();

  if (parsedReports.length === 0) {
    logInfo('[extract-lighthouse] No lhr-*.json files found in .lighthouseci. Skipping.');
    process.exit(0);
  }

  const reportsByPath = new Map<string, ParsedReport[]>();
  for (const report of parsedReports) {
    const group = reportsByPath.get(report.path);

    if (group) {
      group.push(report);
    } else {
      reportsByPath.set(report.path, [report]);
    }
  }

  const pages: LighthousePageResult[] = [];
  for (const [pathname, reports] of reportsByPath.entries()) {
    reports.sort((a, b) => b.fetchTimeMs - a.fetchTimeMs);
    const latest = reports[0];
    const latestReport = latest.report;
    const latestGeneratedAt = latestReport.fetchTime ?? null;

    pages.push({
      generatedAt: latestGeneratedAt,
      url: latest.url,
      path: pathname,
      runs: reports.length,
      performance: toAveragePercentScore(
        reports.map(report => toPercentScore(report.report.categories?.performance?.score))
      ),
      accessibility: toAveragePercentScore(
        reports.map(report => toPercentScore(report.report.categories?.accessibility?.score))
      ),
      bestPractices: toAveragePercentScore(
        reports.map(report => toPercentScore(report.report.categories?.['best-practices']?.score))
      ),
      seo: toAveragePercentScore(
        reports.map(report => toPercentScore(report.report.categories?.seo?.score))
      ),
      lcp: extractMetric(latestReport, 'largest-contentful-paint'),
      tbt: extractMetric(latestReport, 'total-blocking-time'),
      cls: extractMetric(latestReport, 'cumulative-layout-shift'),
      fcp: extractMetric(latestReport, 'first-contentful-paint'),
      ttfb: extractMetric(latestReport, 'server-response-time'),
    });
  }

  pages.sort((a, b) => a.path.localeCompare(b.path));

  const generatedAt =
    pages
      .map(page => page.generatedAt)
      .filter((value): value is string => Boolean(value))
      .sort((a, b) => Date.parse(b) - Date.parse(a))[0] ?? null;

  const output: LighthouseData = {
    generatedAt,
    pages,
  };

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  logInfo(`[extract-lighthouse] Wrote ${outputFile} from ${parsedReports.length} report file(s).`);
};

run().catch(error => {
  logError('[extract-lighthouse] Failed to extract Lighthouse data.');
  logError(error instanceof Error ? (error.stack ?? error.message) : String(error));
  process.exit(1);
});
