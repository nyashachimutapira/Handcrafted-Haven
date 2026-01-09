import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Jewelry', slug: 'jewelry' },
      { name: 'Ceramics', slug: 'ceramics' },
      { name: 'Woodcraft', slug: 'woodcraft' },
      { name: 'Textiles', slug: 'textiles' },
      { name: 'Glasswork', slug: 'glasswork' },
      { name: 'Home Decor', slug: 'home-decor' },
    ],
  });

  // Create sample users
  const seller1 = await prisma.user.create({
    data: {
      email: 'seller1@example.com',
      password: await hashPassword('password123'),
      name: 'Pottery Studio',
      role: 'SELLER',
      sellerProfile: {
        create: {
          bio: 'Handmade ceramics and pottery',
          verified: true,
        },
      },
    },
  });

  const seller2 = await prisma.user.create({
    data: {
      email: 'seller2@example.com',
      password: await hashPassword('password123'),
      name: 'Jewelry Artisans',
      role: 'SELLER',
      sellerProfile: {
        create: {
          bio: 'Unique handcrafted jewelry',
          verified: true,
        },
      },
    },
  });

  const buyer = await prisma.user.create({
    data: {
      email: 'buyer@example.com',
      password: await hashPassword('password123'),
      name: 'John Doe',
      role: 'BUYER',
    },
  });

  // Create sample products
  const product1 = await prisma.product.create({
    data: {
      title: 'Handmade Ceramic Vase',
      description: 'Beautiful handcrafted ceramic vase perfect for any room',
      price: 85.0,
      categoryId: 'ceramics', // Will need to adjust based on actual IDs
      sellerId: seller1.id,
      images: ['https://via.placeholder.com/300x300?text=Ceramic+Vase'],
      quantity: 5,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: 'Silver Handcrafted Bracelet',
      description: 'Elegant silver bracelet with intricate designs',
      price: 120.0,
      categoryId: 'jewelry',
      sellerId: seller2.id,
      images: ['https://via.placeholder.com/300x300?text=Silver+Bracelet'],
      quantity: 10,
    },
  });

  // Create sample reviews
  await prisma.review.create({
    data: {
      rating: 5,
      text: 'Amazing quality and beautiful craftsmanship!',
      productId: product1.id,
      userId: buyer.id,
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
