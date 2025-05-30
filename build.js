import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy files to dist
const filesToCopy = [
  { src: 'js/parser.js', dest: 'dist/parser.js' },
  { src: 'js/parser.test.js', dest: 'dist/parser.test.js' },
  { src: 'package.json', dest: 'dist/package.json' },
  { src: 'README.md', dest: 'dist/README.md' }
];

filesToCopy.forEach(({ src, dest }) => {
  const srcPath = path.join(__dirname, src);
  const destPath = path.join(__dirname, dest);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${src} to ${dest}`);
});

console.log('Build completed successfully!'); 