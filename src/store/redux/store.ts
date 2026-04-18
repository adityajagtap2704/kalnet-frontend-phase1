import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import coursesReducer from "./slices/coursesSlice";
import enrollmentReducer, { EnrolledCourse } from "./slices/enrollmentSlice";

// ── Per-user localStorage persistence ───────────────────────────────────────
const AUTH_KEY = "zentrix_auth";
const ENROLLMENT_PREFIX = "zentrix_enrollment_"; // keyed by userId

export function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch { return undefined; }
}

export function saveAuth(auth: ReturnType<typeof authReducer>) {
  try { localStorage.setItem(AUTH_KEY, JSON.stringify(auth)); } catch {}
}

export function loadEnrollment(userId: string): EnrolledCourse[] {
  try {
    const raw = localStorage.getItem(ENROLLMENT_PREFIX + userId);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveEnrollment(userId: string, enrolled: EnrolledCourse[]) {
  try { localStorage.setItem(ENROLLMENT_PREFIX + userId, JSON.stringify(enrolled)); } catch {}
}

// Load auth on startup (SSR-safe)
const preloadedAuth = typeof window !== "undefined" ? loadAuth() : undefined;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    enrollment: enrollmentReducer,
  },
  preloadedState: preloadedAuth ? { auth: preloadedAuth } : undefined,
});

// Persist auth on every change
store.subscribe(() => {
  const state = store.getState();
  if (typeof window === "undefined") return;

  // Save auth
  saveAuth(state.auth);

  // Save enrollment under the current user's ID
  if (state.auth.isAuthenticated && state.auth.user?.id) {
    saveEnrollment(state.auth.user.id, state.enrollment.enrolled);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
