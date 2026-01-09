import Image from 'next/image'
import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {storeSettingsQuery, featuredProductsQuery, allCategoriesQuery} from '@/sanity/lib/queries'
import {getImageUrl} from '@/sanity/lib/image'
import ProductCard from '@/app/components/ProductCard'
import {ChevronRightIcon} from '@/app/components/icons'

export default async function StoreLandingPage() {
  const [{data: storeSettings}, {data: featuredProducts}, {data: categories}] = await Promise.all([
    sanityFetch({query: storeSettingsQuery}),
    sanityFetch({query: featuredProductsQuery}),
    sanityFetch({query: allCategoriesQuery}),
  ])

  return (
    <div className="min-h-screen">
      {/* Announcement Banner */}
      {storeSettings?.announcement?.enabled && (
        <div
          className={`py-3 px-4 text-center text-sm font-medium ${
            storeSettings.announcement.type === 'promo'
              ? 'bg-orange-600 text-white'
              : storeSettings.announcement.type === 'warning'
                ? 'bg-yellow-500 text-black'
                : 'bg-blue-600 text-white'
          }`}
        >
          {storeSettings.announcement.message}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern-food.svg')] bg-repeat bg-center" />
        </div>
        <div className="container relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                  🍜 Authentic Filipino Cuisine
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {storeSettings?.heroTitle || (
                    <>
                      Taste the Flavors of the{' '}
                      <span className="text-orange-600">Philippines</span>
                    </>
                  )}
                </h1>
                <p className="text-lg text-gray-600 max-w-xl">
                  {storeSettings?.heroSubtitle ||
                    'Order your favorite Filipino dishes made fresh with traditional recipes. From pancit to special bilao platters, we bring the authentic taste of home to your table.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold transition-colors text-lg"
                >
                  Order Now
                  <ChevronRightIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full font-semibold transition-colors text-lg border border-gray-200"
                >
                  Learn More
                </Link>
              </div>

              {/* Delivery Info */}
              {storeSettings?.deliveryInfo && (
                <div className="flex flex-wrap gap-6 pt-4">
                  {storeSettings.deliveryInfo.freeDeliveryThreshold && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-2xl">🚚</span>
                      <span className="text-sm">
                        Free delivery over ₱{storeSettings.deliveryInfo.freeDeliveryThreshold.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-2xl">⏰</span>
                    <span className="text-sm">Same-day delivery available</span>
                  </div>
                </div>
              )}
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={getImageUrl(storeSettings?.heroImage, {width: 800, height: 600})}
                  alt={storeSettings?.heroImage?.alt || 'Delicious Filipino Food'}
                  fill
                  className="object-cover"
                  priority
                  unoptimized={!storeSettings?.heroImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Browse Our Menu</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our wide selection of authentic Filipino dishes, from classic favorites to
                special bilao platters perfect for any occasion.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/products?category=${category.slug}`}
                  className="group relative bg-gray-100 rounded-2xl overflow-hidden aspect-square hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={getImageUrl(category.image, {width: 400, height: 400})}
                    alt={category.image?.alt || category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized={!category.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                    {category.productCount > 0 && (
                      <p className="text-white/80 text-sm">{category.productCount} items</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Featured Dishes</h2>
                <p className="text-gray-600">Our most popular and highly-rated selections</p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                View All Menu
                <ChevronRightIcon className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {storeSettings?.aboutSection && (
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                  <Image
                    src={getImageUrl(storeSettings.aboutSection?.image, {width: 800, height: 600})}
                    alt="About our kitchen"
                    fill
                    className="object-cover"
                    unoptimized={!storeSettings.aboutSection?.image}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Our Story
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {storeSettings.aboutSection.title || 'Made with Love & Tradition'}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {storeSettings.aboutSection.content ||
                    "We've been serving authentic Filipino cuisine for over a decade, using recipes passed down through generations. Every dish is prepared with the freshest ingredients and the same care and love as homemade cooking."}
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                >
                  Learn more about us
                  <ChevronRightIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ordering your favorite Filipino dishes is easy with our simple 3-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Browse & Order</h3>
              <p className="text-gray-400">
                Browse our menu and select your favorite dishes. Customize with add-ons and seasonings.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👨‍🍳</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. We Prepare</h3>
              <p className="text-gray-400">
                Our chefs prepare your order fresh using traditional recipes and quality ingredients.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Enjoy!</h3>
              <p className="text-gray-400">
                Pick up or have it delivered right to your doorstep. Enjoy authentic Filipino flavors!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Experience the authentic taste of Filipino cuisine. Order now and get your favorites
            delivered fresh to your door.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-orange-600 px-8 py-4 rounded-full font-semibold transition-colors text-lg"
            >
              View Full Menu
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
            {storeSettings?.contactInfo?.phone && (
              <a
                href={`tel:${storeSettings.contactInfo.phone}`}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-colors text-lg border-2 border-white"
              >
                📞 Call to Order
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
