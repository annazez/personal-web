export const LAB_MODE_IDS = ['arch', 'audit', 'layers'] as const;

export type LabModeId = (typeof LAB_MODE_IDS)[number];

const STORAGE_KEY = 'lab:modes';
const MODE_SET = new Set<string>(LAB_MODE_IDS);
const MODE_HASHES = new Map<LabModeId, string>([
  ['arch', '#arch'],
  ['audit', '#audit'],
  ['layers', '#layers'],
]);

function isLabModeId(value: string | undefined): value is LabModeId {
  return Boolean(value && MODE_SET.has(value));
}

function getHashMode(): LabModeId | null {
  const hash = window.location.hash.slice(1);
  return isLabModeId(hash) ? hash : null;
}

function readStoredModes(): Set<LabModeId> {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return new Set();
    }

    const parsedValue = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) {
      return new Set();
    }

    return new Set(parsedValue.filter(isLabModeId));
  } catch {
    return new Set();
  }
}

function writeStoredModes(modes: Set<LabModeId>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...modes]));
  } catch {
    // Ignore storage failures and keep the current-page state applied.
  }
}

function clearModeHash(mode: LabModeId): void {
  if (window.location.hash !== MODE_HASHES.get(mode)) {
    return;
  }

  const oldUrl = window.location.href;
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  window.dispatchEvent(
    new HashChangeEvent('hashchange', { oldURL: oldUrl, newURL: window.location.href })
  );
}

function dispatchLabModesChange(): void {
  window.dispatchEvent(new CustomEvent('lab-modes-change', { detail: getActiveLabModes() }));
}

export function getActiveLabModes(): Set<LabModeId> {
  const modes = readStoredModes();
  const hashMode = getHashMode();

  if (hashMode) {
    modes.add(hashMode);
  }

  return modes;
}

export function isLabModeActive(mode: LabModeId): boolean {
  return getActiveLabModes().has(mode);
}

export function applyLabModeState(): Set<LabModeId> {
  const activeModes = getActiveLabModes();
  const root = document.documentElement;

  for (const mode of LAB_MODE_IDS) {
    const attribute = `data-lab-mode-${mode}`;

    if (activeModes.has(mode)) {
      root.setAttribute(attribute, 'true');
    } else {
      root.removeAttribute(attribute);
    }
  }

  root.dataset.labModes = [...activeModes].join(' ');
  return activeModes;
}

export function setLabMode(mode: LabModeId, enabled: boolean): void {
  const storedModes = readStoredModes();

  if (enabled) {
    storedModes.add(mode);
  } else {
    storedModes.delete(mode);
  }

  writeStoredModes(storedModes);
  if (!enabled) {
    clearModeHash(mode);
  }
  applyLabModeState();
  dispatchLabModesChange();
}

export function toggleLabMode(mode: LabModeId): void {
  setLabMode(mode, !isLabModeActive(mode));
}

export function clearAllLabModes(): void {
  const activeModes = getActiveLabModes();

  writeStoredModes(new Set());

  for (const mode of activeModes) {
    clearModeHash(mode);
  }

  applyLabModeState();
  dispatchLabModesChange();
}
