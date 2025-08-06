import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Search, ShoppingBag, User } from "lucide-react";
import AuthDialog from "@/components/features/auth/auth-dialog";
import { getCart } from "@/lib/apis/get-cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "./components/logout";

import MobileNavigation from "./components/mobile-navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import NavigationLinks from "./components/navigation-links";

export default async function Header() {
  // Translation
  const t = await getTranslations();

  // Hooks
  const session = await getServerSession();

  // Get cart
  const payload = await getCart();

  return (
    <header className="flex  items-center container my-4">
      {/* Logo */}
      <Link href={"/"}>
        <Image src="/assets/images/Logo.png" alt="Logo" width={86} height={0} />
      </Link>

      {/* Desktop Navigation */}
      <NavigationLinks />

      {/* Desktop Actions */}
      <div className="flex ms-auto md:ms-0 gap-5 items-center">
        {/* Search */}
        <Search className="text-custom-rose-900" />

        {!session?.user ? (
          <div className="flex items-center">
            <AuthDialog />
          </div>
        ) : (
          <>
            {/* Cart */}
            <Link href="/cart" className="text-custom-rose-900 relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-5 -right-1 text-white bg-custom-rose-900 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {(payload as CartResponse)?.numOfCartItems}
              </span>
            </Link>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                {session.image ? (
                  <Image
                    width={32}
                    height={32}
                    alt="User Image"
                    src={session?.user?.image as string}
                    className="rounded-full"
                  />
                ) : (
                  <User className="text-custom-rose-900 w-8 h-8" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/profile">{t("profile")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">{t("orders")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <MobileNavigation />
    </header>
  );
}
