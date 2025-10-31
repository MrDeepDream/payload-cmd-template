# Payload CMS News Site Boilerplate

A production-ready, full-stack boilerplate for building news websites with Payload CMS (backend) and Next.js (frontend). This setup includes all the essential collections and features needed for a modern news platform.

## Architecture

This project consists of two parts:
- **Backend** (`/`): Payload CMS for content management and API
- **Frontend** (`/frontend`): Next.js website for public-facing content

## Features

### Backend (Payload CMS)
- **Articles Management**: Full-featured article system with drafts, versioning, and publishing workflow
- **Author Profiles**: Dedicated author management with bios, avatars, and social media links
- **Categories & Tags**: Hierarchical category structure and tag system for content organization
- **Media Library**: Advanced media management with automatic image resizing
- **SEO Optimization**: Built-in SEO fields for meta titles, descriptions, and keywords
- **User Roles**: Multi-role user system (Admin, Editor, Author)
- **Rich Text Editor**: Full-featured rich text editing for article content
- **Featured & Breaking News**: Special flags for highlighting important content
- **Related Articles**: Automatic related content suggestions
- **Reading Time**: Estimated reading time for articles
- **REST & GraphQL APIs**: Auto-generated APIs for all collections

### Frontend (Next.js)
- **Homepage**: Featured articles and latest news grid
- **Article Pages**: Full article view with rich text rendering
- **Category Pages**: Browse articles by category
- **Author Pages**: Author profiles with their articles
- **Tag Pages**: Browse articles by tag
- **Breaking News Bar**: Highlighted breaking news ticker
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Image Optimization**: Next.js Image component with automatic optimization
- **ISR**: Incremental Static Regeneration for fast, up-to-date pages

## Collections

### Articles
The main content collection with fields for:
- Title, subtitle, and slug
- Status management (draft/published/archived)
- Publication date
- Author and category relationships
- Tags for content organization
- Featured image
- Rich text content
- SEO metadata
- Featured and breaking news flags
- Related articles

### Authors
Manage article authors with:
- Name and slug
- Biography
- Avatar image
- Email address
- Social media links (Twitter, Facebook, LinkedIn, Instagram)

### Categories
Hierarchical category system with:
- Name and slug
- Description
- Parent category support for nested structures

### Tags
Simple tagging system for content classification

### Media
Advanced media library featuring:
- Multiple image sizes (thumbnail, card, tablet, desktop)
- Alt text for accessibility
- Image captions
- Photo credits

### Users
Authentication and authorization with:
- Email and password authentication
- Role-based access (Admin, Editor, Author)
- Full access control

## Getting Started

You can run this project in two ways:
1. **Docker (Recommended)** - Easiest way to get started
2. **Manual Setup** - For local development without Docker

### Option 1: Docker Setup (Recommended) 🐳

**Prerequisites:**
- Docker and Docker Compose installed

**Quick Start:**

1. Clone this repository:
```bash
git clone <repository-url>
cd payload-news-boilerplate
```

2. Create environment file:
```bash
cp .env.docker .env
```

3. Generate a secure secret:
```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

4. Edit `.env` and add your generated secret to `PAYLOAD_SECRET`

5. **Production mode** - Run the entire stack:
```bash
docker-compose up -d
```

Or **Development mode** - Run with hot reload:
```bash
docker-compose -f docker-compose.dev.yml up
```

**Access the application:**
- Frontend: http://localhost:3001
- Backend Admin: http://localhost:3000/admin
- Backend API: http://localhost:3000/api

**Useful Docker Commands:**
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend

# Rebuild images
docker-compose build

# Restart a service
docker-compose restart backend
```

### Option 2: Manual Installation

**Prerequisites:**
- Node.js 18+
- MongoDB 4.4+ (local or cloud instance)
- npm or yarn

**Installation:**

1. Clone this repository:
```bash
git clone <repository-url>
cd payload-news-boilerplate
```

2. **Backend Setup:**

Install backend dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/payload-news
PAYLOAD_SECRET=your-secret-key-here
PORT=3000
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

**Important**: Generate a secure random string for `PAYLOAD_SECRET`:
```bash
openssl rand -base64 32
```

Start MongoDB (if running locally):
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux with systemd
sudo systemctl start mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

3. **Frontend Setup:**

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Update `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Running the Application

**Option 1: Run Both (Recommended)**

In one terminal, start the backend:
```bash
npm run dev
```

In another terminal, start the frontend:
```bash
cd frontend
npm run dev
```

**Option 2: Run Backend Only**

If you only want the CMS and API:
```bash
npm run dev
```

**URLs:**
- Frontend: `http://localhost:3001`
- Backend Admin: `http://localhost:3000/admin`
- Backend API: `http://localhost:3000/api`

### First Time Setup

