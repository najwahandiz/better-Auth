import { z } from "zod";

// Define the valid values directly for Zod
const CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Agadir",
  "Fès",
  "Tanger",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "El Jadida",
  "Safi",
  "Mohammedia",
  "Béni Mellal",
  "Nador",
  "Taza",
  "Khouribga",
  "Settat",
  "Laâyoune",
  "Dakhla",
] as const;

const CATEGORY_VALUES = [
  "nettoyage",
  "aide-scolaire",
  "dons",
  "transport",
  "bricolage",
  "autre",
] as const;

export const CreateBesoinSchema = z.object({
  title: z
    .string()
    .min(5, "Le titre doit contenir au moins 5 caractères")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .min(20, "La description doit contenir au moins 20 caractères")
    .max(1000, "La description ne peut pas dépasser 1000 caractères"),
  city: z.enum(CITIES, {
    message: "Veuillez sélectionner une ville",
  }),
  category: z.enum(CATEGORY_VALUES, {
    message: "Veuillez sélectionner une catégorie",
  }),
  whatsappNumber: z
    .string()
    .regex(
      /^(\+212|0)[5-7][0-9]{8}$/,
      "Numéro WhatsApp invalide (format: +212612345678 ou 0612345678)"
    ),
});

export type CreateBesoinValues = z.infer<typeof CreateBesoinSchema>;
