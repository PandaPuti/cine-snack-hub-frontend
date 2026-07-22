import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // ⚡ OPTIMIZATION: Disable memory-heavy file system caching to stop RAM allocation crashes on Windows!
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
