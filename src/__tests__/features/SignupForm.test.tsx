import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SignupForm from "@/components/features/SignupForm";
import authReducer from "@/store/redux/slices/authSlice";

jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock("@/lib/api", () => ({
  signupUser: jest.fn().mockResolvedValue({
    success: true,
    data: { user: { id: "2", name: "New", email: "n@n.com", role: "user", joinedAt: "" }, token: "tok2" },
  }),
}));

function renderWithStore() {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(<Provider store={store}><SignupForm /></Provider>);
}

describe("SignupForm", () => {
  it("renders all fields", () => {
    renderWithStore();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("renders Create Account button", () => {
    renderWithStore();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    renderWithStore();
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));
    await waitFor(() => expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0));
  });

  it("shows password strength indicator when typing", () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Abc1" } });
    expect(screen.getByText(/weak|fair|good|strong|excellent/i)).toBeInTheDocument();
  });

  it("shows strong password strength for complex password", () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Abcdef1@#" } });
    expect(screen.getByText(/strong|excellent/i)).toBeInTheDocument();
  });

  it("renders Sign in link", () => {
    renderWithStore();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("shows confirm password mismatch error", async () => {
    renderWithStore();
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "alice@test.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Secure1pass" } });
    fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "different" } });
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));
    await waitFor(() => expect(screen.getByText(/must match/i)).toBeInTheDocument());
  });
});
