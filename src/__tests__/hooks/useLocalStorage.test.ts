import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

beforeEach(() => localStorageMock.clear());

describe("useLocalStorage", () => {
  it("returns initial value when key is not set", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("reads existing value from localStorage on mount", () => {
    localStorageMock.setItem("existing-key", JSON.stringify("stored-value"));
    const { result } = renderHook(() => useLocalStorage("existing-key", "default"));
    // After effect runs
    expect(result.current[0]).toBe("stored-value");
  });

  it("setValue updates state and localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key1", ""));
    act(() => result.current[1]("new-value"));
    expect(result.current[0]).toBe("new-value");
    expect(JSON.parse(localStorageMock.getItem("key1")!)).toBe("new-value");
  });

  it("setValue accepts a function updater", () => {
    const { result } = renderHook(() => useLocalStorage("counter", 0));
    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(1);
  });

  it("removeValue clears localStorage and resets to initial", () => {
    const { result } = renderHook(() => useLocalStorage("key2", "init"));
    act(() => result.current[1]("changed"));
    act(() => result.current[2]());
    expect(result.current[0]).toBe("init");
    expect(localStorageMock.getItem("key2")).toBeNull();
  });

  it("works with object values", () => {
    const { result } = renderHook(() =>
      useLocalStorage<{ name: string }>("obj-key", { name: "" })
    );
    act(() => result.current[1]({ name: "Alice" }));
    expect(result.current[0]).toEqual({ name: "Alice" });
  });
});
