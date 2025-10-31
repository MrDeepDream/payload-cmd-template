import { getFeaturedArticles, getLatestArticles } from '@/lib/api';
import { ArticleCard } from '@/components/ArticleCard';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [featuredArticles, latestArticles] = await Promise.all([
    getFeaturedArticles(1),
    getLatestArticles(12),
  ]);

  const mainFeatured = featuredArticles[0];
  const otherArticles = latestArticles.filter((article) => article.id !== mainFeatured?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Featured Article */}
      {mainFeatured && (
        <section className="mb-12">
          <ArticleCard article={mainFeatured} featured />
        </section>
      )}

      {/* Latest Articles Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
        </div>

        {otherArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found. Start creating content in the admin panel!</p>
            <a
              href="http://localhost:3000/admin"
              className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Admin Panel →
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
