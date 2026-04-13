import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "@/components/features/ContactForm";

jest.mock("@/lib/api", () => ({
  submitContactForm: jest.fn().mockResolvedValue({ success: true, data: { id: "1" } }),
}));

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tell us what/i)).toBeInTheDocument();
  });

  it("renders Send Message button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0));
  });

  it("clears field error when user types", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0));
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Alice" } });
    await waitFor(() => {
      const errors = screen.queryAllByText(/required/i);
      expect(errors.length).toBeLessThan(4);
    });
  });

  it("shows success state after valid submission", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Alice Smith" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "alice@test.com" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Project inquiry" } });
    fireEvent.change(screen.getByPlaceholderText(/tell us what/i), {
      target: { value: "I would like to discuss a project with your team." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => expect(screen.getByText(/message received/i)).toBeInTheDocument());
  });

  it("shows email validation error for bad email", async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "notanemail" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => expect(screen.getByText(/valid email/i)).toBeInTheDocument());
  });
});
