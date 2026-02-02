'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import DashboardNav from '@/components/dashboard/DashboardNav';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { useAuth } from '@/lib/hooks/useAuth';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    averageRating: 0,
  });
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
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products?limit=1000');
      const products = res.data.products;

      setStats({
        totalProducts: products.length,
        activeProducts: products.filter((p: any) => p.published).length,
        totalOrders: 0, // TODO: Implement when orders endpoint available
        totalEarnings: 0, // TODO: Calculate from orders
        averageRating: 0, // TODO: Calculate from seller profile
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Welcome, {user.name}</h1>
          <p className="text-gray-600 mt-2">Manage your products and orders from here.</p>
        </div>

        {/* Stats */}
        <DashboardStats stats={stats} />

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/dashboard/products/new"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition hover:border-primary border-2 border-transparent group"
            >
              <div className="text-3xl mb-2">📦</div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent">
                Add New Product
              </h3>
              <p className="text-gray-600 text-sm">Create a new product listing</p>
            </Link>

            <Link
              href="/dashboard/products"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition hover:border-primary border-2 border-transparent group"
            >
              <div className="text-3xl mb-2">📋</div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent">
                Manage Products
              </h3>
              <p className="text-gray-600 text-sm">
                {stats.totalProducts > 0 ? `You have ${stats.totalProducts} products` : 'View all products'}
              </p>
            </Link>

            <Link
              href="/dashboard/profile"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition hover:border-primary border-2 border-transparent group"
            >
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent">
                Shop Profile
              </h3>
              <p className="text-gray-600 text-sm">Manage your shop information</p>
            </Link>

            <Link
              href="/dashboard/orders"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition hover:border-primary border-2 border-transparent group"
            >
              <div className="text-3xl mb-2">📦</div>
              <h3 className="text-lg font-bold text-primary group-hover:text-accent">
                Orders
              </h3>
              <p className="text-gray-600 text-sm">
                {stats.totalOrders > 0 ? `${stats.totalOrders} new orders` : 'View orders'}
              </p>
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="font-bold text-blue-900 mb-2">Getting Started?</h3>
          <p className="text-blue-800 text-sm">
            Create your first product by clicking "Add New Product" above. Then update your shop profile to help customers learn more about your craft.
          </p>
        </div>
      </div>
    </div>
  );
}
