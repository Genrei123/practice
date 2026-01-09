import {defineType, defineField} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export const seasoning = defineType({
  name: 'seasoning',
  title: 'Seasoning',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Seasoning Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., "Calamansi", "Soy Sauce Packet", "Chili Flakes"',
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
      description: 'Set to 0 if included for free',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
      name: 'isIncludedByDefault',
      title: 'Included by Default',
      type: 'boolean',
      initialValue: true,
      description: 'Is this seasoning included with the product by default?',
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
      included: 'isIncludedByDefault',
      media: 'image',
    },
    prepare({title, price, included, media}) {
      const subtitle = included
        ? 'Included'
        : price && price > 0
          ? `+₱${price}`
          : 'Free add-on'
      return {
        title: title || 'Untitled Seasoning',
        subtitle,
        media,
      }
    },
  },
})
