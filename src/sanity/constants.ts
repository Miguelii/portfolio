import type { StructureResolver } from 'sanity/structure'

export const apiVersion = '2026-03-11' as const

/** Document types that should be singletons (only one instance allowed) */
const SINGLETONS = new Set(['aboutSection', 'landingSection'])

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

            S.divider(),

            // All other document types (excluding singletons)
            ...S.documentTypeListItems().filter((item) => !SINGLETONS.has(item.getId() ?? '')),
        ])
