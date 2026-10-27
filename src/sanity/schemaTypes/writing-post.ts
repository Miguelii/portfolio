import { defineArrayMember, defineField, defineType } from 'sanity'

const CODE_LANGUAGES = [
    { title: 'TypeScript', value: 'typescript' },
    { title: 'TSX', value: 'tsx' },
    { title: 'JavaScript', value: 'javascript' },
    { title: 'JSON', value: 'json' },
    { title: 'CSS', value: 'css' },
    { title: 'HTML', value: 'html' },
    { title: 'Shell', value: 'sh' },
    { title: 'Plain text', value: 'text' },
]

export const writingPostType = defineType({
    name: 'writingPost',
    title: 'Writing Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'date',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'text',
            rows: 3,
            description: 'Used for the meta description and social previews',
            validation: (rule) => rule.required().max(200),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Heading', value: 'h2' },
                    ],
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                    },
                }),
                defineArrayMember({
                    type: 'object',
                    name: 'codeBlock',
                    title: 'Code Block',
                    fields: [
                        defineField({
                            name: 'code',
                            title: 'Code',
                            type: 'code',
                            options: {
                                language: 'typescript',
                                languageAlternatives: CODE_LANGUAGES,
                            },
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                            description: 'Optional line shown under the code block',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'caption',
                            subtitle: 'code.language',
                        },
                        prepare: ({ title, subtitle }) => ({
                            title: title ?? 'Code block',
                            subtitle,
                        }),
                    },
                }),
            ],
            validation: (rule) => rule.required().min(1),
        }),
    ],
    orderings: [
        {
            title: 'Published, newest first',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'publishedAt',
        },
    },
})
