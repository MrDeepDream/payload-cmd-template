import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug } from '@/lib/api';
import { Author, Category, Media, Tag, Article } from '@/types';
import { formatDate, getImageUrl } from '@/lib/utils';
import { RichText } from '@/lib/richText';
import { ArticleCard } from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const revalidate = 60;

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const author = article.author as Author;
  const featuredImage = article.featuredImage as Media;

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    keywords: article.seo?.keywords,
    authors: author ? [{ name: author.name }] : undefined,
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: author ? [author.name] : undefined,
      images: featuredImage ? [getImageUrl(featuredImage)] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const author = article.author as Author;
  const category = article.category as Category;
  const tags = article.tags as Tag[] | undefined;
  const featuredImage = article.featuredImage as Media;
  const relatedArticles = (article.relatedArticles as Article[] | undefined)?.filter(
    (a) => typeof a !== 'string'
  ) as Article[] | undefined;

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Category & Breaking Badge */}
      <div className="flex items-center gap-3 mb-4">
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="text-primary-600 text-sm font-semibold uppercase hover:underline"
          >
            {category.name}
          </Link>
        )}
        {article.breaking && (
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase">
            Breaking News
          </span>
        )}
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
      {article.subtitle && (
        <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
      )}

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
        {author && (
          <Link
            href={`/author/${author.slug}`}
            className="flex items-center gap-2 hover:text-primary-600"
          >
            {author.avatar && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={getImageUrl(author.avatar)}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="font-semibold">{author.name}</span>
          </Link>
        )}
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

      {/* Featured Image */}
      {featuredImage && (
        <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(featuredImage.sizes?.desktop || featuredImage)}
            alt={featuredImage.alt}
            fill
            className="object-cover"
            priority
          />
          {featuredImage.caption && (
            <p className="mt-2 text-sm text-gray-600 italic">{featuredImage.caption}</p>
          )}
          {featuredImage.credit && (
            <p className="text-xs text-gray-500">Photo: {featuredImage.credit}</p>
          )}
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <RichText content={article.content} />
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
          <span className="text-gray-600 font-semibold">Tags:</span>
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.slug}`}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}

      {/* Author Bio */}
      {author && (
        <div className="bg-gray-100 rounded-lg p-6 mb-12">
          <h3 className="text-xl font-bold mb-4">About the Author</h3>
          <div className="flex gap-4">
            {author.avatar && (
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={getImageUrl(author.avatar)}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <Link
                href={`/author/${author.slug}`}
                className="text-lg font-semibold hover:text-primary-600"
              >
                {author.name}
              </Link>
              {author.bio && <p className="text-gray-600 mt-2">{author.bio}</p>}
              {author.socialMedia && (
                <div className="flex gap-3 mt-3 text-sm">
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
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
