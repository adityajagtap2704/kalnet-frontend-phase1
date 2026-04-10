import {
  required,
  isEmail,
  isPhone,
  isStrongPassword,
  minLength,
  maxLength,
  matchesField,
  composeValidators,
  validateForm,
} from "@/lib/validators";

describe("validators", () => {
  describe("required", () => {
    it("returns error for empty string", () => {
      expect(required("")).toBe("This field is required");
    });
    it("returns error for whitespace only", () => {
      expect(required("   ")).toBe("This field is required");
    });
    it("returns null for valid input", () => {
      expect(required("hello")).toBeNull();
    });
  });

  describe("minLength", () => {
    const validate = minLength(3);
    it("returns error when too short", () => {
      expect(validate("ab")).toBe("Must be at least 3 characters");
    });
    it("returns null when long enough", () => {
      expect(validate("abc")).toBeNull();
    });
  });

  describe("maxLength", () => {
    const validate = maxLength(5);
    it("returns error when too long", () => {
      expect(validate("abcdef")).toBe("Must be no more than 5 characters");
    });
    it("returns null when short enough", () => {
      expect(validate("abc")).toBeNull();
    });
  });

  describe("isEmail", () => {
    it("rejects invalid emails", () => {
      expect(isEmail("notanemail")).not.toBeNull();
      expect(isEmail("missing@")).not.toBeNull();
      expect(isEmail("@nodomain.com")).not.toBeNull();
    });
    it("accepts valid emails", () => {
      expect(isEmail("user@example.com")).toBeNull();
      expect(isEmail("first.last@company.co.in")).toBeNull();
    });
  });

  describe("isPhone", () => {
    it("rejects invalid phone numbers", () => {
      expect(isPhone("12345")).not.toBeNull();
      expect(isPhone("1234567890")).not.toBeNull(); // starts with 1
    });
    it("accepts valid Indian phone numbers", () => {
      expect(isPhone("9876543210")).toBeNull();
      expect(isPhone("+919876543210")).toBeNull();
      expect(isPhone("+91 98765 43210")).toBeNull();
    });
  });

  describe("isStrongPassword", () => {
    it("rejects short passwords", () => {
      expect(isStrongPassword("Aa1")).not.toBeNull();
    });
    it("rejects passwords without uppercase", () => {
      expect(isStrongPassword("abcdefg1")).not.toBeNull();
    });
    it("rejects passwords without lowercase", () => {
      expect(isStrongPassword("ABCDEFG1")).not.toBeNull();
    });
    it("rejects passwords without digits", () => {
      expect(isStrongPassword("Abcdefgh")).not.toBeNull();
    });
    it("accepts strong passwords", () => {
      expect(isStrongPassword("Secur3Pass")).toBeNull();
    });
  });

  describe("matchesField", () => {
    it("returns error when values differ", () => {
      const validate = matchesField("password", "abc123");
      expect(validate("abc124")).toBe("Must match password");
    });
    it("returns null when values match", () => {
      const validate = matchesField("password", "abc123");
      expect(validate("abc123")).toBeNull();
    });
  });

  describe("composeValidators", () => {
    it("returns the first error found", () => {
      const validate = composeValidators(required, minLength(5));
      expect(validate("")).toBe("This field is required");
      expect(validate("ab")).toBe("Must be at least 5 characters");
    });
    it("returns null when all pass", () => {
      const validate = composeValidators(required, minLength(3));
      expect(validate("hello")).toBeNull();
    });
  });

  describe("validateForm", () => {
    it("returns errors for invalid fields", () => {
      const errors = validateForm(
        { name: "", email: "bad" },
        { name: required, email: isEmail }
      );
      expect(errors.name).toBe("This field is required");
      expect(errors.email).toBe("Enter a valid email address");
    });
    it("returns empty object for valid data", () => {
      const errors = validateForm(
        { name: "John", email: "john@test.com" },
        { name: required, email: isEmail }
      );
      expect(Object.keys(errors)).toHaveLength(0);
    });
  });
});
