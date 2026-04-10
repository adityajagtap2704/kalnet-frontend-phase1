import { NavLink, Stat } from "@/types";

export const COMPANY = {
  name: "Zentrix",
  tagline: "Engineering Digital Infrastructure",
  description:
    "We build the systems that power modern businesses — from cloud platforms to secure enterprise applications.",
  founded: 2016,
  email: "hello@zentrix.in",
  phone: "+91 80 4953 2200",
  address: "Zentrix, Gachibowli, Hyderabad, Telangana 500032",
  social: {
    linkedin: "https://linkedin.com/company/zentrix",
    twitter: "https://twitter.com/zentrix_tech",
    github: "https://github.com/zentrix-tech",
    instagram: "https://instagram.com/zentrix.tech",
  },
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Development", href: "/services/mobile-development" },
      { label: "Cloud Solutions", href: "/services/cloud-solutions" },
      { label: "Cybersecurity", href: "/services/cybersecurity" },
      { label: "Data & Analytics", href: "/services/data-analytics" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
    ],
  },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
];

export const STATS: Stat[] = [
  { label: "Projects Delivered", value: 520, suffix: "+" },
  { label: "Active Clients", value: 180, suffix: "+" },
  { label: "Engineers", value: 65, suffix: "+" },
  { label: "Years Running", value: 8, suffix: "+" },
];
