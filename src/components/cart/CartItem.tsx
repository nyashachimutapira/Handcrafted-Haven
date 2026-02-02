'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CartItemProps {
  item: any;
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      setIsUpdating(true);
      try {
        await onUpdateQuantity(item.id, newQuantity);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const itemTotal = item.product.price * quantity;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex gap-4">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
        <Image
          src={item.product.images?.[0] || '/placeholder.jpg'}
          alt={item.product.title}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="font-bold text-primary text-lg">{item.product.title}</h3>
        <p className="text-gray-600 mb-3">${item.product.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={isUpdating}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={isUpdating}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="text-right flex flex-col justify-between items-end">
        <p className="font-bold text-lg text-primary">${itemTotal.toFixed(2)}</p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-800 text-sm font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
