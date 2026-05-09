/**
 * Command Palette keyboard driver.
 *
 * Wires keydown listeners for the command palette <dialog>.
 * - ? (Shift+/)  → toggle palette
 * - A            → enable Architecture X-Ray
 * - U            → enable Accessibility Audit
 * - L            → enable Exploded Layers
 * - H            → clear active lab modes
 * - Esc          → close (handled natively by <dialog>)
 *
 * Skips all key handling when the event target is an input, textarea,
 * or contenteditable element to avoid stealing keystrokes from forms.
 *
 * Respects prefers-reduced-motion for open/close transitions.
 */
import { bindOnce } from './bind-once';
import { clearAllLabModes, setLabMode, type LabModeId } from './lab-modes-state';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.isContentEditable) return true;
  return false;
}

function getDialog(): HTMLDialogElement | null {
  return document.getElementById('command-palette') as HTMLDialogElement | null;
}

function closePalette(): void {
  const dialog = getDialog();
  if (dialog?.open) dialog.close();
}

function enableMode(mode: LabModeId): void {
  closePalette();
  setLabMode(mode, true);
}

function clearModes(): void {
  closePalette();
  clearAllLabModes();
}

function handleKeydown(e: KeyboardEvent): void {
  // Never intercept when typing in form fields
  if (isEditableTarget(e.target)) return;

  // Ignore when modifier keys are held
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const dialog = getDialog();

  // shortcuts only apply when the palette is open
  if (!dialog?.open) return;

  switch (e.key.toUpperCase()) {
    case 'A':
      e.preventDefault();
      enableMode('arch');
      break;
    case 'U':
      e.preventDefault();
      enableMode('audit');
      break;
    case 'L':
      e.preventDefault();
      enableMode('layers');
      break;
    case 'H':
      e.preventDefault();
      clearModes();
      break;
    // Esc is handled natively by <dialog> — no need to intercept
  }
}

bindOnce('command-palette', () => {
  document.addEventListener('keydown', handleKeydown);
});
