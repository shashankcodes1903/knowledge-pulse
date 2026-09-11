"use client";

import { useRouter } from "next/navigation";
import { Database } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { SourceOut } from "@/lib/fastapi/types";
import { SourceCard } from "./SourceCard";

interface SourceListProps {
  sources: SourceOut[];
}

export function SourceList({ sources }: SourceListProps) {
  const router = useRouter();

  if (sources.length === 0) {
    return (
      <EmptyState
        icon={Database}
        title="No knowledge sources connected"
        description="Add a website or upload document files to ground KnowledgePulse in your organisation's knowledge."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {sources.map((source) => (
        <SourceCard
          key={source.id}
          source={source}
          onRefresh={() => router.refresh()}
        />
      ))}
    </div>
  );
}
