# Handcrafted Haven

A web platform for artisans and crafters to showcase and sell their unique handcrafted items.

## Overview

Handcrafted Haven is an innovative web application that provides a marketplace for talented creators to connect with customers who appreciate handmade products. The platform emphasizes community, supporting local artisans, and promoting sustainable consumption.

## Key Features

- **Seller Profiles**: Authenticated sellers showcase their craftsmanship and display curated collections
- **Product Listings**: Artisans list items with descriptions, pricing, and images
- **Browsing & Filtering**: Users can browse the catalog and filter by category, price, and criteria
- **Reviews & Ratings**: Community-driven ratings and written reviews for products
- **Responsive Design**: Optimized experience across all devices
- **Accessibility**: WCAG 2.1 Level AA compliance

## Tech Stack

### Frontend
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Responsive Design

### Backend
- Node.js
- Prisma ORM
- JWT Authentication
- REST API

### Database
- PostgreSQL (recommended)

### DevOps & Deployment
- Git & GitHub
- GitHub Boards for project management
- Vercel for deployment

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL 12+

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd handcrafted-haven
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Then update `.env.local` with your database URL and JWT secret:
```
DATABASE_URL="postgresql://user:password@localhost:5432/handcrafted_haven"
JWT_SECRET="your-super-secret-key"
```

4. **Setup database**
```bash
# Create and run migrations
npm run db:migrate

# Seed database with test data
npm run db:seed
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Test Credentials

After seeding, use these credentials:

**Buyer Account:**
- Email: `buyer@example.com`
- Password: `password123`

**Seller Accounts:**
- Email: `potter@example.com` / Password: `password123`
- Email: `jeweler@example.com` / Password: `password123`
- Email: `weaver@example.com` / Password: `password123`

## Project Structure

```
handcrafted-haven/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   ├── lib/             # Utility functions
│   ├── pages/           # API routes
│   └── styles/          # Global styles
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static assets
├── scripts/             # Database scripts
├── .env.example         # Environment variables template
├── package.json         # Dependencies
├── next.config.js       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Development Standards

- **Web Standards**: Valid HTML, CSS, JavaScript per WAI guidelines
- **Performance**: Optimized loading times and core web vitals (Lighthouse 90+)
- **Accessibility**: WCAG 2.1 Level AA compliant with:
  - Semantic HTML throughout
  - ARIA labels and roles
  - Keyboard navigation support
  - Color contrast ratios 4.5:1
  - Screen reader compatibility
  - Focus indicators on all interactive elements
- **SEO**: Proper meta tags, structured data, sitemap, robots.txt
- **Responsive**: Mobile-first design approach (tested on 375px, 768px, 1024px, 1440px)
- **Code Quality**: ESLint, TypeScript strict mode, code splitting
- **Testing**: Unit tests and accessibility audits

## API Documentation

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for detailed API endpoints and usage examples.

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:
- **User**: Authentication, roles (BUYER, SELLER, ADMIN)
- **Product**: Product listings with images, pricing, stock
- **Review**: Ratings and reviews on products
- **Cart**: Shopping cart management
- **Order**: Order history and tracking
- **SellerProfile**: Enhanced seller information and ratings
- **Category**: Product categorization

Run `npx prisma studio` to explore the database with a GUI.

## Contributing

1. Create a feature branch (`git checkout -b feature/feature-name`)
2. Commit changes (`git commit -am 'Add feature'`)
3. Push to branch (`git push origin feature/feature-name`)
4. Create Pull Request

## Team

- Project Management: GitHub Boards
- Communication: Team collaboration tools
- Code Review: Pull requests required before merge

## License

This project is created as part of a group project assignment.
