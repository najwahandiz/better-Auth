"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CityBadge } from "./city-badge";
import { CategoryBadge } from "./category-badge";
import { StatusBadge, type Status } from "./status-badge";
import { VolunteerCounter } from "./volunteer-counter";
import { WhatsAppButton } from "./whatsapp-button";
import { joinNeed } from "@/lib/actions/besoin";
import { toast } from "sonner";
import { Check, Loader2, User, Calendar } from "lucide-react";
import type { Category } from "@/lib/constants/categories";

export interface BesoinCardProps {
  id: string;
  title: string;
  description: string;
  city: string;
  category: Category;
  status: Status;
  volunteerCount: number;
  whatsappNumber?: string;
  isLoggedIn?: boolean;
  isParticipating?: boolean;
  isOwner?: boolean;
  userName: string;
  createdAt: Date;
}

export function BesoinCard({
  id,
  title,
  description,
  city,
  category,
  status,
  volunteerCount,
  whatsappNumber,
  isLoggedIn = false,
  isParticipating = false,
  isOwner = false,
  userName,
  createdAt,
}: BesoinCardProps) {
  const [isPending, setIsPending] = useState(false);
  const [localParticipating, setLocalParticipating] = useState(isParticipating);
  const [localCount, setLocalCount] = useState(volunteerCount);
  const router = useRouter();

  const handleParticipate = async () => {
    if (!isLoggedIn) {
      // Rediriger vers la page de connexion
      router.push("/signin");
      return;
    }

    setIsPending(true);
    try {
      const result = await joinNeed(id);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Vous participez maintenant à ce besoin !");
        setLocalParticipating(true);
        setLocalCount((prev) => prev + 1);
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsPending(false);
    }
  };

  const isComplete = status === "complet";
  const showParticipateButton = !isOwner && !isComplete;

  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Un seul bouton principal par carte (même hauteur de footer partout)
  const primaryButton = showParticipateButton ? (
    localParticipating ? (
      <Button
        size="sm"
        className="w-full justify-center bg-secondary/20 text-secondary border border-secondary cursor-default"
        disabled
      >
        <Check className="w-4 h-4 mr-1.5" />
        Je participe
      </Button>
    ) : isLoggedIn ? (
      <Button
        size="sm"
        className="w-full justify-center bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-semibold"
        onClick={handleParticipate}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            En cours...
          </>
        ) : (
          "Je participe"
        )}
      </Button>
    ) : (
      <Link href="/signin" className="w-full">
        <Button size="sm" className="w-full justify-center bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-semibold">
          Je participe
        </Button>
      </Link>
    )
  ) : isComplete ? (
    <Button size="sm" className="w-full justify-center bg-muted text-muted-foreground cursor-not-allowed" disabled>
      Besoin résolu
    </Button>
  ) : isOwner && !isComplete ? (
    <Link href="/mon-espace" className="w-full">
      <Button size="sm" variant="outline" className="w-full justify-center border-[#064E3B] text-[#064E3B] hover:bg-[#064E3B]/10 font-semibold">
        Gérer mon besoin
      </Button>
    </Link>
  ) : null;

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-card border border-border/50 rounded-xl border-l-4 border-l-[#064E3B] shadow-sm gap-0">
      <CardContent className="p-4">
        {/* Title */}
        <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* User and Date Info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#064E3B]/80" />
            <span>{userName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#064E3B]/80" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-snug">
          {description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <CityBadge city={city} />
          <CategoryBadge category={category} />
          <StatusBadge status={status} />
        </div>

        {/* Volunteer Counter */}
        {localCount > 0 && (
          <div className="mb-1">
            <VolunteerCounter count={localCount} />
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-3 min-h-[44px] flex items-center gap-2 border-t border-border/40 bg-muted/30">
        <div className="flex-1 min-w-0">
          {primaryButton}
        </div>
        {whatsappNumber && (
          <div className="shrink-0">
            <WhatsAppButton phoneNumber={whatsappNumber} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
