import { Sparkles } from "lucide-react";
import servicesData from "@/data/services.json";
import { requireUser } from "@/lib/auth";
import { ServiceSelector } from "@/components/services/ServiceSelector";
import { ServiceDefinition } from "@/lib/validations/services";

export const metadata = {
  title: "Choose Services | KnowledgePulse",
  description: "Select the tailored intelligence services for your organization.",
};

export default async function ServicesPage() {
  const user = await requireUser();
  const services = servicesData as ServiceDefinition[];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-md-secondary-container px-3.5 py-1 text-xs font-semibold text-md-on-secondary-container">
          <Sparkles className="h-3.5 w-3.5" />
          Step 1 of 2: Service Selection
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-md-on-surface sm:text-4xl lg:text-5xl">
          What should KnowledgePulse power for you?
        </h1>

        <p className="mt-4 text-base sm:text-lg text-md-on-surface-variant leading-relaxed">
          Select one or more capabilities tailored to your organization&apos;s support, documentation, and intelligence requirements. You can update these anytime.
        </p>
      </div>

      {/* Main interactive grid */}
      <ServiceSelector
        services={services}
        initialSelectedServices={user.services ?? []}
      />
    </div>
  );
}
