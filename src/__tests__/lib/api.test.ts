import {
  fetchServices,
  fetchServiceBySlug,
  fetchCourses,
  fetchTestimonials,
  fetchTeam,
  submitContactForm,
  loginUser,
  signupUser,
} from "@/lib/api";

// Speed up tests by removing simulated delay
jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  sleep: jest.fn().mockResolvedValue(undefined),
}));

describe("api", () => {
  describe("fetchServices", () => {
    it("returns success with array of services", async () => {
      const res = await fetchServices();
      expect(res.success).toBe(true);
      expect(Array.isArray(res.data)).toBe(true);
      expect(res.data.length).toBeGreaterThan(0);
    });
  });

  describe("fetchServiceBySlug", () => {
    it("returns a service for a valid slug", async () => {
      const services = (await fetchServices()).data;
      const slug = services[0].slug;
      const res = await fetchServiceBySlug(slug);
      expect(res.success).toBe(true);
      expect(res.data.slug).toBe(slug);
    });

    it("returns failure for unknown slug", async () => {
      const res = await fetchServiceBySlug("non-existent-slug");
      expect(res.success).toBe(false);
      expect(res.message).toContain("not found");
    });
  });

  describe("fetchCourses", () => {
    it("returns success with array of courses", async () => {
      const res = await fetchCourses();
      expect(res.success).toBe(true);
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("fetchTestimonials", () => {
    it("returns success with testimonials", async () => {
      const res = await fetchTestimonials();
      expect(res.success).toBe(true);
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("fetchTeam", () => {
    it("returns success with team members", async () => {
      const res = await fetchTeam();
      expect(res.success).toBe(true);
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("submitContactForm", () => {
    it("returns success with submitted data", async () => {
      const payload = {
        name: "Alice",
        email: "alice@test.com",
        phone: "9876543210",
        subject: "Test",
        message: "Hello world",
      };
      const res = await submitContactForm(payload);
      expect(res.success).toBe(true);
      expect(res.data.name).toBe("Alice");
      expect(res.data.email).toBe("alice@test.com");
      expect(typeof res.data.id).toBe("string");
    });
  });

  describe("loginUser", () => {
    it("returns user and token on success", async () => {
      const res = await loginUser("user@test.com", "password");
      expect(res.success).toBe(true);
      expect(res.data.user.email).toBe("user@test.com");
      expect(typeof res.data.token).toBe("string");
    });
  });

  describe("signupUser", () => {
    it("returns new user and token", async () => {
      const res = await signupUser("Bob", "bob@test.com", "Pass123");
      expect(res.success).toBe(true);
      expect(res.data.user.name).toBe("Bob");
      expect(res.data.user.email).toBe("bob@test.com");
      expect(typeof res.data.token).toBe("string");
    });
  });
});
