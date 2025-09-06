import { type User, type InsertUser, type Favorite, type InsertFavorite, type NameHistory, type InsertHistory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Favorites management
  getFavorites(userId?: string): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite, userId?: string): Promise<Favorite>;
  removeFavorite(id: string): Promise<boolean>;
  
  // History management
  getHistory(userId?: string): Promise<NameHistory[]>;
  addHistory(history: InsertHistory, userId?: string): Promise<NameHistory>;
  clearHistory(userId?: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private favorites: Map<string, Favorite>;
  private history: Map<string, NameHistory>;

  constructor() {
    this.users = new Map();
    this.favorites = new Map();
    this.history = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFavorites(userId?: string): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(
      (fav) => !userId || fav.userId === userId
    );
  }

  async addFavorite(favorite: InsertFavorite, userId?: string): Promise<Favorite> {
    const id = randomUUID();
    const newFavorite: Favorite = {
      ...favorite,
      id,
      userId: userId || null,
      createdAt: new Date(),
    };
    this.favorites.set(id, newFavorite);
    return newFavorite;
  }

  async removeFavorite(id: string): Promise<boolean> {
    return this.favorites.delete(id);
  }

  async getHistory(userId?: string): Promise<NameHistory[]> {
    return Array.from(this.history.values())
      .filter((hist) => !userId || hist.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async addHistory(history: InsertHistory, userId?: string): Promise<NameHistory> {
    const id = randomUUID();
    const newHistory: NameHistory = {
      ...history,
      id,
      userId: userId || null,
      createdAt: new Date(),
    };
    this.history.set(id, newHistory);
    return newHistory;
  }

  async clearHistory(userId?: string): Promise<boolean> {
    const toDelete = Array.from(this.history.entries())
      .filter(([_, hist]) => !userId || hist.userId === userId)
      .map(([id, _]) => id);
    
    toDelete.forEach(id => this.history.delete(id));
    return toDelete.length > 0;
  }
}

export const storage = new MemStorage();
