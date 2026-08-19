'use client'

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button size="icon" variant="secondary" aria-label="เปิดเมนู">
          <span className="font-mono text-[16px] leading-none font-bold">≡</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-sp3">
        <Logo />
        <NavMenu
          className="mt-sp4 max-w-none [&>div]:h-full"
          orientation="vertical"
        />
      </SheetContent>
    </Sheet>
  );
};
