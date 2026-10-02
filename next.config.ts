import type { NextConfig } from "next";

// Content Security Policy for public pages. Inline scripts/styles stay allowed because the pages are
// statically rendered (nonces would force dynamic rendering). /admin and /api are excluded.
const publicCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://va.vercel-scripts.com https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://waenweb.com https://*.public.blob.vercel-storage.com https://images.unsplash.com https://www.gstatic.com https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  "connect-src 'self' https://www.google.com https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com",
  "frame-src https://www.google.com https://recaptcha.google.com https://www.recaptcha.net https://vercel.live",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

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
        source: "/((?!admin|api|wp-admin).*)",
        headers: [{ key: "Content-Security-Policy", value: publicCsp }],
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
