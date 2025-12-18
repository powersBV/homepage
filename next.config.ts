import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Force localhost to avoid network interface detection issues
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
