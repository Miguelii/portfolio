import { loadEnv } from '@/lib/load-envs'
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
   experimental: {
      viewTransition: true,
      reactCompiler: true,
      webpackBuildWorker: true,
   },
   images: {
      remotePatterns: [
         {
            hostname: 'api.microlink.io',
         },
      ],
   },
   poweredByHeader: false,
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
