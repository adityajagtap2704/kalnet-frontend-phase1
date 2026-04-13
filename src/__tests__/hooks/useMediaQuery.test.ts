import { renderHook, act } from "@testing-library/react";
import { useMediaQuery, useBreakpoint } from "@/hooks/useMediaQuery";

type MQLListener = (e: MediaQueryListEvent) => void;

function mockMatchMedia(matches: boolean) {
  const listeners: MQLListener[] = [];
  const mql = {
    matches,
    addEventListener: (_: string, fn: MQLListener) => listeners.push(fn),
    removeEventListener: (_: string, fn: MQLListener) => {
      const idx = listeners.indexOf(fn);
      if (idx > -1) listeners.splice(idx, 1);
    },
    _trigger: (newMatches: boolean) => {
      listeners.forEach((fn) => fn({ matches: newMatches } as MediaQueryListEvent));
    },
  };
  window.matchMedia = jest.fn().mockReturnValue(mql);
  return mql;
}

describe("useMediaQuery", () => {
  it("returns false initially (SSR-safe default)", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);
  });

  it("returns true when media query matches", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("updates when media query changes", () => {
    const mql = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);
    act(() => mql._trigger(true));
    expect(result.current).toBe(true);
  });
});

describe("useBreakpoint", () => {
  it("returns false when below breakpoint", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useBreakpoint("md"));
    expect(result.current).toBe(false);
  });

  it("returns true when above breakpoint", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useBreakpoint("lg"));
    expect(result.current).toBe(true);
  });
});
