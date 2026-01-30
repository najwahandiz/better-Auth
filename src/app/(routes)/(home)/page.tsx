import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { NeedsList } from "./components/needs-list";
import { getServerSession } from "@/lib/auth/get-session";
import {
  getAllBesoins,
  getUserParticipationIds,
} from "@/lib/actions/besoin";

interface HomePageProps {
  searchParams?: Promise<{
    city?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // Récupérer la session côté serveur
  const session = await getServerSession();
  const isLoggedIn = !!session?.user;
  const currentUserId = session?.user?.id;

  // Parse search params (safe when undefined, e.g. root "/")
  const params = searchParams ? await searchParams : {};
  const city = params.city && params.city !== "all" ? params.city : undefined;
  const category = params.category && params.category !== "all" ? params.category : undefined;
  const rawPage = params.page ? parseInt(params.page, 10) : 1;
  const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  // Récupérer les besoins avec filtres et pagination depuis la DB
  const result = await getAllBesoins({
    city,
    category,
    page,
    limit: 12,
  });

  const besoins = result.besoins ?? [];
  const pagination = result.pagination ?? {
    page: 1,
    limit: 12,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  // Récupérer les participations de l'utilisateur connecté
  let userParticipationIds: string[] = [];
  if (currentUserId) {
    userParticipationIds = await getUserParticipationIds(currentUserId);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section - Image Marocaine.jpg */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Marocaine.jpg"
            alt="Vue du Maroc - Architecture et culture marocaine"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="text-[#F59E0B]">Dir</span>-Khir
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-6 font-medium">
              L&apos;entraide de quartier, de Tanger à Lagouira
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Connectez-vous avec votre communauté. Aidez vos voisins, renforcez les liens de solidarité.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/proposer-un-besoin">
                <Button
                  size="lg"
                  className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-10 py-7 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Proposer un besoin
                </Button>
              </Link>
              <a href="#besoins">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-10 py-7 text-lg font-semibold rounded-xl bg-transparent backdrop-blur-sm transition-all duration-300"
                >
                  Voir les besoins
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des besoins avec filtres (Client Component, Suspense for useSearchParams) */}
      <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center text-muted-foreground">Chargement des besoins…</div>}>
        <NeedsList
          besoins={besoins}
          isLoggedIn={isLoggedIn}
          currentUserId={currentUserId}
          userParticipationIds={userParticipationIds}
          pagination={pagination}
          currentFilters={{ city, category }}
        />
      </Suspense>

      <Footer />
    </div>
  );
}
