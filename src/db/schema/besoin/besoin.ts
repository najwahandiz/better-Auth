import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { user } from "../auth/user";
import { relations } from "drizzle-orm";

export const besoin = pgTable("besoin", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  city: text("city").notNull(),
  category: text("category").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  status: text("status").notNull().default("ouvert"), // "ouvert" | "complet"
  volunteerCount: integer("volunteer_count").notNull().default(0),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
}).enableRLS();

export const besoinRelations = relations(besoin, ({ one, many }) => ({
  user: one(user, {
    fields: [besoin.userId],
    references: [user.id],
  }),
  participations: many(participation),
}));

export const participation = pgTable("participation", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  besoinId: text("besoin_id")
    .notNull()
    .references(() => besoin.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}).enableRLS();

export const participationRelations = relations(participation, ({ one }) => ({
  besoin: one(besoin, {
    fields: [participation.besoinId],
    references: [besoin.id],
  }),
  user: one(user, {
    fields: [participation.userId],
    references: [user.id],
  }),
}));

export type BesoinType = typeof besoin.$inferSelect;
export type ParticipationType = typeof participation.$inferSelect;

