import { BackendStatus } from "@/components/shared/BackendStatus";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageHeader } from "@/components/shared/PageHeader";
import { AddWebsiteForm } from "@/components/sources/AddWebsiteForm";
import { SourceList } from "@/components/sources/SourceList";
import { UploadDocumentForm } from "@/components/sources/UploadDocumentForm";
import { getHealth, listSources } from "@/lib/fastapi";
import { SourceOut } from "@/lib/fastapi/types";

export const dynamic = "force-dynamic";

export default async function SourcesPage() {
  let sources: SourceOut[] = [];
  let errorMessage: string | null = null;
  let backendHealth: { status: "connected" | "unavailable"; message?: string } = {
    status: "unavailable",
  };

  try {
    const [sourcesData, healthData] = await Promise.all([
      listSources().catch((err) => {
        errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load sources from intelligence backend.";
        return [] as SourceOut[];
      }),
      getHealth().catch(() => ({ status: "unavailable" as const })),
    ]);

    sources = sourcesData;
    backendHealth = healthData;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unable to reach intelligence services.";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sources"
        description="Manage the documents and websites KnowledgePulse uses as knowledge."
        actions={<BackendStatus status={backendHealth.status} />}
      />

      {errorMessage && sources.length === 0 && (
        <ErrorState
          title="Sources Unavailable"
          message={errorMessage}
        />
      )}

      {/* Ingestion Actions Grid */}
      <section aria-labelledby="connect-sources-heading" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <h2 id="connect-sources-heading" className="sr-only">
          Connect New Knowledge Sources
        </h2>
        <AddWebsiteForm />
        <UploadDocumentForm />
      </section>

      {/* Connected Sources List */}
      <section aria-labelledby="connected-sources-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="connected-sources-heading" className="text-base font-semibold text-slate-900 dark:text-white">
            Connected Knowledge ({sources.length})
          </h2>
        </div>

        <SourceList sources={sources} />
      </section>
    </div>
  );
}
