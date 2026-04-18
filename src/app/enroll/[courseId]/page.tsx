import { Metadata } from "next";
import EnrollClient from "./EnrollClient";
import { courses } from "@/data/courses";

interface Props {
  params: { courseId: string };
}

export async function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = courses.find((c) => c.id === params.courseId);
  return {
    title: course ? `Enroll — ${course.title}` : "Enroll",
    description: course?.description ?? "Enroll in a Zentrix course.",
  };
}

export default function EnrollPage({ params }: Props) {
  return <EnrollClient courseId={params.courseId} />;
}
