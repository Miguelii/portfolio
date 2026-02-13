import Script from 'next/script'
import { PersonSchema, WebSiteSchema } from '../structured-data'
import { getBuildId } from '../../utils/get-build-id'
import { GTM_ID } from '../../utils/constants'

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
            <Script
                id="gtm-script"
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

                    gtag('consent', 'default', {
                        'ad_storage': 'denied',
                        'analytics_storage': 'denied',
                    });

                    gtag('config', '${GTM_ID}', { 
                        'cookie_prefix': 'stats',
                        'cookie_flags': 'SameSite=Strict;Secure',
                    });
				`,
                }}
            />
        </>
    )
}
