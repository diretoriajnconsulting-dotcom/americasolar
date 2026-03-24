import React from "react"
import { cn } from "@/utils/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-base/50 focus:ring-offset-2 focus:ring-offset-surface-base disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
  
  const variants = {
    primary: "bg-primary-base text-surface-lowest hover:bg-primary-hover shadow-[0_0_15px_rgba(238,194,0,0.2)] hover:shadow-[0_0_25px_rgba(238,194,0,0.4)] hover:-translate-y-0.5 px-6 py-2.5 font-display tracking-wide uppercase text-sm",
    secondary: "bg-surface-elevated text-text-body border border-white/5 hover:border-white/20 hover:bg-surface-elevated/80 px-6 py-2.5 font-display tracking-wide uppercase text-sm",
    outline: "bg-transparent border border-primary-base/50 text-primary-base hover:bg-primary-base/10 px-6 py-2.5 font-display tracking-wide uppercase text-sm"
  }

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  )
}
