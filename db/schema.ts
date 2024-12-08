import { pgTable, text, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  sessionId: text("session_id").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = z.infer<typeof selectProductSchema>;

export const insertCartItemSchema = createInsertSchema(cartItems);
export const selectCartItemSchema = createSelectSchema(cartItems);
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = z.infer<typeof selectCartItemSchema>;
