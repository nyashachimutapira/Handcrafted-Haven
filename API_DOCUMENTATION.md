# Handcrafted Haven - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

Tokens are obtained from the login endpoint and are valid for 7 days.

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "role": "BUYER" // or "SELLER"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": "clh7x8z9p000108l09z9z9z9z"
}
```

---

### Login
**POST** `/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clh7x8z9p000108l09z9z9z9z",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "BUYER"
  }
}
```

---

## Products Endpoints

### Get All Products
**GET** `/products`

Retrieves a paginated list of published products with filtering and sorting.

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Items per page (default: 12)
- `category` (string): Filter by category slug
- `minPrice` (float): Minimum price filter
- `maxPrice` (float): Maximum price filter
- `search` (string): Full-text search on title and description
- `sort` (string): Sort order (newest, price-low, price-high, rating)

**Example:**
```
GET /products?category=pottery&minPrice=50&maxPrice=150&sort=price-low&page=1
```

**Response (200):**
```json
{
  "products": [
    {
      "id": "clh7x8z9p000108l09z9z9z9z",
      "title": "Handmade Ceramic Vase",
      "description": "Beautiful handcrafted ceramic vase...",
      "price": 85.0,
      "stock": 10,
      "published": true,
      "images": ["/images/ceramic-vase.jpg"],
      "averageRating": 4.8,
      "reviewCount": 25,
      "seller": {
        "id": "clh7x8z9p000108l09z9z9z9z",
        "name": "Sarah Potter"
      },
      "category": {
        "id": "clh7x8z9p000108l09z9z9z9z",
        "name": "Pottery"
      }
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5
  }
}
```

---

### Get Product Details
**GET** `/products/{id}`

Retrieves detailed information about a specific product including reviews.

**Response (200):**
```json
{
  "id": "clh7x8z9p000108l09z9z9z9z",
  "title": "Handmade Ceramic Vase",
  "description": "Beautiful handcrafted ceramic vase...",
  "price": 85.0,
  "stock": 10,
  "published": true,
  "images": ["/images/ceramic-vase.jpg"],
  "averageRating": 4.8,
  "reviewCount": 25,
  "seller": {
    "id": "clh7x8z9p000108l09z9z9z9z",
    "name": "Sarah Potter",
    "sellerProfile": {
      "shopName": "Sarah Potter's Shop",
      "bio": "Welcome...",
      "verified": true,
      "rating": 4.8
    }
  },
  "reviews": [
    {
      "id": "clh7x8z9p000108l09z9z9z9z",
      "rating": 5,
      "text": "Excellent quality!",
      "user": {
        "name": "John Buyer"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Product (Sellers Only)
**POST** `/products`

Creates a new product listing.

**Headers:**
- `Authorization: Bearer <token>` (Required, must be SELLER)

**Request Body:**
```json
{
  "title": "Handmade Ceramic Vase",
  "description": "Beautiful handcrafted ceramic vase made with traditional pottery techniques.",
  "price": 85.0,
  "categoryId": "clh7x8z9p000108l09z9z9z9z",
  "images": ["/images/ceramic-vase.jpg"]
}
```

**Response (201):**
```json
{
  "id": "clh7x8z9p000108l09z9z9z9z",
  "title": "Handmade Ceramic Vase",
  "description": "...",
  "price": 85.0,
  "categoryId": "clh7x8z9p000108l09z9z9z9z",
  "sellerId": "clh7x8z9p000108l09z9z9z9z",
  "images": ["/images/ceramic-vase.jpg"],
  "stock": 0,
  "published": false,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### Update Product (Sellers Only)
**PUT** `/products/{id}`

Updates a product listing.

**Headers:**
- `Authorization: Bearer <token>` (Required, must be product owner)

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "price": 90.0,
  "categoryId": "clh7x8z9p000108l09z9z9z9z",
  "images": ["/images/new-image.jpg"],
  "stock": 15,
  "published": true
}
```

**Response (200):** Updated product object

---

### Delete Product (Sellers Only)
**DELETE** `/products/{id}`

Deletes a product listing.

**Headers:**
- `Authorization: Bearer <token>` (Required, must be product owner)

**Response (200):**
```json
{
  "message": "Product deleted"
}
```

---

## Reviews Endpoints

### Create Review
**POST** `/reviews`

Creates a new review for a product.

**Headers:**
- `Authorization: Bearer <token>` (Required)

**Request Body:**
```json
{
  "productId": "clh7x8z9p000108l09z9z9z9z",
  "rating": 5,
  "text": "Excellent quality! Highly recommend."
}
```

**Response (201):**
```json
{
  "id": "clh7x8z9p000108l09z9z9z9z",
  "productId": "clh7x8z9p000108l09z9z9z9z",
  "userId": "clh7x8z9p000108l09z9z9z9z",
  "rating": 5,
  "text": "Excellent quality! Highly recommend.",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### Get Product Reviews
**GET** `/reviews?productId={id}`

Retrieves all reviews for a specific product.

**Query Parameters:**
- `productId` (string): Product ID (Required)

**Response (200):**
```json
[
  {
    "id": "clh7x8z9p000108l09z9z9z9z",
    "rating": 5,
    "text": "Excellent quality!",
    "user": {
      "id": "clh7x8z9p000108l09z9z9z9z",
      "name": "John Buyer",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

## Cart Endpoints

### Get Cart
**GET** `/cart`

Retrieves the current user's shopping cart.

**Headers:**
- `Authorization: Bearer <token>` (Required)

**Response (200):**
```json
{
  "id": "clh7x8z9p000108l09z9z9z9z",
  "userId": "clh7x8z9p000108l09z9z9z9z",
  "items": [
    {
      "id": "clh7x8z9p000108l09z9z9z9z",
      "productId": "clh7x8z9p000108l09z9z9z9z",
      "quantity": 2,
      "product": {
        "id": "clh7x8z9p000108l09z9z9z9z",
        "title": "Handmade Ceramic Vase",
        "price": 85.0
      }
    }
  ],
  "total": 170.0,
  "itemCount": 2
}
```

---

### Add to Cart
**POST** `/cart`

Adds a product to the cart.

**Headers:**
- `Authorization: Bearer <token>` (Required)

**Request Body:**
```json
{
  "productId": "clh7x8z9p000108l09z9z9z9z",
  "quantity": 2
}
```

**Response (201):** Updated cart item object

---

### Update Cart Item
**PUT** `/cart/{itemId}`

Updates the quantity of a cart item.

**Headers:**
- `Authorization: Bearer <token>` (Required)

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200):** Updated cart item object

---

### Remove from Cart
**DELETE** `/cart/{itemId}`

Removes a product from the cart.

**Headers:**
- `Authorization: Bearer <token>` (Required)

**Response (200):**
```json
{
  "message": "Item removed from cart"
}
```

---

## Seller Profile Endpoints

### Get Seller Profile
**GET** `/seller-profile?userId={id}`

Retrieves a seller's profile information.

**Query Parameters:**
- `userId` (string): Seller's user ID (Required)

**Response (200):**
```json
{
  "id": "clh7x8z9p000108l09z9z9z9z",
  "userId": "clh7x8z9p000108l09z9z9z9z",
  "shopName": "Sarah Potter's Shop",
  "bio": "Welcome to my handcrafted pottery collection!",
  "image": "/images/shop-avatar.jpg",
  "verified": true,
  "rating": 4.8,
  "reviewCount": 150,
  "user": {
    "name": "Sarah Potter",
    "email": "sarah@example.com"
  }
}
```

---

### Create/Update Seller Profile
**POST** `/seller-profile`

Creates or updates the authenticated seller's profile.

**Headers:**
- `Authorization: Bearer <token>` (Required, must be SELLER)

**Request Body:**
```json
{
  "shopName": "Sarah Potter's Shop",
  "bio": "Welcome to my handcrafted pottery collection!",
  "image": "/images/shop-avatar.jpg"
}
```

**Response (201/200):** Updated profile object

---

## Categories Endpoints

### Get All Categories
**GET** `/categories`

Retrieves all product categories.

**Response (200):**
```json
[
  {
    "id": "clh7x8z9p000108l09z9z9z9z",
    "name": "Pottery",
    "slug": "pottery",
    "productCount": 45
  },
  {
    "id": "clh7x8z9p000108l09z9z9z9z",
    "name": "Jewelry",
    "slug": "jewelry",
    "productCount": 32
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "error": "Only sellers can create products"
}
```

### 404 Not Found
```json
{
  "error": "Product not found"
}
```

### 409 Conflict
```json
{
  "error": "Email already registered"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch products"
}
```

---

## Rate Limiting
Not currently implemented. To be added in future versions.

## Versioning
API is currently at v1 (unversioned). Future versions will use `/api/v2/` etc.
