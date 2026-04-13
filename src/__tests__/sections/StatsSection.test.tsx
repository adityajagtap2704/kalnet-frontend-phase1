import { render, screen } from "@testing-library/react";
import StatsSection from "@/components/sections/StatsSection";
import { STATS } from "@/lib/constants";

jest.mock("@/hooks/useCountUp", () => ({
  useCountUp: ({ end }: { end: number }) => end,
}));

describe("StatsSection", () => {
  it("renders all stat labels", () => {
    render(<StatsSection />);
    STATS.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it("renders stat suffixes", () => {
    render(<StatsSection />);
    // Each stat has suffix "+" rendered inside the stat element
    const { container } = render(<StatsSection />);
    expect(container.textContent).toContain("+");
  });

  it("renders the section without crashing", () => {
    const { container } = render(<StatsSection />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
