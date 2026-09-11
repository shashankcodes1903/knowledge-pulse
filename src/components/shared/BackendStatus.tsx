import { CheckCircle, XCircle } from "lucide-react";

interface BackendStatusProps {
  status: "connected" | "unavailable";
  className?: string;
}

export function BackendStatus({ status, className = "" }: BackendStatusProps) {
  const isConnected = status === "connected";

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isConnected
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
          : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
      } ${className}`}
    >
      {isConnected ? (
        <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <XCircle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
      )}
      <span>{isConnected ? "Engine Connected" : "Engine Offline"}</span>
    </div>
  );
}
