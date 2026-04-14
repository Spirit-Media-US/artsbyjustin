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
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
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
			name: 'imageType',
			title: 'Image Type',
			type: 'string',
			description: 'What kind of image is this? Determines how it appears on the site.',
			options: {
				list: [
					{ title: 'Product Shot (art only)', value: 'product' },
					{ title: 'Social Proof (customer with art)', value: 'social_proof' },
					{ title: 'Installation (art in space)', value: 'installation' },
					{ title: 'Press / Media', value: 'press' },
					{ title: 'Artist Portrait', value: 'portrait' },
					{ title: 'Other', value: 'other' },
				],
			},
		},
		{
			name: 'medium',
			title: 'Medium',
			type: 'string',
			options: {
				list: [
					{ title: 'Resin Art', value: 'Resin Art' },
					{ title: 'Canvas & Paint', value: 'Canvas & Paint' },
					{ title: 'Fine Art Print', value: 'Fine Art Print' },
					{ title: 'String Art', value: 'String Art' },
					{ title: 'Mural & Installation', value: 'Mural & Installation' },
					{ title: 'Functional Art', value: 'Functional Art' },
					{ title: 'Mixed Media', value: 'Mixed Media' },
				],
			},
		},
		{
			name: 'category',
			title: 'Primary Subject',
			type: 'string',
			description: 'The main subject/theme of this piece',
			options: {
				list: [
					{ title: 'Sports & Motion', value: 'Sports & Motion' },
					{ title: 'Nature & Ocean', value: 'Nature & Ocean' },
					{ title: 'Abstract & Expressive', value: 'Abstract & Expressive' },
					{ title: 'Portraits & Figurative', value: 'Portraits & Figurative' },
					{ title: 'Faith & Inspiration', value: 'Faith & Inspiration' },
					{ title: 'Animals & Wildlife', value: 'Animals & Wildlife' },
				],
			},
		},
		{
			name: 'subjectTags',
			title: 'Subject Tags',
			type: 'array',
			of: [{ type: 'string' }],
			description:
				'Additional tags for cross-filtering (e.g. "basketball", "ocean waves", "gold leaf")',
			options: {
				layout: 'tags',
			},
		},
		{
			name: 'heroFeature',
			title: 'Feature in Hero Slideshow',
			type: 'boolean',
			initialValue: false,
			description: 'Show this artwork in the homepage hero rotation and cinematic viewer',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
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
			title: 'Price (USD)',
			type: 'number',
			description: 'Commission price at standard speed (2–4 weeks)',
		},
		{
			name: 'designTime',
			title: 'Design Time',
			type: 'string',
			description: 'Standard production timeline',
			initialValue: '2–4 weeks',
		},
		{
			name: 'available',
			title: 'Available for Commission',
			type: 'boolean',
			initialValue: true,
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
					{ title: 'Chase Your Dreams', value: 'chase' },
					{ title: 'Mixed Media & 3D', value: 'mixed' },
					{ title: 'Resin Art', value: 'resin' },
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
			name: 'forSale',
			title: 'For Sale in Shop',
			type: 'boolean',
			initialValue: false,
			description: 'Show this piece in the Shop page',
		},
		{
			name: 'shopCategory',
			title: 'Shop Category',
			type: 'string',
			description: 'Which section of the shop does this piece belong to?',
			options: {
				list: [
					{ title: 'Original Painting', value: 'original' },
					{ title: 'Resin Art', value: 'resin' },
					{ title: 'Fine Art Print', value: 'print' },
				],
			},
		},
		{
			name: 'shopPrice',
			title: 'Shop Price Label',
			type: 'string',
			description:
				'Price label shown in shop (e.g. "Price on Request", "Contact for pricing", "$1,200")',
		},
		{
			name: 'colorGradient',
			title: 'Color Gradient (placeholder)',
			type: 'string',
			description:
				'CSS gradient used as placeholder when no image is uploaded, e.g. linear-gradient(135deg,#000,#c9a84c)',
		},
		{
			name: 'externalImageUrl',
			title: 'External Image URL',
			type: 'url',
			description:
				'For print items whose images live on external CDNs (Cloudinary, etc.) rather than Sanity',
		},
	],
	preview: {
		select: { title: 'title', media: 'image', medium: 'medium', category: 'category' },
		prepare(selection: any) {
			const { title, media, medium, category } = selection;
			return {
				title,
				subtitle: [medium, category].filter(Boolean).join(' · '),
				media,
			};
		},
	},
};
