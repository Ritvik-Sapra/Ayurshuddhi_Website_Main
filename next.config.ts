import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
