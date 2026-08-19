import * as React from "react"

import { cn } from "@/lib/utils"

// RawBlock input: sunken grey field, 3px black frame, 5px on focus. Mono text.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 border-3 border-foreground bg-sunken px-3 py-2.5 font-mono text-[15px] leading-[1.5] text-foreground transition-colors duration-75 outline-none",
        "placeholder:text-[#777777]",
        "hover:bg-[#e8e8e8]",
        "focus-visible:border-5 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[#cccccc] disabled:bg-[#f5f5f5] disabled:text-[#888888]",
        "aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
