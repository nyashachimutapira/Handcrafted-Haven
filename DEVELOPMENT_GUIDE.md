# Handcrafted Haven - Development Guide

## Project Structure

```
handcrafted-haven/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── products/      # Product endpoints
│   │   │   ├── reviews/       # Review endpoints
│   │   │   ├── cart/          # Cart endpoints
│   │   │   ├── seller-profile/# Seller profile endpoints
│   │   │   └── categories/    # Category endpoints
│   │   ├── products/          # Product pages
│   │   ├── layout.tsx         # Root layout with Navbar/Footer
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable React components
│   │   ├── home/              # Home page components
│   │   │   ├── Hero.tsx
│   │   │   ├── Categories.tsx
│   │   │   └── FeaturedProducts.tsx
│   │   ├── Navbar.tsx         # Navigation component
│   │   └── Footer.tsx         # Footer component
│   ├── lib/
│   │   └── auth.ts            # Authentication utilities
│   └── styles/
│       └── globals.css        # Global styles & accessibility
├── prisma/
│   └── schema.prisma          # Database schema
├── scripts/
│   ├── migrate.js             # Database migration script
│   └── seed.ts                # Database seed script
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── .prettierrc                # Prettier formatting config
├── .eslintrc.json             # ESLint configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
├── README.md                  # Project overview
├── API_DOCUMENTATION.md       # API endpoint documentation
└── IMPLEMENTATION_STATUS.md   # Development progress tracker
```

## Development Workflow

### 1. Running the Project Locally

```bash
# Install dependencies (first time only)
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your PostgreSQL URL
# DATABASE_URL="postgresql://user:password@localhost:5432/handcrafted_haven"

# Run migrations
npm run db:migrate

# Seed database with test data
npm run db:seed

# Start development server
npm run dev

# Open http://localhost:3000
```

### 2. Working with Database

```bash
# View database in GUI
npm run db:studio

# Reset database (clears all data and re-runs migrations)
npm run db:reset

# Create new migration after schema changes
npx prisma migrate dev --name add_new_field
```

### 3. Code Quality

```bash
# Check TypeScript types
npm run type-check

# Format code with Prettier
npm run format

# Check formatting without changes
npm run format:check

# Run ESLint
npm run lint
```

## API Development

### Creating a New API Endpoint

1. **Create route file** in `src/app/api/[resource]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const param = request.nextUrl.searchParams.get('param');
    
    // Your logic here
    
    return NextResponse.json({ data: 'response' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error message' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.field) {
      return NextResponse.json(
        { error: 'Field required' },
        { status: 400 }
      );
    }
    
    // Check authentication if needed
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Your logic here
    
    return NextResponse.json({ data: 'response' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error message' },
      { status: 500 }
    );
  }
}
```

2. **Test endpoint** using curl or Postman

```bash
# Example: GET request
curl http://localhost:3000/api/products?category=pottery

# Example: POST request with auth
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Product Name","price":100}'
```

### Authentication Flow

```typescript
import { verifyToken, createToken } from '@/lib/auth';

// On login/register
const token = createToken(userId, email, role);

// On protected routes
const token = request.headers.get('authorization')?.split(' ')[1];
const decoded = verifyToken(token);

if (!decoded) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// Use decoded.userId, decoded.email, decoded.role
```

## Frontend Development

### Creating a New Page

1. **Create page file** in `src/app/[page]/page.tsx`

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title - Handcrafted Haven',
  description: 'Page description for SEO',
  keywords: ['keyword1', 'keyword2'],
};

export default function PageName() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary">Page Title</h1>
        {/* Page content */}
      </div>
    </div>
  );
}
```

### Creating a New Component

```typescript
'use client'; // Add if using useState, useEffect, etc.

import { useState } from 'react';

interface ComponentProps {
  title: string;
  onClick?: () => void;
}

