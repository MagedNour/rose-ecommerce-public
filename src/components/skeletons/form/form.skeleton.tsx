import Bar from "@/components/common/skeletons/bar";

export default function FormSkeleton() {
  return (
    <>
      {/* Form Title  */}
      <Bar className="w-[150px] max-w-full h-[20px] bg-gray-300 mb-6"></Bar>

      {/* Form Inputs */}
      <Bar className="w-[300px] max-w-full  h-[30px] bg-gray-300 mb-2"></Bar>
      <Bar className="w-[300px] max-w-full  h-[30px] bg-gray-300 mb-4"></Bar>

      {/* Submit Button */}
      <Bar className="w-[520px] max-w-full h-[30px] bg-gray-300 mb-5 rounded-[30px]"></Bar>
    </>
  );
}
