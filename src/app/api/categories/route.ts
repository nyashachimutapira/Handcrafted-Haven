import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          where: { published: true },
          select: { id: true },
        },
      },
    });

    return NextResponse.json(
      categories.map((cat: any) => ({
        ...cat,
        productCount: cat.products.length,
        products: undefined,
      }))
    );
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Category name required" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }
    console.error("Category creation error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
