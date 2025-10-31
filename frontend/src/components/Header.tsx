import Link from 'next/link';
import { getCategories } from '@/lib/api';
import { Category } from '@/types';

export async function Header() {
  let categories: Category[] = [];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return empty array if API is not available
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-primary-600 hover:text-primary-700">
            News Site
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <nav className="md:hidden pb-3 flex gap-4 overflow-x-auto">
          <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium whitespace-nowrap">
            Home
          </Link>
          {categories.slice(0, 5).map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="text-gray-700 hover:text-primary-600 font-medium whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
