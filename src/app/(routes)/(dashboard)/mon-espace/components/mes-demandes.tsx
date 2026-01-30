"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CityBadge } from "@/components/shared/city-badge";
import { CategoryBadge } from "@/components/shared/category-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { VolunteerCounter } from "@/components/shared/volunteer-counter";
import { Plus, CheckCircle, Loader2 } from "lucide-react";
import { markAsResolved } from "@/lib/actions/besoin";
import { toast } from "sonner";
import type { Category } from "@/lib/constants/categories";
import type { BesoinType } from "@/db/schema/besoin";

interface MesDemandesProps {
  demandes: BesoinType[];
}

export function MesDemandes({ demandes }: MesDemandesProps) {
  const [localDemandes, setLocalDemandes] = useState(demandes);
  const [pendingIds, setPendingIds] = useState<string[]>([]);

  const handleMarkAsResolved = async (id: string) => {
    setPendingIds((prev) => [...prev, id]);

    try {
      const result = await markAsResolved(id);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Besoin marqué comme résolu !");
        // Mettre à jour localement
        setLocalDemandes((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status: "complet" } : d))
        );
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setPendingIds((prev) => prev.filter((pid) => pid !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Les besoins que vous avez publiés
        </p>
        <Link href="/proposer-un-besoin">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau besoin
          </Button>
        </Link>
      </div>

      {/* List of Demands */}
      {localDemandes.length > 0 ? (
        <div className="grid gap-4">
          {localDemandes.map((demande) => {
            const isPending = pendingIds.includes(demande.id);

            return (
              <Card key={demande.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {demande.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {demande.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <CityBadge city={demande.city} />
                        <CategoryBadge
                          category={demande.category as Category}
                        />
                        <StatusBadge
                          status={demande.status as "ouvert" | "complet"}
                        />
                      </div>

                      {/* Volunteer Counter */}
                      {demande.volunteerCount > 0 && (
                        <VolunteerCounter count={demande.volunteerCount} />
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {demande.status === "ouvert" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsResolved(demande.id)}
                          disabled={isPending}
                          className="rounded-lg"
                        >
                          {isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              En cours...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Marquer comme résolu
                            </>
                          )}
                        </Button>
                      )}
                      <p className="text-xs text-muted-foreground text-right">
                        Publié le{" "}
                        {new Date(demande.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            Vous n&apos;avez pas encore publié de besoin
          </p>
          <Link href="/proposer-un-besoin">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Publier mon premier besoin
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
