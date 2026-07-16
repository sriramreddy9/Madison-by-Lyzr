import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
  // Advertise machine-readable resources to agents via RFC 8288 Link headers,
  // and mark markdown-negotiable responses so CDNs cache representations right.
  async headers() {
    const link = [
      '</sitemap.xml>; rel="sitemap"; type="application/xml"',
      '</index.md>; rel="alternate"; type="text/markdown"',
      '</llms.txt>; rel="alternate"; type="text/plain"; title="llms.txt"',
      '</.well-known/agent-card.json>; rel="service-desc"; type="application/json"',
    ].join(", ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Link", value: link },
          { key: "Vary", value: "Accept, Accept-Encoding" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
