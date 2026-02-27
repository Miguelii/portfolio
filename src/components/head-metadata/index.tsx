import { PersonSchema, WebSiteSchema } from '@/components/structured-data'
import { BAND_CARD_MODEL_URL, BAND_MIN_WIDTH } from '@/utils/constants'
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
                    href={BAND_CARD_MODEL_URL}
                    crossOrigin="anonymous"
                    fetchPriority="high"
                    media={`(min-width: ${BAND_MIN_WIDTH})`}
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
