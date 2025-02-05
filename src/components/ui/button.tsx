import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-lPrimary/20 font-['Feather'] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lPrimary/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-lPrimary text-bgPrimary hover:bg-lPrimary/90 text-base font-bold tracking-wide border-b-4 border-b-lPrimarySecondary active:border-b-0",
                green:
                    "bg-[#92d233] text-bgPrimary hover:bg-[#92d233]/90 text-base font-bold tracking-wide border-2 border-b-4 border-[#7aba2a] active:border-b-2",
                red:
                    "bg-[#F4535C] text-bgPrimary hover:bg-[#F4535C]/90 text-base font-bold tracking-wide border-2 border-b-4 border-[#D74641] active:border-b-2",
                purple:
                    "bg-[white] text-[#5f3a9a] hover:bg-white/90 text-base font-bold tracking-wide border-2 border-b-4 border-lPrimarySecondary  border-[#d0cfd4]  active:border-b-2",
                neutral:
                    "bg-transparent text-white/90  text-base font-bold tracking-wide border-2 border-b-4  active:border-b-2",
                selected:
                    "bg-[#213037] text-[#1b93cf]  text-base font-bold tracking-wide border-2 border-b-4 border-[#45829d] active:border-b-2",
                text:
                    "bg-transparent text-lPrimary hover:text-lPrimary/85 text-lPrimary text-base font-bold tracking-wide border-b-4 border-b-transparent active:border-b-0",
                dashed:
                    "bg-transparent text-white text-base font-bold tracking-wide border-2 border-b-4 border-[#38454e] border-dashed active:border-b-2",
                disabled:
                    "bg-[#38454e] text-lPrimary text-[#54656d] text-base font-bold tracking-wide border-b-4 border-b-transparent active:border-b-0",
                textRed:
                    "bg-transparent text-lRed hover:text-lRed/85 text-base font-bold tracking-wide border-b-4 border-b-transparent active:border-b-0",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-[50px] rounded-xl px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-[79px] rounded-xl px-4 py-2",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