**Option A: Using Sample Data (Recommended for Testing)**

Quickly populate your database with sample content:

```bash
# Make sure MongoDB is running, then:
npm run seed
```

This will create:
- 1 admin user (email: `admin@example.com`, password: `password123`)
- 5 sample authors
- 8 categories
- 15 tags
- 8 sample articles with rich content

After seeding, you can:
- Login to admin: http://localhost:3000/admin
- View frontend: http://localhost:3001

**To reset and re-seed:**
```bash
npm run seed:reset  # Clears all data
npm run seed        # Adds sample data
```

**Option B: Manual Setup**

1. Navigate to `http://localhost:3000/admin`
2. Create your first admin user account
3. Create some content (authors, categories, articles)
4. Visit `http://localhost:3001` to see your frontend!

## Database Seeding

The project includes a seeding system with realistic sample data to help you get started quickly.

### Available Commands

```bash
# Populate database with sample data
npm run seed

# Reset database (removes all data)
npm run seed:reset
```

### Sample Data Includes

- **Admin User**: Pre-configured admin account for immediate access
- **Authors**: 5 diverse journalist profiles with bios and social links
- **Categories**: 8 news categories (Politics, Technology, Business, Science, Health, Environment, World, Sports)
- **Tags**: 15 commonly used tags
- **Articles**: 8 full-length articles with:
  - Rich text content
  - Proper formatting (headings, lists, quotes)
  - Realistic metadata
  - Featured and breaking news flags
  - Author and category relationships

### Customizing Seed Data

Edit the files in `src/seed/data/` to customize sample content:
- `authors.ts` - Author profiles
- `categories.ts` - News categories
- `tags.ts` - Article tags
- `articles.ts` - Sample articles

### Docker Seeding

When using Docker, you can seed the database after starting containers:

```bash
# Start containers
docker-compose up -d

# Run seed command in backend container
docker-compose exec backend npm run seed

# Or reset and seed
docker-compose exec backend npm run seed:reset
docker-compose exec backend npm run seed
```

## Project Structure

```
├── src/                      # Backend source code
│   ├── collections/          # Payload collections
│   │   ├── Articles.ts       # Articles collection
│   │   ├── Authors.ts        # Authors collection
│   │   ├── Categories.ts     # Categories collection
│   │   ├── Tags.ts           # Tags collection
│   │   ├── Media.ts          # Media collection
│   │   └── Users.ts          # Users collection
│   ├── seed/                 # Database seeding
│   │   ├── data/             # Sample data
│   │   │   ├── authors.ts
│   │   │   ├── categories.ts
│   │   │   ├── tags.ts
│   │   │   └── articles.ts
│   │   └── index.ts          # Seed script
│   ├── payload.config.ts     # Main Payload configuration
│   └── server.ts             # Express server entry point
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── article/[slug]/  # Article detail pages
│   │   │   ├── category/[slug]/ # Category pages
│   │   │   ├── author/[slug]/   # Author pages
│   │   │   ├── tag/[slug]/      # Tag pages
│   │   │   ├── layout.tsx    # Root layout
│   │   │   ├── page.tsx      # Homepage
│   │   │   └── globals.css   # Global styles
│   │   ├── components/       # React components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ArticleCard.tsx
│   │   │   └── BreakingNews.tsx
│   │   ├── lib/              # Utilities
│   │   │   ├── api.ts        # API client
│   │   │   ├── utils.ts      # Helper functions
│   │   │   └── richText.tsx  # Rich text renderer
│   │   └── types/            # TypeScript types
│   │       └── index.ts
│   ├── package.json
│   └── next.config.js
├── media/                    # Uploaded files (auto-generated)
├── dist/                     # Compiled backend (auto-generated)
├── .env                      # Backend environment variables
├── .env.example              # Backend environment template
├── package.json              # Backend dependencies
├── tsconfig.json             # Backend TypeScript config
└── nodemon.json              # Nodemon configuration
```

## API Endpoints

Payload automatically generates REST and GraphQL APIs for all collections:

### REST API
- `GET /api/articles` - List all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article (authenticated)
- `PATCH /api/articles/:id` - Update article (authenticated)
- `DELETE /api/articles/:id` - Delete article (authenticated)

Similar endpoints exist for all other collections.

### GraphQL
GraphQL playground available at: `http://localhost:3000/api/graphql`

## Customization

### Adding New Fields

Edit the collection files in `src/collections/` to add new fields. For example, to add a "views" count to articles:

```typescript
// src/collections/Articles.ts
{
  name: 'views',
  type: 'number',
  defaultValue: 0,
}
```

### Access Control

Modify the `access` property in any collection to customize permissions:

```typescript
access: {
  read: () => true,  // Public read
  create: ({ req: { user } }) => !!user,  // Authenticated users only
  update: ({ req: { user } }) => !!user,
  delete: ({ req: { user } }) => user?.role === 'admin',  // Admins only
}
```

