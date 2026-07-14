import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const source = join(rootDir, '.svelte-kit', 'output', 'server', 'manifest-full.js');
const target = join(rootDir, '.svelte-kit', 'output', 'server', 'manifest.js');

if (existsSync(source)) {
	copyFileSync(source, target);
}
