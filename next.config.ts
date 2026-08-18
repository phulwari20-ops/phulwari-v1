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
      {
        source: '/birthdays',
        destination: '/kids-and-child-birthday-party',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
