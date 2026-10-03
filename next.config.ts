import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/chronicles",
        permanent: false,
      },
      // Retired pages; their story now lives in the chronicles
      { source: "/the-alchemist", destination: "/chronicles", permanent: true },
      { source: "/timeline", destination: "/chronicles", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "jpsamvksijttqeebimig.supabase.co",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
