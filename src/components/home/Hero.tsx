export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-secondary to-light-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Handcrafted Haven
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover unique, handcrafted items from talented artisans around the world. Support local creators and find treasures that tell a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-accent text-white font-semibold py-3 px-8 rounded transition duration-300">
              Browse Products
            </button>
            <button className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded transition duration-300">
              Become a Seller
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
