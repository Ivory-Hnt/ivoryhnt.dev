#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Adjust this if your repo structure differs.a
const PHOTOS_DIR = path.join(__dirname, 'images', 'mp-26');
const MANIFEST_PATH = path.join(PHOTOS_DIR, 'manifest.json');

const IMAGE_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif',
  '.heic', '.heif', '.bmp', '.tif', '.tiff'
]);

function main() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.error(`Photo directory not found: ${PHOTOS_DIR}`);
    console.error('Create it and drop your Pride photos in there, then re-run this script.');
    process.exit(1);
  }

  const files = fs.readdirSync(PHOTOS_DIR)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    console.warn(`No images found in ${PHOTOS_DIR}. Writing an empty manifest.`);
  }

  const manifest = { generatedAt: new Date().toISOString(), photos: files };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log(`Wrote ${files.length} photo(s) to ${MANIFEST_PATH}`);
}

main();
