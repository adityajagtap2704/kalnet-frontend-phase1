import { render, screen } from "@testing-library/react";
import Badge from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Beginner</Badge>);
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass("bg-surface-100");
  });

  it("applies brand variant", () => {
    const { container } = render(<Badge variant="brand">Brand</Badge>);
    expect(container.firstChild).toHaveClass("bg-brand-50");
  });

  it("applies accent variant", () => {
    const { container } = render(<Badge variant="accent">Accent</Badge>);
    expect(container.firstChild).toHaveClass("bg-accent-50");
  });

  it("applies success variant", () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.firstChild).toHaveClass("bg-emerald-50");
  });

  it("applies warning variant", () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.firstChild).toHaveClass("bg-amber-50");
  });

  it("applies sm size by default", () => {
    const { container } = render(<Badge>Small</Badge>);
    expect(container.firstChild).toHaveClass("px-2");
  });

  it("applies md size", () => {
    const { container } = render(<Badge size="md">Medium</Badge>);
    expect(container.firstChild).toHaveClass("px-2.5");
  });

  it("passes custom className", () => {
    const { container } = render(<Badge className="custom">Custom</Badge>);
    expect(container.firstChild).toHaveClass("custom");
  });
});
