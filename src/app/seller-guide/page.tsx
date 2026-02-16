export default function SellerGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Seller Guide</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-4">
          <p className="text-gray-700">
            Welcome to Handcrafted Haven! This guide will help you get started as a seller.
          </p>
          <h2 className="text-xl font-semibold text-primary mt-6 mb-2">Getting Started</h2>
          <p className="text-gray-700">
            1. Create an account and select "Seller" as your role
          </p>
          <p className="text-gray-700">
            2. Complete your seller profile
          </p>
          <p className="text-gray-700">
            3. Start listing your handcrafted products
          </p>
          <h2 className="text-xl font-semibold text-primary mt-6 mb-2">Best Practices</h2>
          <p className="text-gray-700">
            Use high-quality photos, write detailed descriptions, and respond promptly to customer inquiries.
          </p>
        </div>
      </div>
    </div>
  );
}
