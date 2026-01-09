import {CogIcon, BasketIcon, TagIcon, AddIcon, SparklesIcon, HomeIcon, InfoOutlineIcon, EnvelopeIcon, DocumentIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'storeSettings', 'aboutPage', 'contactPage', 'product', 'productCategory', 'productAddOn', 'seasoning', 'assist.instruction.context']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Store Content')
    .items([
      // Store Settings Singleton
      S.listItem()
        .title('Store Settings')
        .child(S.document().schemaType('storeSettings').documentId('storeSettings'))
        .icon(HomeIcon),
      
      S.divider(),
      
      // E-commerce Section
      S.listItem()
        .title('Products')
        .icon(BasketIcon)
        .child(
          S.list()
            .title('Products')
            .items([
              S.listItem()
                .title('All Products')
                .icon(BasketIcon)
                .child(S.documentTypeList('product').title('All Products')),
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('productCategory').title('Categories')),
              S.listItem()
                .title('Add-ons')
                .icon(AddIcon)
                .child(S.documentTypeList('productAddOn').title('Add-ons')),
              S.listItem()
                .title('Seasonings')
                .icon(SparklesIcon)
                .child(S.documentTypeList('seasoning').title('Seasonings')),
            ])
        ),
      
      S.divider(),
      
      // Pages Section
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('About Page')
                .icon(InfoOutlineIcon)
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Contact Page')
                .icon(EnvelopeIcon)
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
            ])
        ),
      
      S.divider(),
      
      // Other Content Types
      ...S.documentTypeListItems()
        // Remove managed types from the list
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      
      S.divider(),
      
      // Site Settings Singleton
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
