import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ControlPanelProps {
  isRunning: boolean;
  onToggleRun: () => void;
  onReset: () => void;
  showPredictions: boolean;
  onTogglePredictions: (value: boolean) => void;
  showRLAdjustments: boolean;
  onToggleRL: (value: boolean) => void;
  speed: number;
  onSpeedChange: (value: number) => void;
}

export function ControlPanel({
  isRunning,
  onToggleRun,
  onReset,
  showPredictions,
  onTogglePredictions,
  showRLAdjustments,
  onToggleRL,
  speed,
  onSpeedChange,
}: ControlPanelProps) {
  return (
    <Card className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Simulation Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-3">
          <Button 
            onClick={onToggleRun} 
            variant={isRunning ? "secondary" : "glow"}
            className="flex-1"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Simulation
              </>
            )}
          </Button>
          <Button onClick={onReset} variant="outline" size="icon">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="predictions" className="text-sm cursor-pointer">
              Show Transformer Predictions
            </Label>
            <Switch
              id="predictions"
              checked={showPredictions}
              onCheckedChange={onTogglePredictions}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="rl" className="text-sm cursor-pointer">
              Show RL Adjustments
            </Label>
            <Switch
              id="rl"
              checked={showRLAdjustments}
              onCheckedChange={onToggleRL}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Simulation Speed</Label>
            <span className="text-xs text-muted-foreground">{speed}x</span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={(v) => onSpeedChange(v[0])}
            min={0.5}
            max={5}
            step={0.5}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
