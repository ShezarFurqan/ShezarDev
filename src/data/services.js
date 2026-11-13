// All Services copy lives here so the homepage preview and /services never drift apart.
// Nothing in this file is a statistic, testimonial, price or timeline.

// Contact destination. There is no #contact section in the files I was given,
// so point this at wherever contact really lives (e.g. "/contact" or "mailto:...").
export const CONTACT_HREF = "/#contact";

export const SERVICES = [
  {
    id: "website",
    num: "01",
    label: "Websites",
    title: "Website Development",
    short:
      "Responsive, carefully built websites that present your business clearly and make it easy for visitors to get in touch.",
    tags: ["Business sites", "Landing pages", "Portfolios"],
    provides:
      "Business websites, corporate sites, landing pages and portfolios, designed around what your business needs to say and who needs to hear it.",
    solves: [
      "No online presence yet, or one that doesn't reflect the quality of your work",
      "Visitors can't quickly tell what you do or how to reach you",
      "A site that feels clumsy or breaks on phones",
    ],
    suitable:
      "Businesses, organizations, startups and individuals who need a professional, dependable presence online.",
    includes: [
      "Business & corporate websites",
      "Landing pages",
      "Portfolio websites",
      "Fully custom designs",
      "Layouts that work on every screen",
      "Content structure & navigation",
    ],
    outcome:
      "A finished, responsive website that presents you clearly and gives visitors an easy way to reach you.",
  },
  {
    id: "ecommerce",
    num: "02",
    label: "E-commerce",
    title: "E-Commerce Development",
    short:
      "Online stores on the platform that fits your business, from catalogue and checkout to the admin side you manage every day.",
    tags: ["Shopify", "WooCommerce", "Custom Next.js"],
    provides:
      "Stores built to match your requirements, your scale and the way you actually run orders, not a one-size-fits-all setup.",
    solves: [
      "Selling only through chats and calls, with orders hard to keep track of",
      "A store that is hard for you to update or manage",
      "Needing store features that a standard setup doesn't cover",
    ],
    suitable:
      "Businesses and brands that want to sell products online in a way they can manage comfortably.",
    includes: [
      "Product catalogues",
      "Product management",
      "Cart & checkout experience",
      "Order management",
      "Admin dashboards",
      "Payment & delivery integrations, where supported and required",
      "Custom store functionality",
    ],
    platforms: [
      {
        name: "Shopify",
        text: "A managed platform. Often a good fit when you want standard store features and little technical upkeep.",
      },
      {
        name: "WordPress / WooCommerce",
        text: "Flexible and widely used, especially if you already run WordPress or want to extend the store with plugins.",
      },
      {
        name: "Custom Next.js",
        text: "Built around your exact workflow. Suits stores that need custom features or admin tooling, with more development involved.",
      },
    ],
    outcome:
      "A reliable store your customers can shop from and you can run day to day, on a platform chosen for your requirements.",
  },
  {
    id: "systems",
    num: "03",
    label: "Systems",
    title: "Custom Web Applications & Digital Systems",
    short:
      "Web applications, dashboards and internal tools shaped around how your work actually runs.",
    tags: ["Dashboards", "Internal tools", "Portals"],
    provides:
      "I enjoy working out how a product should work, then building it. This is for requirements that a regular website can't meet.",
    solves: [
      "Work scattered across spreadsheets, chats and paper",
      "Repetitive manual tasks that should be a proper workflow",
      "Off-the-shelf software that doesn't fit how you operate",
    ],
    suitable:
      "Teams, founders and organizations with a process or an idea that needs software built around it.",
    includes: [
      "Custom web applications",
      "Business management systems",
      "Admin dashboards",
      "Internal tools",
      "Customer portals",
      "Workflow-based applications",
      "Data-driven applications",
    ],
    outcome:
      "A working system planned around your process and built to make the day-to-day work easier.",
  },
];

export const REDESIGN = {
  title: "Already have a website?",
  text: "I also improve existing websites, whether it needs a fresh look, a few fixes or a few new features.",
  items: [
    "Website redesign",
    "UI improvements",
    "Responsive improvements",
    "Performance optimization",
    "Usability improvements",
    "Feature enhancements",
    "Bug fixing",
  ],
};

export const PROCESS = [
  {
    title: "Understanding",
    text: "I learn about your business, who it serves and what the project needs to achieve, before any code is written.",
  },
  {
    title: "Planning",
    text: "We settle the scope, the features and the right approach or platform for your requirements.",
  },
  {
    title: "Development",
    text: "I build, test and refine the product, sharing progress updates and previews as the work moves forward.",
  },
  {
    title: "Delivery",
    text: "The finished work is delivered and I help with the handover, so you know how to use what you've received.",
  },
];

export const PROCESS_NOTE =
  "How long a project takes depends on its scope, complexity and requirements. Once I understand what you need, I'll tell you what is realistic.";


export const PRICING_FACTORS = [
  { title: "Project scope", text: "How many pages, screens or sections the project involves." },
  { title: "Required functionality", text: "What the product needs to actually do for you and your users." },
  { title: "Complexity", text: "How involved the logic, data and workflows are." },
  { title: "Platform & technology", text: "Shopify, WordPress or custom code each carry different amounts of work." },
  { title: "Integrations", text: "Payments, delivery or other services that need to connect." },
  { title: "Overall requirements", text: "Anything else specific to your business that shapes the build." },
];

export const FAQ = [
  {
    q: "What do you need from me to get started?",
    a: "A short description of your business, what you want the project to achieve and who it is for. If you have an existing website, brand material or examples you like, share those too. If you're not sure yet, that's fine; we can work it out together.",
  },
  {
    q: "How is the price decided?",
    a: "Every project is evaluated individually. The quotation depends on scope, required functionality, complexity, platform and technology, integrations and your overall requirements.",
  },
  {
    q: "How long will it take?",
    a: "It depends on the scope, complexity and requirements. After I understand what you need, I'll give you a realistic estimate instead of a number picked in advance.",
  },
  {
    q: "Can you redesign or improve my existing website?",
    a: "Yes. That can mean a redesign, UI and usability improvements, responsive fixes, performance work, new features or bug fixing.",
  },
  {
    q: "Can you build custom functionality?",
    a: "Yes, custom features and systems are a part of what I enjoy most. If something falls outside what I can build well, I'll tell you honestly.",
  },
  {
    q: "Will I see the work while it's being built?",
    a: "Yes. I share progress updates and previews during development, so you can see where things stand and give feedback.",
  },
  {
    q: "What happens after delivery?",
    a: "I help with the handover so you know how to use what's been delivered. Anything beyond that, such as ongoing support or changes, is something we can discuss for your project.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes. I work with local and international clients, as long as the requirements are a good match for what I can deliver.",
  },
];