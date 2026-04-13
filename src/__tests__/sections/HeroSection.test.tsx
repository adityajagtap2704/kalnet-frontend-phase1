import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/sections/HeroSection";

describe("HeroSection", () => {
  it("renders the main heading text", () => {
    render(<HeroSection />);
    expect(document.body.textContent).toMatch(/webuildthetech/i);
  });

  it("renders the subheading", () => {
    render(<HeroSection />);
    expect(document.body.textContent).toMatch(/thatrunsyourbusiness/i);
  });

  it("renders Start a Project link", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", "/contact");
  });

  it("renders What We Do link", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: /what we do/i })).toHaveAttribute("href", "/services");
  });

  it("renders trusted by badge", () => {
    render(<HeroSection />);
    expect(screen.getByText(/trusted by 180\+/i)).toBeInTheDocument();
  });

  it("renders trust brand names", () => {
    render(<HeroSection />);
    expect(screen.getAllByText("MedVault").length).toBeGreaterThan(0);
    expect(screen.getAllByText("RetailEdge").length).toBeGreaterThan(0);
  });

  it("renders description paragraph", () => {
    render(<HeroSection />);
    expect(screen.getByText(/cloud infrastructure/i)).toBeInTheDocument();
  });
});
