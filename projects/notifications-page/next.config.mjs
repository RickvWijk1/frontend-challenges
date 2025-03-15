/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["localhost"],
    // loader: "imgix",
    path: "/frontend-challenges/notifications-page/_next/static",
  },
  basePath: "/frontend-challenges/notifications-page",
  assetPrefix: "/frontend-challenges/notifications-page",
  output: "export",
  distDir: "../../dist/notifications-page",
};

export default nextConfig;
