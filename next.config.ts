import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  /* config options here */
};

export default nextConfig;
