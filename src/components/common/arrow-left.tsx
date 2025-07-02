import { cn } from "@/lib/utils/cn";
import { FaArrowLeft } from "react-icons/fa6";

export default function ArrowLeft({ className }: { className?: string }) {
  return <FaArrowLeft className={cn("rtl:rotate-180", className)} />;
}
