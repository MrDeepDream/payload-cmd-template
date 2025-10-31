# Payload CMS News Site Boilerplate

A production-ready boilerplate for building news websites with Payload CMS. This setup includes all the essential collections and features needed for a modern news platform.

## Features

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

### Prerequisites

- Node.js 18+
- MongoDB 4.4+ (local or cloud instance)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd payload-news-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
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

5. Start MongoDB (if running locally):
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux with systemd
sudo systemctl start mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Running the Application

**Development mode** (with hot reload):
```bash
npm run dev
```

**Build for production**:
```bash
npm run build
npm start
```

The admin panel will be available at: `http://localhost:3000/admin`

### First Time Setup

1. Navigate to `http://localhost:3000/admin`
2. Create your first admin user account
3. Start creating content!

## Project Structure

```
├── src/
│   ├── collections/          # Payload collections
│   │   ├── Articles.ts       # Articles collection
│   │   ├── Authors.ts        # Authors collection
│   │   ├── Categories.ts     # Categories collection
│   │   ├── Tags.ts           # Tags collection
│   │   ├── Media.ts          # Media collection
│   │   └── Users.ts          # Users collection
│   ├── payload.config.ts     # Main Payload configuration
│   └── server.ts             # Express server entry point
├── media/                    # Uploaded files (auto-generated)
├── dist/                     # Compiled TypeScript (auto-generated)
├── .env                      # Environment variables
├── .env.example              # Environment template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
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

## Development Tips

- Use `npm run generate:types` to regenerate TypeScript types after modifying collections
- The admin UI automatically updates when you modify collections
- Use Payload's hooks for custom business logic
- Leverage Payload's built-in authentication for secure API access

## Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Payload CMS GitHub](https://github.com/payloadcms/payload)
- [MongoDB Documentation](https://docs.mongodb.com/)

## License

MIT
