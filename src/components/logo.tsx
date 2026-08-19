import Link from "next/link";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("group flex items-center gap-3", className)}>
    <span className="flex size-11 items-center justify-center border-3 border-foreground bg-foreground font-heading text-xl text-background transition-colors duration-75 group-hover:bg-background group-hover:text-foreground">
      C
    </span>
    <span className="flex flex-col leading-none">
      <span className="font-heading text-xl uppercase text-foreground">
        COSCI
      </span>
      <span className="mt-1 rb-meta text-muted-foreground">E&mdash;Commerce</span>
    </span>
  </Link>
);
