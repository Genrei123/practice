import {notFound} from 'next/navigation'
import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {productBySlugQuery, allProductsQuery} from '@/sanity/lib/queries'
import ProductDetails from '@/app/components/ProductDetails'
import ProductCard from '@/app/components/ProductCard'
import {ChevronLeftIcon} from '@/app/components/icons'

interface ProductPageProps {
  params: Promise<{slug: string}>
}

export default async function ProductPage({params}: ProductPageProps) {
  const {slug} = await params
  const {data: product} = await sanityFetch({
    query: productBySlugQuery,
    params: {slug},
  })

  if (!product) {
    notFound()
  }

  // Get related products (same category)
  const {data: allProducts} = await sanityFetch({query: allProductsQuery})
  const relatedProducts = allProducts
    ?.filter(
      (p: any) =>
        p._id !== product._id && p.category?.slug === product.category?.slug
    )
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/products" className="text-gray-600 hover:text-orange-600 flex items-center gap-1">
              <ChevronLeftIcon className="w-4 h-4" />
              Back to Menu
            </Link>
            <span className="text-gray-400">/</span>
            {product.category && (
              <>
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="text-gray-600 hover:text-orange-600"
                >
                  {product.category.name}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Content */}
      <div className="container py-12">
        <ProductDetails product={product} />
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export async function generateStaticParams() {
  const {data: products} = await sanityFetch({
    query: allProductsQuery,
    perspective: 'published',
    stega: false,
  })

  return (
    products?.map((product: any) => ({
      slug: product.slug,
    })) || []
  )
}

export async function generateMetadata({params}: ProductPageProps) {
  const {slug} = await params
  const {data: product} = await sanityFetch({
    query: productBySlugQuery,
    params: {slug},
    stega: false,
  })

  if (!product) {
    return {title: 'Product Not Found'}
  }

  return {
    title: product.name,
    description: product.description || `Order ${product.name} from our menu`,
  }
}
