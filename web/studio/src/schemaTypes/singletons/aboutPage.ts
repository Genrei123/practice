import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons'

/**
 * About Page schema for the About Us section.
 * This is a singleton - only one about page should exist.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'About Us',
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
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main heading displayed on the hero section',
      initialValue: 'Our Story',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Short description under the hero title',
    }),
    defineField({
      name: 'mainContent',
      title: 'Main Content',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The main body content of the about page',
    }),
    defineField({
      name: 'mission',
      title: 'Our Mission',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Mission',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Our Vision',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Vision',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'values',
      title: 'Our Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Value Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon Emoji',
              type: 'string',
              description: 'An emoji to represent this value (e.g., ❤️, 🌟, 🍳)',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              icon: 'icon',
            },
            prepare({title, subtitle, icon}) {
              return {
                title: `${icon || '•'} ${title}`,
                subtitle,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'teamSection',
      title: 'Team Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Meet Our Team',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'showTeam',
          title: 'Show Team Members',
          type: 'boolean',
          initialValue: true,
          description: 'Toggle to show/hide team members section',
        }),
        defineField({
          name: 'teamMembers',
          title: 'Team Members',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                }),
                defineField({
                  name: 'role',
                  title: 'Role/Position',
                  type: 'string',
                }),
                defineField({
                  name: 'bio',
                  title: 'Short Bio',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'image',
                  title: 'Photo',
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                    }),
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'role',
                  media: 'image',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          initialValue: 'Ready to taste the difference?',
        }),
        defineField({
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Order Now',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
          initialValue: '/products',
        }),
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
        title: 'About Page',
        subtitle: 'Singleton',
      }
    },
  },
})
