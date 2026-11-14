// SEO configuration in one place. layout.js, app/page.js and the JSON-LD all read from here,
// so the title, description and domain can never disagree with each other.

// Production domain (confirmed by the site owner): https://shezar.dev (no "www").
// NEXT_PUBLIC_SITE_URL can override it, e.g. for a preview deployment. The canonical URL, Open Graph URL,
// social image URLs, sitemap and structured data all follow this one value.
const FALLBACK_URL = "https://shezar.dev";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL).replace(/\/+$/, "");

export const SITE_NAME = "Shezar.dev";
export const PERSON_NAME = "Shezar Furqan";
export const JOB_TITLE = "Full-Stack Web Developer";

export const HOME_TITLE = "Shezar Furqan — Full-Stack Web Developer | Shezar.dev";
export const HOME_DESCRIPTION =
  "Shezar Furqan is a full-stack web developer building modern websites, e-commerce experiences, and custom web applications for businesses and ideas.";

// Only the profiles you listed for structured data (Discord is a community link, not a profile, so it is left out).
const SAME_AS = [
  "https://www.youtube.com/@shezar_dev",
  "https://www.linkedin.com/in/shezarfurqan/",
  "https://www.instagram.com/shezar.dev/",
  "https://github.com/ShezarFurqan",
];

// ---- app/layout.js ----------------------------------------------------------
// Site-wide defaults only. Canonical, Open Graph and Twitter are deliberately NOT set here, because
// they would be inherited by /work and /services and point at the homepage. Those pages keep their own titles.
export const ROOT_METADATA = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  // favicon.ico and apple-icon.png in /app are detected by Next.js on their own, so they are NOT repeated here.
  // These two PNGs must live in /public (files in /app with other names are not served).
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const ROOT_VIEWPORT = { themeColor: "#000119" };

// ---- app/page.js (homepage only) ---------------------------------------------
export const HOME_METADATA = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    // og:image comes from app/opengraph-image.png (Next.js file convention)
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    // twitter:image comes from app/twitter-image.png
  },
};

// ---- JSON-LD (Person + WebSite) ----------------------------------------------
export function buildJsonLd() {
  const personId = `${SITE_URL}/#person`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PERSON_NAME,
        url: SITE_URL,
        jobTitle: JOB_TITLE,
        description: "Full-stack web developer building websites, e-commerce experiences and custom web applications.",
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        inLanguage: "en",
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
    ],
  };
}