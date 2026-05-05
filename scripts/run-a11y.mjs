import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const PORT = 4324;
const HOST = '127.0.0.1';
const ORIGIN = `http://${HOST}:${PORT}`;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options });

    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

async function waitForServer(server) {
  let serverExited = false;
  server.on('exit', () => {
    serverExited = true;
  });

  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (serverExited) {
      throw new Error('Static server exited before it became ready.');
    }

    try {
      const response = await fetch(ORIGIN);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is not ready yet.
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for ${ORIGIN}.`);
}

async function stopServer(server) {
  if (server.exitCode !== null || server.killed) {
    return;
  }

  server.kill('SIGTERM');
  await Promise.race([
    new Promise(resolve => server.once('exit', resolve)),
    delay(2000).then(() => {
      if (server.exitCode === null && !server.killed) {
        server.kill('SIGKILL');
      }
    }),
  ]);
}

const server = spawn('npx', ['http-server', 'dist', '-p', String(PORT), '-a', HOST, '-s'], {
  stdio: 'inherit',
});

try {
  await waitForServer(server);
  await run('npx', ['pa11y-ci']);
} finally {
  await stopServer(server);
}
