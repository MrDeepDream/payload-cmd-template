import { Article, Author, Category, Tag, PaginatedResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}/api${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Articles API
export async function getArticles(params?: {
  limit?: number;
  page?: number;
  where?: any;
  sort?: string;
}): Promise<PaginatedResponse<Article>> {
  const queryParams = new URLSearchParams();

  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.sort) queryParams.set('sort', params.sort);
  if (params?.where) queryParams.set('where', JSON.stringify(params.where));

  // Always populate relationships
  queryParams.set('depth', '2');

  return fetchAPI(`/articles?${queryParams.toString()}`);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await fetchAPI(`/articles?where[slug][equals]=${slug}&depth=2`);
  return data.docs?.[0] || null;
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  const data = await getArticles({
    where: { featured: { equals: true }, status: { equals: 'published' } },
    limit,
    sort: '-publishedDate',
  });
  return data.docs;
}

export async function getBreakingNews(limit = 3): Promise<Article[]> {
  const data = await getArticles({
    where: { breaking: { equals: true }, status: { equals: 'published' } },
    limit,
    sort: '-publishedDate',
  });
  return data.docs;
}

export async function getLatestArticles(limit = 10): Promise<Article[]> {
  const data = await getArticles({
    where: { status: { equals: 'published' } },
    limit,
    sort: '-publishedDate',
  });
  return data.docs;
}

export async function getArticlesByCategory(
  categorySlug: string,
  limit = 10,
  page = 1
): Promise<PaginatedResponse<Article>> {
  // First get the category
  const categoryData = await fetchAPI(`/categories?where[slug][equals]=${categorySlug}`);
  const category = categoryData.docs?.[0];

  if (!category) {
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 0,
      page,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }

  return getArticles({
    where: { category: { equals: category.id }, status: { equals: 'published' } },
    limit,
    page,
    sort: '-publishedDate',
  });
}

export async function getArticlesByAuthor(
  authorSlug: string,
  limit = 10,
  page = 1
): Promise<PaginatedResponse<Article>> {
  // First get the author
  const authorData = await fetchAPI(`/authors?where[slug][equals]=${authorSlug}`);
  const author = authorData.docs?.[0];

  if (!author) {
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 0,
      page,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }

  return getArticles({
    where: { author: { equals: author.id }, status: { equals: 'published' } },
    limit,
    page,
    sort: '-publishedDate',
  });
}

export async function getArticlesByTag(
  tagSlug: string,
  limit = 10,
  page = 1
): Promise<PaginatedResponse<Article>> {
  // First get the tag
  const tagData = await fetchAPI(`/tags?where[slug][equals]=${tagSlug}`);
  const tag = tagData.docs?.[0];

  if (!tag) {
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 0,
      page,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }

  return getArticles({
    where: { tags: { in: [tag.id] }, status: { equals: 'published' } },
    limit,
    page,
    sort: '-publishedDate',
  });
}

// Categories API
export async function getCategories(): Promise<Category[]> {
  const data = await fetchAPI('/categories?limit=100&depth=1');
  return data.docs;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await fetchAPI(`/categories?where[slug][equals]=${slug}&depth=1`);
  return data.docs?.[0] || null;
}

// Authors API
export async function getAuthors(): Promise<Author[]> {
  const data = await fetchAPI('/authors?limit=100&depth=1');
  return data.docs;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const data = await fetchAPI(`/authors?where[slug][equals]=${slug}&depth=1`);
  return data.docs?.[0] || null;
}

// Tags API
export async function getTags(): Promise<Tag[]> {
  const data = await fetchAPI('/tags?limit=100');
  return data.docs;
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const data = await fetchAPI(`/tags?where[slug][equals]=${slug}`);
  return data.docs?.[0] || null;
}
