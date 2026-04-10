import { Metadata } from "next";
import LoginForm from "@/components/features/LoginForm";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your Zentrix account.",
};

export default function LoginPage() {
  return (
    <section className="section-padding flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-surface-500 text-sm">
            Sign in to access your dashboard and enrolled courses.
          </p>
        </div>
        <Card variant="bordered" padding="lg">
          <LoginForm />
        </Card>
      </div>
    </section>
  );
}
