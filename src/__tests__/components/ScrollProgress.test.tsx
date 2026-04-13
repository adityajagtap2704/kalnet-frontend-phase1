import { render } from "@testing-library/react";
import ScrollProgress from "@/components/ui/ScrollProgress";

describe("ScrollProgress", () => {
  it("renders without crashing", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders a fixed positioned element", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.firstChild).toHaveClass("fixed");
  });
});
