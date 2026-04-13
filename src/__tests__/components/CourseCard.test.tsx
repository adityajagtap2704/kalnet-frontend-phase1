import { render, screen } from "@testing-library/react";
import CourseCard from "@/components/features/CourseCard";
import { CourseLevel } from "@/types";
import type { Course } from "@/types";

const baseCourse: Course = {
  id: "c1",
  title: "React Fundamentals",
  description: "Learn the basics of React",
  duration: "8 weeks",
  level: CourseLevel.Beginner,
  price: 9999,
  curriculum: [],
  instructor: "Jane Doe",
  enrolledCount: 120,
  rating: 4.5,
  tags: ["react", "javascript"],
};

describe("CourseCard", () => {
  it("renders course title", () => {
    render(<CourseCard course={baseCourse} />);
    expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
  });

  it("renders course description", () => {
    render(<CourseCard course={baseCourse} />);
    expect(screen.getByText("Learn the basics of React")).toBeInTheDocument();
  });

  it("renders course level badge", () => {
    render(<CourseCard course={baseCourse} />);
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  it("renders course duration", () => {
    render(<CourseCard course={baseCourse} />);
    expect(screen.getByText("8 weeks")).toBeInTheDocument();
  });

  it("renders formatted price", () => {
    render(<CourseCard course={baseCourse} />);
    expect(screen.getByText(/9,999/)).toBeInTheDocument();
  });

  it("renders rating", () => {
    render(<CourseCard course={baseCourse} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renders enrolled count", () => {
    render(<CourseCard course={baseCourse} />);
    expect(screen.getByText(/120 enrolled/)).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(<CourseCard course={baseCourse} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("javascript")).toBeInTheDocument();
  });

  it("renders Intermediate level badge", () => {
    render(<CourseCard course={{ ...baseCourse, level: CourseLevel.Intermediate }} />);
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
  });

  it("renders Advanced level badge", () => {
    render(<CourseCard course={{ ...baseCourse, level: CourseLevel.Advanced }} />);
    expect(screen.getByText("Advanced")).toBeInTheDocument();
  });
});
