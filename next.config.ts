import { loadEnv } from '@/shared/utils/load-envs'
import type { NextConfig } from 'next'

loadEnv()

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
        remotePatterns: [
            {
                hostname: 'api.microlink.io',
            },
        ],
        localPatterns: [
            {
                pathname: '/logos/**',
            },
            {
                pathname: '/assets/**',
            },
            {
                pathname: '/models/**',
            },
        ],
    },
    poweredByHeader: true,
    webpack: (config, { webpack }) => {
        const buildDate = new Date()

        const timeStamp = buildDate.getTime()

        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.NEXT_PUBLIC_BUILD_TIMESTAMP': timeStamp
                    ? JSON.stringify(String(timeStamp))
                    : null,
            })
        )

        return config
    },
}

export default nextConfig
