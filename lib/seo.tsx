import type { Thing, WithContext, Graph } from "schema-dts";

/**
 * Typed JSON-LD injection. Sanitizes `<` to prevent script-tag breakout,
 * per the Next.js JSON-LD guidance.
 */
export function JsonLd({ data }: { data: WithContext<Thing> | Graph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const SITE_URL = "https://madison.ai";
export const SITE_NAME = "Madison by Lyzr";

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Madison by Lyzr",
  url: SITE_URL,
  description:
    "Madison is the Agentic Banking OS: governed AI agents across every banking function, deployed in your perimeter with a full audit trail.",
  parentOrganization: {
    "@type": "Organization",
    name: "Lyzr",
  },
} as const;

/** Breadcrumbs for a vertical page: Madison → Solutions → <name>. */
export function verticalBreadcrumbs(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Madison", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: `${SITE_URL}/#solutions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  } as const;
}
