import { SITE_URL } from "@/data/site";

// Served at /robots.txt. Everything public is crawlable; only the contact API endpoint is excluded.
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}