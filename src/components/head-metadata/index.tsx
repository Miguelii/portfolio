import { PersonSchema, WebSiteSchema } from '../structured-data'
import { getBuildId } from '../../utils/get-build-id'
import { GTM_ID } from '../../utils/constants'

export function HeadMetadata() {
    const buildId = getBuildId()

    return (
        <>
            {/* eslint-disable-next-line @next/next/no-head-element */}
            <head>
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
                <script
                    id="gtm-script"
                    data-nscript="afterInteractive"
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
                ></script>
                <script
                    id="google-analytics"
                    data-nscript="afterInteractive"
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
            </head>
        </>
    )
}
