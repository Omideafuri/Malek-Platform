'use client';

import React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'icon' | 'pill' | 'gold' | 'copper' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'pill';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', isLoading, icon, disabled, ...props }, ref) => {

    const baseClasses = "relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A857] focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100 select-none cursor-pointer";

    const sizeClasses = {
      sm: "h-10 px-5 text-xs tracking-wider rounded-full",
      md: "h-12 px-7 text-sm rounded-full",
      lg: "h-14 px-9 text-base rounded-full",
      pill: "h-12 px-7 text-xs tracking-wider rounded-full uppercase",
      icon: "h-11 w-11 p-0 rounded-full",
    }[size];

    const variantClasses = {
      primary: "bg-[#C9A857] text-white border border-transparent hover:bg-[#9E5214] hover:shadow-lg hover:shadow-[#C9A857]/20",
      secondary: "bg-[#133827] text-[#FAF8F5] border border-transparent hover:bg-[#0D2B1E] hover:shadow-lg hover:shadow-[#133827]/20",
      outline: "border border-[#133827] text-[#133827] bg-transparent hover:bg-[#133827] hover:text-[#FAF8F5]",
      ghost: "text-[#4A463F] hover:text-[#141210] hover:bg-[#F4EFE6]",
      danger: "bg-danger text-white border border-transparent hover:bg-danger/90",
      icon: "text-[#4A463F] hover:text-[#133827] hover:bg-[#F4EFE6] border border-[#E8E1D5]",
      pill: "bg-[#FAF8F5] text-[#133827] border border-[#E8E1D5] hover:border-[#133827] hover:bg-[#133827] hover:text-white",
      gold: "bg-[#C9A857] text-white font-medium border border-transparent hover:bg-[#9E5214] hover:shadow-lg hover:shadow-[#C9A857]/20",
      copper: "bg-[#C9A857] text-white font-medium border border-transparent hover:bg-[#9E5214] hover:shadow-lg hover:shadow-[#C9A857]/20",
      dark: "bg-[#000000] text-white border border-transparent hover:bg-[#0A2218] hover:shadow-lg",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseClasses, sizeClasses, variantClasses, className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <span className="inline-flex items-center gap-2">
            {icon}
            {children}
          </span>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"
