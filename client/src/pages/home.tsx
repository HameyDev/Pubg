import { useState } from "react";
import { NameGenerator } from "@/components/name-generator";
import { PreMadeNames } from "@/components/premade-names";
import { CopyToast } from "@/components/copy-toast";
import { Button } from "@/components/ui/button";
import { Gamepad2, Heart, History, Palette } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-primary-foreground text-lg" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl gaming-gradient">PUBG Names</h1>
              <p className="text-xs text-muted-foreground">Stylish Name Generator</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#generator" className="text-muted-foreground hover:text-primary transition-colors">Generator</a>
            <a href="#premade" className="text-muted-foreground hover:text-primary transition-colors">Pre-made Names</a>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <a href="#favorites" className="text-muted-foreground hover:text-primary transition-colors">Favorites</a>
            <Button variant="ghost" size="sm" className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors">
              <Palette className="text-primary h-4 w-4" />
            </Button>
          </nav>
          <Button className="md:hidden" variant="ghost" size="sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section id="generator" className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl">
              <span className="gaming-gradient neon-text">PUBG</span>
              <br />
              <span className="text-foreground">Name Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create stylish, unique names for PUBG with fancy symbols and Unicode characters. 
              Perfect for standing out in the battleground!
            </p>
          </div>
          <NameGenerator onCopy={handleCopy} />
        </section>

        {/* Pre-made Names Section */}
        <section id="premade">
          <PreMadeNames onCopy={handleCopy} />
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="font-display font-bold text-3xl text-foreground">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create and manage the perfect PUBG gaming identity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="text-primary text-xl w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">One-Click Copy</h3>
              <p className="text-muted-foreground">Copy any generated or pre-made name to your clipboard instantly with visual feedback.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-secondary/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <Heart className="text-secondary text-xl w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">Favorites System</h3>
              <p className="text-muted-foreground">Save your favorite names and access them quickly whenever you need them.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <History className="text-accent text-xl w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">Name History</h3>
              <p className="text-muted-foreground">Keep track of all your generated names and revisit previous creations.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="text-primary text-xl w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">Mobile Optimized</h3>
              <p className="text-muted-foreground">Perfect experience on all devices with touch-friendly controls and responsive design.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-secondary/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <svg className="text-secondary text-xl w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">Smart Search</h3>
              <p className="text-muted-foreground">Find the perfect name quickly with our intelligent search and filtering system.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <svg className="text-accent text-xl w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5 6m12-2l2 2M5 6v12a2 2 0 002 2h10a2 2 0 002-2V6M5 6h14" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">Random Generator</h3>
              <p className="text-muted-foreground">Get instant inspiration with our random name generator featuring various styles.</p>
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="bg-card border border-border rounded-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-display font-bold text-2xl text-foreground">How to Use Your New Name</h2>
            <p className="text-muted-foreground">Step-by-step guide to change your PUBG name</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">1</div>
              <h4 className="font-semibold text-foreground">Generate Name</h4>
              <p className="text-sm text-muted-foreground">Type your desired name and generate stylish variations</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">2</div>
              <h4 className="font-semibold text-foreground">Copy Name</h4>
              <p className="text-sm text-muted-foreground">Click on your favorite name to copy it to clipboard</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">3</div>
              <h4 className="font-semibold text-foreground">Open PUBG</h4>
              <p className="text-sm text-muted-foreground">Go to PUBG settings and find the name change option</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-lg">4</div>
              <h4 className="font-semibold text-foreground">Paste & Save</h4>
              <p className="text-sm text-muted-foreground">Paste your new name and save to update your profile</p>
            </div>
          </div>

          <div className="bg-muted/20 border border-border/50 rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <svg className="text-primary text-xl w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-semibold text-foreground">Important Notes</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <svg className="text-secondary mt-0.5 text-xs w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Some special characters might not display correctly on all devices</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="text-secondary mt-0.5 text-xs w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Name changes in PUBG may require in-game currency or have cooldown periods</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="text-secondary mt-0.5 text-xs w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Test your name in a text editor first to ensure all characters display properly</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Gamepad2 className="text-primary-foreground text-sm" />
                </div>
                <h3 className="font-display font-bold text-lg gaming-gradient">PUBG Names</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Create stunning, unique names for PUBG with our advanced Unicode generator and extensive pre-made collection.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#generator" className="hover:text-primary transition-colors">Name Generator</a></li>
                <li><a href="#premade" className="hover:text-primary transition-colors">Pre-made Names</a></li>
                <li><a href="#favorites" className="hover:text-primary transition-colors">Favorites</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Name History</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Cool Names</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Aggressive Names</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Royal Names</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Symbol Names</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Connect</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-muted hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors group">
                  <svg className="text-muted-foreground group-hover:text-primary text-sm w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-muted hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors group">
                  <svg className="text-muted-foreground group-hover:text-primary text-sm w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 PUBG Names Generator. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <CopyToast show={copySuccess} />
    </div>
  );
}
