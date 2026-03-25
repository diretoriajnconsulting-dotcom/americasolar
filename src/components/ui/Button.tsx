import React from "react"
import { cn } from "@/utils/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-[#1B84FE]/40 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer"

  const variants: Record<string, string> = {
    // Botão primário — "Quero um orçamento"
    primary:
      "bg-[#1B84FE] text-black rounded-[10px] px-7 py-3 text-sm font-semibold " +
      "hover:bg-[#1D67CD] shadow-md hover:shadow-lg hover:-translate-y-0.5",

    // Botão secundário — "Enviar"
    secondary:
      "bg-[#1D67CD] text-black rounded-[10px] px-7 py-3 text-sm font-semibold " +
      "hover:bg-[#1565B8] shadow-md hover:shadow-lg hover:-translate-y-0.5",

    // Contorno azul
    outline:
      "bg-transparent border-2 border-[#1B84FE] text-[#1B84FE] rounded-[10px] px-7 py-3 " +
      "text-sm font-semibold hover:bg-[#EBF3FF]",

    // Ghost (nav / links sutis)
    ghost:
      "bg-transparent text-[#4B5563] rounded-[10px] px-5 py-2.5 text-sm " +
      "hover:bg-[#F1F5F9] hover:text-[#1B84FE]",
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  )
}
