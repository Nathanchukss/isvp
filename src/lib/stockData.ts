// Simulated stock data and prediction utilities

export interface StockDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  predicted?: number;
  rlAdjusted?: number;
}

export interface ModelMetrics {
  name: string;
  rmse: number;
  mape: number;
  directionalAccuracy: number;
  color: string;
}

// Generate realistic stock price data
export function generateStockData(days: number = 200, basePrice: number = 150): StockDataPoint[] {
  const data: StockDataPoint[] = [];
  let price = basePrice;
  const startDate = new Date('2024-01-01');
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Random walk with trend and volatility
    const trend = 0.0002;
    const volatility = 0.02;
    const change = (Math.random() - 0.5) * volatility + trend;
    price = price * (1 + change);
    
    const dailyVolatility = price * 0.015;
    const open = price + (Math.random() - 0.5) * dailyVolatility;
    const close = price + (Math.random() - 0.5) * dailyVolatility;
    const high = Math.max(open, close) + Math.random() * dailyVolatility * 0.5;
    const low = Math.min(open, close) - Math.random() * dailyVolatility * 0.5;
    const volume = Math.floor(5000000 + Math.random() * 10000000);
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume,
    });
  }
  
  return data;
}

// Simulate transformer predictions
export function simulateTransformerPredictions(data: StockDataPoint[]): StockDataPoint[] {
  return data.map((point, i) => {
    // Simulate prediction with some noise and lag
    const noise = (Math.random() - 0.5) * 2;
    const predicted = point.close + noise;
    
    return {
      ...point,
      predicted: parseFloat(predicted.toFixed(2)),
    };
  });
}

// Simulate RL adjustments
export function simulateRLAdjustments(data: StockDataPoint[]): StockDataPoint[] {
  return data.map((point, i) => {
    if (!point.predicted) return point;
    
    // RL agent makes small adjustments to improve accuracy
    const adjustment = (Math.random() - 0.3) * 0.5; // Slight bias towards improvement
    const rlAdjusted = point.predicted + adjustment;
    
    return {
      ...point,
      rlAdjusted: parseFloat(rlAdjusted.toFixed(2)),
    };
  });
}

// Model comparison metrics
export const modelMetrics: ModelMetrics[] = [
  { name: 'ARIMA', rmse: 41.2, mape: 4.23, directionalAccuracy: 61.4, color: 'hsl(var(--chart-4))' },
  { name: 'LSTM', rmse: 32.5, mape: 3.65, directionalAccuracy: 68.2, color: 'hsl(var(--chart-3))' },
  { name: 'Transformer', rmse: 27.9, mape: 3.21, directionalAccuracy: 73.6, color: 'hsl(var(--chart-5))' },
  { name: 'RL-only', rmse: 30.7, mape: 3.58, directionalAccuracy: 70.1, color: 'hsl(var(--chart-2))' },
  { name: 'Hybrid (Ours)', rmse: 24.1, mape: 2.84, directionalAccuracy: 82.3, color: 'hsl(var(--chart-1))' },
];

// Calculate real-time metrics
export function calculateMetrics(data: StockDataPoint[]): { rmse: number; mape: number; da: number } {
  const withPredictions = data.filter(d => d.rlAdjusted !== undefined);
  
  if (withPredictions.length === 0) {
    return { rmse: 0, mape: 0, da: 0 };
  }
  
  let squaredErrors = 0;
  let absolutePercentageErrors = 0;
  let correctDirections = 0;
  
  for (let i = 1; i < withPredictions.length; i++) {
    const actual = withPredictions[i].close;
    const predicted = withPredictions[i].rlAdjusted!;
    const prevActual = withPredictions[i - 1].close;
    
    squaredErrors += Math.pow(actual - predicted, 2);
    absolutePercentageErrors += Math.abs((actual - predicted) / actual);
    
    const actualDirection = actual > prevActual;
    const predictedDirection = predicted > withPredictions[i - 1].rlAdjusted!;
    if (actualDirection === predictedDirection) correctDirections++;
  }
  
  const n = withPredictions.length - 1;
  
  return {
    rmse: parseFloat(Math.sqrt(squaredErrors / n).toFixed(2)),
    mape: parseFloat((absolutePercentageErrors / n * 100).toFixed(2)),
    da: parseFloat((correctDirections / n * 100).toFixed(1)),
  };
}
