import { render, screen, fireEvent } from "@testing-library/react";
import FAQSection from "@/components/sections/FAQSection";

describe("FAQSection", () => {
  it("renders the section heading", () => {
    render(<FAQSection />);
    expect(screen.getByText(/frequently asked/i)).toBeInTheDocument();
  });

  it("renders all FAQ questions", () => {
    render(<FAQSection />);
    expect(screen.getByText(/what industries do you specialize/i)).toBeInTheDocument();
    expect(screen.getByText(/how do you handle project management/i)).toBeInTheDocument();
    expect(screen.getByText(/do you offer post-launch support/i)).toBeInTheDocument();
    expect(screen.getByText(/can you work with our existing/i)).toBeInTheDocument();
  });

  it("first FAQ answer is present in DOM by default", () => {
    render(<FAQSection />);
    // First item is open (openIndex=0), its answer should be in the DOM
    expect(screen.getByText(/we specialize in fintech/i)).toBeInTheDocument();
  });

  it("clicking a closed FAQ button does not throw", () => {
    render(<FAQSection />);
    const btn = screen.getByText(/how do you handle project management/i).closest("button")!;
    expect(() => fireEvent.click(btn)).not.toThrow();
  });

  it("clicking the open FAQ button does not throw", () => {
    render(<FAQSection />);
    const btn = screen.getByText(/what industries do you specialize/i).closest("button")!;
    expect(() => fireEvent.click(btn)).not.toThrow();
  });

  it("renders description text", () => {
    render(<FAQSection />);
    expect(screen.getByText(/find answers to common questions/i)).toBeInTheDocument();
  });
});
