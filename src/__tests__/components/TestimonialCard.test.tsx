import { render, screen } from "@testing-library/react";
import TestimonialCard from "@/components/features/TestimonialCard";
import type { Testimonial } from "@/types";

const testimonial: Testimonial = {
  id: "t1",
  name: "Alice Johnson",
  role: "CTO",
  company: "TechCorp",
  content: "Absolutely fantastic service and team.",
  avatar: "",
  rating: 5,
};

describe("TestimonialCard", () => {
  it("renders testimonial content", () => {
    render(<TestimonialCard testimonial={testimonial} />);
    expect(screen.getByText(/Absolutely fantastic service/)).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<TestimonialCard testimonial={testimonial} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
  });

  it("renders role and company", () => {
    render(<TestimonialCard testimonial={testimonial} />);
    expect(screen.getByText("CTO, TechCorp")).toBeInTheDocument();
  });

  it("renders avatar initial", () => {
    render(<TestimonialCard testimonial={testimonial} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders 5 stars for rating 5", () => {
    const { container } = render(<TestimonialCard testimonial={testimonial} />);
    const stars = container.querySelectorAll("svg.text-amber-400");
    expect(stars).toHaveLength(5);
  });

  it("renders partial stars for rating 3", () => {
    const { container } = render(
      <TestimonialCard testimonial={{ ...testimonial, rating: 3 }} />
    );
    const filledStars = container.querySelectorAll("svg.text-amber-400");
    expect(filledStars).toHaveLength(3);
  });
});
