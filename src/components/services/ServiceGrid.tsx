import React from "react";
import { ServiceCard } from "./ServiceCard";
import { ServiceDefinition } from "@/lib/validations/services";

interface ServiceGridProps {
  services: ServiceDefinition[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function ServiceGrid({
  services,
  selectedIds,
  onToggle,
}: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          {...service}
          isSelected={selectedIds.includes(service.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
