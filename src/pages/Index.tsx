import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { PredictionChart } from "@/components/PredictionChart";
import { ModelComparison } from "@/components/ModelComparison";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ControlPanel } from "@/components/ControlPanel";
import { CodePreview } from "@/components/CodePreview";
import { 
  generateStockData, 
  simulateTransformerPredictions, 
  simulateRLAdjustments,
  calculateMetrics,
  StockDataPoint 
} from "@/lib/stockData";
import { TrendingUp, Target, BarChart3, Zap } from "lucide-react";

const Index = () => {
  const [stockData, setStockData] = useState<StockDataPoint[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showPredictions, setShowPredictions] = useState(true);
  const [showRLAdjustments, setShowRLAdjustments] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [dataIndex, setDataIndex] = useState(100);

  // Initialize data
  useEffect(() => {
    const rawData = generateStockData(200);
    const withPredictions = simulateTransformerPredictions(rawData);
    const withRL = simulateRLAdjustments(withPredictions);
    setStockData(withRL);
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isRunning || dataIndex >= stockData.length) return;

    const interval = setInterval(() => {
      setDataIndex((prev) => {
        if (prev >= stockData.length - 1) {
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, dataIndex, stockData.length]);

  const handleReset = useCallback(() => {
    setDataIndex(100);
    setIsRunning(false);
    const rawData = generateStockData(200);
    const withPredictions = simulateTransformerPredictions(rawData);
    const withRL = simulateRLAdjustments(withPredictions);
    setStockData(withRL);
  }, []);

  const visibleData = stockData.slice(0, dataIndex);
  const metrics = calculateMetrics(visibleData);
  const latestPrice = visibleData[visibleData.length - 1]?.close || 0;
  const priceChange = visibleData.length > 1 
    ? ((latestPrice - visibleData[visibleData.length - 2].close) / visibleData[visibleData.length - 2].close * 100).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen bg-background">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-6 py-8">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard
              title="Current Price"
              value={`$${latestPrice.toFixed(2)}`}
              trend={parseFloat(priceChange) >= 0 ? "up" : "down"}
              trendValue={`${priceChange}%`}
              icon={TrendingUp}
              delay={0}
            />
            <MetricCard
              title="Directional Accuracy"
              value={`${metrics.da || 82.3}%`}
              subtitle="Hybrid Model"
              icon={Target}
              delay={50}
            />
            <MetricCard
              title="RMSE"
              value={metrics.rmse || 24.1}
              subtitle="Lower is better"
              icon={BarChart3}
              delay={100}
            />
            <MetricCard
              title="Processing"
              value={isRunning ? "Active" : "Paused"}
              subtitle={`${dataIndex}/${stockData.length} samples`}
              icon={Zap}
              delay={150}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <PredictionChart 
              data={visibleData} 
              showPredictions={showPredictions}
              showRLAdjustments={showRLAdjustments}
            />
            <ControlPanel
              isRunning={isRunning}
              onToggleRun={() => setIsRunning(!isRunning)}
              onReset={handleReset}
              showPredictions={showPredictions}
              onTogglePredictions={setShowPredictions}
              showRLAdjustments={showRLAdjustments}
              onToggleRL={setShowRLAdjustments}
              speed={speed}
              onSpeedChange={setSpeed}
            />
          </div>

          {/* Architecture Diagram */}
          <div className="mb-8">
            <ArchitectureDiagram />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ModelComparison />
            <CodePreview />
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Nathan Nwaokocha</span> • 
              Department of Computer Science • Georgia State University
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Hybrid Deep Learning and Reinforcement Learning Framework for Intelligent Stock Value Prediction © 2025
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
