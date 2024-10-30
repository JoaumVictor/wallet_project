import { cn } from "@/utils/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full gap-1 transition-colors disabled:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground disabled:border-muted",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow hover:bg-primary/80",
        light:
          "bg-gray-50 text-gray-900 shadow hover:bg-gray-50/80 hover:text-gray-900/90",
        dark: "bg-gray-900 text-foreground shadow hover:bg-gray-800 hover:text-foreground/90 text-white",
        gradient1:
          "bg-gradient1 text-foreground shadow hover:bg-gradient1-foreground disabled:bg-gradient1-foreground disabled:text-foreground/70",
        ghost:
          "text-primary hover:text-foreground disabled:bg-transparent disabled:pointer-events-none",
        link: "text-primary underline-offset-4 hover:underline",
        transparent:
          "bg-transparent text-primary-foreground border border-primary shadow hover:bg-primary/80 disabled:border-none disabled:text-muted-foreground",
        outline:
          "text-foreground hover:text-foreground/80 border disabled:bg-transparent disabled:pointer-events-none",
        transparentLight:
          "bg-transparent text-primary-foreground border border-white shadow hover:bg-white hover:text-black disabled:border-none disabled:text-muted-foreground",
      },
      size: {
        sm: "py-1 px-2 text-sm font-medium",
        md: "w-48 h-9 py-1.5 px-3 font-medium",
        lg: "h-8 py-2 px-4 text-xl font-medium",
        icon: "h-9 w-9",
        full: "w-full h-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size = "md",
      className,
      disabled = false,
      loading,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), "")}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
