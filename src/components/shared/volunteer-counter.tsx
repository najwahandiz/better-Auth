"use client"

import { cn } from "@/lib/utils"
import { Users } from "lucide-react"
import { motion } from "framer-motion"

interface VolunteerCounterProps {
  count: number
  className?: string
}

export function VolunteerCounter({ count, className }: VolunteerCounterProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {/* Live Badge */}
      <motion.div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#064E3B]/10 border border-[#064E3B]/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="w-2 h-2 rounded-full bg-[#064E3B]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="text-xs font-semibold text-[#064E3B]">Live</span>
      </motion.div>

      {/* Counter */}
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#064E3B]">
        <Users className="w-4 h-4" />
        <span>{count} {count === 1 ? "citoyen aide" : "citoyens aident"} déjà</span>
      </span>
    </div>
  )
}

