import { cn } from "@/lib/utils/cn";
import { FaArrowRight } from "react-icons/fa6";

export default function ArrowRight({ className }: { className?: string }) {
  return <FaArrowRight className={cn("rtl:rotate-180", className)} />;
}
