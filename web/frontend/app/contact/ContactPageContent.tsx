'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {getImageUrl} from '@/sanity/lib/image'

interface ContactPageContentProps {
  contactPage: any
}

// Icon components for social media
const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  tiktok: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  youtube: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
}

export default function ContactPageContent({contactPage}: ContactPageContentProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({name: '', email: '', phone: '', subject: '', message: ''})
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {contactPage?.heroTitle || 'Get in Touch'}
            </h1>
            {contactPage?.heroSubtitle && (
              <p className="text-xl text-orange-100">{contactPage.heroSubtitle}</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      {contactPage?.contactMethods && contactPage.contactMethods.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactPage.contactMethods.map((method: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  {method.icon && <div className="text-4xl mb-3">{method.icon}</div>}
                  <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-orange-600 font-medium">{method.value}</p>
                  {method.additionalInfo && (
                    <p className="text-gray-500 text-sm mt-1">{method.additionalInfo}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            {contactPage?.contactFormSettings?.showContactForm !== false && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {contactPage?.contactFormSettings?.formTitle || 'Send us a message'}
                </h2>
                {contactPage?.contactFormSettings?.formDescription && (
                  <p className="text-gray-600 mb-6">
                    {contactPage.contactFormSettings.formDescription}
                  </p>
                )}

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-600">
                      {contactPage?.contactFormSettings?.successMessage ||
                        'Thank you! Your message has been sent successfully.'}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                          placeholder="09XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? 'Sending...'
                        : contactPage?.contactFormSettings?.submitButtonText || 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Business Hours & Location */}
            <div className="space-y-8">
              {/* Business Hours */}
              {contactPage?.businessHours && contactPage.businessHours.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🕐</span> Business Hours
                  </h3>
                  <div className="space-y-2">
                    {contactPage.businessHours.map((schedule: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                      >
                        <span className="font-medium text-gray-700">{schedule.days}</span>
                        <span
                          className={schedule.isClosed ? 'text-red-500' : 'text-gray-600'}
                        >
                          {schedule.isClosed ? 'Closed' : schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              {contactPage?.storeLocation && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📍</span>{' '}
                    {contactPage.storeLocation.title || 'Our Location'}
                  </h3>
                  {contactPage.storeLocation.address && (
                    <p className="text-gray-600 mb-4">{contactPage.storeLocation.address}</p>
                  )}
                  {contactPage.storeLocation.directionsUrl && (
                    <a
                      href={contactPage.storeLocation.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Get Directions →
                    </a>
                  )}
                </div>
              )}

              {/* Social Links */}
              {contactPage?.socialLinks && contactPage.socialLinks.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {contactPage.socialLinks.map((social: any, index: number) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors shadow-sm"
                      >
                        {socialIcons[social.platform] || social.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      {contactPage?.storeLocation?.googleMapsUrl && (
        <section className="py-16 bg-gray-100">
          <div className="container">
            <div className="aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={contactPage.storeLocation.googleMapsUrl}
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {contactPage?.faqSection?.showFaq && contactPage.faqSection.faqs?.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {contactPage.faqSection.title || 'Frequently Asked Questions'}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {contactPage.faqSection.faqs.map((faq: any, index: number) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    {faq.question}
                    <span
                      className={`text-2xl transition-transform ${expandedFaq === index ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
