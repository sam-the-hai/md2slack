import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate file exists
function validateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Source file not found: ${filePath}`);
  }
}

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Copy file with validation
function copyFile(src, dest) {
  const srcPath = path.join(__dirname, src);
  const destPath = path.join(__dirname, dest);
  
  // Validate source file exists
  validateFile(srcPath);
  
  // Ensure destination directory exists
  ensureDirectoryExists(path.dirname(destPath));
  
  // Copy file
  fs.copyFileSync(srcPath, destPath);
  console.log(`✓ Copied ${src} to ${dest}`);
}

try {
  // Create dist directory
  const distDir = path.join(__dirname, 'dist');
  ensureDirectoryExists(distDir);
  
  // Create js directory in dist
  const distJsDir = path.join(distDir, 'js');
  ensureDirectoryExists(distJsDir);
  
  // Define files to copy
  const filesToCopy = [
    { src: 'index.html', dest: 'dist/index.html' },
    { src: 'style.css', dest: 'dist/style.css' },
    { src: 'js/parser.js', dest: 'dist/js/parser.js' },
    { src: 'js/app.js', dest: 'dist/js/app.js' },
    { src: 'js/ui.js', dest: 'dist/js/ui.js' },
    { src: 'package.json', dest: 'dist/package.json' },
    { src: 'README.md', dest: 'dist/README.md' }
  ];
  
  // Copy each file
  filesToCopy.forEach(({ src, dest }) => {
    copyFile(src, dest);
  });
  
  console.log('\nBuild completed successfully! 🎉');
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
} 