import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // output: "standalone",  // throws deployment error on vercel! keep it OFF.
};

export default nextConfig;
