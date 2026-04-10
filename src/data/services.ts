import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "s1",
    slug: "web-development",
    title: "Web Development",
    description: "Modern, high-performance web applications built with React and Next.js.",
    longDescription: "We build modern, high-performance web applications tailored to your business needs, utilizing the latest technologies like React, Next.js, and TypeScript.",
    icon: "Code",
    accentColor: "#3b82f6", // Blue
    features: ["Custom Web Apps", "Performance Optimization", "SEO Friendly", "Responsive Design"],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "s2",
    slug: "cloud-architecture",
    title: "Cloud Architecture",
    description: "Scalable cloud solutions using AWS, Azure, or GCP.",
    longDescription: "We design and implement scalable, secure, and cost-effective cloud architectures. Whether you are migrating to the cloud or building cloud-native applications, our experts can guide you.",
    icon: "Cloud",
    accentColor: "#10b981", // Emerald
    features: ["Cloud Migration", "Serverless Architecture", "DevOps Pipelines", "Infrastructure as Code"],
    technologies: ["AWS", "Azure", "GCP", "Docker", "Kubernetes"],
  },
  {
    id: "s3",
    slug: "mobile-development",
    title: "Mobile Development",
    description: "Cross-platform mobile applications for iOS and Android.",
    longDescription: "Reach your users wherever they are with our custom mobile applications. We specialize in cross-platform development using React Native to deliver a seamless experience on both iOS and Android.",
    icon: "Smartphone",
    accentColor: "#a855f7", // Purple
    features: ["Cross-Platform Apps", "Native Performance", "User-Centric UI/UX", "App Store Deployment"],
    technologies: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    id: "s4",
    slug: "cybersecurity",
    title: "Cybersecurity",
    description: "Protecting your digital assets with advanced security audits.",
    longDescription: "Our cybersecurity experts provide comprehensive security audits, penetration testing, and vulnerability assessments to ensure your digital infrastructure is secure against evolving threats.",
    icon: "Shield",
    accentColor: "#f43f5e", // Rose
    features: ["Security Audits", "Penetration Testing", "Vulnerability Assessment", "Compliance Checks"],
    technologies: ["Kali Linux", "OWASP", "Metasploit", "Nmap"],
  },
  {
    id: "s5",
    slug: "data-analytics",
    title: "Data & Analytics",
    description: "Turning raw data into actionable business insights.",
    longDescription: "Leverage the power of your data with our advanced analytics solutions. We build custom data pipelines and interactive dashboards to help you make data-driven decisions.",
    icon: "BarChart",
    accentColor: "#06b6d4", // Cyan
    features: ["Data Pipelines", "Predictive Analytics", "Custom Dashboards", "Big Data Processing"],
    technologies: ["Python", "Spark", "Tableau", "PowerBI"],
  },
  {
    id: "s6",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful digital experiences.",
    longDescription: "Our design team focuses on creating user-centric interfaces that are not only beautiful but also intuitive to use. We prioritize user experience to drive engagement and retention.",
    icon: "Palette",
    accentColor: "#ec4899", // Pink
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    technologies: ["Figma", "Adobe XD", "Sketch", "Framer"],
  }
];
