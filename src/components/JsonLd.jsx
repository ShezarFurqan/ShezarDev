import { buildJsonLd } from "@/data/site";

// Server component: renders the structured data into the HTML itself (no client JS).
// "<" is escaped so no string inside the data can ever close the script tag early.
export default function JsonLd() {
  const json = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}