const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy files to dist
const filesToCopy = [
  { src: 'index.html', dest: 'index.html' },
  { src: 'style.css', dest: 'style.css' },
  { src: 'js/app.js', dest: 'js/app.js' },
  { src: 'js/parser.js', dest: 'js/parser.js' },
  { src: 'js/ui.js', dest: 'js/ui.js' }
];

filesToCopy.forEach(file => {
  const srcPath = path.join(__dirname, file.src);
  const destPath = path.join(distDir, file.dest);
  
  // Create directory if it doesn't exist
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${file.src} to ${file.dest}`);
}); 