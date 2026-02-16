export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-4">
          <p className="text-gray-700">
            Have questions or need assistance? We're here to help!
          </p>
          <p className="text-gray-700">
            Email: support@handcraftedhaven.com
          </p>
          <p className="text-gray-700">
            We typically respond within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
