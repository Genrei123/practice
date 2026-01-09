import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {product} from './documents/product'
import {productCategory} from './documents/productCategory'
import {productAddOn} from './documents/productAddOn'
import {seasoning} from './documents/seasoning'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {storeSettings} from './singletons/storeSettings'
import {aboutPage} from './singletons/aboutPage'
import {contactPage} from './singletons/contactPage'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  storeSettings,
  aboutPage,
  contactPage,
  // Documents
  page,
  post,
  person,
  product,
  productCategory,
  productAddOn,
  seasoning,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
]
