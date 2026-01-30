import { cn } from "@/lib/utils"
import { CheckCircle, Circle } from "lucide-react"

export type Status = "ouvert" | "complet"

interface StatusBadgeProps {
  status: Status
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const isOpen = status === "ouvert"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
        isOpen 
          ? "bg-[#064E3B]/10 text-[#064E3B] border border-[#064E3B]/20" 
          : "bg-muted text-muted-foreground border border-border",
        className
      )}
    >
      {isOpen ? (
        <CheckCircle className="w-3.5 h-3.5" />
      ) : (
        <Circle className="w-3.5 h-3.5" />
      )}
      {isOpen ? "Ouvert" : "Résolu"}
    </span>
  )
}

