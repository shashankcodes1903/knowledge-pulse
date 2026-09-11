"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CheckCircle2,
  Database,
  FileText,
  Lightbulb,
  LucideIcon,
  MessageSquare,
} from "lucide-react";
import featureNavItems from "@/data/feature-navigation.json";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Lightbulb,
  FileText,
  MessageSquare,
  Database,
  CheckCircle2,
};

export function FeatureSubNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Workspace secondary navigation"
      className="sticky top-16 z-40 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
          {featureNavItems.map((item) => {
            const Icon = iconMap[item.icon] || Activity;
            const isActive =
              item.href === "/overview"
                ? pathname === "/overview"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95 sm:text-sm ${
                  isActive
                    ? "bg-[#E8DEF8] text-[#1D192B] shadow-xs dark:bg-purple-950/60 dark:text-purple-200"
                    : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-zinc-800 dark:hover:text-slate-200"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={`h-3.5 w-3.5 transition-colors sm:h-4 sm:w-4 ${
                    isActive
                      ? "text-[#6750A4] dark:text-purple-300"
                      : "text-slate-500 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
