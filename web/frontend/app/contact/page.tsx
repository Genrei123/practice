import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {contactPageQuery} from '@/sanity/lib/queries'
import ContactPageContent from './ContactPageContent'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data: contactPage} = await sanityFetch({query: contactPageQuery})

  return {
    title: contactPage?.seo?.metaTitle || contactPage?.title || 'Contact Us',
    description:
      contactPage?.seo?.metaDescription ||
      contactPage?.heroSubtitle ||
      'Get in touch with us',
  }
}

export default async function ContactPage() {
  const {data: contactPage} = await sanityFetch({query: contactPageQuery})

  if (!contactPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contact Page Coming Soon</h1>
          <p className="text-gray-600 mb-6">This page is being set up in Sanity CMS.</p>
          <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return <ContactPageContent contactPage={contactPage} />
}
