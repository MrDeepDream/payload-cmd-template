import { notFound } from 'next/navigation';
import { getTagBySlug, getArticlesByTag } from '@/lib/api';
import { ArticleCard } from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const revalidate = 60;

interface TagPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug);

  if (!tag) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: `#${tag.name} - Articles`,
    description: `Browse articles tagged with ${tag.name}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const [tag, articlesData] = await Promise.all([
    getTagBySlug(params.slug),
    getArticlesByTag(params.slug, 12),
  ]);

  if (!tag) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tag Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">#{tag.name}</h1>
        <p className="text-gray-500">
          {articlesData.totalDocs} {articlesData.totalDocs === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {/* Articles Grid */}
      {articlesData.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesData.docs.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No articles found with this tag yet.</p>
        </div>
      )}
    </div>
  );
}
