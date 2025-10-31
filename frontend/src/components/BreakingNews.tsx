import Link from 'next/link';
import { getBreakingNews } from '@/lib/api';

export async function BreakingNews() {
  const breakingNews = await getBreakingNews(3);

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 overflow-x-auto">
          <span className="font-bold uppercase text-sm whitespace-nowrap">Breaking News:</span>
          <div className="flex gap-6">
            {breakingNews.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="hover:underline whitespace-nowrap text-sm"
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
