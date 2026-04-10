import { NavLink } from "@/types";

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
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
