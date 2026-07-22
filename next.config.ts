import { loadSystemEnvs } from '@/env/load-system-envs'
import type { NextConfig } from 'next'

loadSystemEnvs()

const nextConfig: NextConfig = {
    turbopack: {
        rules: {
            '*.glsl': {
                loaders: ['raw-loader'],
                as: '*.js',
            },
        },
    },
    reactCompiler: true,
    experimental: {
        viewTransition: true,
        optimizePackageImports: [
            'motion',
            'three',
            '@radix-ui/react-hover-card',
            '@react-three/drei',
            '@react-three/fiber',
            '@react-three/rapier',
            'meshline',
            'jiti',
            'lenis',
            '@portabletext/react',
            '@sanity/vision',
            'next-sanity',
            'sanity',
            'usehooks-ts',
        ],
        inlineCss: true,
    },
    images: {
        qualities: [25, 50, 75, 100],
        remotePatterns: [
            {
                hostname: 'api.microlink.io',
            },
        ],
        localPatterns: [
            {
                pathname: '/assets/**',
            },
            {
                pathname: '/models/**',
            },
        ],
        minimumCacheTTL: 31536000, // 365 days
    },
    headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'Referrer-Policy', value: 'no-referrer' },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                    { key: 'X-Xss-Protection', value: '0' },
                ],
            },
        ]
    },
}

export default nextConfig
