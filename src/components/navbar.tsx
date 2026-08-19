import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import CountCartItem from "@/app/(front)/components/CountCartItem";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <nav className="border-b-5 border-foreground bg-background">
      <div className="mx-auto flex h-[72px] max-w-(--breakpoint-xl) items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="flex h-11 items-center gap-2 border-3 border-foreground bg-background px-4 font-mono text-[13px] font-bold tracking-[1px] text-foreground uppercase transition-colors duration-75 hover:bg-foreground hover:text-background"
          >
            <span>Cart</span>
            <span className="border-l-3 border-current pl-2">
              <CountCartItem />
            </span>
          </Link>

          {
            !session && (
              <>
                <Button asChild className="hidden sm:inline-flex" variant="secondary">
                  <Link href="/login">เข้าสู่ระบบ</Link>
                </Button>
                <Button asChild className="hidden sm:inline-flex">
                  <Link href="/signup">สมัครสมาชิก</Link>
                </Button>
              </>
            )
          }

          {
            session && (
              <>
                <div className="mr-1 hidden rb-meta text-muted-foreground md:block">
                  <span className="text-foreground">{session.user.name}</span>
                </div>
                <div className="hidden md:block">
                  <LogoutButton />
                </div>
              </>
            )
          }

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
