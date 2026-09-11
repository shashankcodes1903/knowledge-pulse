/**
 * Formatting utilities for KnowledgePulse metrics, dates, and values.
 */

export function formatPercent(value?: number | null): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "0%";
  }

  // If value is between 0 and 1, convert to 0-100 scale
  const normalized = value <= 1 && value >= -1 ? value * 100 : value;
  return `${Math.round(normalized)}%`;
}

export function formatConfidence(value?: number | null): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "N/A";
  }

  const normalized = value <= 1 && value >= 0 ? value * 100 : value;
  return `${Math.round(normalized)}%`;
}

export function formatGrowth(value?: number | null): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "0%";
  }

  const normalized = value <= 1 && value >= -1 && value !== 0 ? value * 100 : value;
  const rounded = Math.round(normalized);
  if (rounded > 0) {
    return `+${rounded}%`;
  }
  return `${rounded}%`;
}

export function formatNumber(value?: number | null): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "0";
  }
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(isoString?: string | null): string {
  if (!isoString) {
    return "N/A";
  }
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) {
      return isoString;
    }
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return isoString;
  }
}

export function formatDateTime(isoString?: string | null): string {
  if (!isoString) {
    return "N/A";
  }
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) {
      return isoString;
    }
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    return isoString;
  }
}
