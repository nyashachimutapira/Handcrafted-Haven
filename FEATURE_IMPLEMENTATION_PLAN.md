# Feature Implementation Plan - Handcrafted Haven Frontend

## Overview
This document outlines the 5 key frontend features to be implemented for the Handcrafted Haven e-commerce platform. Each feature is broken down into tasks that can be assigned to team members.

---

## 1. Product Detail Page
**Objective:** Allow users to view comprehensive product information, reviews, and images.

### Pages & Routes to Create
- `/app/products/[id]/page.tsx` - Main product detail page

### Components to Create
- `ProductGallery.tsx` - Image carousel/gallery component
- `ProductInfo.tsx` - Product title, price, seller info, stock status
- `ProductReviews.tsx` - Display product reviews with ratings
- `AddToCartButton.tsx` - Button to add product to cart
- `SellerCard.tsx` - Display seller profile information

### API Calls Needed
- `GET /api/products/[id]` - Get product details with reviews (Already exists)
- `POST /api/reviews` - Submit new review (Needs frontend form)

### Key Features
- [ ] Display product images in carousel/gallery
- [ ] Show product title, price, description
- [ ] Display seller information and rating
- [ ] Show customer reviews with star ratings
- [ ] Display stock status (In Stock / Out of Stock)
- [ ] Add to cart functionality
- [ ] Related products section (optional)
- [ ] Review form for authenticated buyers

### Data Model Example
```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  averageRating: number;
  reviewCount: number;
  seller: {
    id: string;
    name: string;
    sellerProfile: {
      shopName: string;
      verified: boolean;
      rating: number;
    };
  };
  reviews: Review[];
}

interface Review {
  id: string;
  rating: number;
  text: string;
  user: { name: string };
  createdAt: string;
}
```

---

## 2. Shopping Cart
**Objective:** Enable users to manage items in their cart and proceed to checkout.

### Pages & Routes to Create
- `/app/cart/page.tsx` - Cart view page
- `/app/checkout/page.tsx` - Checkout form page (basic, can be expanded)

### Components to Create
- `CartItem.tsx` - Individual cart item display
- `CartSummary.tsx` - Cart totals and checkout button
- `QuantityControl.tsx` - Reusable component for quantity adjustment
- `CheckoutForm.tsx` - Shipping & billing address form (basic)

### API Calls Needed
- `GET /api/cart` - Get user's cart (Already exists)
- `POST /api/cart` - Add item to cart (Already exists)
- `PUT /api/cart/[itemId]` - Update quantity (Already exists)
- `DELETE /api/cart/[itemId]` - Remove item (Already exists)
- `POST /api/orders` - Create order (Needs backend implementation)

### Key Features
- [ ] Display all cart items with product info
- [ ] Update quantity per item
- [ ] Remove items from cart
- [ ] Calculate subtotal, tax, shipping (optional)
- [ ] Display cart total
- [ ] Proceed to checkout button
- [ ] Empty cart message when no items
- [ ] Maintain cart state (localStorage or server)

### Data Model Example
```typescript
interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
  };
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  itemCount: number;
}
```

---

## 3. User Authentication Pages
**Objective:** Create login and registration pages for user accounts.

### Pages & Routes to Create
- `/app/auth/login/page.tsx` - Login form page
- `/app/auth/register/page.tsx` - Registration form page
- `/app/profile/page.tsx` - User profile page (protected)

### Components to Create
- `LoginForm.tsx` - Email/password login form
- `RegisterForm.tsx` - Email/password/name/role registration form
- `AuthLayout.tsx` - Consistent auth page layout
- `ProfileHeader.tsx` - Display user info
- `OrderHistory.tsx` - Show user's past orders
- `ProtectedRoute.tsx` - Client-side route protection

### API Calls Needed
- `POST /api/auth/register` - Register new user (Already exists)
- `POST /api/auth/login` - Authenticate user (Already exists)
- Need: Get current user endpoint
- Need: Get user orders endpoint

### Key Features
- [ ] Login form with email/password validation
- [ ] Register form with email/password/name/role selection
- [ ] Form validation and error messages
- [ ] Redirect to previous page after login
- [ ] Store JWT token in localStorage or secure cookie
- [ ] Profile page showing user info
- [ ] Order history display
- [ ] Logout functionality
- [ ] Password strength indicator (optional)
- [ ] "Remember me" functionality (optional)

