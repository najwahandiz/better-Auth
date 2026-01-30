import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"

interface CityBadgeProps {
  city: string
  className?: string
  showIcon?: boolean
}

export function CityBadge({ city, className, showIcon = true }: CityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
        "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20",
        className
      )}
    >
      {showIcon && <MapPin className="w-3.5 h-3.5" />}
      {city}
    </span>
  )
}

