import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

function logWarn(message) {
  process.stderr.write(`${message}\n`);
}

function hasGit() {
  const result = spawnSync('git', ['--version'], { stdio: 'ignore' });
  return result.status === 0;
}

function configureHooksPath() {
  const result = spawnSync('git', ['config', 'core.hooksPath', '.githooks'], {
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    logWarn('[hooks] Failed to configure core.hooksPath; continuing.');
  }
}

if (!hasGit()) {
  logWarn('[hooks] git is not available; skipping hooks installation.');
  process.exit(0);
}

if (!existsSync('.git')) {
  logWarn('[hooks] .git directory is missing; skipping hooks installation.');
  process.exit(0);
}

configureHooksPath();
