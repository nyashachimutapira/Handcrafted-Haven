// backend/src/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { comparePasswords, createToken, hashPassword } from './src/lib/auth';

dotenv.config();

const app: Express = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'https://handcrafted-haven.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Auth Routes
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = createToken(user.id, user.email, user.role);

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
});

app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Email, password, and name required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'buyer',
      },
    });

    const token = createToken(user.id, user.email, user.role);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// Products Routes
app.get('/api/products', async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { seller: true, category: true },
    });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: String(id) },
      include: { seller: true, category: true, reviews: true },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.post('/api/products', async (req: Request, res: Response) => {
  try {
    const { title, description, price, categoryId, sellerId, images, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        categoryId,
        sellerId,
        images: images || [],
        stock: stock || 0,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create product" });
  }
});

// Categories Routes
app.get('/api/categories', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Reviews Routes
app.get('/api/reviews/:productId', async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { productId: String(productId) },
      include: { user: true },
    });
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

app.post('/api/reviews', async (req: Request, res: Response) => {
  try {
    const { productId, userId, rating, text } = req.body;

    const review = await prisma.review.create({
      data: {
        productId,
        userId,
        rating,
        text,
      },
    });

    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create review" });
  }
});

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'Backend is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
