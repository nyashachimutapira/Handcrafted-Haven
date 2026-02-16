export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Returns & Refunds</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-4">
          <p className="text-gray-700">
            We want you to be completely satisfied with your purchase. If you're not happy, you can return most items within 30 days of delivery.
          </p>
          <p className="text-gray-700">
            Items must be in their original condition. Custom or personalized items may not be eligible for return.
          </p>
          <p className="text-gray-700">
            To initiate a return, please contact the seller directly through their profile or contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
