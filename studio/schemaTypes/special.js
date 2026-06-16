import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'special',
  title: 'Seasonal Special',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Price or Discount',
      type: 'string',
      description: 'e.g. "$10 off" or "Starting at $45"',
    }),
    defineField({
      name: 'image',
      title: 'Image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide this special without deleting it',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'image',
    },
  },
})
