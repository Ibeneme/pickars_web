import {
  APP_SCREENSHOT_PATH,
  LOGO_PATH,
  OG_IMAGES,
  SITE,
  SOCIAL_LINKS,
  STORES,
  absoluteUrl,
} from "@/utils/seo/config";

export type JsonLdNode = Record<string, unknown>;

export const ids = {
  website: `${SITE.url}/#website`,
  organization: `${SITE.url}/#organization`,
  localBusiness: `${SITE.url}/#localbusiness`,
  mobileApp: `${SITE.url}/#mobileapp`,
} as const;

/** Wraps nodes in a single `@graph` document. */
export function graph(...nodes: JsonLdNode[]): JsonLdNode {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/* ------------------------------------------------------------------ */
/* Site-wide entities (rendered once, in the root layout)             */
/* ------------------------------------------------------------------ */

export function organizationSchema(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO_PATH),
    },
    image: absoluteUrl(OG_IMAGES.default),
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [
      ...SOCIAL_LINKS.map((s) => s.url),
      STORES.ios.url,
      STORES.android.url,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: "NG",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: [`${SITE.name} Logistics`, `${SITE.name} Dispatch`],
    description:
      "Dispatch riders and bike couriers for same-day delivery in Port Harcourt and Rivers State.",
    inLanguage: SITE.language,
    publisher: { "@id": ids.organization },
  };
}

/* ------------------------------------------------------------------ */
/* Page-level entities                                                */
/* ------------------------------------------------------------------ */

export function localBusinessSchema(): JsonLdNode {
  const allWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return {
    "@type": "LocalBusiness",
    "@id": ids.localBusiness,
    name: `${SITE.name} Dispatch Riders`,
    alternateName: `${SITE.name} Bike Couriers`,
    parentOrganization: { "@id": ids.organization },
    url: SITE.url,
    image: absoluteUrl(OG_IMAGES.default),
    logo: absoluteUrl(LOGO_PATH),
    description:
      "Dispatch riders and bike couriers for same-day parcel delivery, express package pickup and last-mile logistics across Port Harcourt and Rivers State.",
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₦₦",
    currenciesAccepted: "NGN",
    paymentAccepted: "Cash, Bank Transfer, Card, Mobile Money",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: SITE.mapUrl,
    // Dispatch riders are advertised as available 24/7 in the Help Center.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: allWeek,
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Port Harcourt",
        sameAs: "https://en.wikipedia.org/wiki/Port_Harcourt",
      },
      {
        "@type": "AdministrativeArea",
        name: "Rivers State",
        sameAs: "https://en.wikipedia.org/wiki/Rivers_State",
      },
      ...SITE.serviceAreas.map((name) => ({ "@type": "Place", name })),
    ],
    makesOffer: [
      {
        name: "Same-Day Dispatch Rider Delivery",
        description:
          "Book a dispatch rider for same-day parcel and package delivery in Port Harcourt.",
      },
      {
        name: "Express Bike Courier Service",
        description:
          "Fast bike courier for documents, food and packages across Rivers State.",
      },
      {
        name: "Last-Mile Delivery",
        description:
          "Doorstep delivery for businesses and individuals in Port Harcourt.",
      },
    ].map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        serviceType: "Courier service",
        provider: { "@id": ids.localBusiness },
        ...service,
      },
    })),
  };
}

export function mobileAppSchema(): JsonLdNode {
  return {
    "@type": "MobileApplication",
    "@id": ids.mobileApp,
    name: SITE.name,
    description:
      "Book dispatch riders, track parcels live and manage deliveries in Port Harcourt.",
    operatingSystem: "iOS, Android",
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
    image: absoluteUrl(APP_SCREENSHOT_PATH),
    screenshot: absoluteUrl(APP_SCREENSHOT_PATH),
    installUrl: [STORES.ios.url, STORES.android.url],
    author: { "@id": ids.organization },
    publisher: { "@id": ids.organization },
  };
}

export type Breadcrumb = { name: string; path: string };

export function breadcrumbSchema(path: string, trail: Breadcrumb[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })
    ),
  };
}

type WebPageInput = {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage";
  image?: string;
  /** Extra graph nodes that belong to this page (FAQs, app, …). */
  extra?: JsonLdNode[];
  breadcrumbs?: Breadcrumb[];
};

/** Complete JSON-LD document for an inner page: WebPage + breadcrumbs. */
export function pageSchema({
  path,
  name,
  description,
  type = "WebPage",
  image = OG_IMAGES.default,
  extra = [],
  breadcrumbs = [{ name, path }],
}: WebPageInput): JsonLdNode {
  const url = absoluteUrl(path);

  return graph(
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: SITE.language,
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.organization },
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    breadcrumbSchema(path, breadcrumbs),
    ...extra
  );
}

export type FaqEntry = { question: string; answer: string };

/** Only use with questions that are visibly rendered on the same page. */
export function faqSchema(path: string, entries: FaqEntry[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: entries.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
