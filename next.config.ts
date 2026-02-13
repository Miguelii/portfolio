import { loadSystemEnvs } from '@/utils/load-system-envs'
import type { NextConfig } from 'next'

loadSystemEnvs()

const buildTimestamp = Date.now().toString()

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
        ],
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
        minimumCacheTTL: 2678400, // 31 days
    },
    env: {
        NEXT_PUBLIC_BUILD_TIMESTAMP: buildTimestamp,
    },
}

export default nextConfig
