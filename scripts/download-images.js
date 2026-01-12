#!/usr/bin/env node

/**
 * Download sample product images from Unsplash
 * Usage: node scripts/download-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = [
  'public/images/products',
  'public/images/sellers',
  'public/images/categories',
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Unsplash API key (free tier - no key needed for basic searches)
const images = [
  {
    url: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=400&fit=crop',
    filename: 'public/images/products/ceramic-vase.jpg',
    name: 'Ceramic Vase',
  },
  {
    url: 'https://images.unsplash.com/photo-1608270861620-7911507ba59f?w=400&h=400&fit=crop',
    filename: 'public/images/products/wood-cutting-board.jpg',
    name: 'Wood Cutting Board',
  },
  {
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    filename: 'public/images/products/silver-bracelet.jpg',
    name: 'Silver Bracelet',
  },
  {
    url: 'https://images.unsplash.com/photo-1567359781514-3b963a90e96d?w=400&h=400&fit=crop',
    filename: 'public/images/products/wall-tapestry.jpg',
    name: 'Wall Tapestry',
  },
  {
    url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
    filename: 'public/images/products/handmade-jewelry.jpg',
    name: 'Handmade Jewelry',
  },
  {
    url: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=150&h=150&fit=crop',
    filename: 'public/images/sellers/potter-1.jpg',
    name: 'Seller Avatar 1',
  },
  {
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    filename: 'public/images/sellers/jewelry-artist.jpg',
    name: 'Seller Avatar 2',
  },
];

// Download function
function downloadImage(imageObj) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(imageObj.filename);

    https
      .get(imageObj.url, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          downloadImage({
            ...imageObj,
            url: response.headers.location,
          }).then(resolve).catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${imageObj.name}: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${imageObj.name}`);
          resolve();
        });

        file.on('error', (err) => {
          fs.unlink(imageObj.filename, () => {}); // Delete incomplete file
          reject(err);
        });
      })
      .on('error', (err) => {
        fs.unlink(imageObj.filename, () => {}); // Delete incomplete file
        reject(err);
      });
  });
}

// Download all images
async function downloadAll() {
  console.log('🖼️  Starting to download images...\n');

  for (const image of images) {
    try {
      // Check if file already exists
      if (fs.existsSync(image.filename)) {
        console.log(`⏭️  Already exists: ${image.name}`);
        continue;
      }

      await downloadImage(image);
    } catch (error) {
      console.error(`❌ Error downloading ${image.name}:`, error.message);
    }
  }

  console.log('\n✨ Done! Images downloaded to public/images/');
  console.log('Run: npm run dev');
}

downloadAll().catch(console.error);
