export default {
	name: 'aboutSection',
	title: 'About Page Sections',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Section Title',
			type: 'string',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'chapterLabel',
			title: 'Chapter Label',
			type: 'string',
			description: 'e.g. "Chapter One", "Chapter Two"',
		},
		{
			name: 'body',
			title: 'Body Text',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					marks: {
						decorators: [
							{ title: 'Bold', value: 'strong' },
							{ title: 'Italic', value: 'em' },
						],
					},
				},
			],
		},
		{
			name: 'pullQuote',
			title: 'Pull Quote',
			type: 'text',
			description: 'Highlighted quote displayed in the chapter',
		},
		{
			name: 'order',
			title: 'Display Order',
			type: 'number',
			validation: (Rule: any) => Rule.required(),
		},
	],
	preview: {
		select: { title: 'title', order: 'order', chapter: 'chapterLabel' },
		prepare(selection: any) {
			const { title, order, chapter } = selection;
			return {
				title: `${order}. ${title}`,
				subtitle: chapter || '',
			};
		},
	},
};
