'use client';

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

interface FilterSidebarProps {
  categories: Category[];
  filters: {
    category: string;
    minPrice: string;
    maxPrice: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
  loading?: boolean;
}

export default function FilterSidebar({
  categories,
  filters,
  onFilterChange,
  loading = false,
}: FilterSidebarProps) {
  const handleClearFilters = () => {
    onFilterChange({
      category: '',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 h-fit">
      <h2 className="text-lg font-bold text-primary mb-6">Filters</h2>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="block font-semibold mb-2 text-gray-700">
          Search Products
        </label>
        <input
          id="search"
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder="Search..."
          disabled={loading}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="category" className="block font-semibold mb-2 text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          disabled={loading}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name} {cat.productCount ? `(${cat.productCount})` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-700">Price Range ($)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            disabled={loading}
            className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            disabled={loading}
            className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        disabled={
          loading ||
          (!filters.category && !filters.minPrice && !filters.maxPrice && !filters.search)
        }
        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear Filters
      </button>
    </div>
  );
}
