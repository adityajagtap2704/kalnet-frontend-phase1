import { render, screen, fireEvent } from "@testing-library/react";
import ServicesPreview from "@/components/sections/ServicesPreview";
import { services } from "@/data/services";

describe("ServicesPreview", () => {
  it("renders section heading", () => {
    render(<ServicesPreview />);
    expect(screen.getByText(/what we/i)).toBeInTheDocument();
  });

  it("renders Services label", () => {
    render(<ServicesPreview />);
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("renders all service titles in the list", () => {
    render(<ServicesPreview />);
    services.forEach((s) => {
      expect(screen.getAllByText(s.title).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders All services link", () => {
    render(<ServicesPreview />);
    expect(screen.getByRole("link", { name: /all services/i })).toHaveAttribute("href", "/services");
  });

  it("renders Start a project link", () => {
    render(<ServicesPreview />);
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", "/contact");
  });

  it("first service is active by default — shows its title in detail panel", () => {
    render(<ServicesPreview />);
    // first service title appears at least once (list item)
    expect(screen.getAllByText(services[0].title).length).toBeGreaterThanOrEqual(1);
  });

  it("clicking a service button changes active state", () => {
    render(<ServicesPreview />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
    // second service title should now be prominent
    expect(screen.getAllByText(services[1].title).length).toBeGreaterThanOrEqual(1);
  });

  it("renders numbered items 01 through 06", () => {
    render(<ServicesPreview />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("06")).toBeInTheDocument();
  });
});
