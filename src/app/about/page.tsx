import type { Metadata } from "next";
import { team } from "@/data/team";
import { STATS } from "@/lib/constants";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Zentrix — our team, values, and how we work.",
};

// SSR — data fetched server-side, passed to client component for interactivity
export default function AboutPage() {
  return <AboutClient team={team} stats={STATS} />;
}
