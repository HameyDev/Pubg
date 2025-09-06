import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Copy, Dice6, Edit } from "lucide-react";
import { generateNames } from "@/lib/unicode-transforms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { GeneratedName, InsertHistory, InsertFavorite } from "@shared/schema";

interface NameGeneratorProps {
  onCopy: () => void;
}

export function NameGenerator({ onCopy }: NameGeneratorProps) {
  const [inputText, setInputText] = useState("");
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const historyMutation = useMutation({
    mutationFn: async (data: InsertHistory) => {
      const response = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save to history");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
    },
  });

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

  const handleGenerate = () => {
    if (!inputText.trim()) {
      toast({
        title: "Enter a name",
        description: "Please type a name to generate stylish variations",
        variant: "destructive",
      });
      return;
    }

    const names = generateNames(inputText);
    setGeneratedNames(names);

    // Save the first generated name to history
    if (names.length > 0) {
      historyMutation.mutate({
        originalText: inputText.trim(),
        generatedText: names[0].text,
        style: names[0].style,
      });
    }
  };

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

  const handleAddToFavorites = (name: GeneratedName) => {
    favoriteMutation.mutate({
      nameText: name.text,
      category: "generated",
    });
  };

  const handleRandom = () => {
    const randomNames = [
      "Shadow", "Phoenix", "Viper", "Storm", "Blaze", "Thunder", "Frost", "Raven",
      "Wolf", "Dragon", "Tiger", "Falcon", "Serpent", "Eagle", "Panther", "Lion",
      "Warrior", "Hunter", "Assassin", "Ninja", "Samurai", "Knight", "Guardian", "Demon"
    ];
    
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    setInputText(randomName);
    
    const names = generateNames(randomName);
    setGeneratedNames(names);

    if (names.length > 0) {
      historyMutation.mutate({
        originalText: randomName,
        generatedText: names[0].text,
        style: names[0].style,
      });
    }
  };

  const memoizedNames = useMemo(() => generatedNames, [generatedNames]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="glow-border rounded-lg p-1">
        <div className="bg-input rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="nameInput" className="block text-sm font-medium text-foreground">
              <Edit className="inline mr-2 h-4 w-4 text-primary" />
              Enter Your Name
            </label>
            <Input
              id="nameInput"
              type="text"
              placeholder="Type your name here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
              className="text-lg"
              data-testid="input-name"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGenerate}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground"
              disabled={!inputText.trim()}
              data-testid="button-generate"
            >
              <Edit className="mr-2 h-4 w-4" />
              Generate Names
            </Button>
            <Button
              onClick={handleRandom}
              variant="secondary"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              data-testid="button-random"
            >
              <Dice6 className="mr-2 h-4 w-4" />
              Random
            </Button>
          </div>
        </div>
      </div>

      {/* Generated Results */}
      {memoizedNames.length > 0 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-display font-bold text-2xl text-foreground">Generated Names</h2>
            <p className="text-muted-foreground">Click any name to copy it instantly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memoizedNames.map((name) => (
              <Card
                key={name.id}
                className="group hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20"
                onClick={() => handleCopy(name.text)}
                data-testid={`card-generated-${name.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {name.style}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(name.text);
                      }}
                      data-testid={`button-copy-${name.id}`}
                    >
                      <Copy className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                  <div className="text-center mb-3">
                    <p className="font-mono text-xl text-foreground break-all leading-relaxed" data-testid={`text-name-${name.id}`}>
                      {name.text}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground hover:text-secondary p-0 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavorites(name);
                      }}
                      disabled={favoriteMutation.isPending}
                      data-testid={`button-favorite-${name.id}`}
                    >
                      <Heart className="mr-1 h-3 w-3" />
                      Add to Favorites
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
