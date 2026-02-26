import { PersonSchema, WebSiteSchema } from '@/components/structured-data'
import { getBuildId } from '@/utils/get-build-id'

const buildId = getBuildId()

export function HeadMetadata() {
    return (
        <>
            {/* eslint-disable-next-line @next/next/no-head-element */}
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    id="preload-card-model"
                    rel="preload"
                    as="fetch"
                    href="/models/card.glb"
                    crossOrigin="anonymous"
                    fetchPriority="high"
                />
                <PersonSchema />
                <WebSiteSchema />
                <link
                    rel="icon"
                    href={`/favicon.ico?v=${buildId}`}
                    type="image/x-icon"
                    sizes="32x32"
                />
            </head>
        </>
    )
}
