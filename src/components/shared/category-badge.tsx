import { cn } from "@/lib/utils"
import { Brush, BookOpen, Gift, Car, Wrench, RefreshCw, type LucideIcon } from "lucide-react"
import type { Category } from "@/lib/constants/categories"

interface CategoryConfig {
  label: string
  icon: LucideIcon
  bgColor: string
  textColor: string
}

const categoryConfig: Record<Category, CategoryConfig> = {
  nettoyage: {
    label: "Nettoyage",
    icon: Brush,
    bgColor: "bg-[#064E3B]/10",
    textColor: "text-[#064E3B]",
  },
  "aide-scolaire": {
    label: "Aide scolaire",
    icon: BookOpen,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  dons: {
    label: "Dons",
    icon: Gift,
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
  },
  transport: {
    label: "Transport",
    icon: Car,
    bgColor: "bg-[#F59E0B]/10",
    textColor: "text-[#F59E0B]",
  },
  bricolage: {
    label: "Bricolage",
    icon: Wrench,
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
  autre: {
    label: "Autre",
    icon: RefreshCw,
    bgColor: "bg-muted",
    textColor: "text-muted-foreground",
  },
}

interface CategoryBadgeProps {
  category: Category
  className?: string
  showIcon?: boolean
}

export function CategoryBadge({ category, className, showIcon = true }: CategoryBadgeProps) {
  const config = categoryConfig[category]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border",
        config.bgColor,
        config.textColor,
        "border-current/20",
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {config.label}
    </span>
  )
}

