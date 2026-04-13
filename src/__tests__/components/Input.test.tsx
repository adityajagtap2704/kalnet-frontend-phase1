import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/ui/Input";

describe("Input", () => {
  it("renders without label", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("shows helper text when no error", () => {
    render(<Input helperText="We'll never share your email" />);
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
  });

  it("does not show helper text when error is present", () => {
    render(<Input helperText="Helper" error="Error" />);
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(<Input icon={<span data-testid="icon">@</span>} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<Input type="password" label="Password" />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    const toggleBtn = screen.getByRole("button");
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "password");
  });

  it("applies error border class when error is set", () => {
    render(<Input error="Required" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-red-400");
  });

  it("fires onChange handler", () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalled();
  });
});
