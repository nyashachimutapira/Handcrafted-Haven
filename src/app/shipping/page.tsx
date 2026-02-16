export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Shipping Information</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-4">
          <p className="text-gray-700">
            Shipping times and costs vary by seller and product. Each seller sets their own shipping policies.
          </p>
          <p className="text-gray-700">
            Standard shipping typically takes 5-10 business days. Express shipping options may be available at checkout.
          </p>
          <p className="text-gray-700">
            For international orders, please allow additional time for customs processing.
          </p>
        </div>
      </div>
    </div>
  );
}
