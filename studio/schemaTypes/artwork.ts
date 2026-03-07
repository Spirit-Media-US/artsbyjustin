export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Painting', value: 'painting' },
          { title: 'Drawing', value: 'drawing' },
          { title: 'Digital', value: 'digital' },
          { title: 'Mixed Media', value: 'mixed-media' },
          { title: 'Photography', value: 'photography' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'medium',
      title: 'Medium',
      type: 'string',
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'price',
      title: 'Price (in USD)',
      type: 'number',
      description: 'Leave empty if not for sale',
    },
    {
      name: 'available',
      title: 'Available for Sale',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
}
