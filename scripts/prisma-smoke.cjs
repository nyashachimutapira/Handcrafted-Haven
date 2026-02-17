const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          where: { published: true },
          select: { id: true },
        },
      },
    });

    console.log("ok categories", categories.length);

    const products = await prisma.product.findMany({
      where: { published: true },
      take: 1,
      include: {
        seller: {
          select: { id: true, name: true, sellerProfile: true },
        },
        category: true,
        reviews: true,
      },
    });

    console.log("ok products", products.length);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("prisma smoke error", e);
  process.exit(1);
});

