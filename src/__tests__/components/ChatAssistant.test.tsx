import { render, screen, fireEvent } from "@testing-library/react";
import ChatAssistant from "@/components/ui/ChatAssistant";

function getToggleBtn() {
  return document.querySelector(".w-16.h-16.rounded-full") as HTMLElement;
}

describe("ChatAssistant", () => {
  it("renders the chat toggle button", () => {
    render(<ChatAssistant />);
    expect(getToggleBtn()).toBeInTheDocument();
  });

  it("chat panel is hidden by default", () => {
    render(<ChatAssistant />);
    expect(screen.queryByPlaceholderText(/ask zentrix ai/i)).not.toBeInTheDocument();
  });

  it("opens chat panel when toggle button is clicked", () => {
    render(<ChatAssistant />);
    fireEvent.click(getToggleBtn());
    expect(screen.getByPlaceholderText(/ask zentrix ai/i)).toBeInTheDocument();
  });

  it("renders category quick-reply buttons when open", () => {
    render(<ChatAssistant />);
    fireEvent.click(getToggleBtn());
    expect(screen.getByText("Partners")).toBeInTheDocument();
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(screen.getByText("Courses")).toBeInTheDocument();
  });

  it("sends a user message on form submit", () => {
    jest.useFakeTimers();
    render(<ChatAssistant />);
    fireEvent.click(getToggleBtn());
    const input = screen.getByPlaceholderText(/ask zentrix ai/i);
    fireEvent.change(input, { target: { value: "Tell me about courses" } });
    fireEvent.submit(input.closest("form")!);
    expect(screen.getByText("Tell me about courses")).toBeInTheDocument();
    jest.useRealTimers();
  });

  it("does not send empty message", () => {
    render(<ChatAssistant />);
    fireEvent.click(getToggleBtn());
    const form = screen.getByPlaceholderText(/ask zentrix ai/i).closest("form")!;
    const msgsBefore = document.querySelectorAll(".rounded-2xl.shadow-sm").length;
    fireEvent.submit(form);
    const msgsAfter = document.querySelectorAll(".rounded-2xl.shadow-sm").length;
    expect(msgsAfter).toBe(msgsBefore);
  });
});
