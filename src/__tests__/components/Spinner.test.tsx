import { render, screen } from "@testing-library/react";
import Spinner from "@/components/ui/Spinner";

describe("Spinner", () => {
  it("renders with accessible label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("applies md size by default", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("w-8");
  });

  it("applies sm size", () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole("status")).toHaveClass("w-4");
  });

  it("applies lg size", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("w-12");
  });

  it("applies custom className", () => {
    render(<Spinner className="text-red-500" />);
    expect(screen.getByRole("status")).toHaveClass("text-red-500");
  });

  it("has animate-spin class", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("animate-spin");
  });
});
