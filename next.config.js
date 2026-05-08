/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