export default function ComponentName({ title, onClick }: ComponentProps) {
  const [state, setState] = useState(false);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="font-bold text-primary">{title}</h2>
      <button
        onClick={onClick}
        aria-label="Button description"
        className="mt-4 bg-primary hover:bg-accent text-white px-4 py-2 rounded transition"
      >
        Click Me
      </button>
    </div>
  );
}
```

### Responsive Design Classes

```html
<!-- Mobile-first approach -->
<div className="
  w-full                  <!-- Mobile: full width -->
  md:w-1/2                <!-- Tablet: 50% width -->
  lg:w-1/3                <!-- Desktop: 33% width -->
  p-4                     <!-- Mobile: 1rem padding -->
  md:p-6                  <!-- Tablet: 1.5rem padding -->
  lg:p-8                  <!-- Desktop: 2rem padding -->
">
  Responsive content
</div>

<!-- Grid layout -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</div>
```

## Accessibility Best Practices

### Semantic HTML
```typescript
// ❌ Avoid
<div onClick={handleClick}>Click me</div>

// ✅ Use semantic HTML
<button onClick={handleClick}>Click me</button>
<nav>Navigation content</nav>
<main>Main content</main>
<article>Article content</article>
```

### ARIA Labels
```typescript
// For icon buttons
<button aria-label="Close menu">✕</button>

// For form fields
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// For screen readers
<span className="sr-only">Loading...</span>
```

### Keyboard Navigation
```typescript
// Always include tabindex for custom interactive elements
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
  Interactive element
</div>
```

### Color Contrast
- Text on background: 4.5:1 minimum contrast ratio
- Use accessibility checker tools to verify

## Testing

### Manual Testing Checklist
- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test with reduced motion preferences
- [ ] Test with high contrast mode

### API Testing
```bash
# Use Postman or curl for manual testing
# Or use this simple script for automated testing

# Test user registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123","name":"Test User"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'
```

## Git Workflow

### Branch Naming Convention
```
feature/feature-name      # New features
bugfix/bug-name          # Bug fixes
hotfix/hotfix-name       # Production hotfixes
refactor/refactor-name   # Code refactoring
```

### Commit Message Format
```
feat: Add product filtering functionality
fix: Resolve cart item deletion issue
docs: Update API documentation
style: Format code with prettier
refactor: Reorganize authentication logic
test: Add unit tests for auth utilities
```

### Pull Request Checklist
- [ ] Code follows project style guide
- [ ] No console errors or warnings
- [ ] All new features have accessibility features
- [ ] API endpoints have proper error handling
- [ ] Database migrations tested
- [ ] Documentation updated

## Environment Variables

Required variables in `.env.local`:

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/handcrafted_haven"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"

# Node
NODE_ENV="development"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## Performance Tips

1. **Images**: Use Next.js `Image` component for optimization
2. **Code Splitting**: Use dynamic imports for large components
3. **Lazy Loading**: Use Suspense for data-heavy components
4. **Caching**: Set appropriate Cache-Control headers
5. **Database**: Index frequently queried columns
6. **Queries**: Use Prisma's `select` to fetch only needed fields

## Debugging

### Server-Side Debugging
```typescript
console.log('Debug:', variable); // Check terminal output
```

### Client-Side Debugging
```typescript
console.log('Debug:', variable); // Check browser DevTools
```

### Database Debugging
```bash
npm run db:studio # GUI for database inspection
```

## Troubleshooting

### Common Issues

**"DATABASE_URL not found"**
- Check `.env.local` exists and contains DATABASE_URL
- Restart dev server after updating .env

**"Prisma migration errors"**
```bash
# Reset database and re-run migrations
npm run db:reset
```

**"Authentication token invalid"**
- Check JWT_SECRET matches between registration and login
- Verify token hasn't expired (7-day expiry)

**"Build errors"**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Run again
npm run build
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance Guide](https://web.dev/performance/)

## Getting Help

1. Check existing documentation files
2. Review similar API endpoints or components
3. Search GitHub issues
4. Ask in team communication channel
5. Check DEVELOPMENT_GUIDE.md for examples
