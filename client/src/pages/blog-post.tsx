import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2, Heart } from "lucide-react";
import { getBlogPost } from "@/data/blog-posts";
import { useToast } from "@/hooks/use-toast";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const post = slug ? getBlogPost(slug) : undefined;

  useEffect(() => {
    if (slug && !post) {
      // Post not found, could redirect to 404 or blog list
    }
  }, [slug, post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Article Not Found</h1>
          <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link Copied!",
          description: "Article URL has been copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Share Failed",
          description: "Unable to share article",
          variant: "destructive",
        });
      }
    }
  };

  // Convert markdown-like content to HTML (basic implementation)
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return `<h1 class="text-3xl font-bold text-foreground mt-8 mb-4">${line.slice(2)}</h1>`;
        } else if (line.startsWith('## ')) {
          return `<h2 class="text-2xl font-semibold text-foreground mt-6 mb-3">${line.slice(3)}</h2>`;
        } else if (line.startsWith('### ')) {
          return `<h3 class="text-xl font-semibold text-foreground mt-4 mb-2">${line.slice(4)}</h3>`;
        }
        // Bold text
        else if (line.includes('**')) {
          const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
          return `<p class="text-muted-foreground mb-3 leading-relaxed">${formatted}</p>`;
        }
        // Lists
        else if (line.startsWith('- ')) {
          return `<li class="text-muted-foreground mb-1 ml-4">${line.slice(2)}</li>`;
        } else if (line.match(/^\d+\. /)) {
          return `<li class="text-muted-foreground mb-1 ml-4">${line.replace(/^\d+\. /, '')}</li>`;
        }
        // Regular paragraphs
        else if (line.trim() && !line.startsWith('    ')) {
          return `<p class="text-muted-foreground mb-3 leading-relaxed">${line}</p>`;
        }
        // Empty lines for spacing
        else if (!line.trim()) {
          return '<div class="mb-3"></div>';
        }
        return '';
      })
      .join('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/blog" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" data-testid="link-back-to-blog">
            <ArrowLeft className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-lg gaming-gradient">Back to Blog</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleShare} data-testid="button-share-article">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="space-y-8">
          {/* Article Header */}
          <header className="space-y-6">
            <div className="flex items-center space-x-3">
              <Badge className={`${getCategoryColor(post.category)}`}>
                {post.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readingTime} min read
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(post.publishedAt)}
                </div>
              </div>
            </div>

            <h1 className="font-display font-black text-3xl md:text-5xl leading-tight" data-testid="text-article-title">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-article-excerpt">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{post.author.avatar}</span>
                <div>
                  <div className="font-semibold text-foreground">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <Card className="border-border">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                data-testid="text-article-content"
              />
            </CardContent>
          </Card>

          {/* Article Footer */}
          <footer className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Published on {formatDate(post.publishedAt)}
              </div>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Article
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-display font-bold text-lg text-foreground">About the Author</h3>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{post.author.avatar}</span>
                <div>
                  <div className="font-semibold text-foreground">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Gaming expert and content creator sharing insights from the PUBG community.
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center py-8">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  More Articles
                </Button>
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}