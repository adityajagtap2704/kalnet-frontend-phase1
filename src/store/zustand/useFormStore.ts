import { create } from "zustand";
import { ContactFormData } from "@/types";

interface FormStore {
  contactForm: ContactFormData;
  setContactField: <K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) => void;
  resetContactForm: () => void;
}

const defaultContactForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export const useFormStore = create<FormStore>((set) => ({
  contactForm: { ...defaultContactForm },

  setContactField: (field, value) =>
    set((state) => ({
      contactForm: { ...state.contactForm, [field]: value },
    })),

  resetContactForm: () =>
    set({ contactForm: { ...defaultContactForm } }),
}));
