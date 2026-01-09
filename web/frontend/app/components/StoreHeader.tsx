'use client'

import Link from 'next/link'
import {useState} from 'react'
import {ShoppingCartIcon, UserIcon, MenuIcon, XIcon} from './icons'

interface StoreHeaderProps {
  storeName?: string
  cartItemCount?: number
  isLoggedIn?: boolean
}

export default function StoreHeader({
  storeName = 'Kusina Filipino',
  cartItemCount = 0,
  isLoggedIn = false,
}: StoreHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed z-50 h-20 inset-x-0 top-0 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍜</span>
            </div>
            <span className="text-xl font-bold text-gray-900">{storeName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* User/Login Button */}
            {isLoggedIn ? (
              <Link
                href="/account"
                className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <UserIcon className="w-6 h-6" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors"
              >
                <UserIcon className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
          <nav className="container py-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              {!isLoggedIn && (
                <li className="pt-2">
                  <Link
                    href="/login"
                    className="block py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white text-center rounded-lg font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login / Sign Up
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
