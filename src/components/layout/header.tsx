"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBagIcon, SearchIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b py-3 sticky top-0 z-50 bg-white border-jetblack-100">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <MenuSidebar />

        <h1>عنوان وب سایت</h1>

        <div className="flex gap-4">
          <Button
            asChild
            className="cursor-pointer"
            variant={"link"}
            size={"icon"}
          >
            <Link href={"/cart"}>
              <ShoppingBagIcon size={22} />
            </Link>
          </Button>

          <Button className="cursor-pointer" variant={"link"} size={"icon"}>
            <SearchIcon size={22} />
          </Button>
        </div>
      </div>
    </header>
  );
}

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MenuSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="cursor-pointer"
          variant={"ghost"}
          size={"icon"}
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-transparent backdrop-blur-2xl border-none p-0 overflow-hidden backdrop-blur-transition"
        showCloseButton={false}
        side="right"
      >
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="h-screen flex flex-col items-center backdrop-blur-xl bg-white/35 justify-center relative px-6">
          <nav
            className="flex w-full flex-col items-center space-y-8 z-10"
            role="navigation"
          >
            {SIDEBAR_ITEMS.map((si) => (
              <Button
                variant={"sidebar-link"}
                key={si.href}
                className="cursor-pointer w-full text-lg"
                asChild
                size={"lg"}
              >
                <Link href={si.href}>{si.label}</Link>
              </Button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SIDEBAR_ITEMS = [
  {
    label: "خانه",
    href: "/",
  },
  {
    label: "محصولات",
    href: "/products",
  },
  {
    label: "سبد خرید",
    href: "/cart",
  },
];
