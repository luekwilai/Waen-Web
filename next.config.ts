import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Permanent (308) www -> apex redirect, used if the Vercel domain itself is not set to redirect.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.waenweb.com" }],
        destination: "https://waenweb.com/:path*",
        permanent: true,
      },
    ];
  },
  // Clean URL for the standalone preview page (direct link only — not linked anywhere on the main site)
  async rewrites() {
    return [
      { source: "/portfolio", destination: "/portfolio/index.html" },
      { source: "/home-2", destination: "/home-2.html" },
    ];
  },
  // Keep the direct-link page out of search engines
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/home-2",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/home-2.html",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
