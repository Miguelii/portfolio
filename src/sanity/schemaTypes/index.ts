import { defineArrayMember, defineField, defineType, type SchemaTypeDefinition } from 'sanity'

const aboutSectionType = defineType({
    name: 'aboutSection',
    title: 'About Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'paragraphs',
            title: 'Paragraphs',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'paragraph',
                    title: 'Paragraph',
                    fields: [
                        defineField({
                            name: 'key',
                            title: 'Key',
                            type: 'string',
                            description: 'Unique identifier (e.g. "intro", "stack", "passion")',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'text',
                            title: 'Text',
                            type: 'array',
                            of: [{ type: 'block' }],
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'key',
                        },
                    },
                }),
            ],
            validation: (rule) => rule.min(1),
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})

const landingSectionType = defineType({
    name: 'landingSection',
    title: 'Landing Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
        },
    },
})

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [aboutSectionType, landingSectionType],
}
