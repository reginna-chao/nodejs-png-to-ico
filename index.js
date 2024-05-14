const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

const srcDir = 'src';
const distDir = 'dist';

// Read all files in the src directory
fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Iterate over files
  files.forEach(file => {
    // Check if the file extension is .png
    if (path.extname(file) === '.png') {
      const srcFilePath = path.join(srcDir, file);
      const distFilePath = path.join(distDir, path.basename(file, '.png') + '.ico');

      // Convert PNG to ICO
      pngToIco([srcFilePath])
        .then(buf => {
          // Write the generated ICO to the dist directory
          fs.writeFileSync(distFilePath, buf);
          console.log(`Converted ${srcFilePath} to ${distFilePath}`);
        })
        .catch(error => {
          console.error(`Error converting ${srcFilePath}:`, error);
        });
    }
  });
});
