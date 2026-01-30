"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CityBadge } from "@/components/shared/city-badge";
import { CategoryBadge } from "@/components/shared/category-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Search } from "lucide-react";
import type { Category } from "@/lib/constants/categories";
import type { BesoinType, ParticipationType } from "@/db/schema/besoin";
import type { UserType } from "@/db/schema/auth/user";

interface ParticipationWithBesoin extends ParticipationType {
  besoin: BesoinType & {
    user: UserType;
  };
}

interface MesEngagementsProps {
  participations: ParticipationWithBesoin[];
}

export function MesEngagements({ participations }: MesEngagementsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Les besoins auxquels vous participez
        </p>
        <Link href="/#besoins">
          <Button variant="outline" className="rounded-xl">
            <Search className="w-4 h-4 mr-2" />
            Trouver des besoins
          </Button>
        </Link>
      </div>

      {/* List of Engagements */}
      {participations.length > 0 ? (
        <div className="grid gap-4">
          {participations.map((engagement) => (
            <Card key={engagement.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted-foreground">
                        Demandé par {engagement.besoin.user.name}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {engagement.besoin.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {engagement.besoin.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <CityBadge city={engagement.besoin.city} />
                      <CategoryBadge
                        category={engagement.besoin.category as Category}
                      />
                      <StatusBadge
                        status={engagement.besoin.status as "ouvert" | "complet"}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 items-end">
                    {engagement.besoin.status === "ouvert" && (
                      <WhatsAppButton
                        phoneNumber={engagement.besoin.whatsappNumber}
                        message={`Bonjour ${engagement.besoin.user.name}, je participe à votre demande "${engagement.besoin.title}" sur Dir-Khir.`}
                      >
                        Contacter
                      </WhatsAppButton>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Participation le{" "}
                      {new Date(engagement.createdAt).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            Vous n&apos;avez pas encore participé à un besoin
          </p>
          <Link href="/#besoins">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl">
              <Search className="w-4 h-4 mr-2" />
              Découvrir les besoins
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
