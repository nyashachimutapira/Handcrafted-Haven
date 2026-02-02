# Implementation Examples - Code Templates

Quick-start code templates for implementing the 5 features.

---

## 1. Product Detail Page - File Structure & Examples

### File: `src/app/products/[id]/page.tsx`

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/products/ProductGallery';
import ProductInfo from '@/components/products/ProductInfo';
import ProductReviews from '@/components/products/ProductReviews';
import SellerCard from '@/components/products/SellerCard';

export const metadata: Metadata = {
  title: 'Product Details - Handcrafted Haven',
};

interface Props {
  params: {
    id: string;
  };
}

async function fetchProduct(id: string) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: 'revalidate',
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ProductPage({ params }: Props) {
  const product = await fetchProduct(params.id);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ProductGallery images={product.images} title={product.title} />
          <ProductInfo product={product} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductReviews 
              productId={product.id}
              reviews={product.reviews}
              averageRating={product.averageRating}
            />
          </div>
          <div>
            <SellerCard seller={product.seller} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### File: `src/components/products/ProductGallery.tsx`

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Fallback if no images
  const displayImages = images.length > 0 ? images : ['/placeholder.jpg'];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center overflow-hidden">
        <Image
          src={displayImages[selectedImage]}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
              selectedImage === index ? 'border-primary' : 'border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
```

### File: `src/components/products/ProductInfo.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface ProductInfoProps {
  product: {
    id: string;
    title: string;
    price: number;
    description: string;
    stock: number;
    averageRating: number;
    reviewCount: number;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const inStock = product.stock > 0;
  const maxQuantity = Math.min(quantity, product.stock);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      await axios.post(
        '/api/cart',
        {
          productId: product.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success message
      alert('Added to cart!');
      setQuantity(1);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">{product.title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-xl">⭐ {product.averageRating.toFixed(1)}</span>
            <span className="text-gray-600 ml-2">({product.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <p className={`text-lg font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
          {inStock ? `${product.stock} in stock` : 'Out of Stock'}
        </p>
      </div>

      <p className="text-gray-700 leading-relaxed">{product.description}</p>

      {/* Quantity Selector */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label htmlFor="quantity" className="font-semibold">
            Quantity:
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              disabled={!inStock}
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center border-0 focus:ring-0"
              min="1"
              max={product.stock}
              disabled={!inStock}
            />
            <button
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              disabled={!inStock || quantity >= product.stock}
            >
              +
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <button
          onClick={handleAddToCart}
          disabled={!inStock || loading}
          className={`w-full py-3 rounded-lg font-bold text-white transition ${
            inStock
              ? 'bg-primary hover:bg-accent cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? 'Adding...' : inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
```

---

## 2. Shopping Cart - File Structure & Examples

### File: `src/app/cart/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

interface Cart {
  id: string;
  items: any[];
  total: number;
  itemCount: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const res = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refetch cart
      await fetchCart();
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/cart/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchCart();
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Shopping Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <a
            href="/products"
            className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-accent"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

        {error && <div className="bg-red-100 text-red-600 p-4 rounded mb-6">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
```

### File: `src/components/cart/CartItem.tsx`

```typescript
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CartItemProps {
  item: any;
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex gap-4">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0">
        <Image
          src={item.product.images?.[0] || '/placeholder.jpg'}
          alt={item.product.title}
          width={96}
          height={96}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="font-bold text-primary">{item.product.title}</h3>
        <p className="text-gray-600">${item.product.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
          >
            -
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="text-right flex flex-col justify-between">
        <p className="font-bold">${(item.product.price * quantity).toFixed(2)}</p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-800 text-sm font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
```

---

## 3. Authentication Pages - File Structure & Examples

### File: `src/app/auth/login/page.tsx`

```typescript
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login - Handcrafted Haven',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to your account
        </p>

        <LoginForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/auth/register" className="text-primary font-bold hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
```

### File: `src/components/auth/LoginForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Store token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>}

      <div>
        <label htmlFor="email" className="block font-semibold mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block font-semibold mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-accent disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

### File: `src/lib/hooks/useAuth.ts`

```typescript
import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: loading,
    logout,
  };
}
```

---

## 4. Search/Filter Functionality - File Structure & Examples

### File: `src/app/products/page.tsx` (Updated)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import FilterSidebar from '@/components/filters/FilterSidebar';
import ProductGrid from '@/components/filters/ProductGrid';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [categories, setCategories] = useState([]);

  // Filter state
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page') || '1'),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.search) params.append('search', filters.search);
      params.append('sort', filters.sort);
      params.append('page', filters.page.toString());
      params.append('limit', '12');

      const res = await axios.get(`/api/products?${params.toString()}`);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Browse Products</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <FilterSidebar
              categories={categories}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          <div className="lg:col-span-3">
            <ProductGrid
              products={products}
              loading={loading}
              pagination={pagination}
              onPageChange={(page) => handleFilterChange({ page })}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### File: `src/components/filters/FilterSidebar.tsx`

```typescript
'use client';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FilterSidebarProps {
  categories: Category[];
  filters: any;
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({
  categories,
  filters,
  onFilterChange,
}: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-primary mb-4">Filters</h2>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="block font-semibold mb-2">
          Search
        </label>
        <input
          id="search"
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="category" className="block font-semibold mb-2">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            className="w-1/2 border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            className="w-1/2 border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={() => onFilterChange({ category: '', minPrice: '', maxPrice: '', search: '' })}
        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded"
      >
        Clear Filters
      </button>
    </div>
  );
}
```

---

## 5. Seller Dashboard - File Structure & Examples

### File: `src/app/dashboard/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import DashboardNav from '@/components/dashboard/DashboardNav';
import DashboardStats from '@/components/dashboard/DashboardStats';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.role !== 'SELLER') {
      router.push('/');
      return;
    }

    setUser(userData);
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 1000 },
      });

      const products = res.data.products;
      setStats({
        totalProducts: products.length,
        activeProducts: products.filter((p: any) => p.published).length,
        totalOrders: 0, // Needs API endpoint
      });
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  if (!user) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Dashboard</h1>

        <DashboardStats stats={stats} />

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/dashboard/products/new"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-primary mb-2">Add New Product</h3>
            <p className="text-gray-600">Create a new product listing</p>
          </a>

          <a
            href="/dashboard/products"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-primary mb-2">Manage Products</h3>
            <p className="text-gray-600">View, edit, or delete products</p>
          </a>

          <a
            href="/dashboard/profile"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-primary mb-2">Seller Profile</h3>
            <p className="text-gray-600">Manage your shop information</p>
          </a>

          <a
            href="/dashboard/orders"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-primary mb-2">Orders</h3>
            <p className="text-gray-600">View customer orders</p>
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

## Common Utilities

### File: `src/lib/api.ts`

```typescript
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Next Steps

1. Copy these examples into your project
2. Install any missing dependencies
3. Test each component in isolation
4. Integrate with the rest of the app
5. Create PR for code review
