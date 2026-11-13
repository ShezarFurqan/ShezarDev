
const empty = {
  year: null,
  stack: [],
  description: null,
  url: null,
  desktopImage: null,
  mobileImage: null,
  intro: null,
  role: null,
  category: null,
  overview: null,
  contribution: null,
  features: [],
  details: [],
  gallery: [],
};

export const PROJECTS = [
  {
    slug: "lunora-pk",
    name: "Lunora Pk",
    featured: true,
    year: "2025",
    stack: [
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Firebase",
      "Cloudinary",
    ],
    description:
      "An e-commerce store for home and self-care products, featuring product discovery, wishlists, customer reviews, and a smooth shopping experience.",
    url: "https://www.lunorapk.com",
    desktopImage: "/lunora.png",
    mobileImage: null,
    intro:
      "A home and self-care e-commerce experience designed to make everyday shopping simple and accessible.",
    role: "Full-stack development",
    category: "E-commerce",
    overview: {
      what: "An online store selling bedsheets, comforters, pillow cases, handmade soaps, and hair oils.",
      problem:
        "The business needed an online presence where customers could explore products and place orders conveniently.",
      built:
        "A responsive e-commerce website with product listings, wishlist functionality, customer reviews, and cash-on-delivery support.",
    },
    contribution:
      "Developed the website using Next.js and Tailwind CSS, integrated Firebase for product and review data, implemented wishlist functionality, and used Cloudinary for product media.",
    features: [
      "Product browsing and category-based shopping",
      "Wishlist functionality using localStorage",
      "Customer reviews powered by Firebase",
      "Cash on Delivery support",
      "WhatsApp customer support",
      "Responsive shopping experience",
    ],
    details: [],
    gallery: [],
  },

  {
    slug: "ootd-designs",
    name: "OOTD Designs",
    featured: true,
    year: "2025",
    stack: [
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Firebase",
    ],
    description:
      "An e-commerce website built for a fashion brand, with product management and an admin panel for managing store content.",
    url: "https://ootddesigns.com",
    desktopImage: "/ootddesigns.png",
    mobileImage: null,
    intro:
      "A fashion e-commerce experience built to bring a brand's products into an accessible online store.",
    role: "Website development",
    category: "E-commerce",
    overview: {
      what: "An online fashion store with product browsing and store management capabilities.",
      problem:
        "The brand needed a dedicated website to showcase its products and manage its online store.",
      built:
        "A Next.js website with Firebase integration and an admin panel for managing products and store content.",
    },
    contribution:
      "Worked on the frontend, Firebase integration, and admin panel functionality.",
    features: [
      "Product listing and browsing",
      "Admin panel for product management",
      "Firebase integration",
      "Responsive website layout",
    ],
    details: [],
    gallery: [],
  },

  {
    slug: "scarpa-pk",
    name: "Scarpa.pk",
    featured: true,
    year: "2025",
    stack: [
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Firebase",
      "Cloudinary",
    ],
    description:
      "A luxury footwear e-commerce platform with product customization, reviews, order management, and an admin dashboard.",
    url: "https://scarpa.pk",
    desktopImage: "/scarpa.png",
    mobileImage: null,
    intro:
      "A luxury footwear store focused on presenting products through a polished digital shopping experience.",
    role: "Full-stack development",
    category: "E-commerce",
    overview: {
      what: "An online footwear store with a catalogue of products and customer-facing shopping features.",
      problem:
        "The business needed a platform to showcase its footwear collection and manage products, orders, and customer interactions.",
      built:
        "An e-commerce website with product customization, customer reviews, order handling, and an admin dashboard.",
    },
    contribution:
      "Worked on the Next.js application, Firebase-powered functionality, admin panel, product management, reviews, and Cloudinary media integration.",
    features: [
      "Product catalogue with 55 products",
      "Product customization",
      "Admin dashboard and product uploads",
      "Order management and Cash on Delivery",
      "Customer reviews stored in Firestore",
      "Cloudinary media integration",
      "Meta Pixel integration",
    ],
    details: [],
    gallery: [],
  },

  {
    slug: "snapflow",
    name: "SnapFlow",
    featured: false,
    year: null,
    stack: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
    ],
    description:
      "A MERN-stack social media application inspired by Instagram, built with user-focused social features.",
    url: null,
    desktopImage: "/SS2.png",
    mobileImage: null,
    intro:
      "A full-stack social application built to explore the architecture and functionality behind modern social platforms.",
    role: "Full-stack development",
    category: "Social Media Application",
    overview: {
      what: "A social media application with an experience inspired by Instagram.",
      problem:
        "The project explored how a complete social platform could be developed with a custom frontend and backend.",
      built:
        "A MERN-stack application with a React frontend, Node.js and Express backend, and MongoDB database.",
    },
    contribution:
      "Built the application as a full-stack project, working across the React frontend, backend APIs, and database.",
    features: [],
    details: [],
    gallery: [],
  },

  {
    slug: "tka-international",
    name: "TKA International",
    featured: false,
    year: null,
    stack: [
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
    ],
    description:
      "A business website frontend developed to present the company's services and online presence.",
    url: null,
    desktopImage: "/tka.png",
    mobileImage: null,
    intro:
      "A business-focused website frontend designed to present a professional online presence.",
    role: "Frontend development",
    category: "Business Website",
    overview: {
      what: "A corporate website frontend for TKA International.",
      problem:
        "The company needed a website frontend to communicate its business presence and services.",
      built:
        "A responsive static website frontend using Next.js and Tailwind CSS.",
    },
    contribution:
      "Developed the frontend and responsive layouts. Backend functionality was not part of my scope.",
    features: [
      "Responsive website layout",
      "Next.js frontend",
    ],
    details: [],
    gallery: [],
  },

  {
    slug: "enchantique-jewelio",
    name: "Enchantique Jewelio",
    featured: false,
    ...empty,
    desktopImage: "/SS1.png",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter(
  (project) => project.featured
);
