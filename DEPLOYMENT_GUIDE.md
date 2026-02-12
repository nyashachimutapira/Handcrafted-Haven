# Deployment Guide: Vercel + Render

## Step 1: Prepare Backend Repository

1. Create new GitHub repo: `handcrafted-haven-backend`
2. Create directory structure:
   ```
   handcrafted-haven-backend/
   ├── src/
   │   ├── server.ts (from backend-server.ts)
   │   ├── lib/
   │   │   └── auth.ts (copy from frontend)
   │   └── middleware/
   │       └── auth.ts (copy from frontend)
   ├── prisma/
   │   ├── schema.prisma (copy from frontend)
   │   └── migrations/ (copy from frontend)
   ├── package.json (from backend-package.json)
   ├── tsconfig.json (create below)
   ├── .env.example
   └── .gitignore
   ```

## Step 2: Create Backend tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Step 3: Deploy Backend to Render.com

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New" → "Web Service"
4. Select `handcrafted-haven-backend` repository
5. Configure:
   - **Name**: `handcrafted-haven-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm run build && npm run db:migrate`
   - **Start Command**: `npm start`
   - **Plan**: Select your plan (Free tier available)

6. Add Environment Variables:
   ```
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   NODE_ENV=production
   ```

7. Click "Create Web Service"
8. After deployment succeeds, copy your URL: `https://handcrafted-haven-backend.onrender.com`

## Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Import your `Handcrafted-Haven` repository
3. Configure:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://handcrafted-haven-backend.onrender.com
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   ```

5. Click "Deploy"
6. After deployment succeeds, your site is live!

## Step 5: Update Frontend API Calls

Create a utility file: `src/lib/api.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiCall(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
```

Use in components:
```typescript
import { apiCall } from '@/lib/api';

const response = await apiCall('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});
```

## Step 6: Test Deployment

1. Test frontend at: https://handcrafted-haven.vercel.app
2. Test backend health at: https://handcrafted-haven-backend.onrender.com/health
3. Test API calls: Try login/register to ensure frontend-backend communication works

## Troubleshooting

**CORS Errors**: Update backend `server.ts` CORS origins:
```typescript
origin: [
  'https://your-frontend-url.vercel.app',
  'http://localhost:3000'
],
```

**Database Connection Issues**: Verify `DATABASE_URL` is correct on both services

**Port Issues**: Render uses `process.env.PORT` automatically

## Production Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel  
- [ ] NEXT_PUBLIC_API_URL set correctly in Vercel
- [ ] Database migrations run (`npm run db:migrate`)
- [ ] JWT_SECRET set securely on both services
- [ ] CORS origins configured for production
- [ ] Test all API endpoints from frontend
- [ ] Check Render logs for errors
- [ ] Monitor uptime and performance
