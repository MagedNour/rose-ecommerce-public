import React from "react";
import Bar from "@/components/common/skeletons/bar";
import Circle from "@/components/common/skeletons/circle";
import Square from "@/components/common/skeletons/square";
import { cn } from "@/lib/utils/cn";

export default function ProductSkeleton({ className }: { className?: string }) {
  
  return (
    <div className={cn("flex flex-col w-[302px] h-[369px] rounded-3xl", className)}>
      {/* Product Thumbnail */}
      <Square className="w-full h-[272px] rounded-3xl bg-gray-200 mb-1" />

      {/* Product Body */}
      <div className="grid grid-cols-2 mt-4">
        {/* Product Details */}
        <div className="col-span-1 ps-4">
          {/* Product Title */}
          <Bar className="w-[131px] h-[24px] bg-gray-300" />

          {/* Product Rating */}
          <Bar className="w-[79.5px] h-[15px] bg-gray-300 my-[9px]" />

          {/* Product Price */}
          <Bar className="w-[60px] h-[17px] bg-gray-400" />
        </div>

        {/* Add to Cart Icon */}
        <div className="col-span-1 flex items-center justify-end pe-4">
          <Circle className="w-[42px] h-[42px] bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
