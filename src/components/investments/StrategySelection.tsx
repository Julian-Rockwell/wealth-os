import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { TradingStrategy } from "@/types/trading";

interface Question {
  id: string;
  question: string;
  options: { value: number; label: string }[];
}

const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: "experience",
    question: "What's your trading experience level?",
    options: [
      { value: 1, label: "Complete beginner" },
      { value: 2, label: "Some paper trading" },
      { value: 3, label: "Less than 1 year live" },
      { value: 4, label: "1-3 years live" },
      { value: 5, label: "3+ years live" },
    ],
  },
  {
    id: "risk",
    question: "How comfortable are you with risk?",
    options: [
      { value: 1, label: "Very conservative" },
      { value: 2, label: "Conservative" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "Aggressive" },
      { value: 5, label: "Very aggressive" },
    ],
  },
  {
    id: "timeframe",
    question: "What's your preferred trading timeframe?",
    options: [
      { value: 1, label: "Long-term (weeks-months)" },
      { value: 2, label: "Swing (days-weeks)" },
      { value: 3, label: "Day trading" },
      { value: 4, label: "Scalping (minutes-hours)" },
      { value: 5, label: "All timeframes" },
    ],
  },
  {
    id: "availability",
    question: "How much time can you dedicate weekly?",
    options: [
      { value: 1, label: "1-2 hours" },
      { value: 2, label: "3-5 hours" },
      { value: 3, label: "5-10 hours" },
      { value: 4, label: "10-20 hours" },
      { value: 5, label: "20+ hours (full-time)" },
    ],
  },
  {
    id: "style",
    question: "Which trading style appeals to you most?",
    options: [
      { value: 1, label: "Income generation (options)" },
      { value: 2, label: "Momentum/Trend following" },
      { value: 3, label: "Value/Mean reversion" },
      { value: 4, label: "Technical patterns" },
      { value: 5, label: "Mix of multiple styles" },
    ],
  },
];

interface StrategyRecommendation {
  strategy: TradingStrategy;
  name: string;
  description: string;
  match: number; // 0-100%
  reasons: string[];
}

interface StrategySelectionProps {
  onStrategyConfirmed: (strategy: TradingStrategy) => void;
}

