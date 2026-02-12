# Backend Setup for Render.com

## Steps to Deploy Backend to Render

### 1. Create Backend Project
```bash
mkdir handcrafted-haven-backend
cd handcrafted-haven-backend
npm init -y
npm install express cors dotenv @prisma/client bcryptjs jsonwebtoken axios
npm install -D typescript @types/express @types/node ts-node nodemon
```

### 2. Copy These Files from Main Project
- `prisma/schema.prisma`
- `prisma/migrations/`
- Create `.env` file with `DATABASE_URL`

### 3. Create Express Server Structure
```
backend/
├── src/
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── cart.ts
│   │   ├── reviews.ts
│   │   ├── categories.ts
│   │   └── seller-profile.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── lib/
│   │   └── prisma.ts
│   └── server.ts
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

### 4. Create server.ts
See: `backend-server.ts` file (created next)

### 5. Deploy to Render
1. Push backend repo to GitHub
2. Go to render.com → New → Web Service
3. Select GitHub repo
4. Set environment: Node
5. Build command: `npm run build`
6. Start command: `node dist/server.js`
7. Add environment variable: `DATABASE_URL`
8. Deploy

### 6. Update Frontend
In Vercel environment variables, add:
```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
```

In your Next.js API calls, use:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const response = await fetch(`${API_URL}/api/auth/login`, {...});
```
