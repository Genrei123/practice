import {Suspense} from 'react'
import {sanityFetch} from '@/sanity/lib/live'
import {allProductsQuery, allCategoriesQuery, productsByCategoryQuery} from '@/sanity/lib/queries'
import ProductCard from '@/app/components/ProductCard'
import ProductFilters from '@/app/components/ProductFilters'
import ProductsGrid from '@/app/components/ProductsGrid'

interface ProductsPageProps {
  searchParams: Promise<{category?: string; search?: string; sort?: string}>
}

export default async function ProductsPage({searchParams}: ProductsPageProps) {
  const params = await searchParams
  const {data: categories} = await sanityFetch({query: allCategoriesQuery})

  // Fetch products based on category filter
  let products
  if (params.category) {
    const {data} = await sanityFetch({
      query: productsByCategoryQuery,
      params: {categorySlug: params.category},
    })
    products = data
  } else {
    const {data} = await sanityFetch({query: allProductsQuery})
    products = data
  }

  // Get current category name
  const currentCategory = params.category
    ? categories?.find((c: any) => c.slug === params.category)?.name
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {currentCategory || 'Our Menu'}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            {currentCategory
              ? `Browse our delicious ${currentCategory.toLowerCase()} dishes`
              : 'Explore our full selection of authentic Filipino dishes, from classic pancit to special bilao platters.'}
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <ProductFilters
              categories={categories || []}
              selectedCategory={params.category}
            />
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid products={products || []} searchQuery={params.search} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({length: 6}).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-gray-200" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-10 bg-gray-200 rounded w-full mt-4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const metadata = {
  title: 'Menu',
  description: 'Browse our full selection of authentic Filipino dishes.',
}
