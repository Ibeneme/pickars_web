import type { JsonLdNode } from "@/utils/seo/schema";

/**
 * Renders a JSON-LD structured-data block.
 * `<` is escaped so content can never close the script tag early (XSS-safe).
 */
export default function JsonLd({ data }: { data: JsonLdNode }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
