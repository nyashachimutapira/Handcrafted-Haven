# Image Management Guide

## Option 1: Local Images (Development)

### Setup
1. Create folders in `/public/images/`:
```
public/
├── images/
│   ├── products/        (product images)
│   ├── sellers/         (seller avatars)
│   ├── categories/      (category icons)
│   └── placeholders/    (fallback images)
```

2. Add images to folders

3. Reference in code:
```jsx
<Image src="/images/products/ceramic-vase.jpg" alt="Ceramic Vase" />
```

### Free Image Sources
- **Unsplash**: https://unsplash.com (high quality, free)
- **Pexels**: https://pexels.com (free stock photos)
- **Pixabay**: https://pixabay.com (free, no attribution needed)
- **Craft Images**: Search "handmade pottery", "ceramic art", "jewelry making"

### Image Optimization
Next.js automatically optimizes images using the `<Image>` component:
```jsx
import Image from 'next/image';

<Image 
  src="/images/products/vase.jpg"
  alt="Handmade ceramic vase"
  width={400}
  height={400}
  priority={false}  // lazy load by default
/>
```

---

## Option 2: Cloud Storage (Production)

### Cloudinary (Recommended - Free Tier)

**Why Cloudinary?**
- Free tier: 25GB storage
- Auto image optimization
- CDN delivery (fast)
- Integrates with Next.js
- No credit card for free tier

**Setup Steps:**

1. Sign up: https://cloudinary.com/users/register/free

2. Get your **Cloud Name** from dashboard

3. Install SDK:
```bash
npm install next-cloudinary
```

4. Update `.env.local`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

5. Upload images via Cloudinary dashboard or API

6. Use in code:
```jsx
import { CldImage } from 'next-cloudinary';

<CldImage
  src="cloudinary-public-id"
  alt="Product image"
  width={400}
  height={400}
/>
```

### Vercel Blob (Alternative)

**Why Vercel Blob?**
- Integrates seamlessly with Vercel
- Automatic CDN
- Simple API
- Pay-as-you-go (free tier available)

**Setup:**
1. Go to Vercel dashboard → Storage → Blob
2. Create new Blob storage
3. Use SDK to upload/retrieve images

---

## Option 3: Hybrid (Recommended for Team)

**Development:** Use local images in `/public/images/`

**Production:** Upload to Cloudinary

### How to Switch

**Local (Development):**
```jsx
<Image src="/images/products/vase.jpg" alt="Vase" width={400} height={400} />
```

**Cloudinary (Production):**
```jsx
import { CldImage } from 'next-cloudinary';

<CldImage src="public-id" alt="Vase" width={400} height={400} />
```

**Or use conditional:**
```jsx
const imageUrl = process.env.NODE_ENV === 'production'
  ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/product-id`
  : '/images/products/vase.jpg';

<Image src={imageUrl} alt="Vase" width={400} height={400} />
```

---

## Quick Start: Add Local Images Now

### Step 1: Download Free Images
Visit Unsplash, download these images and save to your computer:
- 4-5 handmade products (pottery, jewelry, wood, textiles, glasswork)
- 3-4 seller profile photos
- Category icons/images

### Step 2: Create Folder Structure
```bash
mkdir -p public/images/products
mkdir -p public/images/sellers
mkdir -p public/images/categories
```

### Step 3: Copy Images
Drag & drop images into folders or use command:
```bash
# Move downloaded images to public/images/products/
```

### Step 4: Update Components
Replace placeholder images in components:

**Before:**
```jsx
const featuredProducts = [
  {
    id: 1,
    name: "Handmade Ceramic Vase",
    image: "/images/placeholder-1.jpg",
  },
];
```

**After:**
```jsx
const featuredProducts = [
  {
    id: 1,
    name: "Handmade Ceramic Vase",
    image: "/images/products/ceramic-vase.jpg",
  },
];
```

### Step 5: Test Locally
```bash
npm run dev
# Visit http://localhost:3000
# See real images on homepage
```

---

## Image Best Practices

### File Naming
- Use lowercase, hyphens: `ceramic-vase-1.jpg`
- Not: `CeramicVase 1.jpg`

### File Sizes
- Compress before uploading (use TinyPNG.com)
- JPG for photos (smaller)
- PNG for icons (transparency)
- WebP for best compression

### Aspect Ratios
- Product thumbnails: 1:1 (square)
- Product gallery: 4:5 or 1:1
- Seller avatars: 1:1 (square)
- Category images: 1:1 (square)

### Naming by Category
```
/images/
├── products/
│   ├── pottery/
│   │   ├── ceramic-vase-1.jpg
│   │   └── ceramic-bowl-1.jpg
│   ├── jewelry/
│   │   ├── silver-bracelet-1.jpg
│   │   └── gold-necklace-1.jpg
│   └── woodcraft/
│       ├── wooden-cutting-board-1.jpg
│       └── wooden-spoon-1.jpg
├── sellers/
│   ├── potter-john.jpg
│   └── jeweler-jane.jpg
└── categories/
    ├── pottery.jpg
    └── jewelry.jpg
```

---

## Recommended Approach for Your Team

1. **Right now (Development):**
   - Download 8-10 free images from Unsplash
   - Create `/public/images/products/` folder
   - Add images to project
   - Update component file paths

2. **Before Vercel Deployment:**
   - Sign up for Cloudinary (free)
   - Upload all images to Cloudinary
   - Update environment variables
   - Test on staging

3. **In Production:**
   - Use Cloudinary URLs
   - All images served from CDN
   - Fast, optimized delivery

---

## Team Collaboration

**Image Management Process:**

1. **Assign Image Lead** (1 team member)
   - Manages image uploads
   - Maintains folder structure
   - Optimizes before upload

2. **Naming Convention**
   - All lowercase
   - Hyphens not spaces
   - Descriptive names
   - Include version if needed

3. **Cloudinary Setup** (for production)
   - One person creates account
   - Share Cloud Name with team
   - Create folder structure
   - Document in README

4. **Update Components**
   - When image added, update component paths
   - Test locally first
   - Push to GitHub
   - Vercel auto-deploys

---

## Quick Reference

| Task | Command |
|------|---------|
| Create image folder | `mkdir -p public/images/products` |
| Add local image | Copy to `public/images/products/` |
| Reference in JSX | `<Image src="/images/products/name.jpg" />` |
| Sign up Cloudinary | https://cloudinary.com |
| Optimize images | https://tinypng.com |
| Find free images | https://unsplash.com |

