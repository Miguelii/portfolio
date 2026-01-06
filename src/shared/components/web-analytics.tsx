import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { SpeedInsights as VercelSpeedInsights } from '@vercel/speed-insights/next'
import { GTM_ID } from '../utils/constants'

export function WebAnalytics() {
    return (
        <>
            <GoogleTagManager
                gtmId={GTM_ID}
                dataLayer={{
                    consent: {
                        default: {
                            analytics_storage: 'granted',
                            ad_storage: 'granted',
                        },
                    },
                }}
            />
            <VercelAnalytics />
            <VercelSpeedInsights />
        </>
    )
}
