import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  cacheComponents: true,
  images: {
    remotePatterns: [new URL("https://api.codingthailand.com/storage/**")],
  },
};

export default nextConfig;
