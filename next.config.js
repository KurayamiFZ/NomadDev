const { withNextVideo } = require("next-video/process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-slot"],
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable React strict mode for development
  reactStrictMode: true,

  // Turbopack configuration (minimal)
  turbopack: {},

  // Disable source maps in production for smaller bundle
  productionBrowserSourceMaps: false,
};

module.exports = {
  allowedDevOrigins: ["192.168.1.28"],
};
