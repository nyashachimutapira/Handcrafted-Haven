'use client';

import { useEffect, useState } from 'react';
import api from '../api';

export interface CartItem {
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

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  itemCount: number;
}

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/cart');
      setCart(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load cart');
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      setError('');
      await api.post('/cart', { productId, quantity });
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add to cart');
      throw err;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setError('');
      await api.put(`/cart/${itemId}`, { quantity });
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update quantity');
      throw err;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setError('');
      await api.delete(`/cart/${itemId}`);
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to remove item');
      throw err;
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cart,
    loading,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
}
