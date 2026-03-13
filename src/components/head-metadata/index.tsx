import { PersonSchema, WebSiteSchema } from '@/components/structured-data'
import { BAND_CARD_MODEL_URL } from '@/lib/constants'
import { getBuildId } from '@/lib/utils'

const buildId = getBuildId()

export function HeadMetadata() {
    return (
        <>
            {/* eslint-disable-next-line @next/next/no-head-element */}
            <head>
                <link
                    id="preload-glb-model"
                    rel="preload"
                    as="fetch"
                    href={`${BAND_CARD_MODEL_URL}?v=${buildId}`}
                    crossOrigin="anonymous"
                    fetchPriority="low"
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
