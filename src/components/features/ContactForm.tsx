"use client";

import { useState, FormEvent } from "react";
import { Input, Button } from "@/components/ui";
import { validateForm, required, isEmail, isPhone, minLength, composeValidators } from "@/lib/validators";
import { submitContactForm } from "@/lib/api";
import { ContactFormData } from "@/types";
import { useUIStore } from "@/store/zustand/useUIStore";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const addToast = useUIStore((s) => s.addToast);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on edit
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData as unknown as Record<string, string>, {
      name: composeValidators(required, minLength(2)),
      email: composeValidators(required, isEmail),
      phone: isPhone,
      subject: composeValidators(required, minLength(3)),
      message: composeValidators(required, minLength(10)),
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setSubmitted(true);
        addToast({ type: "success", message: "Message sent. We'll be in touch shortly." });
      } else {
        addToast({ type: "error", message: response.message || "Something went wrong." });
      }
    } catch {
      addToast({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
          Message received
        </h3>
        <p className="text-surface-500 text-sm">
          Thanks for reaching out. Someone from our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          error={errors.phone}
        />
        <Input
          label="Subject"
          placeholder="What's this about?"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          error={errors.subject}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
          Message
        </label>
        <textarea
          placeholder="Tell us what you're looking for..."
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 px-4 py-2.5 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors resize-none"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.message}</p>
        )}
      </div>
      <Button type="submit" size="lg" loading={loading} className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
