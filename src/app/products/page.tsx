'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import FilterSidebar from '@/components/filters/FilterSidebar';
import ProductGrid from '@/components/filters/ProductGrid';

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  averageRating: number;
  reviewCount: number;
  seller: {
    name: string;
  };
}

interface Pagination {
  total: number;
  page: number;
  pages: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, pages: 1 });

  // Filter state
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    sort: 'newest',
    page: 1,
  });
  
  const [mounted, setMounted] = useState(false);

  // Set mounted flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    if (!mounted) return;

    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, [mounted]);

  // Fetch products whenever filters change
  useEffect(() => {
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

        const res = await api.get(`/products?${params.toString()}`);
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleSortChange = (sort: string) => {
    handleFilterChange({ sort });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Browse Products</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <FilterSidebar
              categories={categories}
              filters={filters}
              onFilterChange={handleFilterChange}
              loading={loading}
            />
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={products}
              loading={loading}
              pagination={pagination}
              onPageChange={handlePageChange}
              onSortChange={handleSortChange}
              currentSort={filters.sort}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
