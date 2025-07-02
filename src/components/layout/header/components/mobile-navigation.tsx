"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import MobileMenu from "./mobile-menu";

export default function MobileNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button onClick={() => setMobileMenuOpen(true)} className="md:hidden">
        <Menu className="text-custom-rose-900 w-8 h-8" />
      </button>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
