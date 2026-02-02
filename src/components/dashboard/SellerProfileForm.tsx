'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface SellerProfile {
  shopName?: string;
  bio?: string;
  image?: string;
}

interface SellerProfileFormProps {
  initialData?: SellerProfile;
}

export default function SellerProfileForm({ initialData }: SellerProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    shopName: initialData?.shopName || '',
    bio: initialData?.bio || '',
    image: initialData?.image || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/seller-profile', formData);
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6 max-w-2xl">
      {error && <div className="bg-red-100 text-red-600 p-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-600 p-4 rounded">{success}</div>}

      {/* Shop Name */}
      <div>
        <label htmlFor="shopName" className="block font-semibold mb-2">
          Shop Name
        </label>
        <input
          id="shopName"
          type="text"
          name="shopName"
          value={formData.shopName}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Sarah's Pottery Studio"
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block font-semibold mb-2">
          Shop Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows={5}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tell customers about your shop and craft..."
        />
      </div>

      {/* Shop Image/Avatar */}
      <div>
        <label htmlFor="image" className="block font-semibold mb-2">
          Shop Image URL
        </label>
        <input
          id="image"
          type="url"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://example.com/shop-image.jpg"
        />
        {formData.image && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              src={formData.image}
              alt="Shop preview"
              className="w-32 h-32 object-cover rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-accent text-white font-bold px-6 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Profile'}
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
