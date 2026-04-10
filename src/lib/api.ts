import { ApiResponse, Service } from "@/types";
import { sleep } from "./utils";

const SIMULATED_DELAY = 800;

/**
 * Generic typed API client.
 * In production, this would hit real endpoints — here it wraps local data
 * with realistic async behaviour so the rest of the app treats it like a
 * real API from day one.
 */
async function request<T>(
  fetcher: () => T | Promise<T>,
  options?: { delay?: number }
): Promise<ApiResponse<T>> {
  const delay = options?.delay ?? SIMULATED_DELAY;

  try {
    await sleep(delay);
    const data = await fetcher();
    return { data, success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong";
    return { data: null as unknown as T, success: false, message };
  }
}

/**
 * Fetch all services.
 */
export async function fetchServices() {
  const { services } = await import("../data/services");
  return request(() => services);
}

/**
 * Fetch a single service by slug.
 */
export async function fetchServiceBySlug(slug: string) {
  const { services } = await import("../data/services");
  return request(() => {
    const service = services.find((s: Service) => s.slug === slug);
    if (!service) throw new Error(`Service "${slug}" not found`);
    return service;
  });
}

/**
 * Fetch all courses.
 */
export async function fetchCourses() {
  const { courses } = await import("../data/courses");
  return request(() => courses);
}

/**
 * Fetch testimonials.
 */
export async function fetchTestimonials() {
  const { testimonials } = await import("../data/testimonials");
  return request(() => testimonials);
}

/**
 * Fetch team members.
 */
export async function fetchTeam() {
  const { team } = await import("../data/team");
  return request(() => team);
}

/**
 * Simulate contact form submission.
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return request(
    () => ({
      id: Date.now().toString(),
      ...data,
      submittedAt: new Date().toISOString(),
    }),
    { delay: 1200 }
  );
}

/**
 * Simulate login.
 */
export async function loginUser(email: string, _password: string) {
  return request(
    () => ({
      user: {
        id: "usr_k7x9m2",
        name: email.split("@")[0],
        email,
        role: "user" as const,
        avatar: undefined,
        joinedAt: "2024-03-15T10:00:00Z",
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token",
    }),
    { delay: 1000 }
  );
}

/**
 * Simulate signup.
 */
export async function signupUser(
  name: string,
  email: string,
  _password: string
) {
  return request(
    () => ({
      user: {
        id: "usr_" + Date.now().toString(36),
        name,
        email,
        role: "user" as const,
        avatar: undefined,
        joinedAt: new Date().toISOString(),
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token",
    }),
    { delay: 1000 }
  );
}
