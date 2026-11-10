import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // ⚡ OPTIMIZATION: Disable memory-heavy file system caching to stop RAM allocation crashes on Windows!
      config.cache = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      new URL('https://unsplash.com**'),
      new URL('https://unsplash.com'), 
    ],
  },
};

export default nextConfig;