### Data Model Example
```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'BUYER' | 'SELLER';
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'BUYER' | 'SELLER' | 'ADMIN';
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}
```

### Context/Hook Example
```typescript
// useAuth.ts - Custom hook for auth state
const { user, login, register, logout, loading, error } = useAuth();
```

---

## 4. Seller Dashboard
**Objective:** Provide sellers with tools to manage their products and shop.

### Pages & Routes to Create
- `/app/dashboard/page.tsx` - Dashboard overview
- `/app/dashboard/products/page.tsx` - Product listing/management
- `/app/dashboard/products/new/page.tsx` - Add new product form
- `/app/dashboard/products/[id]/edit/page.tsx` - Edit product form
- `/app/dashboard/profile/page.tsx` - Seller profile management
- `/app/dashboard/orders/page.tsx` - Orders received from buyers

### Components to Create
- `DashboardNav.tsx` - Sidebar/top navigation for dashboard
- `ProductForm.tsx` - Reusable product add/edit form
- `ProductTable.tsx` - List products with edit/delete options
- `SellerProfileForm.tsx` - Edit shop name, bio, image
- `OrdersList.tsx` - Display orders for products sold
- `DashboardStats.tsx` - Summary cards (products, earnings, etc)

### API Calls Needed
- `GET /api/products` - Get seller's products (needs filtering)
- `POST /api/products` - Create product (Already exists)
- `PUT /api/products/[id]` - Update product (Already exists)
- `DELETE /api/products/[id]` - Delete product (Already exists)
- `POST /api/seller-profile` - Create/update profile (Already exists)
- `GET /api/seller-profile` - Get profile (Already exists)
- Need: Get seller's orders endpoint

### Key Features
- [ ] Dashboard overview with key metrics
- [ ] List all seller's products with status (published/draft)
- [ ] Add new product form with image upload
- [ ] Edit existing products
- [ ] Delete products
- [ ] View pending orders for products sold
- [ ] Update seller profile (shop name, bio, avatar)
- [ ] Stock management
- [ ] Publish/unpublish products
- [ ] Search/filter seller's products

### Data Model Example
```typescript
interface SellerDashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  totalEarnings: number;
  averageRating: number;
}

interface SellerProduct extends Product {
  status: 'draft' | 'published';
  orderCount: number;
  earnings: number;
}

interface SellerProfile {
  id: string;
  userId: string;
  shopName: string;
  bio: string;
  image: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
}
```

---

## 5. Search/Filter Functionality
**Objective:** Make the existing filter UI on products page functional with API integration.

### Components to Update
- `src/app/products/page.tsx` - Add state management and API calls
- Create reusable `FilterSidebar.tsx` component
- Create `ProductGrid.tsx` component
- Create `SortDropdown.tsx` component

### API Calls Needed
- `GET /api/products` with query parameters (Already exists)
  - `category` - Filter by category slug
  - `minPrice` - Minimum price
  - `maxPrice` - Maximum price
  - `search` - Full-text search
  - `sort` - Sort order (newest, price-low, price-high, rating)
  - `page` - Pagination
  - `limit` - Items per page

### Key Features
- [ ] Category filter (dropdown or checkboxes)
- [ ] Price range filter (min/max inputs)
- [ ] Search functionality (keyword search)
- [ ] Sorting options (newest, price, rating)
- [ ] Pagination (previous/next, page numbers)
- [ ] Show product count
- [ ] Filter state in URL params (for bookmarking)
- [ ] Real-time filter updates
- [ ] Loading states while fetching
- [ ] Error handling and empty state

### Data Flow Example
```
User changes filter → State updates → Query params updated → API call
→ Results display with pagination
```

### Implementation Steps
1. Create state for filters: `{ category, minPrice, maxPrice, search, sort, page }`
2. Create query string builder function
3. Fetch from API whenever filters change
4. Display loading state during fetch
5. Handle pagination
6. Show "No results" when appropriate
7. Preserve filter state in URL for sharing

---

## Implementation Priority & Task Assignment

### Phase 1 (Foundation)
1. **User Authentication Pages** - Required for other features
   - Estimated: 2-3 days
   - Dependencies: None
   - Required for: Dashboard, Cart, Reviews

