import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: open to search and AI-input agents; keep the API and the
      // bare demo out of the index.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/demo"],
      },
      // Named AI search / answer agents — explicitly welcome.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: ["/api/", "/demo"],
      },
      // Bulk training crawlers — restricted (tier differentiation).
      {
        userAgent: ["CCBot", "Bytespider", "Amazonbot", "Diffbot"],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
