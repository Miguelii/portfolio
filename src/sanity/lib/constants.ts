import type { StructureResolver } from 'sanity/structure'

export const apiVersion = '2026-03-11' as const

export const revalidateTime = 86400 // 24 hours in seconds

/** Document types that should be singletons (only one instance allowed) */
const SINGLETONS = new Set([
    'aboutSection',
    'landingSection',
    'privacyNoticeSection',
    'quoteSection',
    'workExperienceSection',
])

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // Singleton: Landing Section
            S.listItem()
                .title('Landing Section')
                .id('landingSection')
                .child(S.document().schemaType('landingSection').documentId('landingSection')),

            // Singleton: About Section
            S.listItem()
                .title('About Section')
                .id('aboutSection')
                .child(S.document().schemaType('aboutSection').documentId('aboutSection')),

            // Singleton: Work Experience Section
            S.listItem()
                .title('Work Experience Section')
                .id('workExperienceSection')
                .child(
                    S.document()
                        .schemaType('workExperienceSection')
                        .documentId('workExperienceSection')
                ),

            // Singleton: Quote Section
            S.listItem()
                .title('Quote Section')
                .id('quoteSection')
                .child(S.document().schemaType('quoteSection').documentId('quoteSection')),

            // Singleton: Privacy Notice Section
            S.listItem()
                .title('Privacy Notice Section')
                .id('privacyNoticeSection')
                .child(
                    S.document()
                        .schemaType('privacyNoticeSection')
                        .documentId('privacyNoticeSection')
                ),

            S.divider(),

            // All other document types (excluding singletons)
            ...S.documentTypeListItems().filter((item) => !SINGLETONS.has(item.getId() ?? '')),
        ])
