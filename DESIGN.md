# Handcrafted Haven - Design System & Theme

## Brand Identity

### Color Palette
- **Primary**: #8B7355 (Warm Brown) - Main buttons, headings, links
- **Secondary**: #D2B48C (Tan) - Accents, light backgrounds
- **Accent**: #A0826D (Muted Brown) - Hover states, secondary buttons
- **Light Background**: #FAFAF8 (Off-White)
- **Text Dark**: #2C2C2C (Dark Gray)
- **Border**: #E5E5E0 (Light Gray)

### Typography
- **Font Family**: Inter (sans-serif) - Modern, clean, accessible
- **Headings**: Bold weight (700), with hierarchy h1-h6
- **Body**: Regular weight (400), 16px base size
- **Accent**: Medium weight (600) for emphasis

### Logo & Visual Identity
- Earthy, natural aesthetic reflecting handcrafted nature
- Artisan-focused imagery (hands, crafts, textures)
- Warm, welcoming tone
- Emphasis on authenticity and quality

---

## Design Principles

1. **Accessibility First** - WCAG 2.1 Level AA compliant
2. **Mobile-First** - Optimized for smartphones, scales to desktop
3. **Trust & Authenticity** - Handmade quality highlighted
4. **Community Focus** - Showcase artisans and their work
5. **Performance** - Fast loading, optimized images
6. **Consistency** - Unified component library

---

## Page Templates

### Homepage
- Hero section with value proposition
- Category showcase (6 categories)
- Featured products grid (4-6 items)
- Call-to-action for sellers
- Footer with links

### Product Listing Page
- Filter sidebar (category, price, rating)
- Product grid (responsive: 1 col mobile, 2 tablet, 3+ desktop)
- Sort dropdown (newest, price, rating)
- Pagination or infinite scroll
- Mobile filter toggle

### Product Detail Page
- Image gallery (main + thumbnails)
- Product info (title, price, rating)
- Seller profile card
- Description & details
- Reviews section
- Add to cart / Buy now

### Seller Profile Page
- Seller header (avatar, name, verified badge)
- Bio & story
- Products grid
- Contact information
- Overall rating & review count

### User Dashboard
- Sidebar navigation
- Welcome message with user name
- Key metrics (sales/purchases)
- Quick action cards
- Activity feed

### Cart & Checkout
- Cart item list with image thumbnails
- Quantity adjusters
- Remove item buttons
- Subtotal, shipping, tax breakdown
- Checkout form (address, payment)
- Order confirmation

---

## Component Library

### Buttons
- **Primary**: Brown background, white text, hover darkens
- **Secondary**: White background, brown border & text
- **Ghost**: Transparent, brown text
- **States**: Normal, hover, active, disabled

### Cards
- White background
- Subtle shadow on hover
- Rounded corners (8px)
- Padding: 16px

### Forms
- Labels above inputs
- Error states with red color
- Focus ring: 2px solid primary color
- Validation messages below field

### Navigation
- Header: Logo left, menu center/right, mobile hamburger
- Footer: Links grouped by category
- Breadcrumbs for product pages
- Skip to main content link (accessibility)

### Images
- Aspect ratio 1:1 for product thumbnails
- 2:3 for product detail main image
- Lazy loading enabled
- Fallback placeholder

---

## Responsive Breakpoints

- **Mobile**: 320px - 479px
- **Tablet**: 480px - 1023px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

### Layout Strategy
- Single column mobile
- Two columns tablet
- Three+ columns desktop
- Full-width containers with max-width 1280px

---

## Interaction Patterns

### Loading States
- Skeleton screens for product listings
- Spinner for form submissions
- Progressive image loading

### Empty States
- Helpful message
- Illustration or icon
- Call-to-action button

### Error Handling
- Clear error messages
- Suggestion to fix issue
- Toast notifications for temporary messages

### Animations
- Smooth transitions (300ms)
- Hover effects on interactive elements
- Page transitions subtle
- Loading indicators smooth

---

## Accessibility Features

- **Color Contrast**: All text 4.5:1 (WCAG AA)
- **Focus Indicators**: Visible outline on all interactive elements
- **Semantic HTML**: Proper heading hierarchy, alt text for images
- **ARIA Labels**: For icon buttons and form fields
- **Keyboard Navigation**: Tab through all elements
- **Screen Reader**: Content properly labeled and ordered
- **Motion**: Respects prefers-reduced-motion

---

## Brand Voice

- **Tone**: Warm, welcoming, authentic
- **Language**: Simple, clear, action-oriented
- **Personality**: Supportive of artisans, celebrates craftsmanship
- **Customer Service**: Responsive, helpful, encouraging

---

## Visual Examples

### Hero Section
```
[Handcrafted Haven Logo]
Discover unique handcrafted items from talented artisans
[Browse Products] [Become a Seller]
Warm brown background with tan accents
```

### Product Card
```
[Product Image]
Product Title
Seller Name
$Price ⭐ Rating
[View Details Button]
```

### Seller Profile
```
[Seller Avatar] ✓ Verified
Shop Name
Bio / Description
⭐ 4.8 (156 reviews)
[Contact] [Shop All Products]
```
