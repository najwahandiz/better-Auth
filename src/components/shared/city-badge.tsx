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
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        "bg-muted text-muted-foreground",
        className
      )}
    >
      {showIcon && <MapPin className="w-3 h-3" />}
      {city}
    </span>
  )
}

