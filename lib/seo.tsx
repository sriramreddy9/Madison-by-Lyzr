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
  alternateName: "Madison",
  url: SITE_URL,
  logo: `${SITE_URL}/images/architecture/glass-towers.jpg`,
  description:
    "Madison is the Agentic Banking OS: governed AI agents across every banking function, deployed in your perimeter with a full audit trail.",
  parentOrganization: {
    "@type": "Organization",
    name: "Lyzr",
    url: "https://www.lyzr.ai",
  },
  // Entity disambiguation for AI agents (sameAs → authoritative profiles).
  sameAs: [
    "https://www.lyzr.ai",
    "https://www.linkedin.com/company/lyzr-ai",
    "https://x.com/lyzrai",
    "https://github.com/LyzrCore",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@lyzr.ai",
    url: `${SITE_URL}/contact`,
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  areaServed: ["North America", "European Union", "Gulf / GCC", "India"],
} as const;

/**
 * The product itself, as a SoftwareApplication so agents can identify what
 * Madison is (not just who publishes it). Deployed in-perimeter; access is
 * provisioned per engagement, so `offers` describes an enterprise quote model
 * rather than a public self-serve price.
 */
export const SOFTWARE_APPLICATION = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Madison by Lyzr",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Agentic AI operating system for banking",
  operatingSystem:
    "On-premises, private cloud (VPC), or air-gapped — inside the institution's perimeter",
  url: SITE_URL,
  description:
    "The Agentic Banking OS: governed AI agents across commercial banking, compliant marketing, deal intelligence, dispute resolution, HR, and risk & compliance. Deployed in your perimeter with a human in the loop and a full, exportable audit trail.",
  provider: { "@id": `${SITE_URL}/#organization` },
  featureList: [
    "Commercial banking relationship management",
    "Compliant marketing campaign production",
    "Deal intelligence and evaluation",
    "Mortgage-servicing dispute resolution",
    "HR across the employee journey",
    "Third-party risk, vendor-AI, and model-risk governance",
    "In-perimeter / sovereign deployment (on-prem, VPC, air-gapped)",
    "Human-in-the-loop approval on every regulated step",
    "Exportable, tamper-evident audit trail",
    "BYO-LLM (Azure OpenAI, AWS Bedrock, or private models)",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description:
      "Enterprise, quote-based. Priced per engagement via a design-partner pilot; contact for pricing.",
    url: `${SITE_URL}/pricing`,
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
