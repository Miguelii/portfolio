import { loadEnv } from '@/utils/load-envs'
import type { NextConfig } from 'next'

loadEnv()

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
        webpackBuildWorker: true,
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
    },
    poweredByHeader: true,
    env: {
        NEXT_PUBLIC_BUILD_TIMESTAMP: buildTimestamp,
    },
}

export default nextConfig
