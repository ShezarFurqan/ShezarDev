import { HOME_DESCRIPTION, SITE_NAME } from "@/data/site";

// Served at /manifest.webmanifest; Next.js adds the <link rel="manifest"> tag by itself.
// The two Android icons live in /public. display is "browser" because this is a portfolio site,
// not an installable app: the manifest is here for the icons and theme colour.
export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: HOME_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#000119",
    theme_color: "#000119",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}