import type { Express } from "express";
import { db } from "../db";
import { products, cartItems } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express) {
  // Get products with optional search
  app.get("/api/products", async (req, res) => {
    try {
      console.log("Received search query:", req.query.search);
      const searchQuery = req.query.search?.toString().toLowerCase();
      const allProducts = await db.select().from(products);
      
      if (searchQuery) {
        const filteredProducts = allProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery) ||
          product.category.toLowerCase().includes(searchQuery)
        );
        console.log(`Found ${filteredProducts.length} products matching "${searchQuery}"`);
        res.json(filteredProducts);
      } else {
        console.log(`Returning all ${allProducts.length} products`);
        res.json(allProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get cart items
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const items = await db.select()
        .from(cartItems)
        .where(eq(cartItems.sessionId, req.params.sessionId));
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  });

  // Add item to cart
  app.post("/api/cart", async (req, res) => {
    const { productId, quantity, sessionId } = req.body;
    try {
      const item = await db.insert(cartItems)
        .values({ productId, quantity, sessionId })
        .returning();
      res.json(item[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  });

  // Update cart item quantity
  app.put("/api/cart/:id", async (req, res) => {
    const { quantity } = req.body;
    try {
      const updated = await db.update(cartItems)
        .set({ quantity })
        .where(eq(cartItems.id, parseInt(req.params.id)))
        .returning();
      res.json(updated[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  // Remove item from cart
  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await db.delete(cartItems)
        .where(eq(cartItems.id, parseInt(req.params.id)));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item from cart" });
    }
  });
}
