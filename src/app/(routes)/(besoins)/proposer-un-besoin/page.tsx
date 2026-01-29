import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/get-session";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import ProposerBesoinForm from "./form";

export const metadata: Metadata = {
  title: "Proposer un besoin - Dir-Khir",
};

export default async function ProposerBesoinPage() {
  const session = await getServerSession();

  // Redirect to signin if not logged in
  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={true} userName={session.user.name} />
      
      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Proposer un besoin
            </h1>
            <p className="text-muted-foreground">
              Décrivez votre besoin et la communauté vous aidera
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <ProposerBesoinForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

