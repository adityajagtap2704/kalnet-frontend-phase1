import { render, screen, fireEvent } from "@testing-library/react";
import MobileMenu from "@/components/layout/MobileMenu";

// Mock next/navigation
jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("MobileMenu", () => {
  it("renders nothing when closed", () => {
    render(<MobileMenu isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });

  it("renders menu panel when open", () => {
    render(<MobileMenu isOpen onClose={jest.fn()} />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("renders nav links when open", () => {
    render(<MobileMenu isOpen onClose={jest.fn()} />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });

  it("renders Log in and Get Started buttons", () => {
    render(<MobileMenu isOpen onClose={jest.fn()} />);
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<MobileMenu isOpen onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn();
    const { container } = render(<MobileMenu isOpen onClose={onClose} />);
    const backdrop = container.querySelector(".fixed.inset-0.z-40");
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
