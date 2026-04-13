import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/components/ui/Modal";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(<Modal isOpen={false} onClose={jest.fn()}>Content</Modal>);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders children when open", () => {
    render(<Modal isOpen onClose={jest.fn()}>Modal body</Modal>);
    expect(screen.getByText("Modal body")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Modal isOpen onClose={jest.fn()} title="My Modal">Body</Modal>);
    expect(screen.getByText("My Modal")).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn();
    const { container } = render(<Modal isOpen onClose={onClose}>Body</Modal>);
    // backdrop is the first absolute div
    const backdrop = container.querySelector(".absolute.inset-0.bg-black\\/60");
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<Modal isOpen onClose={onClose} title="Test">Body</Modal>);
    fireEvent.click(screen.getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape key", () => {
    const onClose = jest.fn();
    render(<Modal isOpen onClose={onClose}>Body</Modal>);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("applies sm size class", () => {
    const { container } = render(<Modal isOpen onClose={jest.fn()} size="sm">Body</Modal>);
    expect(container.querySelector(".max-w-md")).toBeInTheDocument();
  });

  it("applies lg size class", () => {
    const { container } = render(<Modal isOpen onClose={jest.fn()} size="lg">Body</Modal>);
    expect(container.querySelector(".max-w-2xl")).toBeInTheDocument();
  });
});
