"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSession, signOut } from "@/lib/auth/client"
import { useRouter } from "next/navigation"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const isLoggedIn = !!session?.user
  const userName = session?.user?.name || ""

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-[#064E3B] rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">DK</span>
            </div>
            <span className="text-xl font-bold text-foreground">Dir-Khir</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Accueil
            </Link>
            <Link 
              href="/proposer-un-besoin" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Proposer un besoin
            </Link>
            {isPending ? (
              <div className="w-20 h-8 bg-muted rounded animate-pulse" />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/mon-espace" className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-foreground font-medium">{userName}</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/signin">
                  <Button variant="ghost" className="text-foreground">
                    Se connecter
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-semibold">
                    S&apos;inscrire
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/" 
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              href="/proposer-un-besoin" 
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Proposer un besoin
            </Link>
            {isPending ? (
              <div className="w-full h-10 bg-muted rounded animate-pulse" />
            ) : isLoggedIn ? (
              <>
                <Link 
                  href="/mon-espace" 
                  className="flex items-center gap-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-foreground font-medium">{userName}</span>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Se déconnecter
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Se connecter
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-semibold">
                    S&apos;inscrire
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
