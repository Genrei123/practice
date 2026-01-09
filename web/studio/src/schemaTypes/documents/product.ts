import {defineType, defineField, defineArrayMember} from 'sanity'
import {BasketIcon} from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (rule) => rule.required().warning('Alt text is important for SEO'),
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'productCategory'}],
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price (PHP)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'servingSize',
      title: 'Serving Size',
      type: 'string',
      description: 'e.g., "1 bilao = 1kg"',
    }),
    defineField({
      name: 'servesCount',
      title: 'Serves (number of people)',
      type: 'string',
      description: 'e.g., "Serves 8-10 people"',
    }),
    defineField({
      name: 'addOns',
      title: 'Available Add-ons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'productAddOn'}],
        }),
      ],
    }),
    defineField({
      name: 'seasonings',
      title: 'Available Seasonings',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'seasoning'}],
        }),
      ],
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'nutritionInfo',
      title: 'Nutrition Information',
      type: 'object',
      fields: [
        defineField({name: 'calories', type: 'string', title: 'Calories'}),
        defineField({name: 'protein', type: 'string', title: 'Protein'}),
        defineField({name: 'carbs', type: 'string', title: 'Carbohydrates'}),
        defineField({name: 'fat', type: 'string', title: 'Fat'}),
      ],
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for Order',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'preparationTime',
      title: 'Preparation Time',
      type: 'string',
      description: 'e.g., "2-3 hours advance order"',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'basePrice',
    },
    prepare({title, media, price}) {
      return {
        title: title || 'Untitled Product',
        subtitle: price ? `₱${price}` : 'No price set',
        media,
      }
    },
  },
})
