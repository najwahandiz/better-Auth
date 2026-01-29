import { type Metadata } from "next";
import SignInForm from "./form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Se connecter - Dir-Khir",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background relative">
      {/* Subtle zellige pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23A0522D' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 flex w-full flex-col rounded-2xl border border-border bg-card px-8 py-8 shadow-lg md:w-[420px]">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">DK</span>
          </div>
          <span className="text-2xl font-bold text-foreground">Dir-Khir</span>
        </Link>
        
        <h1 className="text-2xl font-bold text-center text-foreground mb-2">Se connecter</h1>
        <p className="text-center text-muted-foreground mb-6">Accédez à votre espace d&apos;entraide</p>
        
        <SignInForm />
        
        <div className="flex items-center justify-center gap-2 mt-4">
          <small className="text-muted-foreground">Pas encore de compte?</small>
          <Link href="/signup" className="text-sm font-bold leading-none text-primary hover:text-primary/80 transition-colors">
            S&apos;inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}
