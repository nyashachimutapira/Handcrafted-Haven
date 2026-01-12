'use client';

const featuredProducts = [
  {
    id: 1,
    name: "Handmade Ceramic Vase",
    price: 85.0,
    image: "/images/ceramic-vase.jpg",
    seller: "Pottery Studio",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Artisan Wood Cutting Board",
    price: 65.0,
    image: "/images/wood-cutting-board.jpg",
    seller: "Woodcraft Co",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Silver Handcrafted Bracelet",
    price: 120.0,
    image: "/images/silver-bracelet..jpg",
    seller: "Jewelry Artisans",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Woven Wall Tapestry",
    price: 95.0,
    image: "/images/wall-tapestry.jpg",
    seller: "Textile Weavers",
    rating: 4.8,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="w-full py-16 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <div className="bg-border h-48 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23D2B48C' width='400' height='400'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='24' fill='%238B7355' text-anchor='middle'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{product.seller}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-sm text-yellow-500">
                    ⭐ {product.rating}
                  </span>
                </div>
                <button className="w-full mt-4 bg-primary hover:bg-accent text-white font-semibold py-2 rounded transition duration-300">
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
