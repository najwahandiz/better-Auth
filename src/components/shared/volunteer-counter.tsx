import { cn } from "@/lib/utils"
import { Flame } from "lucide-react"

interface VolunteerCounterProps {
  count: number
  className?: string
}

export function VolunteerCounter({ count, className }: VolunteerCounterProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-primary",
        className
      )}
    >
      <Flame className="w-4 h-4 text-orange-500" />
      <span>{count} {count === 1 ? "citoyen aide" : "citoyens aident"} déjà</span>
    </span>
  )
}

