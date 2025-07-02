import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

// props
type DeleteConfirmationDialog = {
  title: string;
  onConfirm: () => void;
};

export default function DeleteConfirmationDialog({ title, onConfirm }: DeleteConfirmationDialog) {
  // Tranlations
  const t = useTranslations();

  return (
    <>
      <Dialog>
        {/* Dialog Trigger */}
        <DialogTrigger asChild>
          <button className="flex gap-1 bg-red-100 text-red-600 rounded-md w-[74px] h-[27px] pt-1 px-2 font-medium text-xs">
            <Trash2 width={16} height={16} />
            {t("delete")}
          </button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent className="w-[474px] max-w-full h-auto min-h-[371px] !rounded-2xl mx-10">
          {/* Dialog Header For Better Accessibility */}
          <DialogHeader className="flex items-center flex-col mt-16">
            <div className="relative flex items-center justify-center w-[105px] h-[105px] before:content-[''] before:absolute before:inset-0 before:w-[105px] before:h-[105px] before:rounded-full before:bg-gray-900 before:bg-opacity-5 after:content-[''] after:absolute after:w-[70px] after:h-[70px] after:rounded-full after:bg-gray-900 after:bg-opacity-15 after:flex after:items-center after:justify-center">
              {/* Trash Icon */}
              <Trash width={29} height={29} className="z-10" />
            </div>

            {/* Dialog Title */}
            <DialogTitle className="font-semibold text-lg first-letter:uppercase mt-6 mb-16">
              {t("ConfirmDelete", { title })}
            </DialogTitle>
          </DialogHeader>

          {/* Dialog Footer */}
          <DialogFooter className="flex items-center justify-between gap-2">
            <DialogTrigger asChild>
              {/* Cancel Button */}
              <Button
                variant={"secondary"}
                className="font-mulish font-semibold text-sm flex-1 w-52 justify-center h-10 rounded-lg pt-2 px-4  border border-slate-300"
              >
                {t("cancel")}
              </Button>
            </DialogTrigger>

            {/* Delete Button */}
            <Button
              onClick={onConfirm}
              className="font-mulish font-semibold text-sm flex-1 justify-center w-52 h-10 rounded-lg pt-2 px-4 text-white bg-red-500 hover:bg-red-500!"
            >
              {t("confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
