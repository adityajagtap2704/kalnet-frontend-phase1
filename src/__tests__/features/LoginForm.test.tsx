import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginForm from "@/components/features/LoginForm";
import authReducer from "@/store/redux/slices/authSlice";

jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock("@/lib/api", () => ({
  loginUser: jest.fn().mockResolvedValue({
    success: true,
    data: { user: { id: "1", name: "Test", email: "t@t.com", role: "user", joinedAt: "" }, token: "tok" },
  }),
}));

function renderWithStore() {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(<Provider store={store}><LoginForm /></Provider>);
}

describe("LoginForm", () => {
  it("renders email and password inputs", () => {
    renderWithStore();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders Sign in button", () => {
    renderWithStore();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    renderWithStore();
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getAllByText("This field is required").length).toBeGreaterThan(0)
    );
  });

  it("shows email format error for invalid email", async () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "bad" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "pass" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    );
  });

  it("clears field error when user types", async () => {
    renderWithStore();
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getAllByText("This field is required").length).toBeGreaterThan(0)
    );
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@b.com" } });
    await waitFor(() =>
      expect(screen.getAllByText("This field is required").length).toBeLessThan(2)
    );
  });

  it("renders Forgot password link", () => {
    renderWithStore();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it("renders Create one link", () => {
    renderWithStore();
    expect(screen.getByText(/create one/i)).toBeInTheDocument();
  });

  it("submits successfully with valid credentials", async () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "user@test.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => expect(screen.queryByText(/required/i)).not.toBeInTheDocument());
  });
});
