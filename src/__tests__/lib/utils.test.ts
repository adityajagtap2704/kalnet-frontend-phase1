import { cn, formatCurrency, truncate, uid, clamp, pick, omit } from "@/lib/utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names", () => {
      expect(cn("a", "b", "c")).toBe("a b c");
    });
    it("filters falsy values", () => {
      expect(cn("a", false, undefined, null, "b")).toBe("a b");
    });
    it("returns empty string for no args", () => {
      expect(cn()).toBe("");
    });
  });

  describe("formatCurrency", () => {
    it("formats as INR", () => {
      const result = formatCurrency(14999);
      expect(result).toContain("14,999");
    });
  });

  describe("truncate", () => {
    it("truncates long strings", () => {
      expect(truncate("Hello World", 5)).toBe("Hello…");
    });
    it("returns short strings unchanged", () => {
      expect(truncate("Hi", 10)).toBe("Hi");
    });
  });

  describe("uid", () => {
    it("generates unique IDs", () => {
      const id1 = uid();
      const id2 = uid();
      expect(id1).not.toBe(id2);
    });
    it("returns a string", () => {
      expect(typeof uid()).toBe("string");
    });
  });

  describe("clamp", () => {
    it("clamps below minimum", () => {
      expect(clamp(-5, 0, 100)).toBe(0);
    });
    it("clamps above maximum", () => {
      expect(clamp(200, 0, 100)).toBe(100);
    });
    it("returns value within range", () => {
      expect(clamp(50, 0, 100)).toBe(50);
    });
  });

  describe("pick", () => {
    it("picks specified keys", () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });
  });

  describe("omit", () => {
    it("omits specified keys", () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
    });
  });
});
