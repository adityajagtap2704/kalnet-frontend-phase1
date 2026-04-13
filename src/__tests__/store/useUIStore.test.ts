import { act } from "@testing-library/react";
import { useUIStore } from "@/store/zustand/useUIStore";

// Reset store state before each test
beforeEach(() => {
  useUIStore.setState({
    theme: "dark",
    mobileMenuOpen: false,
    activeModal: null,
    toasts: [],
  });
});

describe("useUIStore", () => {
  it("has correct initial state", () => {
    const state = useUIStore.getState();
    expect(state.theme).toBe("dark");
    expect(state.mobileMenuOpen).toBe(false);
    expect(state.activeModal).toBeNull();
    expect(state.toasts).toEqual([]);
  });

  it("toggleTheme switches dark to light", () => {
    act(() => useUIStore.getState().toggleTheme());
    expect(useUIStore.getState().theme).toBe("light");
  });

  it("toggleTheme switches light to dark", () => {
    useUIStore.setState({ theme: "light" });
    act(() => useUIStore.getState().toggleTheme());
    expect(useUIStore.getState().theme).toBe("dark");
  });

  it("setTheme sets theme directly", () => {
    act(() => useUIStore.getState().setTheme("light"));
    expect(useUIStore.getState().theme).toBe("light");
  });

  it("setMobileMenu opens and closes menu", () => {
    act(() => useUIStore.getState().setMobileMenu(true));
    expect(useUIStore.getState().mobileMenuOpen).toBe(true);
    act(() => useUIStore.getState().setMobileMenu(false));
    expect(useUIStore.getState().mobileMenuOpen).toBe(false);
  });

  it("openModal sets activeModal", () => {
    act(() => useUIStore.getState().openModal("contact"));
    expect(useUIStore.getState().activeModal).toBe("contact");
  });

  it("closeModal clears activeModal", () => {
    useUIStore.setState({ activeModal: "contact" });
    act(() => useUIStore.getState().closeModal());
    expect(useUIStore.getState().activeModal).toBeNull();
  });

  it("addToast appends a toast with id", () => {
    act(() => useUIStore.getState().addToast({ type: "success", message: "Done" }));
    const toasts = useUIStore.getState().toasts;
    expect(toasts).toHaveLength(1);
    expect(toasts[0].message).toBe("Done");
    expect(toasts[0].type).toBe("success");
    expect(typeof toasts[0].id).toBe("string");
  });

  it("removeToast removes by id", () => {
    act(() => useUIStore.getState().addToast({ type: "error", message: "Oops" }));
    const id = useUIStore.getState().toasts[0].id;
    act(() => useUIStore.getState().removeToast(id));
    expect(useUIStore.getState().toasts).toHaveLength(0);
  });

  it("addToast accumulates multiple toasts", () => {
    act(() => {
      useUIStore.getState().addToast({ type: "success", message: "First" });
      useUIStore.getState().addToast({ type: "error", message: "Second" });
    });
    expect(useUIStore.getState().toasts).toHaveLength(2);
  });
});
