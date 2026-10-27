import { type SchemaTypeDefinition } from 'sanity'
import { writingPostType } from '@/sanity/schemaTypes/writing-post'
import {
    aboutSectionType,
    landingSectionType,
    privacyNoticeSectionType,
    workExperienceSectionType,
} from './home-content'

export const schema = {
    types: [
        aboutSectionType,
        landingSectionType,
        privacyNoticeSectionType,
        workExperienceSectionType,
        writingPostType,
    ],
} satisfies { types: SchemaTypeDefinition[] }
