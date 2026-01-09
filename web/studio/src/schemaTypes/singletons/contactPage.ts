import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

/**
 * Contact Page schema for the Contact Us section.
 * This is a singleton - only one contact page should exist.
 */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main heading displayed on the page',
      initialValue: 'Get in Touch',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Short description under the hero title',
      initialValue: "We'd love to hear from you! Whether you have a question, feedback, or want to place a large order, we're here to help.",
    }),
    defineField({
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Contact Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Phone', value: 'phone'},
                  {title: 'Email', value: 'email'},
                  {title: 'Address', value: 'address'},
                  {title: 'Hours', value: 'hours'},
                  {title: 'Social Media', value: 'social'},
                  {title: 'Other', value: 'other'},
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'e.g., "Call Us", "Email Us", "Visit Us"',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The actual phone number, email, address, etc.',
            }),
            defineField({
              name: 'additionalInfo',
              title: 'Additional Info',
              type: 'text',
              rows: 2,
              description: 'e.g., "Mon-Sun 8AM-8PM"',
            }),
            defineField({
              name: 'icon',
              title: 'Icon Emoji',
              type: 'string',
              description: 'An emoji to represent this contact method (e.g., 📞, ✉️, 📍)',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              value: 'value',
              icon: 'icon',
            },
            prepare({title, value, icon}) {
              return {
                title: `${icon || '•'} ${title}`,
                subtitle: value,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'storeLocation',
      title: 'Store Location',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Our Location',
        }),
        defineField({
          name: 'address',
          title: 'Full Address',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'googleMapsUrl',
          title: 'Google Maps Embed URL',
          type: 'url',
          description: 'Paste the Google Maps embed URL (from Google Maps > Share > Embed a map)',
        }),
        defineField({
          name: 'directionsUrl',
          title: 'Directions URL',
          type: 'url',
          description: 'Link to Google Maps directions',
        }),
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'days',
              title: 'Day(s)',
              type: 'string',
              description: 'e.g., "Monday - Friday", "Saturday", "Sunday"',
            }),
            defineField({
              name: 'hours',
              title: 'Hours',
              type: 'string',
              description: 'e.g., "8:00 AM - 8:00 PM", "Closed"',
            }),
            defineField({
              name: 'isClosed',
              title: 'Is Closed',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              days: 'days',
              hours: 'hours',
              isClosed: 'isClosed',
            },
            prepare({days, hours, isClosed}) {
              return {
                title: days,
                subtitle: isClosed ? 'Closed' : hours,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contactFormSettings',
      title: 'Contact Form Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showContactForm',
          title: 'Show Contact Form',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'formTitle',
          title: 'Form Title',
          type: 'string',
          initialValue: 'Send us a message',
        }),
        defineField({
          name: 'formDescription',
          title: 'Form Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Send Message',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'string',
          initialValue: 'Thank you! Your message has been sent successfully.',
        }),
      ],
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({
          name: 'showFaq',
          title: 'Show FAQ Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Frequently Asked Questions',
        }),
        defineField({
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'text',
                  rows: 4,
                }),
              ],
              preview: {
                select: {
                  title: 'question',
                  subtitle: 'answer',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Twitter/X', value: 'twitter'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'LinkedIn', value: 'linkedin'},
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Contact Page',
        subtitle: 'Singleton',
      }
    },
  },
})
