import { passwordSchema } from "@/lib/auth/password";
import { restrictedUsernames } from "@/lib/auth/usernames";
import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "L'email est requis" })
      .email({ message: "Adresse email invalide" }),
    name: z
      .string()
      .min(4, { message: "Le nom doit contenir au moins 4 caractères" }),
    username: z
      .string()
      .min(4, { message: "Le nom d'utilisateur doit contenir au moins 4 caractères" })
      .max(10, { message: "Le nom d'utilisateur ne peut pas dépasser 10 caractères" })
      .regex(/^[a-zA-Z0-9]+$/, "Seuls les lettres et chiffres sont autorisés")
      .refine(
        (username) => {
          for (const pattern of restrictedUsernames) {
            if (username.toLowerCase().includes(pattern)) {
              return false;
            }
          }
          return true;
        },
        { message: "Ce nom d'utilisateur n'est pas autorisé" }
      ),
    password: passwordSchema,
    confirmPassword: z.string().min(8, {
      message: "La confirmation doit contenir au moins 8 caractères",
    }),
    gender: z.boolean({
      required_error: "Veuillez sélectionner votre genre",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof SignUpSchema>;
