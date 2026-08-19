import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// RawBlock status chip: square, 2px border in the status colour, white fill.
const badgeVariants = cva(
  "group/badge inline-flex h-fit w-fit shrink-0 items-center justify-center gap-1.5 border-2 px-2.5 py-0.5 text-[11px] font-semibold tracking-[1px] whitespace-nowrap uppercase [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "border-foreground bg-background text-foreground",
        secondary: "border-foreground bg-foreground text-background",
        destructive: "border-destructive bg-background text-destructive",
        outline: "border-foreground bg-transparent text-foreground",
        ghost: "border-transparent bg-transparent text-muted-foreground",
        link: "border-transparent bg-transparent text-link normal-case tracking-normal underline underline-offset-4",
        available: "border-success bg-background text-success",
        limited: "border-warning bg-background text-warning",
        soldOut: "border-destructive bg-background text-destructive",
        featured: "border-foreground bg-foreground text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
