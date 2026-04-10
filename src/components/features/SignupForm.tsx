"use client";

import { useState, FormEvent, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@/components/ui";
import { signup, clearError } from "@/store/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/store/redux/store";
import {
  validateForm,
  required,
  isEmail,
  isStrongPassword,
  minLength,
  matchesField,
  composeValidators,
} from "@/lib/validators";
import { cn } from "@/lib/utils";

export default function SignupForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (error) dispatch(clearError());
  };

  // Password strength indicator
  const passwordStrength = useMemo(() => {
    const p = formData.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  }, [formData.password]);

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Excellent"][passwordStrength];
  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-500"][passwordStrength];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, {
      name: composeValidators(required, minLength(2)),
      email: composeValidators(required, isEmail),
      password: composeValidators(required, isStrongPassword),
      confirmPassword: composeValidators(
        required,
        matchesField("password", formData.password)
      ),
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(
      signup({ name: formData.name, email: formData.email, password: formData.password })
    );
    if (signup.fulfilled.match(result)) {
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
        label="Full Name"
        placeholder="Your name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        autoComplete="name"
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@company.com"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        autoComplete="email"
      />

      <div>
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
          autoComplete="new-password"
        />
        {formData.password && (
          <div className="mt-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i < passwordStrength ? strengthColor : "bg-surface-200 dark:bg-surface-700"
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-surface-500 mt-1">{strengthLabel}</p>
          </div>
        )}
      </div>

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        value={formData.confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      <Button type="submit" size="lg" loading={loading} className="w-full">
        Create Account
      </Button>

      <p className="text-center text-sm text-surface-500">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
}
