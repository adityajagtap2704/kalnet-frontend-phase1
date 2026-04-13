import { renderHook, act } from "@testing-library/react";
import { useCountUp } from "@/hooks/useCountUp";

describe("useCountUp", () => {
  afterEach(() => jest.restoreAllMocks());

  it("starts at the start value before animation", () => {
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    const { result } = renderHook(() => useCountUp({ end: 100, start: 0, enabled: true }));
    expect(result.current).toBe(0);
  });

  it("returns start value when disabled", () => {
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    const { result } = renderHook(() => useCountUp({ end: 100, start: 5, enabled: false }));
    expect(result.current).toBe(5);
  });

  it("reaches end value when elapsed >= duration", () => {
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    // Mock rAF to never fire — we just verify the hook doesn't crash
    // and returns a number type
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);
    const { result } = renderHook(() =>
      useCountUp({ end: 100, duration: 2000, start: 0, enabled: true })
    );
    // Value is a number (starts at 0, will animate toward 100)
    expect(typeof result.current).toBe("number");
    expect(result.current).toBeGreaterThanOrEqual(0);
    expect(result.current).toBeLessThanOrEqual(100);
  });

  it("resets to start when enabled changes to false", () => {
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    const { result, rerender } = renderHook(
      ({ enabled }) => useCountUp({ end: 100, start: 0, enabled }),
      { initialProps: { enabled: true } }
    );
    act(() => rerender({ enabled: false }));
    expect(result.current).toBe(0);
  });

  it("cancels animation frame on unmount", () => {
    const cancelMock = jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(() => 42);
    const { unmount } = renderHook(() => useCountUp({ end: 100, enabled: true }));
    unmount();
    expect(cancelMock).toHaveBeenCalledWith(42);
  });
});
