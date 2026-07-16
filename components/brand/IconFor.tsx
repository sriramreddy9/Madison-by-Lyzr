import {
  BarChart3,
  Bot,
  Car,
  FileCheck,
  HeartHandshake,
  Home,
  Megaphone,
  PenLine,
  Radar,
  Rocket,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  workflow: Workflow,
  "shield-check": ShieldCheck,
  users: Users,
  "pen-line": PenLine,
  radar: Radar,
  "bar-chart-3": BarChart3,
  megaphone: Megaphone,
  "file-check": FileCheck,
  home: Home,
  "rotate-ccw": RotateCcw,
  "heart-handshake": HeartHandshake,
  sparkles: Sparkles,
  car: Car,
  "user-check": UserCheck,
  rocket: Rocket,
};

export function IconFor({
  icon,
  className = "h-5 w-5",
}: {
  icon: string;
  className?: string;
}) {
  const Cmp = MAP[icon] ?? Bot;
  return <Cmp className={className} strokeWidth={1.75} aria-hidden="true" />;
}
