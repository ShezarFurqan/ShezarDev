// All About-section copy lives here so it can be edited without touching the components.

// The one-line identity: split in two so the second half can be drawn as an outline.
export const IDENTITY = {
  lead: "Building toward",
  rest: "what I can't do yet.",
};

export const INTRO =
  "I'm Shezar, an 18-year-old full-stack developer. The short version of why I build.";

export const CHAPTERS = [
  {
    id: "mindset",
    label: "Mindset",
    title: "Everything I'm capable of.",
    body: [
      "I want to find the edge of what I'm capable of, then keep going. I'm drawn to things that look impossible, and I give every decision a reason.",
    ],
  },
  {
    id: "start",
    label: "The Beginning",
    title: "It started young.",
    body: [
      "My journey with technology began long before I understood what it meant to be a developer.",
      "I built my first website at just eight years old. It wasn't coded, but it sparked an interest that would eventually shape much of my life.",
      "Growing up, I spent countless hours in front of a screen — exploring, experimenting, learning, and discovering new things. Over time, I wanted to go beyond simply creating websites. I wanted to understand how they worked and how to build more advanced, capable, and refined digital experiences.",
      "That curiosity led me to learn programming.",
      "Since then, my journey has been one of continuous learning — from writing my first lines of code to improving the way I structure and build software, and eventually understanding what different clients and businesses actually need from a digital product.",
      "I've come a long way since that first website, but I'm still learning, still experimenting, and still pushing myself to build better things.",
    ],
  },
  {
    id: "clients",
    label: "Client work",
    title: "Your project, my responsibility.",
    body: [
      "A client's project isn't just another assignment. They deserve honesty, real effort, and the full value of what they pay for, and I consider their success part of mine.",
    ],
  },
  {
    id: "next",
    label: "The Vision",
    title: "Building beyond the browser.",
    body: [
      "My ambition extends beyond creating websites. I want to develop applications and SaaS products that address meaningful problems, deliver practical value, and become part of how people work and live.",
      "I'm working towards becoming a stronger problem solver — someone who can understand complex challenges, think critically, and turn ideas into reliable software solutions.",
    ],
    // Links this chapter back to the Selected Work section just above the About section:
    // the projects are where I am now, this chapter is where I'm heading.
    bridge: {
      href: "#work",
      from: "The work so far",
      to: "Products I want to build",
      label: "Back to the projects above",
    },
  },
  {
    id: "vision",
    label: "The long game",
    title: "A company worth building.",
    body: [
      "My biggest ambition is to build one of the world's leading technology companies. Not for the name, but for software that genuinely helps people. It's a long road, and I'm willing to walk it one project at a time.",
    ],
  },
];