"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Users, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { CategoryBadge } from "@/components/shared/category-badge"
import { CityBadge } from "@/components/shared/city-badge"
import { StatusBadge } from "@/components/shared/status-badge"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import { useSession } from "@/lib/auth/client"
import type { Category } from "@/lib/constants/categories"

// Données d'exemple (à remplacer par les données de la base de données)
const sampleNeeds = [
  {
    id: "1",
    title: "Aide pour nettoyage jardin",
    description: "Mon jardin est envahi par les mauvaises herbes après les pluies à Marrakech. J'ai besoin d'aide pour le remettre en état. Je fournis tous les outils nécessaires et des rafraîchissements. Le travail devrait prendre environ 3-4 heures.",
    city: "Marrakech",
    category: "nettoyage" as Category,
    status: "ouvert" as const,
    volunteerCount: 3,
    whatsappNumber: "+212612345678",
    createdAt: "2026-01-25",
    author: "Ahmed B.",
  },
  {
    id: "2", 
    title: "Cours de maths niveau collège",
    description: "Je cherche quelqu'un pour aider mon fils en mathématiques, niveau 3ème collège. Cours à domicile préférés. Mon fils a des difficultés avec l'algèbre et la géométrie. Nous cherchons quelqu'un de patient et pédagogue.",
    city: "Casablanca",
    category: "aide-scolaire" as Category,
    status: "ouvert" as const,
    volunteerCount: 1,
    whatsappNumber: "+212698765432",
    createdAt: "2026-01-24",
    author: "Fatima Z.",
  },
  {
    id: "3",
    title: "Don de vêtements pour enfants",
    description: "Association cherche vêtements d'hiver pour enfants de 3 à 10 ans. Tout état accepté. Nous distribuons aux familles dans le besoin dans les quartiers défavorisés de Rabat.",
    city: "Rabat",
    category: "dons" as Category,
    status: "ouvert" as const,
    volunteerCount: 5,
    whatsappNumber: "+212655443322",
    createdAt: "2026-01-23",
    author: "Association Espoir",
  },
  {
    id: "4",
    title: "Transport vers l'aéroport",
    description: "Besoin d'un covoiturage vers l'aéroport Mohammed V le 25 octobre à 6h du matin depuis Ain Sebaa. Je peux participer aux frais d'essence.",
    city: "Casablanca",
    category: "transport" as Category,
    status: "ouvert" as const,
    volunteerCount: 2,
    whatsappNumber: "+212611223344",
    createdAt: "2026-01-22",
    author: "Youssef M.",
  },
  {
    id: "5",
    title: "Réparation fuite d'eau",
    description: "J'ai une fuite sous l'évier de la cuisine. Quelqu'un peut m'aider à la réparer ? J'ai les outils. C'est une petite fuite au niveau du siphon.",
    city: "Fès",
    category: "bricolage" as Category,
    status: "ouvert" as const,
    volunteerCount: 0,
    whatsappNumber: "+212677889900",
    createdAt: "2026-01-21",
    author: "Karim L.",
  },
  {
    id: "6",
    title: "Aide cuisine Ramadan",
    description: "Préparation de paniers repas pour les familles dans le besoin pendant le mois de Ramadan. Venez nous aider ! Nous avons besoin de bénévoles pour préparer et distribuer les repas.",
    city: "Tanger",
    category: "autre" as Category,
    status: "complet" as const,
    volunteerCount: 12,
    whatsappNumber: "+212644556677",
    createdAt: "2026-01-20",
    author: "Mosquée Al-Nour",
  },
]

export default function BesoinDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const besoinId = params.id as string

  const besoin = sampleNeeds.find((b) => b.id === besoinId)

  if (!besoin) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Besoin non trouvé</h1>
            <p className="text-muted-foreground mb-6">Ce besoin n&apos;existe pas ou a été supprimé.</p>
            <Link href="/">
              <Button>Retour à l&apos;accueil</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleParticipate = () => {
    if (!session) {
      router.push("/signin")
      return
    }
    // TODO: Implémenter la logique de participation
    // Pour l'instant, ouvrir WhatsApp
    if (besoin.whatsappNumber) {
      const message = encodeURIComponent(`Bonjour, je souhaite participer à votre besoin: "${besoin.title}"`)
      window.open(`https://wa.me/${besoin.whatsappNumber.replace('+', '')}?text=${message}`, '_blank')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour aux besoins
          </Link>

          {/* Main Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <CategoryBadge category={besoin.category} />
                <CityBadge city={besoin.city} />
                <StatusBadge status={besoin.status} />
              </div>
              <CardTitle className="text-2xl md:text-3xl">{besoin.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{besoin.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{besoin.city}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Publié le {new Date(besoin.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{besoin.volunteerCount} bénévole(s) engagé(s)</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>Par {besoin.author}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                  onClick={handleParticipate}
                  disabled={besoin.status === "complet"}
                >
                  {besoin.status === "complet" ? "Complet" : "Je participe"}
                </Button>
                {besoin.whatsappNumber && (
                  <WhatsAppButton phoneNumber={besoin.whatsappNumber} className="flex-1 py-6 text-lg" />
                )}
              </div>

              {!session && besoin.status !== "complet" && (
                <p className="text-sm text-muted-foreground text-center">
                  <Link href="/signin" className="text-primary hover:underline">Connectez-vous</Link> pour participer à ce besoin
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

