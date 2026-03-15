export default {
  name: 'pressFeature',
  title: 'Press Feature',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publication',
      title: 'Publication Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Print Feature',    value: 'print' },
          { title: 'Digital Feature',  value: 'digital' },
          { title: 'Newspaper',        value: 'newspaper' },
          { title: 'Nomination',       value: 'nomination' },
        ],
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Description',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Date (display string)',
      type: 'string',
      description: 'e.g. "May 2022" or "January 15, 2026"',
    },
    {
      name: 'image',
      title: 'Feature Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Link to the original article',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show this feature prominently',
    },
  ],
  preview: {
    select: { title: 'publication', subtitle: 'title', media: 'image' },
  },
}
