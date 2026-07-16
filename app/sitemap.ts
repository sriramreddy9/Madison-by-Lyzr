import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const VERTICALS = [
  "/commercial-banking-rm",
  "/compliant-marketing",
  "/risk-compliance",
  "/deal-intelligence",
  "/dispute-resolution",
  "/hr",
];

const PAGES = ["/platform", "/pricing", "/about", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...VERTICALS.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PAGES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