export function StrategySelection({ onStrategyConfirmed }: StrategySelectionProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<TradingStrategy | null>(null);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const allQuestionsAnswered = ASSESSMENT_QUESTIONS.every((q) => answers[q.id] !== undefined);

  const getRecommendations = (): StrategyRecommendation[] => {
    const exp = answers.experience || 1;
    const risk = answers.risk || 1;
    const timeframe = answers.timeframe || 1;
    const availability = answers.availability || 1;
    const style = answers.style || 1;

    const recommendations: StrategyRecommendation[] = [];

    // Covered Calls - best for conservative, low time, income focus
    const ccMatch =
      ((exp >= 2 ? 20 : 10) +
        (risk <= 2 ? 25 : risk === 3 ? 15 : 5) +
        (timeframe <= 2 ? 20 : 10) +
        (availability <= 2 ? 25 : 10) +
        (style === 1 ? 20 : 5)) /
      1.1;
    recommendations.push({
      strategy: "covered_calls",
      name: "Covered Calls",
      description: "Own stock, sell calls for premium. Conservative income enhancement.",
      match: Math.round(ccMatch),
      reasons: [
        risk <= 2 ? "✓ Matches your conservative risk profile" : "",
        availability <= 2 ? "✓ Low time commitment fits your schedule" : "",
        style === 1 ? "✓ Aligns with income generation preference" : "",
      ].filter(Boolean),
    });

    // Credit Spreads - balanced, defined risk
    const csMatch =
      ((exp >= 2 ? 20 : 5) +
        (risk >= 2 && risk <= 4 ? 25 : 10) +
        (timeframe <= 3 ? 20 : 10) +
        (availability >= 1 && availability <= 3 ? 20 : 10) +
        (style === 1 || style === 3 ? 15 : 10)) /
      1.0;
    recommendations.push({
      strategy: "spreads",
      name: "Credit Spreads",
      description: "Defined-risk options strategies. Lower capital requirements, predictable outcomes.",
      match: Math.round(csMatch),
      reasons: [
        risk >= 2 && risk <= 4 ? "✓ Moderate risk tolerance is ideal" : "",
        availability <= 3 ? "✓ Time commitment matches your availability" : "",
        "✓ Defined risk limits downside exposure",
      ].filter(Boolean),
    });

    // Options Wheel - medium complexity, consistent income
    const owMatch =
      ((exp >= 3 ? 20 : exp === 2 ? 10 : 5) +
        (risk >= 2 && risk <= 4 ? 20 : 10) +
        (timeframe <= 3 ? 20 : 10) +
        (availability >= 2 && availability <= 4 ? 25 : 10) +
        (style === 1 || style === 5 ? 15 : 5)) /
      1.0;
    recommendations.push({
      strategy: "options_wheel",
      name: "Options Wheel",
      description: "Sell cash-secured puts, get assigned, sell covered calls. Consistent income generation.",
      match: Math.round(owMatch),
      reasons: [
        exp >= 3 ? "✓ Experience level supports this strategy" : "",
        risk >= 2 && risk <= 4 ? "✓ Risk profile is well-suited" : "",
        style === 1 ? "✓ Excellent for income generation" : "",
      ].filter(Boolean),
    });

    // Swing Trading - technical, medium term
    const stMatch =
      ((exp >= 3 ? 20 : 10) +
        (risk >= 3 ? 20 : 10) +
        (timeframe === 2 || timeframe === 3 ? 25 : 10) +
        (availability >= 3 ? 20 : 10) +
        (style === 2 || style === 4 || style === 5 ? 15 : 5)) /
      1.0;
    recommendations.push({
      strategy: "swing_trading",
      name: "Swing Trading",
      description: "Hold positions for 2-10 days. Technical analysis-based entries and exits.",
      match: Math.round(stMatch),
      reasons: [
        timeframe === 2 ? "✓ Perfect match for your timeframe preference" : "",
        availability >= 3 ? "✓ Your time availability supports active monitoring" : "",
        style === 2 || style === 4 ? "✓ Aligns with your trading style" : "",
      ].filter(Boolean),
    });

    // Day Trading - high risk, high time, experienced only
    const dtMatch =
      ((exp >= 4 ? 25 : exp === 3 ? 10 : 0) +
        (risk >= 4 ? 25 : 5) +
        (timeframe >= 3 ? 25 : 5) +
        (availability >= 4 ? 25 : 0) +
        (style === 3 || style === 4 || style === 5 ? 10 : 0)) /
      1.1;
    recommendations.push({
      strategy: "day_trading",
      name: "Day Trading",
      description: "Intraday positions. Requires active monitoring and quick decision-making.",
      match: Math.round(dtMatch),
      reasons: [
        exp >= 4 ? "✓ Experience level supports day trading" : "⚠ Requires significant experience",
        availability >= 4 ? "✓ Time availability is sufficient" : "⚠ Requires 20+ hours weekly",
        risk >= 4 ? "✓ Risk tolerance matches requirements" : "⚠ High risk tolerance needed",
      ].filter(Boolean),
    });

    return recommendations.sort((a, b) => b.match - a.match);
  };

  const handleGenerateRecommendations = () => {
    setShowRecommendations(true);
    toast.success("Recommendations generated based on your responses");
  };

  const handleConfirmStrategy = () => {
    if (selectedStrategy) {
      onStrategyConfirmed(selectedStrategy);
      toast.success("Strategy confirmed! Proceed to Paper Trading.");
    }
  };

  const recommendations = showRecommendations ? getRecommendations() : [];

  return (
    <div className="space-y-6">
      {/* Assessment Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Strategy Assessment
          </CardTitle>
          <CardDescription>
            Answer 5 quick questions to get personalized strategy recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {ASSESSMENT_QUESTIONS.map((question) => (
            <div key={question.id} className="space-y-3">
              <Label className="text-base font-medium">{question.question}</Label>
              <RadioGroup
                value={answers[question.id]?.toString()}
                onValueChange={(v) => handleAnswerChange(question.id, parseInt(v))}
              >
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
                      <Label htmlFor={`${question.id}-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}

          <Button onClick={handleGenerateRecommendations} disabled={!allQuestionsAnswered} className="w-full">
            {allQuestionsAnswered ? "Generate Recommendations" : "Answer all questions to continue"}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {showRecommendations && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Recommended Strategies
            </CardTitle>
            <CardDescription>Based on your assessment, here are your best matches (sorted by fit)</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedStrategy || ""} onValueChange={(v) => setSelectedStrategy(v as TradingStrategy)}>
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div
                    key={rec.strategy}
                    className={`p-4 border rounded-lg transition-colors ${
                      selectedStrategy === rec.strategy
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={rec.strategy} id={rec.strategy} className="mt-1" />
                      <Label htmlFor={rec.strategy} className="flex-1 cursor-pointer space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{rec.name}</span>
                          <Badge variant={rec.match >= 70 ? "default" : rec.match >= 50 ? "secondary" : "outline"}>
                            {rec.match}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                        {rec.reasons.length > 0 && (
                          <ul className="text-xs space-y-1 mt-2">
                            {rec.reasons.map((reason, idx) => (
                              <li key={idx} className="text-muted-foreground">
                                {reason}
                              </li>
                            ))}
                          </ul>
                        )}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {selectedStrategy && (
              <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-success-foreground mb-2">
                      {recommendations.find((r) => r.strategy === selectedStrategy)?.name} selected
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Focus on mastering this strategy through paper trading before going live.
                    </p>
                    <Button onClick={handleConfirmStrategy} className="w-full">
                      Confirm Strategy & Continue
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
