import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-transparent hover:bg-primary-foreground hover:text-primary hover:border-primary",
        destructive: "bg-destructive text-destructive-foreground border-2 border-transparent hover:bg-destructive-foreground hover:text-destructive hover:border-destructive",
        outline: "border-2 border-primary/50 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary",
        secondary: "bg-secondary text-primary border-2 border-primary/20 hover:bg-primary hover:text-secondary hover:border-primary",
        ghost: "bg-transparent text-primary border-2 border-transparent hover:bg-secondary/50 hover:border-primary/30",
        link: "text-primary underline-offset-4 hover:underline shadow-none hover:shadow-none",
        accent: "bg-accent text-accent-foreground border-2 border-transparent hover:bg-accent-foreground hover:text-accent hover:border-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
