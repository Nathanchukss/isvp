import { Brain, Github, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
              <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                <Brain className="w-7 h-7 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <span className="gradient-text">Hybrid AI</span>
                <span>Stock Prediction</span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Transformer + Reinforcement Learning Framework
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">82.3% Accuracy</span>
            </div>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href="https://github.com/Nathanchukss/isvp" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">View Code</span>
              </a>
            </Button>
            <Button variant="default" size="sm" className="gap-2" asChild>
              <a href="/Nathan-Nwaokocha(Ai).pdf" download="Nathan-Nwaokocha(Ai).pdf">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Research Paper</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
