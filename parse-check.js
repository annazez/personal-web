import { parse } from 'yaml';
import fs from 'fs';
const en = fs.readFileSync('./src/content/projects/mental-health-app-en.mdx', 'utf-8');
console.log('YAML block:', en.split('---')[1]);
console.log('Parsed:', parse(en.split('---')[1]));
