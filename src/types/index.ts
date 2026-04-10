export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  technologies: string[];
  image?: string;
  accentColor?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: CourseLevel;
  price: number;
  curriculum: CurriculumModule[];
  instructor: string;
  enrolledCount: number;
  rating: number;
  image?: string;
  tags: string[];
}

export enum CourseLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

export interface CurriculumModule {
  title: string;
  topics: string[];
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData extends AuthCredentials {
  name: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  joinedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  theme: "light" | "dark";
  mobileMenuOpen: boolean;
  activeModal: string | null;
  toasts: Toast[];
}

export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
  pagination?: PaginationMeta;
};

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export type Nullable<T> = T | null;

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
