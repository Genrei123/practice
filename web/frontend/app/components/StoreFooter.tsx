import Link from 'next/link'
import {FacebookIcon, InstagramIcon, TwitterIcon} from './icons'

interface StoreFooterProps {
  storeName?: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    operatingHours?: string
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

export default function StoreFooter({
  storeName = 'Kusina Filipino',
  contactInfo,
  socialMedia,
}: StoreFooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍜</span>
              </div>
              <span className="text-xl font-bold">{storeName}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Authentic Filipino food made with love. From our kitchen to your table, we bring the
              flavors of home to every dish.
            </p>
            {/* Social Media */}
            {socialMedia && (
              <div className="flex gap-4 pt-2">
                {socialMedia.facebook && (
                  <a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    <FacebookIcon className="w-6 h-6" />
                  </a>
                )}
                {socialMedia.instagram && (
                  <a
                    href={socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    <InstagramIcon className="w-6 h-6" />
                  </a>
                )}
                {socialMedia.twitter && (
                  <a
                    href={socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    <TwitterIcon className="w-6 h-6" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-orange-500 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-orange-500 transition-colors">
                  View Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              {contactInfo?.phone && (
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">📞</span>
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-orange-500 transition-colors">
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo?.email && (
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">✉️</span>
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-orange-500 transition-colors">
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo?.address && (
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">📍</span>
                  <span>{contactInfo.address}</span>
                </li>
              )}
              {contactInfo?.operatingHours && (
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">🕐</span>
                  <span>{contactInfo.operatingHours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {storeName}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-orange-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-orange-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
