import { render, screen } from "@testing-library/react";
import CTASection from "@/components/sections/CTASection";

describe("CTASection", () => {
  it("renders heading", () => {
    render(<CTASection />);
    expect(screen.getByText(/ready to build/i)).toBeInTheDocument();
  });

  it("renders Get in Touch link", () => {
    render(<CTASection />);
    expect(screen.getByRole("link", { name: /get in touch/i })).toHaveAttribute("href", "/contact");
  });

  it("renders Explore Courses link", () => {
    render(<CTASection />);
    expect(screen.getByRole("link", { name: /explore courses/i })).toHaveAttribute("href", "/courses");
  });
});
