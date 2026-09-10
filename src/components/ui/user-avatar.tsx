import React from "react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  image?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

function getInitials(name: string): string {
  if (!name) return "KP";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

export function UserAvatar({
  name,
  image,
  className,
  size = "md",
}: UserAvatarProps) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        className={cn(
          "rounded-full object-cover shadow-sm",
          sizeClasses[size],
          className,
        )}
      />
    );
  }

  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-semibold tracking-wider transition-colors duration-200",
        "bg-md-secondary-container text-md-on-secondary-container border border-md-outline/20 shadow-sm",
        sizeClasses[size],
        className,
      )}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
}
