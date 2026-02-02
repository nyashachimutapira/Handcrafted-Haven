'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';
import DashboardNav from '@/components/dashboard/DashboardNav';
import ProductForm from '@/components/dashboard/ProductForm';
import { useAuth } from '@/lib/hooks/useAuth';

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'SELLER')) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.role === 'SELLER') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [productRes, categoriesRes] = await Promise.all([
        api.get(`/products/${productId}`),
        api.get('/categories'),
      ]);

      setProduct(productRes.data);
      setCategories(categoriesRes.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'SELLER') {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <DashboardNav />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-100 text-red-600 p-6 rounded-lg">
            <p className="text-lg font-semibold">{error}</p>
            <button
              onClick={() => router.push('/dashboard/products')}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Edit Product</h1>

        {product && <ProductForm productId={productId} initialData={product} categories={categories} />}
      </div>
    </div>
  );
}
