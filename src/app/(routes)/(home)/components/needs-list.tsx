"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BesoinCard } from "@/components/shared/besoin-card";
import { MOROCCAN_CITIES } from "@/lib/constants/cities";
import { CATEGORIES, type Category } from "@/lib/constants/categories";
import type { BesoinType } from "@/db/schema/besoin";

interface NeedsListProps {
  besoins: (BesoinType & { user: { name: string } })[];
  isLoggedIn: boolean;
  currentUserId?: string;
  userParticipationIds: string[];
}

export function NeedsList({
  besoins,
  isLoggedIn,
  currentUserId,
  userParticipationIds,
}: NeedsListProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredNeeds = besoins.filter((need) => {
    if (selectedCity && selectedCity !== "all" && need.city !== selectedCity)
      return false;
    if (
      selectedCategory &&
      selectedCategory !== "all" &&
      need.category !== selectedCategory
    )
      return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedCity("");
    setSelectedCategory("");
  };

  return (
    <>
      {/* Filter Section */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* City Select */}
            <div className="flex-1">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full h-12 rounded-xl bg-background">
                  <SelectValue placeholder="Toutes les villes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {MOROCCAN_CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Select */}
            <div className="flex-1">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full h-12 rounded-xl bg-background">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter Button */}
            <Button
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
              onClick={resetFilters}
            >
              <Filter className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        </div>
      </section>

      {/* Needs Grid Section */}
      <section id="besoins" className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Besoins de la communauté
          </h2>

          {filteredNeeds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNeeds.map((need) => {
                const isParticipating = userParticipationIds.includes(need.id);
                const isOwner = currentUserId === need.userId;

                return (
                  <BesoinCard
                    key={need.id}
                    id={need.id}
                    title={need.title}
                    description={need.description}
                    city={need.city}
                    category={need.category as Category}
                    status={need.status as "ouvert" | "complet"}
                    volunteerCount={need.volunteerCount}
                    whatsappNumber={need.whatsappNumber}
                    isLoggedIn={isLoggedIn}
                    isParticipating={isParticipating}
                    isOwner={isOwner}
                    userName={need.user.name}
                    createdAt={need.createdAt}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Aucun besoin ne correspond à vos critères.
              </p>
              <Button
                variant="link"
                className="text-primary mt-2"
                onClick={resetFilters}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

