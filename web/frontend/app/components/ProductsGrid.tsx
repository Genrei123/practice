'use client'

import {useState, useMemo} from 'react'
import ProductCard from './ProductCard'
import {SearchIcon} from './icons'

interface Product {
  _id: string
  name: string
  slug: string
  description?: string
  image?: any
  basePrice: number
  servingSize?: string
  servesCount?: string
  isFeatured?: boolean
  preparationTime?: string
  category?: {
    name: string
    slug: string
  }
}

interface ProductsGridProps {
  products: Product[]
  searchQuery?: string
}

export default function ProductsGrid({products, searchQuery}: ProductsGridProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '')
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'featured'>('featured')

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Filter by search
    if (localSearch) {
      const searchLower = localSearch.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.category?.name.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price-asc':
        result.sort((a, b) => a.basePrice - b.basePrice)
        break
      case 'price-desc':
        result.sort((a, b) => b.basePrice - a.basePrice)
        break
      case 'featured':
      default:
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return 0
        })
    }

    return result
  }, [products, localSearch, sortBy])

  const handleAddToCart = (productId: string) => {
    // TODO: Implement cart functionality with C# backend
    console.log('Add to cart:', productId)
  }

  return (
    <div>
      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white min-w-[180px]"
        >
          <option value="featured">Featured First</option>
          <option value="name">Name (A-Z)</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-6">
        Showing {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'item' : 'items'}
        {localSearch && ` for "${localSearch}"`}
      </p>

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No dishes found</h3>
          <p className="text-gray-600">
            {localSearch
              ? `No results for "${localSearch}". Try a different search term.`
              : 'No products available in this category at the moment.'}
          </p>
        </div>
      )}
    </div>
  )
}
