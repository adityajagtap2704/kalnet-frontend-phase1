import { render, screen } from "@testing-library/react";
import TiltCard from "@/components/ui/TiltCard";

describe("TiltCard", () => {
  it("renders children", () => {
    render(<TiltCard>Card content</TiltCard>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TiltCard className="custom-class">Content</TiltCard>);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders without crashing with default props", () => {
    const { container } = render(<TiltCard>Default</TiltCard>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
