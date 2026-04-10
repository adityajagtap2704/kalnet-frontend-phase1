import { render, screen } from "@testing-library/react";
import Card from "@/components/ui/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    const { container } = render(<Card>Default</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("bg-white");
  });

  it("applies glass variant", () => {
    const { container } = render(<Card variant="glass">Glass</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("glass");
  });

  it("applies bordered variant", () => {
    const { container } = render(<Card variant="bordered">Bordered</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border");
  });

  it("applies hoverable class when prop is set", () => {
    const { container } = render(<Card hoverable>Hoverable</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("card-hover");
  });

  it("does not apply hoverable class by default", () => {
    const { container } = render(<Card>Not Hoverable</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain("card-hover");
  });

  it("applies padding styles", () => {
    const { container } = render(<Card padding="lg">Large Padding</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("p-8");
  });

  it("applies no padding when padding is none", () => {
    const { container } = render(<Card padding="none">No Padding</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain("p-4");
    expect(card.className).not.toContain("p-6");
    expect(card.className).not.toContain("p-8");
  });

  it("passes custom className", () => {
    const { container } = render(
      <Card className="custom-class">Custom</Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom-class");
  });
});
