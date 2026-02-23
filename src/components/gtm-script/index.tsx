import { GTM_ID } from '@/utils/constants'
import { getServerSideCookieConsent } from '@/utils/get-server-side-cookie-consent'
import Script from 'next/script'

export async function GtmScript() {
    const consentCookie = await getServerSideCookieConsent()

    const allowAnalytics = consentCookie?.analytics === true

    return (
        <>
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
                        'ad_storage': '${allowAnalytics ? 'granted' : 'denied'}',
                        'analytics_storage': '${allowAnalytics ? 'granted' : 'denied'}',
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
