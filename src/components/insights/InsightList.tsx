import { Lightbulb } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { InsightOut } from "@/lib/fastapi/types";
import { InsightCard } from "./InsightCard";

interface InsightListProps {
  insights: InsightOut[];
}

export function InsightList({ insights }: InsightListProps) {
  if (!insights || insights.length === 0) {
    return (
      <EmptyState
        icon={Lightbulb}
        title="No insights available"
        description="No customer question patterns or documentation weaknesses have been identified for this period yet."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  );
}
