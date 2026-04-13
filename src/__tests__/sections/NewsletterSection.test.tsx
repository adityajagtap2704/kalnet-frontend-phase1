import { render, screen, fireEvent } from "@testing-library/react";
import NewsletterSection from "@/components/sections/NewsletterSection";

describe("NewsletterSection", () => {
  it("renders heading", () => {
    render(<NewsletterSection />);
    expect(screen.getByText(/stay ahead/i)).toBeInTheDocument();
  });

  it("renders email input", () => {
    render(<NewsletterSection />);
    expect(screen.getByPlaceholderText(/you@company\.com/i)).toBeInTheDocument();
  });

  it("renders subscribe button", () => {
    render(<NewsletterSection />);
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("renders no-spam disclaimer", () => {
    render(<NewsletterSection />);
    expect(screen.getByText(/no spam, ever/i)).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<NewsletterSection />);
    expect(screen.getByText(/monthly insights/i)).toBeInTheDocument();
  });

  it("does not crash on submit with empty email", () => {
    render(<NewsletterSection />);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /subscribe/i }))
    ).not.toThrow();
  });

  it("does not crash on submit with valid email", () => {
    render(<NewsletterSection />);
    fireEvent.change(screen.getByPlaceholderText(/you@company\.com/i), {
      target: { value: "user@test.com" },
    });
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /subscribe/i }))
    ).not.toThrow();
  });
});
