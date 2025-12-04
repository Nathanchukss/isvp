import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Terminal } from "lucide-react";

export function CodePreview() {
  const transformerCode = `class TimeSeriesTransformer(nn.Module):
    def __init__(self, input_dim=5, d_model=64, 
                 nhead=4, num_layers=2):
        super().__init__()
        self.input_fc = nn.Linear(input_dim, d_model)
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model, 
            nhead=nhead
        )
        self.transformer = nn.TransformerEncoder(
            encoder_layer, 
            num_layers=num_layers
        )
        self.output_fc = nn.Linear(d_model, 1)

    def forward(self, x):
        x = self.input_fc(x)
        x = x.permute(1, 0, 2)
        out = self.transformer(x)
        return self.output_fc(out[-1]).squeeze(-1)`;

  const rlEnvCode = `class PredictionAdjustmentEnv(gym.Env):
    def step(self, action):
        # Get base prediction from transformer
        base_pred = self.transformer(obs)
        
        # Apply RL adjustment (-0.2%, 0, +0.2%)
        adjustment = 0.002 * (action - 1)
        adjusted_pred = base_pred * (1 + adjustment)
        
        # Reward: negative absolute error
        reward = -abs(adjusted_pred - actual)
        
        return obs, reward, done, info`;

  const trainingCode = `# Phase 1: Train Transformer
model = TimeSeriesTransformer(input_dim=5)
optimizer = optim.Adam(model.parameters(), lr=1e-4)

for epoch in range(epochs):
    preds = model(X_train)
    loss = criterion(preds, y_train)
    loss.backward()
    optimizer.step()

# Phase 2: Train RL Agent
env = PredictionAdjustmentEnv(data, transformer=model)
agent = DQN('MlpPolicy', env, learning_rate=1e-4)
agent.learn(total_timesteps=20000)`;

  return (
    <Card className="opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          Implementation Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transformer" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="transformer" className="text-xs">Transformer</TabsTrigger>
            <TabsTrigger value="rl" className="text-xs">RL Environment</TabsTrigger>
            <TabsTrigger value="training" className="text-xs">Training</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transformer">
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-secondary/80 flex items-center px-3 gap-2">
                <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-mono">model_transformer.py</span>
              </div>
              <pre className="bg-secondary/30 pt-10 p-4 rounded-lg overflow-x-auto">
                <code className="text-xs font-mono text-foreground/90 leading-relaxed">
                  {transformerCode}
                </code>
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="rl">
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-secondary/80 flex items-center px-3 gap-2">
                <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-mono">rl_env.py</span>
              </div>
              <pre className="bg-secondary/30 pt-10 p-4 rounded-lg overflow-x-auto">
                <code className="text-xs font-mono text-foreground/90 leading-relaxed">
                  {rlEnvCode}
                </code>
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="training">
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-secondary/80 flex items-center px-3 gap-2">
                <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-mono">train.py</span>
              </div>
              <pre className="bg-secondary/30 pt-10 p-4 rounded-lg overflow-x-auto">
                <code className="text-xs font-mono text-foreground/90 leading-relaxed">
                  {trainingCode}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
