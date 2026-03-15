export default {
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Award Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'organization',
      title: 'Awarding Organization',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'type',
      title: 'Award Type',
      type: 'string',
      options: {
        list: [
          { title: 'International Award', value: 'international' },
          { title: 'Community Honor',     value: 'community' },
          { title: 'Congressional',       value: 'congressional' },
          { title: 'Platform Achievement', value: 'platform' },
          { title: 'Nomination',          value: 'nomination' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'icon',
      title: 'Icon (emoji)',
      type: 'string',
      description: 'Emoji to display next to the award, e.g. 🏆',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'organization' },
  },
}
