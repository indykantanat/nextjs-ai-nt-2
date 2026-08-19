import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// RawBlock: square, thick-bordered, uppercase. Hover = full inversion.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 border-3 font-semibold tracking-[2px] uppercase whitespace-nowrap select-none transition-colors duration-75 outline-none focus-visible:outline-5 focus-visible:outline-offset-0 focus-visible:outline-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[#cccccc] disabled:bg-sunken disabled:text-[#888888] aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-foreground bg-foreground text-background hover:bg-background hover:text-foreground active:border-5 active:bg-foreground active:text-background",
        secondary:
          "border-foreground bg-background text-foreground hover:bg-foreground hover:text-background active:border-5",
        outline:
          "border-foreground bg-background text-foreground hover:bg-foreground hover:text-background active:border-5",
        ghost:
          "border-0 border-transparent bg-transparent text-foreground underline underline-offset-4 hover:text-link",
        destructive:
          "border-foreground bg-destructive text-white hover:bg-foreground hover:text-destructive active:border-5",
        link: "border-0 border-transparent bg-transparent text-link normal-case tracking-normal underline underline-offset-4",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-[14px]",
        xs: "h-8 px-3 py-1 text-[11px] [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 px-4 py-1.5 text-[12px] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-14 px-10 py-4 text-[18px]",
        icon: "size-11",
        "icon-xs": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-14 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
