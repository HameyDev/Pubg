import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Copy, Search, Share } from "lucide-react";
import { premadeNames, searchNames, filterByCategory, getCategories } from "@/data/premade-names";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { InsertFavorite } from "@shared/schema";

interface PreMadeNamesProps {
  onCopy: () => void;
}

export function PreMadeNames({ onCopy }: PreMadeNamesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const favoriteMutation = useMutation({
    mutationFn: async (data: InsertFavorite) => {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add to favorites");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Added to Favorites",
        description: "Name has been saved to your favorites!",
      });
    },
  });

  const filteredNames = useMemo(() => {
    let filtered = filterByCategory(selectedCategory, premadeNames);
    filtered = searchNames(searchQuery, filtered);
    return filtered;
  }, [searchQuery, selectedCategory]);

  const visibleNames = useMemo(() => {
    return filteredNames.slice(0, visibleCount);
  }, [filteredNames, visibleCount]);

  const categories = getCategories();

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onCopy();
      toast({
        title: "Copied!",
        description: "Name copied to clipboard",
      });
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        onCopy();
        toast({
          title: "Copied!",
          description: "Name copied to clipboard",
        });
      } catch (fallbackError) {
        toast({
          title: "Copy failed",
          description: "Unable to copy to clipboard",
          variant: "destructive",
        });
      }
      document.body.removeChild(textArea);
    }
  };

  const handleAddToFavorites = (name: { text: string; category: string }) => {
    favoriteMutation.mutate({
      nameText: name.text,
      category: name.category,
    });
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "PUBG Stylish Name",
          text: text,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying
      handleCopy(text);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      cool: "bg-secondary/10 text-secondary",
      aggressive: "bg-destructive/10 text-destructive",
      royal: "bg-accent/10 text-accent",
      symbols: "bg-primary/10 text-primary",
      legendary: "bg-muted/20 text-muted-foreground",
    };
    return colors[category as keyof typeof colors] || "bg-muted/20 text-muted-foreground";
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, filteredNames.length));
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
            variant={selectedCategory === category ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
            data-testid={`button-category-${category}`}
          >
            {category === "all" ? "All Names" : category}
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
            className="pl-10"
            data-testid="input-search"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Name Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleNames.map((name) => (
          <Card
            key={name.id}
            className="group hover:border-secondary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-secondary/10"
            onClick={() => handleCopy(name.text)}
            data-testid={`card-premade-${name.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <Badge className={`text-xs ${getCategoryColor(name.category)}`}>
                  {name.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(name.text);
                  }}
                  data-testid={`button-copy-premade-${name.id}`}
                >
                  <Copy className="h-4 w-4 text-secondary" />
                </Button>
              </div>
              <div className="text-center mb-3">
                <p className="font-mono text-lg text-foreground break-all leading-relaxed" data-testid={`text-premade-${name.id}`}>
                  {name.text}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-secondary p-0 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavorites(name);
                  }}
                  disabled={favoriteMutation.isPending}
                  data-testid={`button-favorite-premade-${name.id}`}
                >
                  <Heart className="mr-1 h-3 w-3" />
                  Favorite
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-accent p-0 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(name.text);
                  }}
                  data-testid={`button-share-premade-${name.id}`}
                >
                  <Share className="mr-1 h-3 w-3" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredNames.length && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={loadMore}
            className="px-8 py-3"
            data-testid="button-load-more"
          >
            Load More Names ({filteredNames.length - visibleCount} remaining)
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredNames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No names found matching your search.</p>
          <p className="text-muted-foreground">Try a different search term or category.</p>
        </div>
      )}
    </div>
  );
}
