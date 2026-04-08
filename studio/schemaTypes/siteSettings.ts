export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'location',
      title: 'Location (City, State/Country)',
      type: 'string',
    },
    {
      name: 'foundingYear',
      title: 'Founding Year',
      type: 'number',
    },
    {
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    },
    {
      name: 'tiktokUrl',
      title: 'TikTok URL',
      type: 'url',
    },
    {
      name: 'heroImage',
      title: 'Hero Image (Homepage)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'aboutPortraitImage',
      title: 'About Page Portrait Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'commissionInfo',
      title: 'Commission Information',
      type: 'text',
    },
    {
      name: 'commissionTimeline',
      title: 'Commission Timeline',
      type: 'string',
      description: 'e.g., "8–12 weeks"',
    },
    {
      name: 'commissionsPerSeason',
      title: 'Commissions Per Season',
      type: 'string',
      description: 'e.g., "2–3"',
    },
    {
      name: 'ogImage',
      title: 'OG Image (for social sharing)',
      type: 'image',
      options: { hotspot: true },
      description: 'Image used for social media previews (OpenGraph)',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
            },
            {
              name: 'attribution',
              title: 'Attribution (e.g., "Collector, New York")',
              type: 'string',
            },
            {
              name: 'rating',
              title: 'Star Rating',
              type: 'string',
              description: 'e.g., "★★★★★"',
            },
          ],
        },
      ],
    },
    {
      name: 'shopLinks',
      title: 'Shop Platform Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Platform Name',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'artCategories',
      title: 'Art Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Category Name',
              type: 'string',
            },
            {
              name: 'gradient',
              title: 'Gradient CSS',
              type: 'string',
              description: 'e.g., "linear-gradient(135deg,#000,#001133,#003399,#cc2200)"',
            },
          ],
        },
      ],
    },
    {
      name: 'homePageStats',
      title: 'Home Page Statistics',
      type: 'object',
      fields: [
        {
          name: 'worksCreated',
          title: 'Works Created (e.g., 450+)',
          type: 'string',
        },
        {
          name: 'artShows',
          title: 'Art Shows (e.g., 26+)',
          type: 'string',
        },
        {
          name: 'countriesExhibited',
          title: 'Countries Exhibited (e.g., 8+)',
          type: 'string',
        },
      ],
    },
    {
      name: 'portfolioPageStats',
      title: 'Portfolio Page Statistics',
      type: 'object',
      fields: [
        {
          name: 'originalWorks',
          title: 'Original Works (e.g., 460+)',
          type: 'string',
        },
        {
          name: 'seriesCollections',
          title: 'Series & Collections (e.g., 5)',
          type: 'string',
        },
        {
          name: 'countriesExhibited',
          title: 'Countries Exhibited (e.g., 3)',
          type: 'string',
        },
        {
          name: 'storiesTold',
          title: 'Stories Told (e.g., ∞)',
          type: 'string',
        },
      ],
    },
    {
      name: 'pressPageStats',
      title: 'Press Page Statistics',
      type: 'object',
      fields: [
        {
          name: 'internationalAwards',
          title: 'International Awards (e.g., "1")',
          type: 'string',
        },
        {
          name: 'majorAwards',
          title: 'Major Awards & Honors (e.g., "3+")',
          type: 'string',
        },
        {
          name: 'pressFeatures',
          title: 'Press Features (e.g., "4+")',
          type: 'string',
        },
        {
          name: 'congressionalRecognition',
          title: 'Congressional Recognition (e.g., "1")',
          type: 'string',
        },
      ],
    },
    {
      name: 'etsyShopUrl',
      title: 'Etsy Shop URL',
      type: 'url',
    },
    {
      name: 'freeShippingRegion',
      title: 'Free Shipping Region',
      type: 'string',
      description: 'e.g., "the US"',
    },
    {
      name: 'printSpecifications',
      title: 'Print Specifications',
      type: 'text',
      description: 'Details about print quality, materials, etc.',
    },
  ],
}
