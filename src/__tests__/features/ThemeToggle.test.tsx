import { render, screen, fireEvent, act } from "@testing-library/react";
import ThemeToggle from "@/components/features/ThemeToggle";
import { useUIStore } from "@/store/zustand/useUIStore";

beforeEach(() => {
  useUIStore.setState({ theme: "dark" });
  document.documentElement.classList.add("dark");
  localStorage.clear();
});

describe("ThemeToggle", () => {
  it("renders a button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows correct aria-label in dark mode", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Switch to light mode");
  });

  it("shows correct aria-label in light mode", () => {
    useUIStore.setState({ theme: "light" });
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("toggles theme on click", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));
    expect(useUIStore.getState().theme).toBe("light");
  });

  it("adds dark class to html in dark mode", () => {
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class when theme is light", () => {
    useUIStore.setState({ theme: "light" });
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists theme to localStorage", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));
    expect(localStorage.getItem("zentrix-theme")).toBe("light");
  });
});
