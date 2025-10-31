export interface Media {
  id: string;
  alt: string;
  caption?: string;
  credit?: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes?: {
    thumbnail?: ImageSize;
    card?: ImageSize;
    tablet?: ImageSize;
    desktop?: ImageSize;
  };
}

export interface ImageSize {
  url: string;
  width: number;
  height: number;
  filename: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: Media | string;
  email?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: Category | string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  status: 'draft' | 'published' | 'archived';
  publishedDate?: string;
  author: Author | string;
  category: Category | string;
  tags?: (Tag | string)[];
  featuredImage?: Media | string;
  excerpt?: string;
  content: any; // Rich text content
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  featured?: boolean;
  breaking?: boolean;
  readingTime?: number;
  relatedArticles?: (Article | string)[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
