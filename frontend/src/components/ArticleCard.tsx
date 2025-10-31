import Link from 'next/link';
import Image from 'next/image';
import { Article, Author, Category, Media } from '@/types';
import { formatDate, getImageUrl } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const author = article.author as Author;
  const category = article.category as Category;
  const featuredImage = article.featuredImage as Media;

  if (featured) {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          {featuredImage && (
            <div className="relative h-64 md:h-full">
              <Image
                src={getImageUrl(featuredImage.sizes?.card || featuredImage)}
                alt={featuredImage.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {article.breaking && (
                <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase">
                  Breaking
                </span>
              )}
            </div>
          )}
          <div className="p-6 flex flex-col justify-center">
            {category && (
              <Link
                href={`/category/${category.slug}`}
                className="text-primary-600 text-sm font-semibold uppercase mb-2 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {category.name}
              </Link>
            )}
            <h2 className="text-3xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
              {article.title}
            </h2>
            {article.subtitle && (
              <p className="text-gray-600 text-lg mb-4">{article.subtitle}</p>
            )}
            {article.excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
              {author && <span className="font-medium">{author.name}</span>}
              {article.publishedDate && (
                <>
                  <span>•</span>
                  <time dateTime={article.publishedDate}>{formatDate(article.publishedDate)}</time>
                </>
              )}
              {article.readingTime && (
                <>
                  <span>•</span>
                  <span>{article.readingTime} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow h-full flex flex-col">
        {featuredImage && (
          <div className="relative h-48">
            <Image
              src={getImageUrl(featuredImage.sizes?.card || featuredImage)}
              alt={featuredImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {article.breaking && (
              <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase">
                Breaking
              </span>
            )}
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="text-primary-600 text-xs font-semibold uppercase mb-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {category.name}
            </Link>
          )}
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
            {author && <span className="font-medium">{author.name}</span>}
            {article.publishedDate && (
              <>
                <span>•</span>
                <time dateTime={article.publishedDate}>{formatDate(article.publishedDate)}</time>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
