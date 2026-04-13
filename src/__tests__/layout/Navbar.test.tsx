import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Navbar", () => {
  it("renders ZENTRIX brand", () => {
    render(<Navbar />);
    expect(screen.getByText("ZENTRIX")).toBeInTheDocument();
  });

  it("renders main nav links", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /services/i })).toBeInTheDocument();
  });

  it("renders Log in link", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /log in/i })).toBeInTheDocument();
  });

  it("renders Get Started link", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /get started/i })).toBeInTheDocument();
  });

  it("renders theme toggle button", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /switch to/i })).toBeInTheDocument();
  });

  it("renders mobile menu toggle button", () => {
    render(<Navbar />);
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("opens mobile menu on hamburger click", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});
