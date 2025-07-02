import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

declare type TestimonailsCardProps = {
  feedback: TestimonailsFeedsInterface;
};

export default function TestimonailsCard({ feedback }: TestimonailsCardProps) {
  return (
    <>
      <div className=" bg-white aspect-square rounded-tl-[50px] rounded-tr-[100px] rounded-br-[100px] rounded-bl-[100px]  p-6 ">
        {/* Feedback header */}
        <div className="feedback-header flex gap-x-4 pt-6 ">
          {/* Customer photo */}
          <div
            className={cn(
              "before:border-4 before:-translate-x-1 before:-translate-y-1  before:rounded-full before:border-custom-rose-900 rtl:before:translate-x-1  before:w-[calc(100%+8px)] before:h-[calc(100%+8px)] before:absolute before:bg-transparent relative w-12 h-12 after:absolute after:w-7 after:h-16 after:bg-white after:-translate-x-1 after:-translate-y-1 after:rotate-[135deg] after:left-6 after:bottom-0  ",
            )}
          >
            <Image
              className="rounded-full z-10 object-cover"
              fill
              src={feedback.image}
              alt={feedback.name}
            />
          </div>

          {/* Name of the customer  */}
          <div className="name  font-bold text-[17px] ">
            <h2 className="z-20 relative">{feedback.name}</h2>
            <span className="text-custom-rose-900">{feedback.role}</span>
          </div>
        </div>

        {/* Line */}
        <div className="mb-6 h-[1px] my-6 bg-custom-muted"></div>

        {/* Comment of the customer */}
        <div className="comment">
          <p className="text-sm text-custom-muted ">{feedback.feedback}</p>

          {/* Stars and comment icon */}
          <div className="flex justify-between items-center pt-2 pb-5 ">
            {/* Stars icons */}
            <div className="stars flex gap-x-1">
              {Array.from({ length: feedback.ratting }, (_, index) => (
                <FaStar key={index} className="text-custom-rose-900" />
              ))}
            </div>

            {/* Comment icon */}
            <div>
              <Image src={feedback.commentImage} alt="icon photo" width={77} height={62} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
