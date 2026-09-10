"use client";

import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { DocumentUploadSection } from "./DocumentUploadSection";
import { ResourceUrlSection } from "./ResourceUrlSection";
import { UserDocumentItem, UserResourceItem } from "@/models/user";

interface ResourceOnboardingViewProps {
  initialDocuments: UserDocumentItem[];
  initialResources: UserResourceItem[];
}

export function ResourceOnboardingView({
  initialDocuments,
  initialResources,
}: ResourceOnboardingViewProps) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Information Banner */}
      <div className="flex items-start gap-3.5 rounded-[24px] border border-indigo-200/80 bg-indigo-50/70 p-4 sm:p-5 text-indigo-950 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-200">
        <Info className="h-5 w-5 shrink-0 text-md-primary mt-0.5" />
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-md-on-surface">
            Account-Level Resource Linking
          </p>
          <p className="mt-1 text-md-on-surface-variant">
            At this onboarding stage, your documents and web URLs are cataloged and securely attached to your KnowledgePulse organization profile. Automated parsing, OCR extraction, chunking, and AI embedding will take place in the next intelligence activation milestone.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <DocumentUploadSection initialDocuments={initialDocuments} />
        <ResourceUrlSection initialResources={initialResources} />
      </div>

      {/* Navigation to Profile */}
      <div className="pt-4 flex items-center justify-between">
        <Link
          href="/services"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          &larr; Back to Services
        </Link>

        <Link
          href="/profile"
          className="inline-flex items-center gap-2 rounded-full bg-md-primary px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-md-primary/90 hover:shadow-lg active:scale-95"
        >
          Go to Account Profile
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
