import { act } from "@testing-library/react";
import { useFormStore } from "@/store/zustand/useFormStore";

const defaultForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

beforeEach(() => {
  useFormStore.setState({ contactForm: { ...defaultForm } });
});

describe("useFormStore", () => {
  it("has correct initial state", () => {
    expect(useFormStore.getState().contactForm).toEqual(defaultForm);
  });

  it("setContactField updates a single field", () => {
    act(() => useFormStore.getState().setContactField("name", "Alice"));
    expect(useFormStore.getState().contactForm.name).toBe("Alice");
  });

  it("setContactField does not affect other fields", () => {
    act(() => useFormStore.getState().setContactField("email", "alice@test.com"));
    const form = useFormStore.getState().contactForm;
    expect(form.email).toBe("alice@test.com");
    expect(form.name).toBe("");
    expect(form.message).toBe("");
  });

  it("resetContactForm clears all fields", () => {
    act(() => {
      useFormStore.getState().setContactField("name", "Bob");
      useFormStore.getState().setContactField("email", "bob@test.com");
      useFormStore.getState().setContactField("message", "Hello there");
    });
    act(() => useFormStore.getState().resetContactForm());
    expect(useFormStore.getState().contactForm).toEqual(defaultForm);
  });
});
