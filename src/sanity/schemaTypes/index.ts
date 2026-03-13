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
                            name: 'text',
                            title: 'Text',
                            type: 'array',
                            of: [{ type: 'block' }],
                            validation: (rule) => rule.required(),
                        }),
                    ],
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

const privacyNoticeSectionType = defineType({
    name: 'privacyNoticeSection',
    title: 'Privacy Notice Section',
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
                            name: 'text',
                            title: 'Text',
                            type: 'array',
                            of: [{ type: 'block' }],
                            validation: (rule) => rule.required(),
                        }),
                    ],
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

const quoteSectionType = defineType({
    name: 'quoteSection',
    title: 'Quote Section',
    type: 'document',
    fields: [
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'quote',
        },
    },
})

const workExperienceSectionType = defineType({
    name: 'workExperienceSection',
    title: 'Work Experience Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Work Experience Items',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'workExperienceItem',
                    title: 'Work Experience Item',
                    fields: [
                        defineField({
                            name: 'company',
                            title: 'Company',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'logoUrl',
                            title: 'Logo URL',
                            type: 'string',
                            description: 'Path to logo (e.g. "/assets/cgi.webp")',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'previewUrl',
                            title: 'Preview URL',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'totalTime',
                            title: 'Total Time',
                            type: 'string',
                            description: 'e.g. "Sep 2022 - Set 2025 · 3 yrs 1 mos"',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'positions',
                            title: 'Positions',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    name: 'position',
                                    title: 'Position',
                                    fields: [
                                        defineField({
                                            name: 'jobTitle',
                                            title: 'Job Title',
                                            type: 'string',
                                            validation: (rule) => rule.required(),
                                        }),
                                        defineField({
                                            name: 'timeLabel',
                                            title: 'Time Label',
                                            type: 'string',
                                            description: 'e.g. "May 2023 - Set 2025 · 2 yrs 5 mos"',
                                        }),
                                        defineField({
                                            name: 'achievements',
                                            title: 'Achievements',
                                            type: 'array',
                                            of: [
                                                defineArrayMember({
                                                    type: 'object',
                                                    name: 'achievement',
                                                    title: 'Achievement',
                                                    fields: [
                                                        defineField({
                                                            name: 'text',
                                                            title: 'Text',
                                                            type: 'array',
                                                            of: [{ type: 'block' }],
                                                            validation: (rule) => rule.required(),
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                    preview: {
                                        select: {
                                            title: 'jobTitle',
                                            subtitle: 'timeLabel',
                                        },
                                    },
                                }),
                            ],
                            validation: (rule) => rule.min(1),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'company',
                            subtitle: 'totalTime',
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

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        aboutSectionType,
        landingSectionType,
        privacyNoticeSectionType,
        quoteSectionType,
        workExperienceSectionType,
    ],
}
