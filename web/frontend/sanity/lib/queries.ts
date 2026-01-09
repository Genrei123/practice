import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

// Store Settings Query
export const storeSettingsQuery = defineQuery(`*[_type == "storeSettings"][0]{
  storeName,
  tagline,
  logo,
  heroImage,
  heroTitle,
  heroSubtitle,
  "featuredCategories": featuredCategories[]->{
    _id,
    name,
    "slug": slug.current,
    description,
    image
  },
  aboutSection,
  contactInfo,
  socialMedia,
  deliveryInfo,
  announcement
}`)

// Product Queries
const productFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  description,
  image,
  gallery,
  "category": category->{
    _id,
    name,
    "slug": slug.current
  },
  basePrice,
  servingSize,
  servesCount,
  "addOns": addOns[]->{
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    image,
    isAvailable
  },
  "seasonings": seasonings[]->{
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    image,
    isIncludedByDefault,
    isAvailable
  },
  ingredients,
  nutritionInfo,
  isAvailable,
  isFeatured,
  preparationTime
`

export const allProductsQuery = defineQuery(`
  *[_type == "product" && isAvailable == true] | order(isFeatured desc, name asc) {
    ${productFields}
  }
`)

export const featuredProductsQuery = defineQuery(`
  *[_type == "product" && isAvailable == true && isFeatured == true] | order(name asc) {
    ${productFields}
  }
`)

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`)

export const productsByCategoryQuery = defineQuery(`
  *[_type == "product" && isAvailable == true && category->slug.current == $categorySlug] | order(name asc) {
    ${productFields}
  }
`)

// Category Queries
export const allCategoriesQuery = defineQuery(`
  *[_type == "productCategory"] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    "productCount": count(*[_type == "product" && references(^._id) && isAvailable == true])
  }
`)

export const categoryBySlugQuery = defineQuery(`
  *[_type == "productCategory" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    image
  }
`)

// Add-ons Query
export const allAddOnsQuery = defineQuery(`
  *[_type == "productAddOn" && isAvailable == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    image
  }
`)

// Seasonings Query
export const allSeasoningsQuery = defineQuery(`
  *[_type == "seasoning" && isAvailable == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    image,
    isIncludedByDefault
  }
`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// About Page Query
export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    title,
    heroImage,
    heroTitle,
    heroSubtitle,
    mainContent,
    mission,
    vision,
    values,
    teamSection,
    ctaSection,
    seo
  }
`)

// Contact Page Query
export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0]{
    title,
    heroTitle,
    heroSubtitle,
    contactMethods,
    storeLocation,
    businessHours,
    contactFormSettings,
    faqSection,
    socialLinks,
    seo
  }
`)
