import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { getBlogPosts, getBlogCategories, filterBlogPosts } from "@/data/blog-posts";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const allPosts = getBlogPosts();
  const categories = getBlogCategories();
  
  const filteredPosts = useMemo(() => {
    return filterBlogPosts(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Guide: "bg-secondary/10 text-secondary",
      Psychology: "bg-accent/10 text-accent", 
      Trends: "bg-primary/10 text-primary",
      Technology: "bg-destructive/10 text-destructive",
      Branding: "bg-muted/20 text-muted-foreground",
    };
    return colors[category as keyof typeof colors] || "bg-muted/20 text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" data-testid="link-home">
            <ArrowLeft className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-xl gaming-gradient">PUBG Names</span>
          </Link>
          <div className="text-sm text-muted-foreground">Gaming Blog</div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="font-display font-black text-4xl md:text-6xl">
            <span className="gaming-gradient neon-text">Gaming</span>
            <br />
            <span className="text-foreground">Blog</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, guides, and stories from the world of PUBG gaming. Level up your knowledge and gaming skills.
          </p>
        </section>

        {/* Filters */}
        <section className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-category-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-blog"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="space-y-6">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="block group"
                  data-testid={`link-blog-post-${post.slug}`}
                >
                  <Card className="h-full group-hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge className={`text-xs ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readingTime} min read
                        </div>
                      </div>
                      <h2 className="font-display font-bold text-lg group-hover:text-primary transition-colors leading-tight" data-testid={`text-blog-title-${post.id}`}>
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-blog-excerpt-${post.id}`}>
                        {post.excerpt}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{post.author.avatar}</span>
                          <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.publishedAt)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section className="bg-card border border-border rounded-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-display font-bold text-2xl text-foreground">Blog Stats</h2>
            <p className="text-muted-foreground">Insights and knowledge at your fingertips</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{allPosts.length}</div>
              <div className="text-sm text-muted-foreground">Total Articles</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-secondary">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-accent">
                {allPosts.reduce((sum, post) => sum + post.readingTime, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Minutes of Content</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}