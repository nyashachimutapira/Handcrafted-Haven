'use client';

import Image from 'next/image';
import Link from 'next/link';
import SortDropdown from './SortDropdown';

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

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onSortChange?: (sort: string) => void;
  currentSort?: string;
}

export default function ProductGrid({
  products,
  loading,
  pagination,
  onPageChange,
  onSortChange,
  currentSort = 'newest',
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-600 text-lg mb-4">No products found matching your filters.</p>
        <p className="text-gray-500">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Sort */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{products.length}</span> of{' '}
          <span className="font-semibold">{pagination.total}</span> products
        </p>
        {onSortChange && (
          <SortDropdown
            sortBy={currentSort}
            onSortChange={onSortChange}
            loading={loading}
          />
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-200 overflow-hidden">
              <Image
                src={product.images?.[0] || '/placeholder.jpg'}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {product.images && product.images.length > 1 && (
                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                  +{product.images.length - 1} more
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-primary mb-1 line-clamp-2 group-hover:text-accent transition">
                {product.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3">{product.seller.name}</p>

              {/* Price and Rating */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm">⭐ {(typeof product.averageRating === 'number' ? product.averageRating : parseFloat(String(product.averageRating)) || 0).toFixed(1)}</span>
                  <span className="text-xs text-gray-600">({product.reviewCount || 0})</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-primary hover:bg-accent text-white font-semibold py-2 rounded transition">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded transition ${
                page === pagination.page
                  ? 'bg-primary text-white'
                  : 'border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
