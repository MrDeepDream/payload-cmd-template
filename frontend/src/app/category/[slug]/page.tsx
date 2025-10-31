import { notFound } from 'next/navigation';
import { getCategoryBySlug, getArticlesByCategory } from '@/lib/api';
import { ArticleCard } from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const revalidate = 60;

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - News`,
    description: category.description || `Browse ${category.name} articles`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, articlesData] = await Promise.all([
    getCategoryBySlug(params.slug),
    getArticlesByCategory(params.slug, 12),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 text-lg">{category.description}</p>
        )}
        <p className="text-gray-500 mt-2">
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
          <p className="text-gray-500 text-lg">No articles found in this category yet.</p>
        </div>
      )}
    </div>
  );
}
