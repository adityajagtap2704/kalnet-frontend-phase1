import { NavLink } from "@/types";

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Web Development",
        href: "/services/web-development",
        description: "React & Next.js web apps built for performance",
        icon: "Code",
        accent: "#3b82f6",
      },
      {
        label: "Cloud Architecture",
        href: "/services/cloud-architecture",
        description: "Scalable cloud solutions on AWS, Azure & GCP",
        icon: "Cloud",
        accent: "#10b981",
      },
      {
        label: "Mobile Development",
        href: "/services/mobile-development",
        description: "Cross-platform iOS & Android applications",
        icon: "Smartphone",
        accent: "#a855f7",
      },
      {
        label: "Cybersecurity",
        href: "/services/cybersecurity",
        description: "Security audits & penetration testing",
        icon: "Shield",
        accent: "#f43f5e",
      },
      {
        label: "Data & Analytics",
        href: "/services/data-analytics",
        description: "Turn raw data into actionable insights",
        icon: "BarChart",
        accent: "#06b6d4",
      },
      {
        label: "UI/UX Design",
        href: "/services/ui-ux-design",
        description: "Intuitive, beautiful digital experiences",
        icon: "Palette",
        accent: "#ec4899",
      },
    ] as NavLink[],
  },
  {
    label: "Courses",
    href: "/courses",
    children: [
      {
        label: "Web Development",
        href: "/courses",
        description: "HTML, CSS, React, Next.js & TypeScript",
        icon: "Monitor",
        accent: "#3b82f6",
      },
      {
        label: "Cloud & DevOps",
        href: "/courses",
        description: "AWS, Docker, Kubernetes & CI/CD pipelines",
        icon: "Cloud",
        accent: "#10b981",
      },
      {
        label: "Cybersecurity",
        href: "/courses",
        description: "Ethical hacking, OWASP & security fundamentals",
        icon: "Lock",
        accent: "#f43f5e",
      },
      {
        label: "Data Science",
        href: "/courses",
        description: "Python, ML, analytics & data visualisation",
        icon: "TrendingUp",
        accent: "#06b6d4",
      },
      {
        label: "UI/UX Design",
        href: "/courses",
        description: "Figma, design systems & user research",
        icon: "Layers",
        accent: "#ec4899",
      },
      {
        label: "Internship Programme",
        href: "/internship",
        description: "3-month paid internship on real projects",
        icon: "Award",
        accent: "#10b981",
      },
    ] as NavLink[],
  },
  { label: "Contact", href: "/contact" },
];

export const footerLinks: Record<string, NavLink[]> = {
  Services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Apps", href: "/services/mobile-development" },
    { label: "Cloud & DevOps", href: "/services/cloud-solutions" },
    { label: "Cybersecurity", href: "/services/cybersecurity" },
    { label: "Data & Analytics", href: "/services/data-analytics" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/about#careers" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  Training: [
    { label: "All Courses", href: "/courses" },
    { label: "Internship Programme", href: "/courses#internship" },
    { label: "Corporate Training", href: "/contact" },
  ],
};
