import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Articles from './collections/Articles';
import Authors from './collections/Authors';
import Categories from './collections/Categories';
import Tags from './collections/Tags';
import Media from './collections/Media';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- News CMS',
      favicon: '/assets/favicon.ico',
      ogImage: '/assets/og-image.jpg',
    },
  },
  collections: [
    Users,
    Articles,
    Authors,
    Categories,
    Tags,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: {
    type: 'mongodb',
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/payload-news',
  },
  rateLimit: {
    max: 2000,
  },
});
