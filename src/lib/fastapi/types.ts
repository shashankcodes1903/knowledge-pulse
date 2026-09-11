/**
 * OpenAPI TypeScript types directly mapped from openapi.json.
 * Source of truth: openapi.json (FastAPI backend)
 */

export type SourceKind = "website" | "pdf" | "docx" | "text" | (string & {});

export type SourceStatus =
  | "ready"
  | "processing"
  | "pending"
  | "failed"
  | (string & {});

export interface SourceOut {
  id: string;
  kind: SourceKind;
  label: string;
  location: string;
  status: SourceStatus;
  pageCount: number;
  chunkCount: number;
  lastIndexedAt: string | null;
  contentHash: string | null;
  error?: string | null;
}

export interface SourceCreate {
  kind: "website" | "pdf" | "docx" | "text";
  location: string;
  label?: string | null;
}

export interface ChatRequest {
  question: string;
  session_id: string;
}

export interface CitationOut {
  chunkId: string;
  sourceLabel: string;
  headingPath: string;
  similarity: number;
  excerpt: string;
}

export interface MessageOut {
  id: string;
  role: string;
  text: string;
  createdAt: string;
  confidence: number | null;
  citations: CitationOut[];
}

export interface TrendPointOut {
  period: string;
  queries: number;
  meanConfidence: number;
}

export interface OverviewOut {
  period: string;
  conversationCount: number;
  queryCount: number;
  topicCount: number;
  unansweredRate: number;
  meanConfidence: number;
  emergingCount: number;
  volumeByPeriod: TrendPointOut[];
}

export type InsightTrend =
  | "Emerging"
  | "Growing"
  | "Stable"
  | "Declining"
  | (string & {});

export interface InsightOut {
  id: string;
  rank: number;
  name: string;
  keywords: string[];
  queryCount: number;
  previousQueryCount: number;
  growth: number;
  meanConfidence: number;
  severity: number;
  priority: number;
  trend: InsightTrend;
  sampleQueries: string[];
}

export interface MemberQueryOut {
  id: string;
  text: string;
  confidence: number;
  askedAt: string;
}

export interface InsightDetailOut extends InsightOut {
  history: TrendPointOut[];
  memberQueries: MemberQueryOut[];
  weakestChunks: CitationOut[];
}

export interface RecommendationOut {
  id: string;
  category: string;
  headline: string;
  body: string;
  insightId: string;
  insightName: string;
  supportingQueries: string[];
  volume: number;
  growth: number;
  expectedEffect: string;
  faqAnswer?: string | null;
}

export interface ReportOut {
  id: string;
  period: string;
  generatedAt: string;
  conversationCount: number;
  queryCount: number;
  unansweredRate: number;
  summary: string;
  recommendations: RecommendationOut[];
}

export interface EvaluationFailureItem {
  question?: string;
  reason?: string;
  faithfulness?: number;
  answerRelevance?: number;
  contextRelevance?: number;
  [key: string]: unknown;
}

export interface EvaluationOut {
  id: string;
  ranAt: string;
  questionCount: number;
  faithfulness: number;
  answerRelevance: number;
  contextRelevance: number;
  failures: EvaluationFailureItem[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}
