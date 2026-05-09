import { bindOnce } from './bind-once';
import {
  applyLabModeState,
  isLabModeActive,
  LAB_MODE_IDS,
  toggleLabMode,
  type LabModeId,
} from './lab-modes-state';

const MODE_IDS = new Set<string>(LAB_MODE_IDS);

function syncLabModeSwitches() {
  applyLabModeState();

  document.querySelectorAll<HTMLButtonElement>('[data-lab-mode-switch]').forEach(switchButton => {
    const mode = switchButton.dataset.modeId;
    const isChecked = MODE_IDS.has(mode ?? '') && isLabModeActive(mode as LabModeId);
    switchButton.setAttribute('aria-checked', String(isChecked));
  });
}

function handleLabModeSwitchClick(event: MouseEvent) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const switchButton = target.closest<HTMLButtonElement>('[data-lab-mode-switch]');
  const mode = switchButton?.dataset.modeId;

  if (!switchButton || !MODE_IDS.has(mode ?? '')) {
    return;
  }

  event.preventDefault();
  toggleLabMode(mode as LabModeId);
  syncLabModeSwitches();
}

syncLabModeSwitches();

bindOnce('lab-mode-switches', () => {
  document.addEventListener('click', handleLabModeSwitchClick);
  window.addEventListener('hashchange', syncLabModeSwitches);
  window.addEventListener('lab-modes-change', syncLabModeSwitches);
  document.addEventListener('astro:page-load', syncLabModeSwitches);
});
