import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/cn";

export default function Bar({ className }: { className?: string }) {
  return <Skeleton className={cn("animate-pulse rounded-md", className)} />;
}
