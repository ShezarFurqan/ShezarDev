import { SITE_URL } from "@/data/site";

// Served at /sitemap.xml. Only the three real pages; the homepage sections (#work, #about...) are not separate URLs.
export default function sitemap() {
  return [{ url: SITE_URL }, { url: `${SITE_URL}/services` }, { url: `${SITE_URL}/work` }];
}