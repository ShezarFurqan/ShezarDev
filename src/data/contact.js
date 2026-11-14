// Contact details and form options. Used by BOTH the form (browser) and the API route (server).

export const CONTACT = {
  // TODO: replace with your real email address. This is a placeholder, not a real address.
  email: "shezarfurqan@gmail.com",

  // TODO: paste your real profile URLs. A link with an empty href is hidden automatically,
  // so nothing fake is ever shown. For WhatsApp use https://wa.me/<number with country code, digits only>.
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shezarfurqan/" },
    { label: "GitHub", href: "https://github.com/ShezarFurqan" },
    { label: "WhatsApp", href: "https://api.whatsapp.com/send/?phone=3186634031&text&type=phone_number&app_absent=0" },
  ],
};

export const PROJECT_TYPES = [
  "Website Development",
  "E-Commerce Development",
  "Custom Web Application",
  "Website Redesign",
  "Other",
];

export const LIMITS = { name: 100, email: 254, message: 5000, minMessage: 10 };