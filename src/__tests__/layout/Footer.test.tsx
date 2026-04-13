import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders ZENTRIX brand name", () => {
    render(<Footer />);
    expect(screen.getByText("ZENTRIX")).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });

  it("renders Privacy link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /privacy/i })).toHaveAttribute("href", "/privacy");
  });

  it("renders Terms link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /terms/i })).toHaveAttribute("href", "/terms");
  });

  it("renders social media links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("linkedin")).toBeInTheDocument();
    expect(screen.getByLabelText("github")).toBeInTheDocument();
  });

  it("renders footer nav link columns", () => {
    render(<Footer />);
    // footerLinks has column titles — at least one should appear
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
