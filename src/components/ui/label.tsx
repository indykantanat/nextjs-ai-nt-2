"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// RawBlock label: Archivo Black, uppercase, tracked out.
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "rb-label flex items-center gap-2 leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:text-[#888888] peer-disabled:cursor-not-allowed peer-disabled:text-[#888888]",
        className
      )}
      {...props}
    />
  )
}

export { Label }
