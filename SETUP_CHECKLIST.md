# Handcrafted Haven - Setup Checklist

Complete this checklist to set up the project on your local machine.

## Prerequisites ✓
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] PostgreSQL 12+ installed and running
- [ ] Git configured with SSH or HTTPS

## Initial Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd handcrafted-haven
```
- [ ] Repository cloned
- [ ] All files present

### 2. Install Dependencies
```bash
npm install
```
- [ ] Dependencies installed without errors
- [ ] node_modules created
- [ ] package-lock.json present

### 3. Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your PostgreSQL credentials:
```
DATABASE_URL="postgresql://username:password@localhost:5432/handcrafted_haven"
JWT_SECRET="your-super-secret-key-change-in-production"
```

**Create PostgreSQL Database**:
```bash
# Using psql
psql -U postgres
CREATE DATABASE handcrafted_haven;
\q

# Or using a GUI like pgAdmin
```

- [ ] `.env.local` created
- [ ] `DATABASE_URL` configured
- [ ] `JWT_SECRET` set
- [ ] PostgreSQL database created
- [ ] Database connection verified

### 4. Database Setup
```bash
# Run migrations
npm run db:migrate

# Seed with test data
npm run db:seed
```

- [ ] Migrations completed successfully
- [ ] Database schema created
- [ ] Test data seeded
- [ ] No migration errors

### 5. Verify Installation
```bash
# Check TypeScript compilation
npm run type-check

# Run ESLint
npm run lint
```

- [ ] No TypeScript errors
- [ ] No ESLint warnings (except approved)
- [ ] Project builds without errors

### 6. Start Development Server
```bash
npm run dev
```

- [ ] Server starts on http://localhost:3000
- [ ] No console errors
- [ ] Hot reload working

### 7. Test Access

**Home Page**:
- [ ] http://localhost:3000 loads
- [ ] Navbar visible
- [ ] Footer visible
- [ ] Hero section displays
- [ ] Navigation links work

**Products Page**:
- [ ] http://localhost:3000/products loads
- [ ] Product grid displays (placeholder)
- [ ] Filters visible
- [ ] Sorting works
- [ ] Pagination controls present

**API Endpoints** (test with curl or Postman):

```bash
# Test Categories
curl http://localhost:3000/api/categories

# Test User Registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"testuser@example.com",
    "password":"testpass123",
    "name":"Test User",
    "role":"BUYER"
  }'

# Test Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"buyer@example.com",
    "password":"password123"
  }'

# Test Get Products
curl http://localhost:3000/api/products
```

- [ ] Categories endpoint responds
- [ ] Register endpoint works
- [ ] Login endpoint returns token
- [ ] Products endpoint returns data

### 8. Test Provided Credentials

Use the seeded test accounts:

**Buyer Account**:
- [ ] Email: `buyer@example.com`
- [ ] Password: `password123`
- [ ] Can login successfully

**Seller Accounts** (test one):
- [ ] Email: `potter@example.com`
- [ ] Password: `password123`
- [ ] Can login successfully

### 9. Database Inspection

```bash
# View database in GUI
npm run db:studio
```

- [ ] Prisma Studio opens
- [ ] Can see Users table with seeded data
- [ ] Can see Products table with sample data
- [ ] Can see Categories
- [ ] Can see Reviews

### 10. Code Quality Checks

```bash
# Format code
npm run format

# Check formatting
npm run format:check

# TypeScript check
npm run type-check

# ESLint
npm run lint
```

- [ ] Code formatted without errors
- [ ] TypeScript compilation successful
- [ ] No critical ESLint errors

## Development Setup

### Optional: IDE Extensions

**VS Code Recommended Extensions**:
- [ ] ESLint
- [ ] Prettier - Code formatter
- [ ] Tailwind CSS IntelliSense
- [ ] Prisma
- [ ] TypeScript Vue Plugin (Volar)

### Optional: Additional Tools

```bash
# For testing (future)
npm install --save-dev vitest @testing-library/react

