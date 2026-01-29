"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/server";
import { db } from "@/db";
import { besoin, participation } from "@/db/schema/besoin";
import { user } from "@/db/schema/auth";
import { eq, and, desc } from "drizzle-orm";
import {
  CreateBesoinSchema,
  type CreateBesoinValues,
} from "@/app/(routes)/(besoins)/proposer-un-besoin/validate";

// ════════════════════════════════════════════════════════════════════════════
// 1️⃣ CRÉER UN BESOIN
// ════════════════════════════════════════════════════════════════════════════
export async function createBesoin(data: CreateBesoinValues) {
  try {
    // Vérifier que l'utilisateur est connecté
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { error: "Vous devez être connecté pour publier un besoin" };
    }

    // Valider les données avec Zod
    const validatedData = CreateBesoinSchema.safeParse(data);

    if (!validatedData.success) {
      return { error: "Données invalides" };
    }

    // Insérer dans la base de données via Drizzle
    const [newBesoin] = await db
      .insert(besoin)
      .values({
        title: validatedData.data.title,
        description: validatedData.data.description,
        city: validatedData.data.city,
        category: validatedData.data.category,
        whatsappNumber: validatedData.data.whatsappNumber,
        userId: session.user.id,
        status: "ouvert",
        volunteerCount: 0,
      })
      .returning();

    // Revalider les pages pour afficher le nouveau besoin
    revalidatePath("/");
    revalidatePath("/mon-espace");

    return { success: true, besoin: newBesoin };
  } catch (error) {
    console.error("Error creating besoin:", error);
    return { error: "Une erreur est survenue lors de la création du besoin" };
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 2️⃣ PARTICIPER À UN BESOIN
// ════════════════════════════════════════════════════════════════════════════
export async function joinNeed(besoinId: string) {
  try {
    // Vérifier que l'utilisateur est connecté
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { error: "Vous devez être connecté pour participer" };
    }

    // Vérifier que le besoin existe et est ouvert
    const existingBesoin = await db.query.besoin.findFirst({
      where: eq(besoin.id, besoinId),
    });

    if (!existingBesoin) {
      return { error: "Ce besoin n'existe pas" };
    }

    if (existingBesoin.status === "complet") {
      return { error: "Ce besoin est déjà complet" };
    }

    // Vérifier que l'utilisateur n'est pas le créateur du besoin
    if (existingBesoin.userId === session.user.id) {
      return { error: "Vous ne pouvez pas participer à votre propre besoin" };
    }

    // Vérifier que l'utilisateur ne participe pas déjà
    const existingParticipation = await db.query.participation.findFirst({
      where: and(
        eq(participation.besoinId, besoinId),
        eq(participation.userId, session.user.id)
      ),
    });

    if (existingParticipation) {
      return { error: "Vous participez déjà à ce besoin" };
    }

    // Créer la participation
    await db.insert(participation).values({
      besoinId: besoinId,
      userId: session.user.id,
    });

    // Incrémenter le compteur de volontaires
    await db
      .update(besoin)
      .set({
        volunteerCount: existingBesoin.volunteerCount + 1,
      })
      .where(eq(besoin.id, besoinId));

    // Revalider les pages
    revalidatePath("/");
    revalidatePath("/mon-espace");
    revalidatePath(`/besoins/${besoinId}`);

    return { success: true };
  } catch (error) {
    console.error("Error joining besoin:", error);
    return { error: "Une erreur est survenue lors de la participation" };
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 3️⃣ MARQUER UN BESOIN COMME RÉSOLU
// ════════════════════════════════════════════════════════════════════════════
export async function markAsResolved(besoinId: string) {
  try {
    // Vérifier que l'utilisateur est connecté
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { error: "Vous devez être connecté" };
    }

    // Vérifier que le besoin existe et appartient à l'utilisateur
    const existingBesoin = await db.query.besoin.findFirst({
      where: eq(besoin.id, besoinId),
    });

    if (!existingBesoin) {
      return { error: "Ce besoin n'existe pas" };
    }

    // Seul le créateur peut marquer comme résolu
    if (existingBesoin.userId !== session.user.id) {
      return { error: "Vous n'êtes pas autorisé à modifier ce besoin" };
    }

    // Mettre à jour le statut
    await db
      .update(besoin)
      .set({
        status: "complet",
      })
      .where(eq(besoin.id, besoinId));

    // Revalider les pages
    revalidatePath("/");
    revalidatePath("/mon-espace");
    revalidatePath(`/besoins/${besoinId}`);

    return { success: true };
  } catch (error) {
    console.error("Error marking besoin as resolved:", error);
    return { error: "Une erreur est survenue" };
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 4️⃣ RÉCUPÉRER TOUS LES BESOINS (pour la page d'accueil)
// ════════════════════════════════════════════════════════════════════════════
export async function getAllBesoins() {
  try {
    const besoins = await db.query.besoin.findMany({
      orderBy: [desc(besoin.createdAt)],
      with: {
        user: true,
      },
    });

    return { success: true, besoins };
  } catch (error) {
    console.error("Error fetching besoins:", error);
    return { error: "Erreur lors de la récupération des besoins", besoins: [] };
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 5️⃣ RÉCUPÉRER LES BESOINS CRÉÉS PAR UN UTILISATEUR (Mes Demandes)
// ════════════════════════════════════════════════════════════════════════════
export async function getUserBesoins(userId: string) {
  try {
    const besoins = await db.query.besoin.findMany({
      where: eq(besoin.userId, userId),
      orderBy: [desc(besoin.createdAt)],
    });

    return { success: true, besoins };
  } catch (error) {
    console.error("Error fetching user besoins:", error);
    return { error: "Erreur lors de la récupération", besoins: [] };
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 6️⃣ RÉCUPÉRER LES PARTICIPATIONS D'UN UTILISATEUR (Mes Engagements)
// ════════════════════════════════════════════════════════════════════════════
export async function getUserParticipations(userId: string) {
  try {
    const participations = await db.query.participation.findMany({
      where: eq(participation.userId, userId),
      orderBy: [desc(participation.createdAt)],
      with: {
        besoin: {
          with: {
            user: true,
          },
        },
      },
    });

    return { success: true, participations };
  } catch (error) {
    console.error("Error fetching participations:", error);
    return { error: "Erreur lors de la récupération", participations: [] };
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 7️⃣ VÉRIFIER SI UN UTILISATEUR PARTICIPE À UN BESOIN
// ════════════════════════════════════════════════════════════════════════════
export async function getUserParticipationIds(userId: string) {
  try {
    const participations = await db.query.participation.findMany({
      where: eq(participation.userId, userId),
      columns: {
        besoinId: true,
      },
    });

    return participations.map((p) => p.besoinId);
  } catch (error) {
    console.error("Error fetching participation ids:", error);
    return [];
  }
}
