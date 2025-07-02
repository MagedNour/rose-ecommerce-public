import Bar from "@/components/common/skeletons/bar";
import Square from "@/components/common/skeletons/square";

export default function Loading() {
  return (
    <div className="mt-20 mx-[80px]">
      <div className=" flex items-center gap-5">
        <div>
          {/* Product Cover Image */}
          <Square className="w-[478px] h-[478px] mb-3" />
          <div className="flex gap-5 items-center justify-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <Square key={i} className="w-[90px] h-[90px] mr-4 mt-2" />
            ))}
          </div>
        </div>

        <div>
          {/* Product Title */}
          <Bar className="w-[200px] max-w-full h-[30px] rounded-md" />

          {/* Product Description */}
          <Bar className="w-[500px] max-w-full h-[130px] my-8 rounded-md" />

          {/* Add To Cart Button */}
          {Array.from({ length: 2 }).map((_, i) => (
            <Bar key={i} className="w-[100px] max-w-full h-[30px] mb-6 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
