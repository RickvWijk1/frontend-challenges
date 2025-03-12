/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  basePath: "/frontend-challenges/notifications-page",
  assetPrefix: "/frontend-challenges/notifications-page",
  output: "export",
  distDir: "../../dist/notifications-page",
};

export default nextConfig;
