export interface Skill {
  id: string;
  name: string;
  hours: number;
  resourcesCount: number;
}

export interface Phase {
  id: string;
  title: string;
  skills: Skill[];
}

export interface Resource {
  id: string;
  title: string;
  type: "free" | "paid";
  duration: string;
  description: string;
  link: string;
}

export interface Career {
  id: string;
  name: string;
  description: string;
  roadmap: Phase[];
  resources: Resource[];
}

export const careers: Career[] = [
  {
    id: "fullstack",
    name: "Full-Stack Developer",
    description: "Master both frontend and backend development to build complete web applications.",
    roadmap: [
      {
        id: "fs-phase-1",
        title: "Foundation",
        skills: [
          { id: "fs-skill-1", name: "HTML & CSS", hours: 40, resourcesCount: 5 },
          { id: "fs-skill-2", name: "JavaScript Fundamentals", hours: 60, resourcesCount: 8 },
        ],
      },
      {
        id: "fs-phase-2",
        title: "Frontend Development",
        skills: [
          { id: "fs-skill-3", name: "React.js", hours: 50, resourcesCount: 7 },
          { id: "fs-skill-4", name: "TypeScript", hours: 35, resourcesCount: 4 },
          { id: "fs-skill-5", name: "State Management", hours: 20, resourcesCount: 3 },
          { id: "fs-skill-6", name: "Testing & TDD", hours: 25, resourcesCount: 4 },
        ],
      },
      {
        id: "fs-phase-3",
        title: "Backend Development",
        skills: [
          { id: "fs-skill-7", name: "Node.js & Express", hours: 45, resourcesCount: 6 },
          { id: "fs-skill-8", name: "Databases (SQL & NoSQL)", hours: 40, resourcesCount: 5 },
          { id: "fs-skill-9", name: "REST APIs & GraphQL", hours: 30, resourcesCount: 4 },
        ],
      },
      {
        id: "fs-phase-4",
        title: "DevOps & Deployment",
        skills: [
          { id: "fs-skill-10", name: "Git & CI/CD", hours: 20, resourcesCount: 3 },
          { id: "fs-skill-11", name: "Docker & Cloud", hours: 35, resourcesCount: 5 },
          { id: "fs-skill-12", name: "System Design", hours: 30, resourcesCount: 4 },
        ],
      },
    ],
    resources: [
      {
        id: "fs-res-1",
        title: "The Odin Project - Full Stack Curriculum",
        type: "free",
        duration: "Self-paced",
        description: "A completely free, comprehensive curriculum covering full-stack web development.",
        link: "https://www.theodinproject.com/",
      },
      {
        id: "fs-res-2",
        title: "Full Stack Open",
        type: "free",
        duration: "2-4 months",
        description: "Deep dive into React, Redux, Node.js, MongoDB, GraphQL and TypeScript.",
        link: "https://fullstackopen.com/en/",
      },
      {
        id: "fs-res-3",
        title: "Frontend Masters - Full Stack Path",
        type: "paid",
        duration: "6+ months",
        description: "Premium video courses by industry experts covering every angle of full-stack engineering.",
        link: "https://frontendmasters.com/guides/full-stack/",
      },
    ],
  },
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Focus on creating beautiful, interactive user interfaces.",
    roadmap: [
      {
        id: "fe-phase-1",
        title: "Web Basics",
        skills: [
          { id: "fe-skill-1", name: "HTML, CSS, Web Accessibility", hours: 50, resourcesCount: 4 },
          { id: "fe-skill-2", name: "Advanced JavaScript", hours: 70, resourcesCount: 6 },
        ],
      },
      {
        id: "fe-phase-2",
        title: "Modern Frameworks",
        skills: [
          { id: "fe-skill-3", name: "React, Vue, or Angular", hours: 60, resourcesCount: 8 },
          { id: "fe-skill-4", name: "Modern CSS Methods (Tailwind, CSS-in-JS)", hours: 30, resourcesCount: 5 },
        ],
      },
      {
        id: "fe-phase-3",
        title: "Architecture & Optimization",
        skills: [
          { id: "fe-skill-5", name: "Web Performance", hours: 25, resourcesCount: 3 },
          { id: "fe-skill-6", name: "Testing (Vitest, Cypress)", hours: 35, resourcesCount: 4 },
        ],
      },
    ],
    resources: [
      {
        id: "fe-res-1",
        title: "CSS Tricks Almanac",
        type: "free",
        duration: "Reference",
        description: "The ultimate guide to every CSS selector and property.",
        link: "https://css-tricks.com/almanac/",
      },
      {
        id: "fe-res-2",
        title: "React Official Docs",
        type: "free",
        duration: "Interactive Tutorials",
        description: "Re-written from scratch to teach React deeply.",
        link: "https://react.dev/",
      },
    ],
  },
  {
    id: "backend",
    name: "Backend Developer",
    description: "Architect secure, scalable, and high-performance server systems and APIs.",
    roadmap: [
      {
        id: "be-phase-1",
        title: "Core Programming",
        skills: [
          { id: "be-skill-1", name: "Java, Go, Python, or Node.js", hours: 80, resourcesCount: 10 },
          { id: "be-skill-2", name: "Data Structures & Algorithms", hours: 100, resourcesCount: 7 },
        ],
      },
      {
        id: "be-phase-2",
        title: "Databases & Storage",
        skills: [
          { id: "be-skill-3", name: "Relational DBs (PostgreSQL)", hours: 50, resourcesCount: 5 },
          { id: "be-skill-4", name: "Caching (Redis) & NoSQL", hours: 30, resourcesCount: 3 },
        ],
      },
      {
        id: "be-phase-3",
        title: "APIs & Security",
        skills: [
          { id: "be-skill-5", name: "API Design (REST/gRPC)", hours: 40, resourcesCount: 6 },
          { id: "be-skill-6", name: "Authentication & Cryptography", hours: 35, resourcesCount: 4 },
        ],
      },
    ],
    resources: [
      {
        id: "be-res-1",
        title: "ByteByteGo System Design",
        type: "paid",
        duration: "Self-paced",
        description: "Everything you need to know about designing scalable backend systems.",
        link: "https://bytebytego.com/",
      },
      {
        id: "be-res-2",
        title: "PostgreSQL Tutorial",
        type: "free",
        duration: "2 weeks",
        description: "Learn Postgres step-by-step from zero to hero.",
        link: "https://www.postgresqltutorial.com/",
      },
    ],
  }
];

export function getCareerById(id: string): Career | undefined {
  return careers.find((c) => c.id === id);
}
