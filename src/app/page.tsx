import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { NeedsList } from "./(routes)/(home)/components/needs-list";
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
  const session = await getServerSession();
  const isLoggedIn = !!session?.user;
  const currentUserId = session?.user?.id;

  const params = searchParams ? await searchParams : {};
  const city = params.city && params.city !== "all" ? params.city : undefined;
  const category = params.category && params.category !== "all" ? params.category : undefined;
  const rawPage = params.page ? parseInt(params.page, 10) : 1;
  const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const result = await getAllBesoins({ city, category, page, limit: 12 });

  const besoins = result.besoins ?? [];
  const pagination = result.pagination ?? {
    page: 1,
    limit: 12,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };

  let userParticipationIds: string[] = [];
  if (currentUserId) {
    userParticipationIds = await getUserParticipationIds(currentUserId);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23A0522D' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              <span className="text-primary">Dir</span>-Khir
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              L&apos;entraide de quartier, de Tanger à Lagouira
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Aidez vos voisins, renforcez votre communauté
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/proposer-un-besoin">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl"
                >
                  Proposer un besoin
                </Button>
              </Link>
              <a href="#besoins">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg rounded-xl bg-transparent"
                >
                  Voir les besoins
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

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
