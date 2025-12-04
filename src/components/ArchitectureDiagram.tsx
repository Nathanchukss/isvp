import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Cpu, Database, LineChart, Sparkles, Zap } from "lucide-react";

export function ArchitectureDiagram() {
  const steps = [
    {
      icon: Database,
      title: "Input Data",
      description: "Historical OHLCV data with sliding windows (60 days)",
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
    {
      icon: Brain,
      title: "Transformer Encoder",
      description: "Self-attention mechanism captures temporal dependencies",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      icon: LineChart,
      title: "Base Prediction",
      description: "Initial stock price prediction from learned patterns",
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      icon: Zap,
      title: "RL Agent",
      description: "DQN agent adjusts predictions via reward feedback",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Sparkles,
      title: "Refined Output",
      description: "Adaptive prediction with 82.3% directional accuracy",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <Card className="opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary" />
          Hybrid Architecture Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center gap-3">
              <div className="flex flex-col items-center text-center group">
                <div className={`p-4 rounded-2xl ${step.bgColor} ${step.color} transition-all duration-300 group-hover:scale-110`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="mt-3 max-w-[140px]">
                  <p className="font-medium text-sm text-foreground">{step.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block shrink-0" />
              )}
            </div>
          ))}
        </div>
        
        {/* Reward Loop Indicator */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Reward Feedback Loop</span>
            </div>
            <span>r(t) = -|ŷ - y|</span>
            <span className="text-xs">(minimizing prediction error)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
