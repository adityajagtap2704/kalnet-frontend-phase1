import { renderHook, act } from "@testing-library/react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type IOCallback = IntersectionObserverCallback;

let capturedCallback: IOCallback | null = null;
const observeMock = jest.fn();
const unobserveMock = jest.fn();
const disconnectMock = jest.fn();

beforeEach(() => {
  capturedCallback = null;
  observeMock.mockClear();
  unobserveMock.mockClear();
  disconnectMock.mockClear();

  window.IntersectionObserver = jest.fn((cb: IOCallback) => {
    capturedCallback = cb;
    return {
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
    } as unknown as IntersectionObserver;
  }) as unknown as typeof IntersectionObserver;
});

/** Helper: render hook with a real DOM element attached to the ref */
function renderWithElement(options = {}) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const hook = renderHook(() => {
    const result = useScrollAnimation(options);
    // Attach a real element so the useEffect observer branch runs
    Object.defineProperty(result.ref, "current", {
      get: () => div,
      configurable: true,
    });
    return result;
  });

  return { ...hook, div };
}

describe("useScrollAnimation", () => {
  it("returns isVisible false initially", () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.isVisible).toBe(false);
  });

  it("returns a ref object", () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref).toHaveProperty("current");
  });

  it("sets isVisible true when element intersects", () => {
    const { result } = renderWithElement();

    act(() => {
      capturedCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(result.current.isVisible).toBe(true);
  });

  it("unobserves after first intersection when triggerOnce is true", () => {
    renderWithElement({ triggerOnce: true });

    act(() => {
      capturedCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(unobserveMock).toHaveBeenCalled();
  });

  it("sets isVisible false on leave when triggerOnce is false", () => {
    const { result } = renderWithElement({ triggerOnce: false });

    act(() => {
      capturedCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(result.current.isVisible).toBe(true);

    act(() => {
      capturedCallback!(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(result.current.isVisible).toBe(false);
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = renderWithElement();
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
