import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'api.microlink.io'
      }
    ]
  }
};

export default nextConfig;
