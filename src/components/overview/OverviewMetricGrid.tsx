import {
  AlertCircle,
  BarChart2,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { OverviewOut } from "@/lib/fastapi/types";
import { formatNumber, formatPercent } from "@/lib/formatters";
import { OverviewMetricCard } from "./OverviewMetricCard";

interface OverviewMetricGridProps {
  data: OverviewOut;
}

export function OverviewMetricGrid({ data }: OverviewMetricGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <OverviewMetricCard
        label="Conversations"
        value={formatNumber(data.conversationCount)}
        subtext="Completed user sessions"
        icon={MessageSquare}
      />

      <OverviewMetricCard
        label="Questions"
        value={formatNumber(data.queryCount)}
        subtext="Customer queries asked"
        icon={HelpCircle}
      />

      <OverviewMetricCard
        label="Active Topics"
        value={formatNumber(data.topicCount)}
        subtext="Identified inquiry clusters"
        icon={BarChart2}
      />

      <OverviewMetricCard
        label="Unanswered Rate"
        value={formatPercent(data.unansweredRate)}
        subtext="Queries lacking knowledge"
        icon={AlertCircle}
        badge={{
          text: data.unansweredRate > 0.15 ? "Needs review" : "Healthy",
          variant: data.unansweredRate > 0.15 ? "attention" : "positive",
        }}
      />

      <OverviewMetricCard
        label="Mean Confidence"
        value={formatPercent(data.meanConfidence)}
        subtext="Average retrieval quality"
        icon={CheckCircle}
        badge={{
          text: data.meanConfidence >= 0.75 ? "High" : "Moderate",
          variant: data.meanConfidence >= 0.75 ? "positive" : "neutral",
        }}
      />

      <OverviewMetricCard
        label="Emerging Topics"
        value={formatNumber(data.emergingCount)}
        subtext="Rapidly growing topics"
        icon={Sparkles}
        badge={{
          text: data.emergingCount > 0 ? "New signals" : "Stable",
          variant: data.emergingCount > 0 ? "attention" : "neutral",
        }}
      />
    </div>
  );
}
