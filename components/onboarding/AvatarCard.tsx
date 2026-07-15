"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarCardProps {
  url: string;
  seed: string;
  selected: boolean;
  onSelect: () => void;
}

export function AvatarCard({ url, seed, selected, onSelect }: AvatarCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label="Choose this avatar"
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-2xl p-2 transition-all duration-150",
        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--evven-accent-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "ring-2 ring-(--evven-accent-primary)"
          : "ring-1 ring-(--evven-border) hover:ring-(--evven-accent-primary)/50"
      )}
      style={{
        background: selected
          ? "var(--evven-accent-secondary)"
          : "var(--evven-surface)",
      }}
    >
      {/* on purpose there is no `size` prop here coz Avatar's fixed-size variants
          fight with the responsive grid.... Overriding className with
          "size-full" lets twMerge drop the base size utility */}
      <Avatar className="size-full">
        <AvatarImage src={url} alt="" />
        <AvatarFallback>{seed.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      {selected && (
        <span
          className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full"
          style={{
            background: "var(--evven-accent-primary)",
            color: "var(--evven-text-inverse)",
          }}
        >
          <Check size={12} />
        </span>
      )}
    </button>
  );
}