import { render } from "@testing-library/react";
import BackToTop from "@/components/ui/BackToTop";

describe("BackToTop", () => {
  it("renders without crashing", () => {
    const { container } = render(<BackToTop />);
    expect(container).toBeInTheDocument();
  });

  it("button is not visible initially (scrollY = 0)", () => {
    const { container } = render(<BackToTop />);
    // Button only shows when scrollY > 500 — not visible at mount
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });
});
