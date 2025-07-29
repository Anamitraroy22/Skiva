import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl hover:scale-105 glow-primary",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border-2 border-primary/20 bg-transparent text-foreground shadow-sm hover:bg-primary/10 hover:border-primary/40 backdrop-blur-sm",
                secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-lg hover:scale-105",
                ghost: "hover:bg-accent/10 hover:text-accent",
                link: "text-primary underline-offset-4 hover:underline",
                hero: "bg-gradient-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 glow-primary text-lg font-semibold",
                glass: "glass text-foreground hover:bg-glass-bg/20 border-glass-border/30",
            },
            size: {
                default: "h-12 px-6 py-3",
                sm: "h-9 rounded-md px-3",
                lg: "h-14 rounded-lg px-10 text-lg",
                xl: "h-16 rounded-xl px-12 text-xl",
                icon: "h-12 w-12",
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