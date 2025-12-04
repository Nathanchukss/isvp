# Hybrid Deep Learning and Reinforcement Learning Framework for Intelligent Stock Value Prediction (ISVP)

**By Nathan Nwaokocha (2025)**

A smart computer system that combines two powerful types of artificial intelligence to predict stock prices with **82.3% directional accuracy**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)

---

## 📖 Overview

This project implements a **Hybrid AI System** that combines:

1. **Deep Learning (Transformers)** – A neural network architecture that analyzes historical stock data to identify long-term patterns and relationships
2. **Reinforcement Learning (RL)** – An adaptive agent that learns through trial and error, adjusting predictions based on real-time feedback

Together, they form a "thinking" machine for finance that handles both steady market conditions and sudden surprises.

---

## 🎯 Why This Matters

Traditional methods like ARIMA or simple machine learning assume markets move in predictable patterns. But markets are like roller coasters—unpredictable and volatile, especially during events like COVID-19 or economic shocks.

Our hybrid approach:
- **Transformer**: Remembers the past and finds patterns
- **RL Agent**: Adapts to the present and adjusts predictions

---

## 🏗️ Architecture

### The Transformer
Studies stock data (prices, highs, lows, volumes) from markets like NASDAQ and S&P 500. It learns relationships between numbers over time—like noticing rainy days mean umbrellas.

### The Reinforcement Learning Agent
Takes the Transformer's predictions and fine-tunes them. It experiments with adjustments and learns from rewards (correct predictions) and penalties (incorrect ones).

*Like a kid learning basketball—every missed shot teaches better aim.*

---

## 📊 Model Performance

| Model | RMSE ↓ | MAPE ↓ | DA (%) ↑ |
|-------|--------|--------|----------|
| ARIMA | 41.2 | 4.23 | 61.4 |
| LSTM | 32.5 | 3.65 | 68.2 |
| Transformer | 27.9 | 3.21 | 73.6 |
| RL-only | 30.7 | 3.58 | 70.1 |
| **Hybrid (Ours)** | **24.1** | **2.84** | **82.3** |

- **RMSE**: Root Mean Square Error (lower is better)
- **MAPE**: Mean Absolute Percentage Error (lower is better)
- **DA**: Directional Accuracy (higher is better)

---

## 🛠️ Development Journey

### Phase 1: Python/PyTorch Prototype
The model was initially developed in **Python** using:
- **PyTorch** for deep learning model architecture
- **NumPy** & **Pandas** for data processing
- **Matplotlib** for visualization
- Real stock data from **2015-2024** (NASDAQ, S&P 500)

Training process:
1. Transformer trained on historical data to predict prices
2. RL agent fine-tuned predictions through reward-based learning

### Phase 2: React/TypeScript Web Platform
The prototype was transitioned to a **React/TypeScript** web application to create an interactive dashboard for visualization and demonstration.

---

## 🧰 Technologies Used

### Backend/Model Development
- Python 3.x
- PyTorch
- NumPy
- Pandas
- Matplotlib

### Frontend Web Platform
- **React 18** – UI framework
- **TypeScript** – Type-safe development
- **Vite** – Build tool and dev server
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – Component library
- **Recharts** – Interactive charts and visualizations
- **Lucide React** – Icon library

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone https://github.com/Nathanchukss/isvp.git

# Navigate to project directory
cd isvp

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ArchitectureDiagram.tsx  # Pipeline visualization
│   ├── CodePreview.tsx          # Code snippets display
│   ├── ControlPanel.tsx         # Simulation controls
│   ├── Header.tsx               # Navigation header
│   ├── MetricCard.tsx           # Performance metrics
│   ├── ModelComparison.tsx      # Model comparison charts
│   └── PredictionChart.tsx      # Stock prediction visualization
├── lib/
│   └── stockData.ts             # Simulated stock data & metrics
├── pages/
│   └── Index.tsx                # Main dashboard page
└── index.css                    # Design system tokens
```

---

## 📚 Research Paper

For the full technical details, methodology, and experimental results, download the research paper:
- [Download PDF](./public/Nathan-Nwaokocha(Ai).pdf)

---

## 🔮 Conclusion

This project proves that combining deep learning (pattern recognition) with reinforcement learning (adaptive behavior) creates a smart, flexible, and accurate system for stock prediction.

> *"If you imagine the stock market as a stormy sea: the Transformer is the sailor who knows how waves usually move, and the RL agent is the one steering the ship, making adjustments as new waves appear. Together, they sail more safely."*

It's not just about predicting numbers—it's about helping investors make smarter decisions in a world full of uncertainty.

---

## 📄 License

MIT License - feel free to use and modify for your own projects.

---

**Built with ❤️ by Nathan Nwaokocha**
