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
    {
      name: 'series',
      title: 'Series',
      type: 'string',
      description: 'Which series does this artwork belong to?',
      options: {
        list: [
          { title: 'Chase Your Dreams',  value: 'chase' },
          { title: 'Mixed Media & 3D',   value: 'mixed' },
          { title: 'Resin Art',          value: 'resin' },
          { title: 'Murals & Community', value: 'mural' },
        ],
      },
    },
    {
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this piece as sold — shows a Sold badge on the site',
    },
    {
      name: 'colorGradient',
      title: 'Color Gradient (placeholder)',
      type: 'string',
      description: 'CSS gradient used as placeholder when no image is uploaded, e.g. linear-gradient(135deg,#000,#c9a84c)',
    },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
}
