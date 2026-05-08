import type { NextConfig } from "next";

// "as unknown as NextConfig" bypasses stale type stubs — serverActions is a
// valid runtime key in Next.js 15+ even though @types/next hasn't caught up.
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-slot"],
    serverActions: {
      bodySizeLimit: "4gb",
      allowedOrigins: ["192.168.1.28"],
    },
  },

  productionBrowserSourceMaps: false,
} as unknown as NextConfig;

export default nextConfig;
