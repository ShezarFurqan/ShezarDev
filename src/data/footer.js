// Footer content. URLs are exactly the ones provided; routes match the existing site.

// `section: true` = a homepage anchor (or the top of the homepage). These scroll smoothly when you're
// already on "/", and navigate to the homepage first when you're on another page such as /services.
export const FOOTER_NAV = [
  { label: "Home", href: "/", section: true },
  { label: "Work", href: "/#work", section: true },
  { label: "About", href: "/#about", section: true },
  { label: "Services", href: "/services", section: false },
  { label: "Contact", href: "/#contact", section: true },
];

export const SOCIALS = [
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@shezar_dev" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/shezarfurqan/" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/shezar.dev/" },
  { id: "github", label: "GitHub", href: "https://github.com/ShezarFurqan" },
  { id: "discord", label: "Discord", href: "https://discord.gg/ZcEpPKCMXF" },
];