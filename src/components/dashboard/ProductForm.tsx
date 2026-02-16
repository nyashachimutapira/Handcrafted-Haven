'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface ProductFormProps {
  productId?: string;
  initialData?: any;
  categories?: any[];
}

export default function ProductForm({ productId, initialData, categories = [] }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    categoryId: initialData?.categoryId || '',
    stock: initialData?.stock || '',
    images: initialData?.images || [''],
    published: initialData?.published || false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_: string, i: number) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Filter out empty image URLs
      const filteredImages = formData.images.filter((img: string) => img.trim() !== '');

      const payload = {
        ...formData,
        images: filteredImages,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      if (productId) {
        // Update existing product
        await api.put(`/products/${productId}`, payload);
        router.push('/dashboard/products');
      } else {
        // Create new product
        await api.post('/products', payload);
        router.push('/dashboard/products');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {error && <div className="bg-red-100 text-red-600 p-4 rounded">{error}</div>}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block font-semibold mb-2">
          Product Title *
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Handmade Ceramic Vase"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-semibold mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={6}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Describe your product..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Price */}
        <div>
          <label htmlFor="price" className="block font-semibold mb-2">
            Price ($) *
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            step="0.01"
            min="0"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="categoryId" className="block font-semibold mb-2">
            Category *
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block font-semibold mb-2">
            Stock Quantity *
          </label>
          <input
            id="stock"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
            min="0"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0"
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block font-semibold mb-2">Product Images</label>
        <div className="space-y-2">
          {formData.images.map((image: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addImageField}
          className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
        >
          + Add Image
        </button>
      </div>

      {/* Published */}
      <div className="flex items-center gap-2">
        <input
          id="published"
          type="checkbox"
          name="published"
          checked={formData.published}
          onChange={handleInputChange}
          className="w-4 h-4 rounded"
        />
        <label htmlFor="published" className="font-semibold">
          Publish this product (make it visible to customers)
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-accent text-white font-bold px-6 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : productId ? 'Update Product' : 'Create Product'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold px-6 py-2 rounded transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
