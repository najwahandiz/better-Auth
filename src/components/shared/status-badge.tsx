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
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        isOpen ? "bg-secondary/20 text-secondary" : "bg-gray-100 text-gray-500",
        className
      )}
    >
      {isOpen ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <Circle className="w-3 h-3" />
      )}
      {isOpen ? "Ouvert" : "Complet"}
    </span>
  )
}

