export const CATEGORIES = [
  { value: "nettoyage", label: "Nettoyage", icon: "🧹" },
  { value: "aide-scolaire", label: "Aide scolaire", icon: "📚" },
  { value: "dons", label: "Dons", icon: "🎁" },
  { value: "transport", label: "Transport", icon: "🚗" },
  { value: "bricolage", label: "Bricolage", icon: "🔨" },
  { value: "autre", label: "Autre", icon: "🔄" },
] as const

export type Category = typeof CATEGORIES[number]["value"]

export const getCategoryLabel = (category: Category): string => {
  return CATEGORIES.find((c) => c.value === category)?.label || category
}

export const getCategoryIcon = (category: Category): string => {
  return CATEGORIES.find((c) => c.value === category)?.icon || "🔄"
}

