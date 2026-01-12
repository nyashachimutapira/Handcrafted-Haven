'use client';

const categories = [
  { id: 1, name: "Jewelry", image: "/images/silver-bracelet..jpg" },
  { id: 2, name: "Ceramics", image: "/images/ceramic-vase.jpg" },
  { id: 3, name: "Woodcraft", image: "/images/wood-cutting-board.jpg" },
  { id: 4, name: "Textiles", image: "/images/taxitile.jpg" },
  { id: 5, name: "Glasswork", image: "/images/glasswork.jpg" },
  { id: 6, name: "Home Decor", image: "/images/homedeco.jpg" },
];

export default function Categories() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-secondary hover:border-primary hover:bg-light-bg transition duration-300 overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 object-cover rounded-lg mb-2"
              />
              <span className="text-sm font-medium text-primary text-center">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
