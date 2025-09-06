import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Copy, Search, Share } from "lucide-react";
import { preMadeNames } from "@/data/premade-names";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface PreMadeNamesProps {
  onCopy: () => void;
}

export function PreMadeNames({ onCopy }: PreMadeNamesProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  
  const queryClient = useQueryClient();

  const addToFavoritesMutation = useMutation({
    mutationFn: async (data: { name: string; category: string }) => {
      return apiRequest("POST", "/api/favorites", {
        userId: null,
        name: data.name,
        category: data.category,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
    },
  });

  const categories = ["all", "cool", "aggressive", "royal", "symbols", "legendary"];

  const filteredNames = useMemo(() => {
    let filtered = preMadeNames;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(name => name.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(name => 
        name.text.toLowerCase().includes(query) ||
        name.category.toLowerCase().includes(query)
      );
    }

    return filtered.slice(0, visibleCount);
  }, [selectedCategory, searchQuery, visibleCount]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onCopy();
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleAddToFavorites = (name: string, category: string) => {
    addToFavoritesMutation.mutate({ name, category });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "cool": return "bg-secondary/10 text-secondary";
      case "aggressive": return "bg-destructive/10 text-destructive";
      case "royal": return "bg-accent/10 text-accent";
      case "symbols": return "bg-primary/10 text-primary";
      case "legendary": return "bg-muted/20 text-muted-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getCategoryButtonClass = (category: string) => {
    return selectedCategory === category
      ? "bg-primary text-primary-foreground"
      : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground";
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="font-display font-bold text-3xl text-foreground">Pre-Made Stylish Names</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose from our collection of 100+ ready-to-use PUBG names with symbols and special characters
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${getCategoryButtonClass(category)}`}
            data-testid={`button-category-${category}`}
          >
            {category === "all" ? "All Names" : category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-muted-foreground"
            data-testid="input-search"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredNames.map((name, index) => (
          <div
            key={index}
            className="group bg-card border border-border rounded-lg p-4 hover:border-secondary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-secondary/10"
            onClick={() => handleCopy(name.text)}
            data-testid={`card-premade-${index}`}
          >
            <div className="flex items-start justify-between mb-3">
              <Badge className={`text-xs rounded-full font-medium ${getCategoryColor(name.category)}`}>
                {name.category.charAt(0).toUpperCase() + name.category.slice(1)}
              </Badge>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-1 rounded bg-secondary/10 hover:bg-secondary/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(name.text);
                  }}
                  data-testid={`button-copy-premade-${index}`}
                >
                  <Copy className="text-secondary text-sm h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-1 rounded bg-accent/10 hover:bg-accent/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavorites(name.text, name.category);
                  }}
                  data-testid={`button-favorite-premade-${index}`}
                >
                  <Heart className="text-accent text-sm h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="text-center mb-3">
              <p className="font-mono text-lg text-foreground break-all leading-relaxed" data-testid={`text-premade-${index}`}>
                {name.text}
              </p>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Click to copy
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-accent transition-colors p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  // Share functionality could be implemented here
                }}
              >
                <Share className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {filteredNames.length >= visibleCount && visibleCount < (selectedCategory === "all" ? preMadeNames.length : preMadeNames.filter(n => n.category === selectedCategory).length) && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={() => setVisibleCount(prev => prev + 12)}
            variant="outline"
            className="px-8 py-3 bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground rounded-lg font-semibold transition-all duration-300"
            data-testid="button-load-more"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Load More Names
          </Button>
        </div>
      )}

      {filteredNames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No names found matching your search.</p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            variant="outline"
            className="mt-4"
            data-testid="button-clear-search"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
