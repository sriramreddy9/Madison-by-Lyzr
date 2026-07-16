import type { Metadata } from "next";
import { DemoProvider } from "@/components/demo/DemoContext";
import { Shell } from "@/components/demo/Shell";

export const metadata: Metadata = {
  title: "Live demo · The Agentic OS for Banking",
  description:
    "Demonstration environment for Willamette Community Credit Union. Illustrative data.",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return (
    <DemoProvider>
      <Shell />
    </DemoProvider>
  );
}
