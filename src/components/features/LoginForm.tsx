"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@/components/ui";
import { login, clearError } from "@/store/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/store/redux/store";
import { validateForm, required, isEmail, composeValidators } from "@/lib/validators";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, {
      email: composeValidators(required, isEmail),
      password: required,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="you@company.com"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Your password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={errors.password}
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-surface-500">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-surface-300 text-brand-500 focus:ring-brand-500"
          />
          Remember me
        </label>
        <Link
          href="#"
          className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" size="lg" loading={loading} className="w-full">
        Sign in
      </Button>

      <p className="text-center text-sm text-surface-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 font-medium">
          Create one
        </Link>
      </p>
    </form>
  );
}
