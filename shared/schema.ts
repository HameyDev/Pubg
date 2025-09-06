import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  nameText: text("name_text").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const nameHistory = pgTable("name_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  originalText: text("original_text").notNull(),
  generatedText: text("generated_text").notNull(),
  style: text("style").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).pick({
  nameText: true,
  category: true,
});

export const insertHistorySchema = createInsertSchema(nameHistory).pick({
  originalText: true,
  generatedText: true,
  style: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type NameHistory = typeof nameHistory.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type InsertHistory = z.infer<typeof insertHistorySchema>;

// Frontend-only types for name generation
export interface GeneratedName {
  id: string;
  text: string;
  style: string;
  originalText: string;
}

export interface PremadeName {
  id: string;
  text: string;
  category: string;
  tags: string[];
}

export interface UnicodeTransform {
  name: string;
  displayName: string;
  transform: (text: string) => string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  author: {
    name: string;
    avatar: string;
  };
}
