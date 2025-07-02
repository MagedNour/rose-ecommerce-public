import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "../../../lib/utils/cn";

export default function Square({ className }: { className?: string }) {
  return <Skeleton className={cn("animate-pulse bg-gray-300", className)} />;
}
