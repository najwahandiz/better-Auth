import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/get-session";
import { getUserBesoins, getUserParticipations } from "@/lib/actions/besoin";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { MesDemandes } from "./components/mes-demandes";
import { MesEngagements } from "./components/mes-engagements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, HandHeart } from "lucide-react";

export const metadata: Metadata = {
  title: "Mon Espace - Dir-Khir",
};

export default async function MonEspacePage() {
  const session = await getServerSession();

  // Rediriger vers signin si non connecté
  if (!session) {
    redirect("/signin");
  }

  // Récupérer les besoins créés par l'utilisateur
  const { besoins: mesDemandes } = await getUserBesoins(session.user.id);

  // Récupérer les participations de l'utilisateur
  const { participations: mesEngagements } = await getUserParticipations(
    session.user.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Mon Espace
            </h1>
            <p className="text-muted-foreground">
              Bienvenue, {session.user.name}! Gérez vos besoins et engagements
              ici.
            </p>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ClipboardList className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mesDemandes?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Mes demandes</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <HandHeart className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mesEngagements?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mes engagements
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="demandes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 rounded-xl">
              <TabsTrigger
                value="demandes"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                Mes Demandes
              </TabsTrigger>
              <TabsTrigger
                value="engagements"
                className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
              >
                <HandHeart className="w-4 h-4 mr-2" />
                Mes Engagements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="demandes">
              <MesDemandes demandes={mesDemandes || []} />
            </TabsContent>

            <TabsContent value="engagements">
              <MesEngagements participations={mesEngagements || []} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
