'use client'

import {useState} from 'react'
import Image from 'next/image'
import {getImageUrl, PLACEHOLDER_IMAGE} from '@/sanity/lib/image'
import {
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
  CheckIcon,
  ClockIcon,
  UsersIcon,
  HeartIcon,
} from './icons'

interface AddOn {
  _id: string
  name: string
  slug: string
  description?: string
  price: number
  image?: any
  isAvailable?: boolean
}

interface Seasoning {
  _id: string
  name: string
  slug: string
  description?: string
  price: number
  image?: any
  isIncludedByDefault?: boolean
  isAvailable?: boolean
}

interface Product {
  _id: string
  name: string
  slug: string
  description?: string
  image?: any
  gallery?: any[]
  basePrice: number
  servingSize?: string
  servesCount?: string
  isFeatured?: boolean
  preparationTime?: string
  ingredients?: string[]
  nutritionInfo?: {
    calories?: string
    protein?: string
    carbs?: string
    fat?: string
  }
  addOns?: AddOn[]
  seasonings?: Seasoning[]
  category?: {
    name: string
    slug: string
  }
}

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({product}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedSeasonings, setSelectedSeasonings] = useState<string[]>(
    // Pre-select default seasonings
    product.seasonings?.filter((s) => s.isIncludedByDefault).map((s) => s._id) || []
  )
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  // Calculate total price
  const addOnsTotal =
    product.addOns
      ?.filter((addon) => selectedAddOns.includes(addon._id))
      .reduce((sum, addon) => sum + addon.price, 0) || 0

  const seasoningsTotal =
    product.seasonings
      ?.filter((s) => selectedSeasonings.includes(s._id) && !s.isIncludedByDefault && s.price > 0)
      .reduce((sum, s) => sum + s.price, 0) || 0

  const totalPrice = (product.basePrice + addOnsTotal + seasoningsTotal) * quantity

  // Handle add-on toggle
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    )
  }

  // Handle seasoning toggle
  const toggleSeasoning = (seasoningId: string) => {
    setSelectedSeasonings((prev) =>
      prev.includes(seasoningId) ? prev.filter((id) => id !== seasoningId) : [...prev, seasoningId]
    )
  }

  // Handle add to cart
  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      // TODO: Replace with actual C# API endpoint
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          productId: product._id,
          quantity,
          addOns: selectedAddOns,
          seasonings: selectedSeasonings,
        }),
      })

      if (response.ok) {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 3000)
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  // Get all images (main + gallery)
  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean)

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square relative rounded-3xl overflow-hidden bg-gray-100">
          <Image
            src={getImageUrl(allImages[selectedImageIndex], {width: 800, height: 800})}
            alt={allImages[selectedImageIndex]?.alt || product.name}
            fill
            className="object-cover"
            priority
            unoptimized={!allImages[selectedImageIndex]}
          />
          {product.isFeatured && (
            <div className="absolute top-4 left-4 bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {allImages.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                  selectedImageIndex === index
                    ? 'border-orange-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={getImageUrl(img, {width: 200, height: 200})}
                  alt={img?.alt || `${product.name} - image ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  unoptimized={!img}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Category & Title */}
        <div>
          {product.category && (
            <span className="text-orange-600 font-medium">{product.category.name}</span>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">{product.name}</h1>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            ₱{product.basePrice.toLocaleString()}
          </span>
          {product.servingSize && (
            <span className="text-gray-500">/ {product.servingSize}</span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-wrap gap-4 text-gray-600">
          {product.servesCount && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <UsersIcon className="w-5 h-5" />
              <span>{product.servesCount}</span>
            </div>
          )}
          {product.preparationTime && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <ClockIcon className="w-5 h-5" />
              <span>{product.preparationTime}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        )}

        {/* Add-ons Section */}
        {product.addOns && product.addOns.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Add Extra Toppings</h3>
            <div className="grid grid-cols-2 gap-3">
              {product.addOns.map((addon) => (
                <button
                  key={addon._id}
                  onClick={() => toggleAddOn(addon._id)}
                  disabled={!addon.isAvailable}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    selectedAddOns.includes(addon._id)
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!addon.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                      selectedAddOns.includes(addon._id)
                        ? 'bg-orange-600 border-orange-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAddOns.includes(addon._id) && (
                      <CheckIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{addon.name}</div>
                    <div className="text-sm text-orange-600">+₱{addon.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Seasonings Section */}
        {product.seasonings && product.seasonings.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Seasonings & Condiments</h3>
            <div className="flex flex-wrap gap-3">
              {product.seasonings.map((seasoning) => (
                <button
                  key={seasoning._id}
                  onClick={() => toggleSeasoning(seasoning._id)}
                  disabled={!seasoning.isAvailable}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all ${
                    selectedSeasonings.includes(seasoning._id)
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  } ${!seasoning.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {selectedSeasonings.includes(seasoning._id) && (
                    <CheckIcon className="w-4 h-4" />
                  )}
                  <span>{seasoning.name}</span>
                  {seasoning.isIncludedByDefault ? (
                    <span className="text-xs text-gray-500">(Included)</span>
                  ) : seasoning.price > 0 ? (
                    <span className="text-sm text-orange-600">+₱{seasoning.price}</span>
                  ) : (
                    <span className="text-xs text-gray-500">(Free)</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity & Add to Cart */}
        <div className="border-t border-gray-200 pt-6 space-y-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-900">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 hover:bg-gray-100 rounded-l-full transition-colors"
              >
                <MinusIcon className="w-5 h-5 text-gray-600" />
              </button>
              <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 hover:bg-gray-100 rounded-r-full transition-colors"
              >
                <PlusIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-2xl font-bold text-gray-900">
              ₱{totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-lg transition-all ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              {isAddingToCart ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : addedToCart ? (
                <>
                  <CheckIcon className="w-6 h-6" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="w-6 h-6" />
                  Add to Cart
                </>
              )}
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-full hover:border-red-300 hover:bg-red-50 transition-colors">
              <HeartIcon className="w-6 h-6 text-gray-600 hover:text-red-500" />
            </button>
          </div>
        </div>

        {/* Ingredients */}
        {product.ingredients && product.ingredients.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition Info */}
        {product.nutritionInfo && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Nutrition Information</h3>
            <div className="grid grid-cols-4 gap-4">
              {product.nutritionInfo.calories && (
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-semibold text-gray-900">
                    {product.nutritionInfo.calories}
                  </div>
                  <div className="text-xs text-gray-500">Calories</div>
                </div>
              )}
              {product.nutritionInfo.protein && (
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-semibold text-gray-900">
                    {product.nutritionInfo.protein}
                  </div>
                  <div className="text-xs text-gray-500">Protein</div>
                </div>
              )}
              {product.nutritionInfo.carbs && (
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-semibold text-gray-900">
                    {product.nutritionInfo.carbs}
                  </div>
                  <div className="text-xs text-gray-500">Carbs</div>
                </div>
              )}
              {product.nutritionInfo.fat && (
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-semibold text-gray-900">
                    {product.nutritionInfo.fat}
                  </div>
                  <div className="text-xs text-gray-500">Fat</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
