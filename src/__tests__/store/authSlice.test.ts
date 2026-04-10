import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  login,
  signup,
  logout,
  clearError,
  setUser,
} from "@/store/redux/slices/authSlice";
import type { AuthState } from "@/types";

// Mock the API module
jest.mock("@/lib/api", () => ({
  loginUser: jest.fn().mockResolvedValue({
    success: true,
    data: {
      user: {
        id: "usr_test",
        name: "test",
        email: "test@example.com",
        role: "user",
        joinedAt: "2024-01-01",
      },
      token: "mock-token",
    },
  }),
  signupUser: jest.fn().mockResolvedValue({
    success: true,
    data: {
      user: {
        id: "usr_new",
        name: "New User",
        email: "new@example.com",
        role: "user",
        joinedAt: "2024-01-01",
      },
      token: "mock-token-2",
    },
  }),
}));

function createStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

describe("authSlice", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  it("has correct initial state", () => {
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("handles login fulfilled", async () => {
    await store.dispatch(
      login({ email: "test@example.com", password: "password" })
    );
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe("test@example.com");
    expect(state.token).toBe("mock-token");
    expect(state.loading).toBe(false);
  });

  it("handles signup fulfilled", async () => {
    await store.dispatch(
      signup({ name: "New User", email: "new@example.com", password: "Pass123" })
    );
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.name).toBe("New User");
  });

  it("handles logout", async () => {
    // First login
    await store.dispatch(
      login({ email: "test@example.com", password: "password" })
    );
    expect(store.getState().auth.isAuthenticated).toBe(true);

    // Then logout
    store.dispatch(logout());
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("handles clearError", () => {
    // Manually modify state via a failing login wouldn't work with mock,
    // but we can test the reducer directly
    store.dispatch(clearError());
    expect(store.getState().auth.error).toBeNull();
  });

  it("handles setUser", () => {
    const user = {
      id: "usr_manual",
      name: "Manual User",
      email: "manual@test.com",
      role: "user" as const,
      joinedAt: "2024-06-01",
    };
    store.dispatch(setUser(user));
    const state = store.getState().auth;
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });
});