2. **Product Detail Page** - Core marketplace feature
   - Estimated: 2-3 days
   - Dependencies: Auth (for reviews)
   - Required for: Cart integration

### Phase 2 (E-commerce Core)
3. **Shopping Cart** - Essential for purchasing
   - Estimated: 2-3 days
   - Dependencies: Auth, Product Detail
   - Required for: Checkout

4. **Search/Filter Functionality** - Browse improvement
   - Estimated: 1-2 days
   - Dependencies: None
   - Improves: Product discovery

### Phase 3 (Seller Features)
5. **Seller Dashboard** - Marketplace operations
   - Estimated: 3-4 days
   - Dependencies: Auth, Product Detail
   - Enables: Product management

---

## Tech Stack & Dependencies

### Frontend Libraries (Already Installed)
- Next.js 16.1.1
- React 18.2.0
- TypeScript 5.3.0
- Tailwind CSS 3.4.0
- Axios 1.6.0

### Additional Packages to Consider Installing
```bash
# For state management (optional)
npm install zustand

# For form handling (optional)
npm install react-hook-form

# For image uploads (optional)
npm install next-cloudinary

# For toast notifications
npm install react-hot-toast
```

### Folder Structure
```
src/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── products/
│   │   ├── page.tsx (with filters)
│   │   └── [id]/
│   │       └── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── products/page.tsx
│   │   ├── products/new/page.tsx
│   │   ├── products/[id]/edit/page.tsx
│   │   ├── orders/page.tsx
│   │   └── profile/page.tsx
│   └── profile/
│       └── page.tsx
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── products/
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── ProductReviews.tsx
│   │   └── SellerCard.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── QuantityControl.tsx
│   ├── dashboard/
│   │   ├── DashboardNav.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductTable.tsx
│   │   ├── SellerProfileForm.tsx
│   │   └── DashboardStats.tsx
│   └── filters/
│       ├── FilterSidebar.tsx
│       ├── SortDropdown.tsx
│       └── ProductGrid.tsx
├── lib/
│   ├── api.ts (Axios instance)
│   ├── auth.ts (Auth utilities)
│   └── hooks/
│       ├── useAuth.ts
│       ├── useCart.ts
│       └── useProducts.ts
└── styles/
    └── globals.css
```

---

## API Endpoints Summary

### Already Implemented ✓
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /products` - List products with filters
- `GET /products/[id]` - Product details
- `POST /products` - Create product (sellers)
- `PUT /products/[id]` - Update product
- `DELETE /products/[id]` - Delete product
- `POST /reviews` - Create review
- `GET /reviews` - Get reviews
- `GET /cart` - Get cart
- `POST /cart` - Add to cart
- `PUT /cart/[itemId]` - Update cart item
- `DELETE /cart/[itemId]` - Remove from cart
- `GET /seller-profile` - Get seller profile
- `POST /seller-profile` - Create/update profile
- `GET /categories` - Get categories

### Need to Implement in Backend
- `GET /users/me` - Get current authenticated user
- `GET /orders` - Get user's orders
- `POST /orders` - Create order

---

## Testing Checklist

For each feature, test:
- [ ] Happy path (user completes feature)
- [ ] Error handling (API fails, validation errors)
- [ ] Edge cases (empty cart, no search results)
- [ ] Mobile responsiveness
- [ ] Accessibility (keyboard nav, screen readers)
- [ ] Authentication state (logged in/out)

---

## Notes for Team

1. **Token Management:** Store JWT in localStorage for now, but consider secure cookies later
2. **Loading States:** Show spinners/skeleton screens while fetching
3. **Error Handling:** Display user-friendly error messages
4. **Mobile First:** Design for mobile, then scale up
5. **Accessibility:** Use semantic HTML, ARIA labels
6. **API Documentation:** Reference `API_DOCUMENTATION.md` for all endpoints
7. **Code Style:** Follow existing eslint & prettier configs
8. **Git Workflow:** Create feature branches, submit PRs for review

---

## Success Criteria

By end of week:
- [ ] Product Detail Page fully functional
- [ ] Shopping Cart fully functional
- [ ] Auth Pages (login/register) functional
- [ ] Product filtering/sorting functional
- [ ] At least 50% of Seller Dashboard completed
- [ ] All pages responsive on mobile
- [ ] No console errors
- [ ] Code reviewed and merged to main
