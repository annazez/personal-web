/**
 * System Modes Manager.
 * Handles bootstrapping and cleanup of specialized modes.
 */
import { bindOnce } from '../bind-once';
import { applyLabModeState, isLabModeActive } from '../lab-modes-state';

type ModeCleanup = () => void;

let layersCleanup: ModeCleanup | null = null;
let layersActive = false;

async function checkMode() {
  applyLabModeState();

  const shouldEnableLayers = isLabModeActive('layers');
  if (shouldEnableLayers === layersActive) {
    return;
  }

  layersActive = shouldEnableLayers;

  if (layersCleanup) {
    layersCleanup();
    layersCleanup = null;
  }

  if (shouldEnableLayers) {
    const { init } = await import('./layers');
    layersCleanup = init() || null;
  }
}

export function initModes() {
  window.addEventListener('hashchange', checkMode);
  window.addEventListener('lab-modes-change', checkMode);

  // Re-check on page load (Astro View Transitions)
  document.addEventListener('astro:page-load', () => {
    // If layers was active, ensure it re-binds to the new DOM.
    if (layersCleanup) {
      layersCleanup();
      layersCleanup = null;
    }
    layersActive = false;
    checkMode();
  });

  // Initial check
  checkMode();
}

bindOnce('system-modes-manager', () => {
  initModes();
});
