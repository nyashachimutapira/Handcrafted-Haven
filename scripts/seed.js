const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
    await prisma.sellerProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();

    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: { name: 'Pottery', slug: 'pottery' },
      }),
      prisma.category.create({
        data: { name: 'Jewelry', slug: 'jewelry' },
      }),
      prisma.category.create({
        data: { name: 'Textiles', slug: 'textiles' },
      }),
      prisma.category.create({
        data: { name: 'Woodcraft', slug: 'woodcraft' },
      }),
      prisma.category.create({
        data: { name: 'Glasswork', slug: 'glasswork' },
      }),
    ]);

    console.log('✅ Categories created:', categories.length);

    // Hash password helper
    const hashPassword = (pwd) => bcryptjs.hash(pwd, 10);

    // Create buyer user
    const buyer = await prisma.user.create({
      data: {
        email: 'buyer@example.com',
        password: await hashPassword('password123'),
        name: 'John Buyer',
        role: 'BUYER',
      },
    });

    // Create cart for buyer
    await prisma.cart.create({
      data: { userId: buyer.id },
    });

    console.log('✅ Buyer created:', buyer.email);

    // Create seller users
    const sellers = await Promise.all([
      prisma.user.create({
        data: {
          email: 'potter@example.com',
          password: await hashPassword('password123'),
          name: 'Sarah Potter',
          role: 'SELLER',
        },
      }),
      prisma.user.create({
        data: {
          email: 'jeweler@example.com',
          password: await hashPassword('password123'),
          name: 'James Jeweler',
          role: 'SELLER',
        },
      }),
      prisma.user.create({
        data: {
          email: 'weaver@example.com',
          password: await hashPassword('password123'),
          name: 'Emma Weaver',
          role: 'SELLER',
        },
      }),
    ]);

    console.log('✅ Sellers created:', sellers.length);

    // Create seller profiles
    for (const seller of sellers) {
      await prisma.sellerProfile.create({
        data: {
          userId: seller.id,
          shopName: `${seller.name}'s Shop`,
          bio: `Welcome to ${seller.name}'s handcrafted collection!`,
          verified: true,
          rating: 4.8,
          reviewCount: 150,
        },
      });
    }

    console.log('✅ Seller profiles created');

    // Create products
    const products = [
      {
        sellerId: sellers[0].id,
        categoryId: categories[0].id,
        title: 'Handmade Ceramic Vase',
        description:
          'Beautiful handcrafted ceramic vase made with traditional pottery techniques. Perfect for flowers or as a decorative piece.',
        price: 85.0,
        stock: 10,
        images: ['/images/ceramic-vase.jpg'],
      },
      {
        sellerId: sellers[0].id,
        categoryId: categories[0].id,
        title: 'Rustic Clay Bowl',
        description:
          'Unique clay bowl handmade with organic shapes and natural glazing. Great for dining or decoration.',
        price: 45.0,
        stock: 15,
        images: ['/images/Rustic Clay Bowl.jpg'],
      },
      {
        sellerId: sellers[1].id,
        categoryId: categories[1].id,
        title: 'Silver Handcrafted Bracelet',
        description:
          'Elegant sterling silver bracelet with intricate hand-stamped details. A timeless piece of jewelry.',
        price: 120.0,
        stock: 5,
        images: ['/images/Silver Handcrafted Bracelet.jpg'],
      },
      {
        sellerId: sellers[1].id,
        categoryId: categories[1].id,
        title: 'Beaded Necklace',
        description:
          'Colorful handmade necklace using natural gemstones and beads. Each piece is unique.',
        price: 65.0,
        stock: 20,
        images: ['/images/Beaded Necklace.jpg'],
      },
      {
        sellerId: sellers[2].id,
        categoryId: categories[2].id,
        title: 'Woven Wall Tapestry',
        description:
          'Large handwoven textile art perfect for adding character to any room. Made with natural fibers.',
        price: 95.0,
        stock: 8,
        images: ['/images/wall-tapestry.jpg'],
      },
      {
        sellerId: sellers[2].id,
        categoryId: categories[2].id,
        title: 'Hand-dyed Scarf',
        description:
          'Soft and elegant scarf hand-dyed with natural botanical dyes. Perfect for any season.',
        price: 55.0,
        stock: 25,
        images: ['/images/Hand-dyed Scarf.jpg'],
      },
      {
        sellerId: sellers[0].id,
        categoryId: categories[3].id,
        title: 'Wood Cutting Board',
        description:
          'Premium handcrafted wooden cutting board made from sustainable materials. Durable and beautiful for your kitchen.',
        price: 75.0,
        stock: 12,
        images: ['/images/wood-cutting-board.jpg'],
      },
      {
        sellerId: sellers[1].id,
        categoryId: categories[1].id,
        title: 'Home Decoration Set',
        description:
          'Beautiful handmade home decoration pieces perfect for modern or rustic interiors.',
        price: 95.0,
        stock: 6,
        images: ['/images/homedeco.jpg'],
      },
      {
        sellerId: sellers[2].id,
        categoryId: categories[4].id,
        title: 'Handmade Glasswork',
        description:
          'Stunning glasswork pieces created using traditional techniques. Perfect as wall art or decorative pieces.',
        price: 110.0,
        stock: 4,
        images: ['/images/glasswork.jpg'],
      },
    ];

    for (const product of products) {
      await prisma.product.create({
        data: {
          ...product,
          published: true,
        },
      });
    }

    console.log('✅ Products created:', products.length);

    // Create reviews
    const allProducts = await prisma.product.findMany({
      take: 3,
    });

    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];
      await prisma.review.create({
        data: {
          productId: product.id,
          userId: buyer.id,
          rating: 5 - i,
          text: 'Great handcrafted item! Quality and craftsmanship are excellent.',
        },
      });
    }

    console.log('✅ Reviews created');

    console.log('✨ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
