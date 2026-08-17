import type { NextConfig } from "next";

const pagesBasePath = process.env.PAGES_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: pagesBasePath,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