# For API testing
# Install Postman or Insomnia
```

- [ ] Preferred IDE set up
- [ ] Extensions installed
- [ ] Testing tools ready (optional)

## Verification Checklist

### Frontend Tests

- [ ] Homepage renders without errors
- [ ] Navigation responsive on mobile (375px)
- [ ] Navigation responsive on tablet (768px)
- [ ] Navigation responsive on desktop (1024px)
- [ ] Hero section displays correctly
- [ ] Footer displays correctly
- [ ] Links navigate correctly
- [ ] Buttons are clickable

### Backend Tests

- [ ] POST `/auth/register` creates user
- [ ] POST `/auth/login` returns JWT token
- [ ] GET `/api/categories` returns categories
- [ ] GET `/api/products` returns products
- [ ] POST `/api/products` creates product (with auth)
- [ ] PUT `/api/products/{id}` updates product (with auth)
- [ ] DELETE `/api/products/{id}` deletes product (with auth)
- [ ] POST `/api/reviews` creates review (with auth)
- [ ] GET `/api/reviews?productId={id}` returns reviews
- [ ] GET `/api/cart` returns cart (with auth)
- [ ] POST `/api/cart` adds to cart (with auth)
- [ ] GET `/api/seller-profile?userId={id}` returns profile

### Accessibility Tests

- [ ] Tab navigation works (press Tab key)
- [ ] Focus indicators visible (outline on focused element)
- [ ] Skip to main link works (press Tab on page load)
- [ ] Form labels associated with inputs (inspect elements)
- [ ] Semantic HTML used (inspect page source)
- [ ] Color contrast sufficient (use accessibility checker)

### Mobile & Responsive Tests

- [ ] Mobile menu opens/closes
- [ ] Mobile layout stacks correctly
- [ ] Touch targets are minimum 44x44px
- [ ] No horizontal scrolling on mobile
- [ ] Images scale appropriately
- [ ] Text is readable at all sizes

## Git Workflow Setup

### Configure Git

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

- [ ] Git name configured
- [ ] Git email configured

### Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

- [ ] Feature branch created
- [ ] On correct branch (check: `git branch`)

## Documentation Review

- [ ] Read `README.md` - Project overview
- [ ] Read `API_DOCUMENTATION.md` - API endpoints
- [ ] Read `DEVELOPMENT_GUIDE.md` - Development workflow
- [ ] Read `IMPLEMENTATION_STATUS.md` - Feature progress
- [ ] Read `UPDATE_SUMMARY.md` - What's new

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql -U username -d handcrafted_haven -c "SELECT 1"

# Check DATABASE_URL in .env.local
cat .env.local | grep DATABASE_URL
```

### Port 3000 Already In Use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>

# Or use different port:
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Prisma Migration Issues
```bash
# Reset database (careful - clears all data)
npm run db:reset

# Or view migration status
npx prisma migrate status
```

## Final Verification

- [ ] Server running without errors
- [ ] Homepage accessible at http://localhost:3000
- [ ] All API endpoints responding
- [ ] Test accounts working
- [ ] Database accessible
- [ ] No console errors
- [ ] Code formatted and linted
- [ ] Documentation reviewed
- [ ] Team members added to repository

## Team Checklist

**Each team member should complete:**
- [ ] Local setup complete
- [ ] Can access GitHub repository
- [ ] Can start development server
- [ ] Can run npm scripts
- [ ] Understands project structure
- [ ] Reviewed development guidelines
- [ ] Can make and push commits
- [ ] Familiar with API documentation

## Ready to Develop!

Once all items are checked:
1. Pull latest changes: `git pull origin main`
2. Create feature branch: `git checkout -b feature/your-task`
3. Make changes
4. Test thoroughly
5. Commit: `git commit -am "feat: description"`
6. Push: `git push origin feature/your-task`
7. Create Pull Request on GitHub

---

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed test data
npm run db:studio    # Open Prisma Studio GUI
npm run db:reset     # Reset database (clears all data!)

# Code Quality
npm run type-check   # Check TypeScript
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Useful Prisma Commands
npx prisma generate              # Generate Prisma client
npx prisma migrate dev --name    # Create new migration
npx prisma db push               # Push schema changes
```

---

**Questions?** See DEVELOPMENT_GUIDE.md or check the project documentation files.

**Getting Help?** Ask in team communication channel or check existing issues.

---

**Date Completed**: _______________  
**Team Member**: _____________________  
**Approved By**: _____________________
