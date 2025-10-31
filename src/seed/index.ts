import payload from 'payload';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { authors } from './data/authors';
import { categories } from './data/categories';
import { tags } from './data/tags';
import { articles } from './data/articles';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/payload-news';
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE';

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Initialize Payload
    await payload.init({
      secret: PAYLOAD_SECRET,
      local: true,
      onInit: async () => {
        payload.logger.info('Payload initialized for seeding');
      },
    });

    // Check if data already exists
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    });

    if (existingUsers.docs.length > 0) {
      console.log('⚠️  Database already contains data.');
      console.log('Do you want to continue? This will add duplicate data.');
      console.log('To reset the database, run: npm run seed:reset\n');

      // For automatic seeding, we'll skip if data exists
      console.log('Skipping seed to prevent duplicates.');
      process.exit(0);
    }

    // 1. Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      },
    });
    console.log('✅ Admin user created (email: admin@example.com, password: password123)\n');

    // 2. Create authors
    console.log('✍️  Creating authors...');
    const createdAuthors: any = {};
    for (const author of authors) {
      const created = await payload.create({
        collection: 'authors',
        data: author,
      });
      createdAuthors[author.slug] = created;
      console.log(`   - ${author.name}`);
    }
    console.log(`✅ Created ${authors.length} authors\n`);

    // 3. Create categories
    console.log('📁 Creating categories...');
    const createdCategories: any = {};
    for (const category of categories) {
      const created = await payload.create({
        collection: 'categories',
        data: category,
      });
      createdCategories[category.slug] = created;
      console.log(`   - ${category.name}`);
    }
    console.log(`✅ Created ${categories.length} categories\n`);

    // 4. Create tags
    console.log('🏷️  Creating tags...');
    const createdTags: any = {};
    for (const tag of tags) {
      const created = await payload.create({
        collection: 'tags',
        data: tag,
      });
      createdTags[tag.slug] = created;
      console.log(`   - ${tag.name}`);
    }
    console.log(`✅ Created ${tags.length} tags\n`);

    // 5. Create articles
    console.log('📰 Creating articles...');
    for (const article of articles) {
      const articleData = {
        title: article.title,
        slug: article.slug,
        subtitle: article.subtitle,
        status: article.status,
        publishedDate: article.publishedDate.toISOString(),
        author: createdAuthors[article.authorSlug].id,
        category: createdCategories[article.categorySlug].id,
        tags: article.tagSlugs.map((slug) => createdTags[slug].id),
        excerpt: article.excerpt,
        content: article.content,
        featured: article.featured,
        breaking: article.breaking,
        readingTime: article.readingTime,
      };

      await payload.create({
        collection: 'articles',
        data: articleData,
      });
      console.log(`   - ${article.title}`);
    }
    console.log(`✅ Created ${articles.length} articles\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - 1 admin user`);
    console.log(`   - ${authors.length} authors`);
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${tags.length} tags`);
    console.log(`   - ${articles.length} articles`);
    console.log('\n🔐 Admin credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: password123');
    console.log('\n🌐 You can now access:');
    console.log('   Admin: http://localhost:3000/admin');
    console.log('   Frontend: http://localhost:3001\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

async function reset() {
  console.log('🗑️  Resetting database...\n');

  try {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();

    // Drop all collections
    const collections = await db.listCollections().toArray();

    for (const collection of collections) {
      await db.dropCollection(collection.name);
      console.log(`   - Dropped ${collection.name}`);
    }

    await client.close();

    console.log('\n✅ Database reset complete!');
    console.log('Run "npm run seed" to populate with sample data.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

// Check command line argument
const command = process.argv[2];

if (command === 'reset') {
  reset();
} else {
  seed();
}
