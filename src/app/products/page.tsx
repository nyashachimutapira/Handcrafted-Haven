import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Products - Handcrafted Haven',
  description: 'Discover unique handcrafted items. Filter by category, price, and more.',
  keywords: ['products', 'handmade', 'artisan', 'shop', 'browse'],
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">
          Browse Products
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Filters
              </h2>

              {/* Category Filter */}
              <div className="mb-6">
                <label htmlFor="category" className="block font-semibold mb-3">
                  Category
                </label>
                <select id="category" className="w-full border border-border rounded px-3 py-2">
                  <option value="">All Categories</option>
                  <option value="pottery">Pottery</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="textiles">Textiles</option>
                  <option value="woodcraft">Woodcraft</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label htmlFor="min-price" className="block font-semibold mb-3">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    id="min-price"
                    type="number"
                    placeholder="Min"
                    className="w-1/2 border border-border rounded px-3 py-2"
                  />
                  <input
                    id="max-price"
                    type="number"
                    placeholder="Max"
                    className="w-1/2 border border-border rounded px-3 py-2"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label htmlFor="rating" className="block font-semibold mb-3">
                  Minimum Rating
                </label>
                <select id="rating" className="w-full border border-border rounded px-3 py-2">
                  <option value="">All Ratings</option>
                  <option value="4">⭐ 4.0 & up</option>
                  <option value="3">⭐ 3.0 & up</option>
                  <option value="2">⭐ 2.0 & up</option>
                  <option value="1">⭐ 1.0 & up</option>
                </select>
              </div>

              <button className="w-full mt-6 bg-primary hover:bg-accent text-white font-semibold py-2 rounded transition">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold">12</span> products
              </p>
              <select className="border border-border rounded px-3 py-2">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product Card Placeholder */}
              {[...Array(9)].map((_, i) => (
                <article
                  key={i}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="bg-border h-48 flex items-center justify-center rounded-t-lg">
                    <span className="text-gray-400">Product Image</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary mb-2">
                      Product Name
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Seller Name</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-primary">
                        $0.00
                      </span>
                      <span className="text-sm">⭐ 0.0</span>
                    </div>
                    <button className="w-full bg-primary hover:bg-accent text-white font-semibold py-2 rounded transition">
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <button className="px-4 py-2 border border-border rounded hover:bg-border transition">
                Previous
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded">
                1
              </button>
              <button className="px-4 py-2 border border-border rounded hover:bg-border transition">
                2
              </button>
              <button className="px-4 py-2 border border-border rounded hover:bg-border transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
