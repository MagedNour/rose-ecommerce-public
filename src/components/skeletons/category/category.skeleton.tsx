import React from "react";
import Bar from "@/components/common/skeletons/bar";
import Circle from "@/components/common/skeletons/circle";
import { cn } from "../../../lib/utils/cn";

export default function CategorySkeleton({ className }: { className?: string }) {
  
  return (
    <div className={cn("grid grid-cols-2 w-[217px] h-[122px] rounded-3xl bg-gray-50", className)}>
      {/* Category Icon */}
      <div className="col-span-1 flex items-center justify-end">
        <Circle className="w-[90px] h-[90px] bg-gray-300" />
      </div>

      {/* Category Details */}
      <div className="col-span-1 flex flex-col justify-center ps-4">
        {/* Category Title */}
        <Bar className="w-[80px] h-[22px] bg-gray-400 mb-1" />

        {/* Category Items count */}
        <Bar className="w-[60px] h-[22px] bg-gray-300" />
      </div>
    </div>
  );
}
