import { type Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./form";

export const metadata: Metadata = {
  title: "S'inscrire - Dir-Khir",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Side - Moroccan Architectural Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80&auto=format&fit=crop"
          alt="Architecture marocaine - Cour intérieure traditionnelle"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#064E3B]/80 via-[#064E3B]/60 to-[#064E3B]/90" />
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white z-10">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-[#F59E0B] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">DK</span>
            </div>
            <span className="text-3xl font-bold">Dir-Khir</span>
          </Link>
          <h2 className="text-4xl font-bold mb-4 text-center">Rejoignez la communauté</h2>
          <p className="text-xl text-white/90 text-center max-w-md">
            Créez votre compte et commencez à aider vos voisins dès aujourd&apos;hui
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="w-12 h-12 bg-[#064E3B] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">DK</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Dir-Khir</span>
          </Link>

          {/* Desktop Logo (hidden on mobile) */}
          <div className="hidden lg:flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-[#064E3B] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">DK</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Dir-Khir</span>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-foreground mb-2">Créer un compte</h1>
          <p className="text-center text-muted-foreground mb-8">Rejoignez la communauté d&apos;entraide</p>
          
          <div className="bg-card rounded-2xl border border-border/60 p-8 shadow-sm">
            <SignUpForm />
            
            <div className="flex items-center justify-center gap-2 mt-6">
              <small className="text-muted-foreground">Déjà inscrit?</small>
              <Link href="/signin" className="text-sm font-semibold leading-none text-[#064E3B] hover:text-[#064E3B]/80 transition-colors">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
