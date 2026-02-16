export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Frequently Asked Questions</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">How do I place an order?</h2>
            <p className="text-gray-700">Browse our products, add items to your cart, and proceed to checkout.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">What payment methods do you accept?</h2>
            <p className="text-gray-700">We accept major credit cards and PayPal.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">How long does shipping take?</h2>
            <p className="text-gray-700">Shipping times vary by seller and location. Check individual product pages for estimated delivery times.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
