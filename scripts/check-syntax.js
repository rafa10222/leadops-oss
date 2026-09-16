import { readdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { join } from 'node:path';

const roots = ['src', 'test', 'scripts'];
const files = [];
for (const root of roots) await walk(root);
for (const file of files) await check(file);
console.log(`Syntax OK: ${files.length} JavaScript files.`);

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.isFile() && path.endsWith('.js')) files.push(path);
  }
}

function check(file) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--check', file], { stdio: 'inherit' });
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Syntax check failed: ${file}`)));
  });
}
