import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAuthorBySlug, getArticlesByAuthor } from '@/lib/api';
import { Media } from '@/types';
import { getImageUrl } from '@/lib/utils';
import { ArticleCard } from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const revalidate = 60;

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: `${author.name} - Author`,
    description: author.bio || `Articles by ${author.name}`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const [author, articlesData] = await Promise.all([
    getAuthorBySlug(params.slug),
    getArticlesByAuthor(params.slug, 12),
  ]);

  if (!author) {
    notFound();
  }

  const avatar = author.avatar as Media | undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Author Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {avatar && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={getImageUrl(avatar)}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-2">{author.name}</h1>
            {author.bio && <p className="text-gray-600 text-lg mb-4">{author.bio}</p>}
            {author.email && (
              <p className="text-gray-500 mb-4">
                <a href={`mailto:${author.email}`} className="hover:text-primary-600">
                  {author.email}
                </a>
              </p>
            )}
            {author.socialMedia && (
              <div className="flex gap-4">
                {author.socialMedia.twitter && (
                  <a
                    href={author.socialMedia.twitter}
                    className="text-primary-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                )}
                {author.socialMedia.facebook && (
                  <a
                    href={author.socialMedia.facebook}
                    className="text-primary-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                )}
                {author.socialMedia.linkedin && (
                  <a
                    href={author.socialMedia.linkedin}
                    className="text-primary-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
                {author.socialMedia.instagram && (
                  <a
                    href={author.socialMedia.instagram}
                    className="text-primary-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Articles by Author */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          Articles by {author.name}
        </h2>
        <p className="text-gray-500 mt-1">
          {articlesData.totalDocs} {articlesData.totalDocs === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {articlesData.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesData.docs.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No articles published by this author yet.</p>
        </div>
      )}
    </div>
  );
}
