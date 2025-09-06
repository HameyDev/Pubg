import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFavoriteSchema, insertHistorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Favorites endpoints
  app.get("/api/favorites", async (req, res) => {
    try {
      const favorites = await storage.getFavorites();
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const validatedData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addFavorite(validatedData);
      res.json(favorite);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid favorite data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to add favorite" });
      }
    }
  });

  app.delete("/api/favorites/:id", async (req, res) => {
    try {
      const success = await storage.removeFavorite(req.params.id);
      if (success) {
        res.json({ message: "Favorite removed successfully" });
      } else {
        res.status(404).json({ message: "Favorite not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  // History endpoints
  app.get("/api/history", async (req, res) => {
    try {
      const history = await storage.getHistory();
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch history" });
    }
  });

  app.post("/api/history", async (req, res) => {
    try {
      const validatedData = insertHistorySchema.parse(req.body);
      const historyEntry = await storage.addHistory(validatedData);
      res.json(historyEntry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid history data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to add history entry" });
      }
    }
  });

  app.delete("/api/history", async (req, res) => {
    try {
      const success = await storage.clearHistory();
      res.json({ message: "History cleared successfully", cleared: success });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
