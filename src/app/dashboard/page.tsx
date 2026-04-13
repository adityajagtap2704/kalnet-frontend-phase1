import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Zentrix learning dashboard.",
};

// SSR page — auth guard is in layout.tsx (client), content rendered server-side
export default function DashboardPage() {
  return <DashboardClient />;
}