### Adding Hooks

Payload supports lifecycle hooks. Example for auto-generating slugs:

```typescript
hooks: {
  beforeChange: [
    ({ data }) => {
      if (data.title && !data.slug) {
        data.slug = data.title.toLowerCase().replace(/\s+/g, '-');
      }
      return data;
    },
  ],
}
```

## Deployment

### Environment Variables for Production

Make sure to set these in your production environment:
- `MONGODB_URI` - Your MongoDB connection string
- `PAYLOAD_SECRET` - A secure random string
- `PAYLOAD_PUBLIC_SERVER_URL` - Your production domain
- `PORT` - Server port (if different from 3000)

### Deploy to Vercel/Netlify

This boilerplate can be deployed to serverless platforms with minor adjustments for file uploads and database connections.

### Deploy to Traditional Hosting

1. Build the project: `npm run build`
2. Upload the entire project to your server
3. Install dependencies: `npm install --production`
4. Set environment variables
5. Start the server: `npm start`
6. Use PM2 or similar for process management

### Deploy with Docker (Recommended for Production)

Docker provides the easiest and most consistent deployment:

1. **On your server**, clone the repository:
```bash
git clone <repository-url>
cd payload-news-boilerplate
```

2. Create `.env` file:
```bash
cp .env.docker .env
# Edit .env with your production values
```

3. Update `PAYLOAD_PUBLIC_SERVER_URL` in `.env` to your domain:
```env
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com
```

4. Build and run:
```bash
docker-compose up -d
```

5. Set up nginx or traefik as reverse proxy for SSL

**Docker Deployment Benefits:**
- Consistent environment across dev/staging/prod
- Easy scaling with docker-compose scale
- MongoDB included and configured
- Automatic restarts on failure
- Simple rollbacks with image tags

**Docker Production Tips:**
```bash
# Update to latest version
git pull
docker-compose build
docker-compose up -d

# Backup MongoDB data
docker-compose exec mongodb mongodump --out /backup

# View production logs
docker-compose logs -f --tail=100
```

## Frontend Pages

The Next.js frontend includes the following pages:

- **Homepage** (`/`): Featured article + latest articles grid
- **Article Detail** (`/article/[slug]`): Full article with rich text content, author info, tags, and related articles
- **Category Page** (`/category/[slug]`): All articles in a specific category
- **Author Page** (`/author/[slug]`): Author profile with their articles
- **Tag Page** (`/tag/[slug]`): All articles with a specific tag

All pages feature:
- Server-side rendering (SSR) for SEO
- Incremental Static Regeneration (ISR) with 60-second revalidation
- Responsive design with Tailwind CSS
- Optimized images with Next.js Image component

## Development Tips

### Backend
- Use `npm run generate:types` to regenerate TypeScript types after modifying collections
- The admin UI automatically updates when you modify collections
- Use Payload's hooks for custom business logic
- Leverage Payload's built-in authentication for secure API access

### Frontend
- TypeScript types in `frontend/src/types/index.ts` match the Payload collections
- API client in `frontend/src/lib/api.ts` handles all backend communication
- Add new pages by creating files in `frontend/src/app/`
- Customize styling in `frontend/tailwind.config.js` and `frontend/src/app/globals.css`

### Docker
- Use `docker-compose.dev.yml` for development with hot reload
- Use `docker-compose.yml` for production builds
- Data persists in Docker volumes even after `docker-compose down`
- Access container shells: `docker-compose exec backend sh`

## Troubleshooting

### Docker Issues

**Port already in use:**
```bash
# Check what's using the port
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Change ports in docker-compose.yml if needed
```

**Frontend can't connect to backend:**
- Ensure backend is fully started (check logs: `docker-compose logs backend`)
- Try accessing http://localhost:3000/api/articles directly
- Check `NEXT_PUBLIC_API_URL` in frontend environment

**MongoDB connection issues:**
```bash
# Check MongoDB is running
docker-compose ps

# Check MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

**Build failures:**
```bash
# Clear Docker cache and rebuild
docker-compose down
docker system prune -a
docker-compose build --no-cache
docker-compose up
```

### Manual Setup Issues

**MongoDB connection refused:**
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check connection string in `.env`
- Try: `mongodb://127.0.0.1:27017/payload-news` instead of `localhost`

**TypeScript errors:**
```bash
# Regenerate types
npm run generate:types

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Frontend shows "No articles found":**
- Create content in the admin panel first
- Check API is accessible: http://localhost:3000/api/articles
- Verify `NEXT_PUBLIC_API_URL` in `frontend/.env.local`

## Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Payload CMS GitHub](https://github.com/payloadcms/payload)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

## License

MIT
