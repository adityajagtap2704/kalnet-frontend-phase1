import { render, screen } from "@testing-library/react";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

describe("TestimonialsSection", () => {
  it("renders section heading", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/what our clients say/i)).toBeInTheDocument();
  });

  it("renders client feedback label", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/client feedback/i)).toBeInTheDocument();
  });

  it("renders subheading description", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/let the work speak/i)).toBeInTheDocument();
  });
});
