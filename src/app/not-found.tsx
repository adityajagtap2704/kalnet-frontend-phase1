import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold font-display text-gradient mb-4">
          404
        </div>
        <h2 className="text-2xl font-bold font-display text-surface-900 dark:text-white mb-2">
          Page not found
        </h2>
        <p className="text-surface-500 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Double-check the URL or head back.
        </p>
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
