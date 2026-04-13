import { render, screen } from "@testing-library/react";
import PageLoader from "@/components/ui/PageLoader";

describe("PageLoader", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("renders ZENTRIX text while loading", () => {
    render(<PageLoader />);
    expect(screen.getByText("ZENTRIX")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const { container } = render(<PageLoader />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
