import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Courses",
  description: "Engineering courses designed and taught by practitioners. Small cohorts, real projects.",
};

// SSR page — static shell rendered server-side, courses loaded client-side via Redux
export default function CoursesPage() {
  return <CoursesClient />;
}
