import {defineType, defineField} from 'sanity'
import {AddIcon} from '@sanity/icons'

export const productAddOn = defineType({
  name: 'productAddOn',
  title: 'Product Add-on',
  type: 'document',
  icon: AddIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Add-on Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., "Extra Shrimp", "Squid", "Pork"',
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
    }),
    defineField({
      name: 'price',
      title: 'Additional Price (PHP)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Add-on Image',
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
    defineField({
      name: 'isAvailable',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      media: 'image',
    },
    prepare({title, price, media}) {
      return {
        title: title || 'Untitled Add-on',
        subtitle: price ? `+₱${price}` : 'No price set',
        media,
      }
    },
  },
})
