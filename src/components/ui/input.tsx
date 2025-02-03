import * as React from "react"

import {cn} from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
            "flex  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-lPrimary file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white/85  placeholder:text-bgPrimarySecondary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-lPrimarySecondary focus-visible:ring-offset-0 focus-visible:border-lPrimarySecondary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "h-[55px] pl-6 py-[19px] bg-[#38454e]/20 rounded-[5px] border-2 border-[#38454e] justify-start items-center inline-flex overflow-hidden",
            "text-white/85 text-lg font-normal",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
