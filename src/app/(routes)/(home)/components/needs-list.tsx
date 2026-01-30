"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
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

interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface NeedsListProps {
  besoins: (BesoinType & { user: { name: string } })[];
  isLoggedIn: boolean;
  currentUserId?: string;
  userParticipationIds: string[];
  pagination?: PaginationInfo;
  currentFilters?: {
    city?: string;
    category?: string;
  };
}

const defaultPagination: PaginationInfo = {
  page: 1,
  limit: 12,
  totalCount: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

export function NeedsList({
  besoins,
  isLoggedIn,
  currentUserId,
  userParticipationIds,
  pagination = defaultPagination,
  currentFilters = {},
}: NeedsListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = { city: currentFilters?.city, category: currentFilters?.category };

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset to page 1 when filters change
    params.delete("page");
    
    router.push(`/?${params.toString()}`);
  };

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }
    router.push(`/?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push("/");
  };

  return (
    <>
      {/* Filter Section */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* City Select */}
            <div className="flex-1">
              <Select
                value={filters.city || "all"}
                onValueChange={(value) => updateFilters("city", value)}
              >
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
                value={filters.category || "all"}
                onValueChange={(value) => updateFilters("category", value)}
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
              className="h-12 px-6 bg-[#064E3B] hover:bg-[#064E3B]/90 text-white rounded-xl font-semibold"
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

          {besoins.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {besoins.map((need) => {
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

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    Page {pagination.page} sur {pagination.totalPages} •{" "}
                    {pagination.totalCount} résultat
                    {pagination.totalCount > 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(pagination.page - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter((pageNum) => {
                          // Show first page, last page, current page, and pages around current
                          return (
                            pageNum === 1 ||
                            pageNum === pagination.totalPages ||
                            (pageNum >= pagination.page - 1 &&
                              pageNum <= pagination.page + 1)
                          );
                        })
                        .map((pageNum, index, array) => {
                          // Add ellipsis if there's a gap
                          const showEllipsisBefore =
                            index > 0 && pageNum - array[index - 1] > 1;
                          return (
                            <div key={pageNum} className="flex items-center gap-1">
                              {showEllipsisBefore && (
                                <span className="px-2 text-muted-foreground">...</span>
                              )}
                              <Button
                                variant={
                                  pageNum === pagination.page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => changePage(pageNum)}
                                className={
                                  pageNum === pagination.page
                                    ? "bg-[#064E3B] hover:bg-[#064E3B]/90 text-white"
                                    : ""
                                }
                              >
                                {pageNum}
                              </Button>
                            </div>
                          );
                        })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(pagination.page + 1)}
                      disabled={!pagination.hasNextPage}
                      className="gap-1"
                    >
                      Suivant
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Aucun besoin ne correspond à vos critères.
              </p>
              <Button
                variant="link"
                className="text-[#064E3B] mt-2 font-semibold"
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

