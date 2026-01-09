import {defineType, defineField, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const storeSettings = defineType({
  name: 'storeSettings',
  title: 'Store Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'storeName',
      title: 'Store Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short catchy phrase for your store',
    }),
    defineField({
      name: 'logo',
      title: 'Store Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
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
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main heading on the landing page',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtitle text below the hero title',
    }),
    defineField({
      name: 'featuredCategories',
      title: 'Featured Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'productCategory'}],
        }),
      ],
      description: 'Categories to highlight on the homepage',
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string', title: 'Title'}),
        defineField({name: 'content', type: 'text', title: 'Content'}),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({name: 'phone', type: 'string', title: 'Phone Number'}),
        defineField({name: 'email', type: 'string', title: 'Email Address'}),
        defineField({name: 'address', type: 'text', title: 'Store Address'}),
        defineField({
          name: 'operatingHours',
          type: 'string',
          title: 'Operating Hours',
          description: 'e.g., "Mon-Sun: 8AM - 8PM"',
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({name: 'facebook', type: 'url', title: 'Facebook'}),
        defineField({name: 'instagram', type: 'url', title: 'Instagram'}),
        defineField({name: 'twitter', type: 'url', title: 'Twitter/X'}),
        defineField({name: 'tiktok', type: 'url', title: 'TikTok'}),
      ],
    }),
    defineField({
      name: 'deliveryInfo',
      title: 'Delivery Information',
      type: 'object',
      fields: [
        defineField({
          name: 'minimumOrder',
          type: 'number',
          title: 'Minimum Order Amount (PHP)',
        }),
        defineField({
          name: 'deliveryFee',
          type: 'number',
          title: 'Base Delivery Fee (PHP)',
        }),
        defineField({
          name: 'freeDeliveryThreshold',
          type: 'number',
          title: 'Free Delivery Threshold (PHP)',
          description: 'Order amount for free delivery',
        }),
        defineField({
          name: 'deliveryAreas',
          type: 'array',
          title: 'Delivery Areas',
          of: [defineArrayMember({type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement Banner',
      type: 'object',
      fields: [
        defineField({name: 'enabled', type: 'boolean', title: 'Show Announcement'}),
        defineField({name: 'message', type: 'string', title: 'Announcement Message'}),
        defineField({
          name: 'type',
          type: 'string',
          title: 'Type',
          options: {
            list: [
              {title: 'Info', value: 'info'},
              {title: 'Warning', value: 'warning'},
              {title: 'Promo', value: 'promo'},
            ],
            layout: 'radio',
          },
          initialValue: 'info',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'storeName',
      media: 'logo',
    },
    prepare({title, media}) {
      return {
        title: title || 'Store Settings',
        media,
      }
    },
  },
})
