import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brand" | "accent" | "success" | "warning";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default:
    "bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300",
  brand:
    "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300",
  accent:
    "bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300",
  success:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning:
    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
