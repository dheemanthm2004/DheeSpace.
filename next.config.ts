

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, // Add this line
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

