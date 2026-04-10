/**
 * Validation result — either a clean pass or an error message.
 */
export type ValidationResult = string | null;

/**
 * A validator is a function that takes a value and returns null (valid) or an error string.
 */
export type Validator<T = string> = (value: T) => ValidationResult;

/**
 * Compose multiple validators into one. Returns the first error found.
 */
export function composeValidators<T = string>(
  ...validators: Validator<T>[]
): Validator<T> {
  return (value: T) => {
    for (const validate of validators) {
      const error = validate(value);
      if (error) return error;
    }
    return null;
  };
}

/**
 * Required field check.
 */
export const required: Validator = (value) =>
  value.trim().length === 0 ? "This field is required" : null;

/**
 * Minimum length check.
 */
export function minLength(min: number): Validator {
  return (value) =>
    value.length < min ? `Must be at least ${min} characters` : null;
}

/**
 * Maximum length check.
 */
export function maxLength(max: number): Validator {
  return (value) =>
    value.length > max ? `Must be no more than ${max} characters` : null;
}

/**
 * Email format check — simple but covers 99% of real addresses.
 */
export const isEmail: Validator = (value) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(value) ? null : "Enter a valid email address";
};

/**
 * Indian phone number check (10 digits, optionally prefixed with +91).
 */
export const isPhone: Validator = (value) => {
  const cleaned = value.replace(/[\s-]/g, "");
  const re = /^(\+91)?[6-9]\d{9}$/;
  return re.test(cleaned) ? null : "Enter a valid 10-digit phone number";
};

/**
 * Password strength — 8+ chars, at least one uppercase, one lowercase, one digit.
 */
export const isStrongPassword: Validator = (value) => {
  if (value.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
  if (!/[a-z]/.test(value)) return "Include at least one lowercase letter";
  if (!/\d/.test(value)) return "Include at least one number";
  return null;
};

/**
 * Passwords match check (for confirm password fields).
 */
export function matchesField(
  fieldName: string,
  fieldValue: string
): Validator {
  return (value) =>
    value !== fieldValue ? `Must match ${fieldName}` : null;
}

/**
 * Run all field validations on a form data object.
 * Returns a record of field name → error message (only fields with errors).
 */
export function validateForm<T extends Record<string, string>>(
  data: T,
  rules: Partial<Record<keyof T, Validator>>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const [field, validator] of Object.entries(rules) as [
    keyof T,
    Validator,
  ][]) {
    const error = validator(data[field]);
    if (error) errors[field] = error;
  }

  return errors;
}
