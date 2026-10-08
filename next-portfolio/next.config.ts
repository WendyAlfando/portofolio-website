import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // app/global-not-found.tsx: 404 page for URLs outside /id and /en
    globalNotFound: true,
  },
  async redirects() {
    return [
      // Visitors whose browser prefers English land on /en, everyone else on /id
      {
        source: "/",
        has: [{ type: "header", key: "accept-language", value: "^en(?:-[A-Za-z]+)?(?:[,;].*)?$" }],
        destination: "/en",
        permanent: false,
      },
      { source: "/", destination: "/id", permanent: false },
      // URLs from the previous single-language version of the site
      { source: "/blog", destination: "/id/blog", permanent: true },
      { source: "/blog/:slug", destination: "/id/blog/:slug", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
