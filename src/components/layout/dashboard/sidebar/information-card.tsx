import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "../../header/components/logout";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { EllipsisVertical } from "lucide-react";
import { colors } from "@/lib/utils/colors";

export default async function InformationCard() {
  // Translation
  const t = await getTranslations();

  // Information user
  const tokenCookies = cookies().get(process.env.AUTH_COOKIES as string)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  // choose the color
  const color = colors[parseInt(token?.phone.slice(-2) as string)];

  return (
    <div className="flex gap-2 items-center border-t border-gray-200 px-4 py-3">
      {/* Avatar */}
      <div
        style={{ backgroundColor: color }}
        className="w-12 h-12 flex items-center justify-center rounded-full "
      >
        {token?.firstName.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col">
        {/* Name */}
        <span className="text-sm font-semibold">
          {token?.firstName} {token?.lastName}
        </span>

        {/* Email */}
        <span className="text-xs text-gray-400">{token?.email}</span>
      </div>

      {/* DropDown */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="text-gray-500">
            <EllipsisVertical size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/profile">{t("profile")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Logout />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
