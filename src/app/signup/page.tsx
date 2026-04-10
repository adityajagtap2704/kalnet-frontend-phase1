import { Metadata } from "next";
import SignupForm from "@/components/features/SignupForm";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a new Zentrix account to access courses and resources.",
};

export default function SignupPage() {
  return (
    <section className="section-padding flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-white mb-2">
            Create your account
          </h1>
          <p className="text-surface-500 text-sm">
            Sign up to enrol in courses and access your learning dashboard.
          </p>
        </div>
        <Card variant="bordered" padding="lg">
          <SignupForm />
        </Card>
      </div>
    </section>
  );
}
