import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { modelMetrics } from "@/lib/stockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ModelComparison() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 shadow-xl border border-border">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].name}: {payload[0].value}{payload[0].name === 'directionalAccuracy' ? '%' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = (dataKey: keyof typeof modelMetrics[0], label: string, suffix: string = '') => (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={modelMetrics} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
        <XAxis 
          dataKey="name" 
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          tickLine={{ stroke: 'hsl(var(--border))' }}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          tickLine={{ stroke: 'hsl(var(--border))' }}
          tickFormatter={(value) => `${value}${suffix}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={dataKey} name={label} radius={[6, 6, 0, 0]}>
          {modelMetrics.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              opacity={entry.name === 'Hybrid (Ours)' ? 1 : 0.6}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <Card className="opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <CardHeader>
        <CardTitle className="text-lg">Model Performance Comparison</CardTitle>
        <CardDescription>Benchmarked on NASDAQ & S&P 500 datasets (2015-2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accuracy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="accuracy">Directional Accuracy</TabsTrigger>
            <TabsTrigger value="rmse">RMSE ↓</TabsTrigger>
            <TabsTrigger value="mape">MAPE ↓</TabsTrigger>
          </TabsList>
          <TabsContent value="accuracy">
            {renderChart('directionalAccuracy', 'Directional Accuracy', '%')}
          </TabsContent>
          <TabsContent value="rmse">
            {renderChart('rmse', 'RMSE')}
          </TabsContent>
          <TabsContent value="mape">
            {renderChart('mape', 'MAPE', '%')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
