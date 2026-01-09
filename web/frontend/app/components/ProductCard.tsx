import Image from 'next/image'
import Link from 'next/link'
import {getImageUrl} from '@/sanity/lib/image'
import {ShoppingCartIcon, ClockIcon, UsersIcon} from './icons'

interface ProductCardProps {
  product: {
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
  onAddToCart?: (productId: string) => void
}

export default function ProductCard({product, onAddToCart}: ProductCardProps) {
  const imageUrl = getImageUrl(product.image, {width: 400, height: 300})

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.image?.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {product.isFeatured && (
            <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        {product.category && (
          <Link
            href={`/products?category=${product.category.slug}`}
            className="text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors"
          >
            {product.category.name}
          </Link>
        )}

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mt-1 group-hover:text-orange-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
        )}

        {/* Product Info */}
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
          {product.servesCount && (
            <span className="flex items-center gap-1">
              <UsersIcon className="w-4 h-4" />
              {product.servesCount}
            </span>
          )}
          {product.preparationTime && (
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {product.preparationTime}
            </span>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">₱{product.basePrice.toLocaleString()}</span>
            {product.servingSize && (
              <span className="text-sm text-gray-500 ml-1">/ {product.servingSize}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              onAddToCart?.(product._id)
            }}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-full font-medium transition-colors"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}
