'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import DashboardNav from '@/components/dashboard/DashboardNav';
import ProductTable from '@/components/dashboard/ProductTable';
import { useAuth } from '@/lib/hooks/useAuth';

export default function ProductsManagePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'SELLER')) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.role === 'SELLER') {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products?limit=1000');
      setProducts(res.data.products);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'SELLER') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">My Products</h1>
            <p className="text-gray-600 mt-2">Manage all your product listings</p>
          </div>
          <Link
            href="/dashboard/products/new"
            className="bg-primary hover:bg-accent text-white font-bold px-6 py-3 rounded transition"
          >
            + Add New Product
          </Link>
        </div>

        <ProductTable products={products} onProductDeleted={fetchProducts} />
      </div>
    </div>
  );
}
