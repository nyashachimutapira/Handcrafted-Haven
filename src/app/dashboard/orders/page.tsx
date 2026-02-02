'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import DashboardNav from '@/components/dashboard/DashboardNav';
import OrdersList from '@/components/dashboard/OrdersList';
import { useAuth } from '@/lib/hooks/useAuth';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
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
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual orders endpoint when available
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (err: any) {
      if (err.response?.status !== 404) {
        console.error('Failed to fetch orders:', err);
      }
      // API endpoint may not be implemented yet
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
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
        <div>
          <h1 className="text-4xl font-bold text-primary">Orders</h1>
          <p className="text-gray-600 mt-2">Orders from customers</p>
        </div>

        <div className="mt-8">
          <OrdersList orders={orders} loading={loading} />
        </div>

        {orders.length === 0 && (
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-blue-900">
              Note: Orders endpoint is being implemented. Check back soon for your customer orders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
