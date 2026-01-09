import Image from 'next/image'
import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {aboutPageQuery} from '@/sanity/lib/queries'
import {getImageUrl} from '@/sanity/lib/image'
import {PortableText} from '@portabletext/react'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data: aboutPage} = await sanityFetch({query: aboutPageQuery})

  return {
    title: aboutPage?.seo?.metaTitle || aboutPage?.title || 'About Us',
    description: aboutPage?.seo?.metaDescription || aboutPage?.heroSubtitle || 'Learn more about us',
  }
}

export default async function AboutPage() {
  const {data: aboutPage} = await sanityFetch({query: aboutPageQuery})

  if (!aboutPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">About Page Coming Soon</h1>
          <p className="text-gray-600 mb-6">This page is being set up in Sanity CMS.</p>
          <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 lg:py-32">
        {aboutPage.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={getImageUrl(aboutPage.heroImage, {width: 1920, height: 800})}
              alt={aboutPage.heroImage.alt || 'About Us'}
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
        )}
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {aboutPage.heroTitle || 'Our Story'}
            </h1>
            {aboutPage.heroSubtitle && (
              <p className="text-xl text-gray-300">{aboutPage.heroSubtitle}</p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      {aboutPage.mainContent && (
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-lg prose-orange">
              <PortableText value={aboutPage.mainContent} />
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision */}
      {(aboutPage.mission || aboutPage.vision) && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Mission */}
              {aboutPage.mission && (
                <div className="space-y-6">
                  {aboutPage.mission.image && (
                    <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                      <Image
                        src={getImageUrl(aboutPage.mission.image, {width: 600, height: 450})}
                        alt={aboutPage.mission.image.alt || 'Our Mission'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-3xl font-bold text-gray-900">
                    {aboutPage.mission.title || 'Our Mission'}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {aboutPage.mission.content}
                  </p>
                </div>
              )}

              {/* Vision */}
              {aboutPage.vision && (
                <div className="space-y-6">
                  {aboutPage.vision.image && (
                    <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                      <Image
                        src={getImageUrl(aboutPage.vision.image, {width: 600, height: 450})}
                        alt={aboutPage.vision.image.alt || 'Our Vision'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-3xl font-bold text-gray-900">
                    {aboutPage.vision.title || 'Our Vision'}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {aboutPage.vision.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      {aboutPage.values && aboutPage.values.length > 0 && (
        <section className="py-16 lg:py-24 bg-orange-50">
          <div className="container">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              Our Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutPage.values.map((value: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  {value.icon && (
                    <div className="text-4xl mb-4">{value.icon}</div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {aboutPage.teamSection?.showTeam && aboutPage.teamSection.teamMembers?.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {aboutPage.teamSection.title || 'Meet Our Team'}
              </h2>
              {aboutPage.teamSection.description && (
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {aboutPage.teamSection.description}
                </p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {aboutPage.teamSection.teamMembers.map((member: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="aspect-square relative rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    {member.image ? (
                      <Image
                        src={getImageUrl(member.image, {width: 400, height: 400})}
                        alt={member.image.alt || member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        👤
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  {member.role && (
                    <p className="text-orange-600 font-medium">{member.role}</p>
                  )}
                  {member.bio && (
                    <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {aboutPage.ctaSection && (
        <section className="py-16 lg:py-24 bg-orange-600 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {aboutPage.ctaSection.title || 'Ready to taste the difference?'}
              </h2>
              {aboutPage.ctaSection.description && (
                <p className="text-orange-100 text-lg mb-8">
                  {aboutPage.ctaSection.description}
                </p>
              )}
              <Link
                href={aboutPage.ctaSection.buttonLink || '/products'}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-colors"
              >
                {aboutPage.ctaSection.buttonText || 'Order Now'}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
