import { Course, CourseLevel } from "@/types";

export const courses: Course[] = [
  {
    id: "fe-bootcamp",
    title: "Frontend Engineering Bootcamp",
    description:
      "Go from zero to job-ready frontend developer in 12 weeks. Covers HTML, CSS, JavaScript, React, and Next.js with hands-on projects at every stage.",
    duration: "12 weeks",
    level: CourseLevel.Beginner,
    price: 14999,
    instructor: "Rahul Menon",
    enrolledCount: 342,
    rating: 4.8,
    tags: ["React", "Next.js", "JavaScript", "CSS"],
    curriculum: [
      {
        title: "Web Fundamentals",
        topics: [
          "HTML5 semantic elements",
          "CSS3 layout systems",
          "Responsive design with Tailwind",
          "Accessibility basics",
        ],
        duration: "2 weeks",
      },
      {
        title: "JavaScript Deep Dive",
        topics: [
          "ES6+ features",
          "Async programming",
          "DOM manipulation",
          "Error handling patterns",
        ],
        duration: "3 weeks",
      },
      {
        title: "React Ecosystem",
        topics: [
          "Component architecture",
          "Hooks and state management",
          "Routing and data fetching",
          "Testing with Jest",
        ],
        duration: "4 weeks",
      },
      {
        title: "Production Readiness",
        topics: [
          "Next.js SSR/SSG",
          "Performance optimization",
          "CI/CD pipelines",
          "Portfolio project",
        ],
        duration: "3 weeks",
      },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Professional",
    description:
      "Master AWS, Docker, Kubernetes, and Terraform. Build production infrastructure from scratch and learn the practices used at scale.",
    duration: "10 weeks",
    level: CourseLevel.Intermediate,
    price: 19999,
    instructor: "Priya Sharma",
    enrolledCount: 198,
    rating: 4.7,
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
    curriculum: [
      {
        title: "Cloud Fundamentals",
        topics: [
          "AWS core services",
          "Networking and security groups",
          "IAM and policies",
          "Cost management",
        ],
        duration: "2 weeks",
      },
      {
        title: "Containerization",
        topics: [
          "Docker deep dive",
          "Multi-stage builds",
          "Docker Compose",
          "Container registries",
        ],
        duration: "3 weeks",
      },
      {
        title: "Orchestration & IaC",
        topics: [
          "Kubernetes architecture",
          "Helm charts",
          "Terraform modules",
          "GitOps workflows",
        ],
        duration: "3 weeks",
      },
      {
        title: "Production Operations",
        topics: [
          "Monitoring with Prometheus",
          "Log aggregation",
          "Incident response",
          "Capacity planning",
        ],
        duration: "2 weeks",
      },
    ],
  },
  {
    id: "cybersec-fundamentals",
    title: "Cybersecurity Foundations",
    description:
      "Understand threats, build defences. Covers network security, application security, penetration testing fundamentals, and compliance frameworks.",
    duration: "8 weeks",
    level: CourseLevel.Beginner,
    price: 12999,
    instructor: "Arjun Nair",
    enrolledCount: 156,
    rating: 4.6,
    tags: ["Security", "Networking", "Penetration Testing", "Compliance"],
    curriculum: [
      {
        title: "Security Landscape",
        topics: [
          "Threat modelling",
          "Attack vectors",
          "Security frameworks",
          "Risk assessment",
        ],
        duration: "2 weeks",
      },
      {
        title: "Network Security",
        topics: [
          "Firewalls and IDS/IPS",
          "VPNs and encryption",
          "Network monitoring",
          "Wireless security",
        ],
        duration: "2 weeks",
      },
      {
        title: "Application Security",
        topics: [
          "OWASP Top 10",
          "Secure coding practices",
          "Authentication flaws",
          "Input validation",
        ],
        duration: "2 weeks",
      },
      {
        title: "Hands-On Lab",
        topics: [
          "Penetration testing tools",
          "Vulnerability scanning",
          "Report writing",
          "Remediation strategies",
        ],
        duration: "2 weeks",
      },
    ],
  },
  {
    id: "fullstack-ts",
    title: "Full-Stack TypeScript",
    description:
      "Build complete web apps with a single language. TypeScript on both frontend (Next.js) and backend (Node + Prisma), with end-to-end type safety.",
    duration: "14 weeks",
    level: CourseLevel.Intermediate,
    price: 17999,
    instructor: "Sneha Kulkarni",
    enrolledCount: 267,
    rating: 4.9,
    tags: ["TypeScript", "Node.js", "Prisma", "Next.js"],
    curriculum: [
      {
        title: "TypeScript Mastery",
        topics: [
          "Advanced types and generics",
          "Utility types",
          "Module systems",
          "Strict configurations",
        ],
        duration: "3 weeks",
      },
      {
        title: "Backend with Node.js",
        topics: [
          "Express/Fastify APIs",
          "Prisma ORM",
          "Authentication with JWT",
          "Error handling middleware",
        ],
        duration: "4 weeks",
      },
      {
        title: "Frontend with Next.js",
        topics: [
          "App Router architecture",
          "Server components",
          "Data fetching strategies",
          "State management",
        ],
        duration: "4 weeks",
      },
      {
        title: "Deployment & Testing",
        topics: [
          "E2E testing with Playwright",
          "CI/CD with GitHub Actions",
          "Vercel/Railway deployment",
          "Monitoring and logging",
        ],
        duration: "3 weeks",
      },
    ],
  },
  {
    id: "data-ml",
    title: "Data Engineering & ML Ops",
    description:
      "From raw data to production ML models. Learn Python, SQL, Spark, and MLflow to build data pipelines that actually ship.",
    duration: "16 weeks",
    level: CourseLevel.Advanced,
    price: 24999,
    instructor: "Vikram Desai",
    enrolledCount: 124,
    rating: 4.7,
    tags: ["Python", "Spark", "MLflow", "SQL"],
    curriculum: [
      {
        title: "Data Foundations",
        topics: [
          "SQL and relational design",
          "Python for data",
          "Pandas and NumPy",
          "Data quality patterns",
        ],
        duration: "4 weeks",
      },
      {
        title: "Pipeline Engineering",
        topics: [
          "Apache Spark",
          "Airflow orchestration",
          "Stream processing",
          "Data lake architecture",
        ],
        duration: "4 weeks",
      },
      {
        title: "Machine Learning",
        topics: [
          "Supervised/unsupervised models",
          "Feature engineering",
          "Model evaluation",
          "Hyperparameter tuning",
        ],
        duration: "4 weeks",
      },
      {
        title: "MLOps",
        topics: [
          "MLflow tracking",
          "Model serving",
          "A/B testing",
          "Monitoring and drift detection",
        ],
        duration: "4 weeks",
      },
    ],
  },
  {
    id: "ui-ux-intensive",
    title: "UI/UX Design Intensive",
    description:
      "Design thinking meets pixel craft. Learn research methods, Figma workflows, prototyping, and build a portfolio that gets callbacks.",
    duration: "8 weeks",
    level: CourseLevel.Beginner,
    price: 11999,
    instructor: "Ananya Joshi",
    enrolledCount: 213,
    rating: 4.8,
    tags: ["Figma", "Design Thinking", "Prototyping", "User Research"],
    curriculum: [
      {
        title: "Design Thinking",
        topics: [
          "User research methods",
          "Persona creation",
          "Journey mapping",
          "Problem framing",
        ],
        duration: "2 weeks",
      },
      {
        title: "Visual Design",
        topics: [
          "Typography and colour theory",
          "Layout and spacing systems",
          "Icon design",
          "Design tokens",
        ],
        duration: "2 weeks",
      },
      {
        title: "Figma Mastery",
        topics: [
          "Component architecture",
          "Auto layout",
          "Variables and styles",
          "Collaboration workflows",
        ],
        duration: "2 weeks",
      },
      {
        title: "Portfolio Sprint",
        topics: [
          "Case study structure",
          "Interactive prototypes",
          "Usability testing",
          "Handoff to developers",
        ],
        duration: "2 weeks",
      },
    ],
  },
];
