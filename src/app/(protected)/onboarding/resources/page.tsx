import { Database } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { ResourceOnboardingView } from "@/components/resources/ResourceOnboardingView";

export const metadata = {
  title: "Onboard Knowledge Sources | KnowledgePulse",
  description: "Connect your documents and URL resources to KnowledgePulse.",
};

export default async function ResourcesOnboardingPage() {
  const user = await requireUser();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-md-secondary-container px-3.5 py-1 text-xs font-semibold text-md-on-secondary-container">
          <Database className="h-3.5 w-3.5" />
          Step 2 of 2: Knowledge Sources
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-md-on-surface sm:text-4xl">
          Connect your knowledge base
        </h1>

        <p className="mt-3 text-base text-md-on-surface-variant leading-relaxed">
          Upload internal documents or add public web documentation URLs that will feed your KnowledgePulse intelligence services.
        </p>
      </div>

      {/* Workspace Sources Notice */}
      <div className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">
            Looking for live knowledge indexing and backend sources?
          </p>
          <p className="text-xs text-slate-500">
            Manage active knowledge sources directly in the application workspace.
          </p>
        </div>
        <a
          href="/sources"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition hover:bg-[#6750A4] dark:bg-white dark:text-slate-900"
        >
          Live Sources →
        </a>
      </div>

      {/* Onboarding View */}
      <ResourceOnboardingView
        initialDocuments={user.documents ?? []}
        initialResources={user.resources ?? []}
      />
    </div>
  );
}
