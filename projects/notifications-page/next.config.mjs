/** @type {import('next').NextConfig} */

const withImages = require("next-images");
module.exports = withImages();

const nextConfig = {
  env: {
    PUBLIC_URL: "/frontend-challenges/notifications-page/",
  },
  images: {
    domains: ["localhost"],
    loader: "imgix",
    path: "/frontend-challenges/notifications-page/static",
  },
  basePath: "/frontend-challenges/notifications-page",
  assetPrefix: "/frontend-challenges/notifications-page",
  output: "export",
  distDir: "../../dist/notifications-page",
};

export default nextConfig;
