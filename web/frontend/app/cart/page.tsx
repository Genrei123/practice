'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  ShoppingCartIcon,
  ChevronRightIcon,
} from '@/app/components/icons'

// Demo cart items (In production, this would come from C# API)
const demoCartItems = [
  {
    id: '1',
    productId: 'pancit-bihon',
    name: 'Pancit Bihon Bilao',
    slug: 'pancit-bihon',
    image: null,
    basePrice: 450,
    quantity: 2,
    servingSize: '1 bilao (1kg)',
    addOns: [
      {id: 'shrimp', name: 'Extra Shrimp', price: 150},
      {id: 'egg', name: 'Fried Egg', price: 30},
    ],
    seasonings: ['Calamansi', 'Soy Sauce'],
  },
  {
    id: '2',
    productId: 'pancit-canton',
    name: 'Pancit Canton Bilao',
    slug: 'pancit-canton',
    image: null,
    basePrice: 500,
    quantity: 1,
    servingSize: '1 bilao (1kg)',
    addOns: [],
    seasonings: ['Calamansi'],
  },
]

interface CartItem {
  id: string
  productId: string
  name: string
  slug: string
  image: any
  basePrice: number
  quantity: number
  servingSize?: string
  addOns: {id: string; name: string; price: number}[]
  seasonings: string[]
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(demoCartItems)
  const [promoCode, setPromoCode] = useState('')
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  // Calculate totals
  const calculateItemTotal = (item: CartItem) => {
    const addOnsTotal = item.addOns.reduce((sum, addon) => sum + addon.price, 0)
    return (item.basePrice + addOnsTotal) * item.quantity
  }

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  const deliveryFee = subtotal >= 2000 ? 0 : 100
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0 // 10% discount
  const total = subtotal + deliveryFee - discount

  // Update quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) =>
      items.map((item) => (item.id === itemId ? {...item, quantity: newQuantity} : item))
    )
  }

  // Remove item
  const removeItem = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId))
  }

  // Apply promo code
  const applyPromoCode = async () => {
    if (!promoCode) return
    setIsApplyingPromo(true)
    // TODO: Replace with actual C# API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo(promoCode)
    }
    setIsApplyingPromo(false)
  }

  // Proceed to checkout
  const handleCheckout = async () => {
    // TODO: Replace with actual checkout flow via C# API
    console.log('Proceeding to checkout with items:', cartItems)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any delicious dishes yet!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold transition-colors"
          >
            Browse Menu
            <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm flex gap-4"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-4xl">🍜</span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-semibold text-gray-900 hover:text-orange-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      {item.servingSize && (
                        <p className="text-sm text-gray-500">{item.servingSize}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Add-ons */}
                  {item.addOns.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Add-ons:{' '}
                        {item.addOns.map((addon, index) => (
                          <span key={addon.id}>
                            {addon.name} (+₱{addon.price})
                            {index < item.addOns.length - 1 && ', '}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}

                  {/* Seasonings */}
                  {item.seasonings.length > 0 && (
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        Seasonings: {item.seasonings.join(', ')}
                      </p>
                    </div>
                  )}

                  {/* Price and Quantity */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 rounded-l-full transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-10 text-center font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
                      >
                        <PlusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        ₱{calculateItemTotal(item).toLocaleString()}
                      </span>
                      <p className="text-sm text-gray-500">
                        ₱{item.basePrice.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Summary Items */}
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium text-gray-900">
                    ₱{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'font-medium text-gray-900'}>
                    {deliveryFee === 0 ? 'FREE' : `₱${deliveryFee}`}
                  </span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span className="font-medium">-₱{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={isApplyingPromo || !promoCode}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isApplyingPromo ? '...' : 'Apply'}
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Promo code "{appliedPromo}" applied!
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">Try: SAVE10</p>
              </div>

              {/* Total */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₱{total.toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-full font-semibold text-lg transition-colors"
                >
                  Proceed to Checkout
                </button>

                {/* Free Delivery Notice */}
                {deliveryFee > 0 && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Add ₱{(2000 - subtotal).toLocaleString()} more for free delivery!
                  </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">🔒 Secure Checkout</span>
                  <span className="flex items-center gap-1">📞 24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
