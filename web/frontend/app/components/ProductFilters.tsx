'use client'

import {useRouter, useSearchParams} from 'next/navigation'

interface Category {
  _id: string
  name: string
  slug: string
  image?: any
  productCount?: number
}

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory?: string
}

export default function ProductFilters({categories, selectedCategory}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryClick = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      {/* Categories Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                !selectedCategory
                  ? 'bg-orange-100 text-orange-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Items
            </button>
          </li>
          {categories.map((category) => (
            <li key={category._id}>
              <button
                onClick={() => handleCategoryClick(category.slug)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                  selectedCategory === category.slug
                    ? 'bg-orange-100 text-orange-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{category.name}</span>
                {category.productCount !== undefined && category.productCount > 0 && (
                  <span className="text-sm text-gray-500">{category.productCount}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-gray-700">Under ₱500</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-gray-700">₱500 - ₱1,000</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-gray-700">₱1,000 - ₱2,000</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-gray-700">Over ₱2,000</span>
          </label>
        </div>
      </div>

      {/* Dietary Preferences */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Special</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-gray-700">Featured Items</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-gray-700">Best Sellers</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-gray-700">New Arrivals</span>
          </label>
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
        <h4 className="font-semibold text-lg mb-2">Need Help Ordering?</h4>
        <p className="text-white/90 text-sm mb-4">
          Our team is ready to assist you with your order or answer any questions.
        </p>
        <a
          href="tel:+639123456789"
          className="inline-block bg-white text-orange-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-50 transition-colors"
        >
          📞 Call Us Now
        </a>
      </div>
    </div>
  )
}
