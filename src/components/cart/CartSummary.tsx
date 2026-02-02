'use client';

import { useRouter } from 'next/navigation';

interface Cart {
  items: any[];
  total: number;
  itemCount: number;
}

interface CartSummaryProps {
  cart: Cart;
}

export default function CartSummary({ cart }: CartSummaryProps) {
  const router = useRouter();

  // Calculate totals
  const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? 10 : 0; // Free shipping over $100 (example)
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>

      <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between mb-6 text-lg">
        <span className="font-bold">Total</span>
        <span className="font-bold text-primary text-2xl">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-primary hover:bg-accent text-white font-bold py-3 rounded-lg transition"
      >
        Proceed to Checkout
      </button>

      <button
        onClick={() => router.push('/products')}
        className="w-full mt-3 border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 rounded-lg transition"
      >
        Continue Shopping
      </button>

      <p className="text-gray-500 text-sm text-center mt-4">
        Items in cart: <span className="font-semibold">{cart.itemCount}</span>
      </p>
    </div>
  );
}
