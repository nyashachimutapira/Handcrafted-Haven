export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-4">
          <p className="text-gray-700">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          <h2 className="text-xl font-semibold text-primary mt-6 mb-2">Information We Collect</h2>
          <p className="text-gray-700">
            We collect information you provide when creating an account, making a purchase, or contacting us.
          </p>
          <h2 className="text-xl font-semibold text-primary mt-6 mb-2">How We Use Your Information</h2>
          <p className="text-gray-700">
            We use your information to process orders, communicate with you, and improve our services.
          </p>
        </div>
      </div>
    </div>
  );
}
