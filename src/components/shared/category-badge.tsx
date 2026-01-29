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
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
  },
  "aide-scolaire": {
    label: "Aide scolaire",
    icon: BookOpen,
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  dons: {
    label: "Dons",
    icon: Gift,
    bgColor: "bg-pink-100",
    textColor: "text-pink-700",
  },
  transport: {
    label: "Transport",
    icon: Car,
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
  },
  bricolage: {
    label: "Bricolage",
    icon: Wrench,
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
  },
  autre: {
    label: "Autre",
    icon: RefreshCw,
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
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
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  )
}

