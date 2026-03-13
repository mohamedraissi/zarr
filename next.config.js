/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    storageURL: process.env.NEXT_PUBLIC_STORAGE_URL || "http://localhost:8000",

  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "laravel.pixelstrap.net",
      },
      {
        protocol: "http",
        hostname: "laravel.pixelstrap.net",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
