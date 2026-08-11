import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/faq',
        destination: '/legal/faq',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
