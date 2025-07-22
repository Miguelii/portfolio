import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.glsl": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  experimental: {
    viewTransition: true,
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "api.microlink.io",
      },
      {
        hostname: "localhost",
      },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
