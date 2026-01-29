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
import { Check, Loader2 } from "lucide-react";
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

  // Déterminer l'état du bouton
  const isComplete = status === "complet";
  const showParticipateButton = !isOwner && !isComplete;
  const canParticipate = isLoggedIn && !localParticipating && !isOwner;

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-card border-border">
      <CardContent className="p-5">
        {/* Title */}
        <Link href={`/besoins/${id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CityBadge city={city} />
          <CategoryBadge category={category} />
          <StatusBadge status={status} />
        </div>

        {/* Volunteer Counter */}
        {localCount > 0 && <VolunteerCounter count={localCount} />}
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0 flex gap-3">
        {/* Bouton de participation conditionnel */}
        {showParticipateButton && (
          <>
            {localParticipating ? (
              // Utilisateur participe déjà
              <Button
                className="flex-1 bg-secondary/20 text-secondary border border-secondary cursor-default"
                disabled
              >
                <Check className="w-4 h-4 mr-2" />
                Je participe
              </Button>
            ) : isLoggedIn ? (
              // Utilisateur connecté peut participer
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleParticipate}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    En cours...
                  </>
                ) : (
                  "Je participe"
                )}
              </Button>
            ) : (
              // Visiteur non connecté - afficher bouton qui redirige vers signin
              <Link href="/signin" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Je participe
                </Button>
              </Link>
            )}
          </>
        )}

        {/* Bouton désactivé si le besoin est complet */}
        {isComplete && (
          <Button
            className="flex-1 bg-muted text-muted-foreground cursor-not-allowed"
            disabled
          >
            Besoin résolu
          </Button>
        )}

        {/* Message pour le propriétaire */}
        {isOwner && !isComplete && (
          <Link href="/mon-espace" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10"
            >
              Gérer mon besoin
            </Button>
          </Link>
        )}

        {/* Bouton WhatsApp */}
        {whatsappNumber && <WhatsAppButton phoneNumber={whatsappNumber} />}
      </CardFooter>
    </Card>
  );
}
