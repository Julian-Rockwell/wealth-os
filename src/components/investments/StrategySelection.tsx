import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import type { TradingStrategy } from "@/types/trading";
import { useFinancialData } from "@/contexts/FinancialDataContext";

interface Question {
  id: string;
  question: string;
  options: { value: number; label: string }[];
}

const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: "capital",
    question: "How much capital do you have available for active trading? 💰",
    options: [
      { value: 1, label: "1 - Limited Capital (Under $10,000)" },
      { value: 2, label: "2 - Small Capital ($10,000 - $25,000)" },
      { value: 3, label: "3 - Moderate Capital ($25,000 - $50,000)" },
      { value: 4, label: "4 - Good Capital ($50,000 - $100,000)" },
      { value: 5, label: "5 - Substantial Capital (Over $100,000)" },
    ],
  },
  {
    id: "risk",
    question: "How comfortable are you with investment risk? ⚖️",
    options: [
      { value: 1, label: "1 - Very Conservative (5% drop = very concerned)" },
      { value: 2, label: "2 - Conservative (10% drop = uncomfortable but stay)" },
      { value: 3, label: "3 - Moderate Risk (15% drop = concerned but understand)" },
      { value: 4, label: "4 - Aggressive (20% drop = calm, look for opportunities)" },
      { value: 5, label: "5 - Very Aggressive (25% drop = buying opportunity)" },
    ],
  },
  {
    id: "time",
    question: "How much time can you dedicate to trading daily? ⏰",
    options: [
      { value: 1, label: "1 - Very Limited (Less than 30 min/day)" },
      { value: 2, label: "2 - Moderate (30-60 min/day)" },
      { value: 3, label: "3 - Good Availability (1-2 hours/day)" },
    ],
  },
  {
    id: "experience",
    question: "What's your trading and investing experience? 📚",
    options: [
      { value: 1, label: "🌱 1 - Complete Beginner (No trading experience)" },
      { value: 2, label: "🌿 2 - Novice (Some basic knowledge, limited experience)" },
      { value: 3, label: "🌳 3 - Intermediate (Moderate knowledge, some trades)" },
      { value: 4, label: "🌲 4 - Advanced (Strong knowledge, significant experience)" },
      { value: 5, label: "🏞️ 5 - Expert (Extensive knowledge, years of success)" },
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
  const { 
    setSelectedStrategy, 
    selectedStrategies, 
    setSelectedStrategies,
    strategyAssessmentAnswers,
    setStrategyAssessmentAnswers
  } = useFinancialData();
  
  const answers = {
    capital: strategyAssessmentAnswers.capital ? parseInt(strategyAssessmentAnswers.capital) : undefined,
    risk: strategyAssessmentAnswers.risk ? parseInt(strategyAssessmentAnswers.risk) : undefined,
    time: strategyAssessmentAnswers.time ? parseInt(strategyAssessmentAnswers.time) : undefined,
    experience: strategyAssessmentAnswers.experience ? parseInt(strategyAssessmentAnswers.experience) : undefined,
  };

  const handleAnswerChange = (questionId: string, value: number) => {
    setStrategyAssessmentAnswers({
      ...strategyAssessmentAnswers,
      [questionId]: value.toString()
    });
  };

  const allQuestionsAnswered = ASSESSMENT_QUESTIONS.every((q) => answers[q.id] !== undefined);

  const getRecommendations = (): StrategyRecommendation[] => {
    // Check if any questions have been answered
    const hasAnyAnswers = Object.values(answers).some(a => a !== undefined && a !== null);
    
    if (!hasAnyAnswers) {
      // Return all strategies with 0% match and placeholder message
      return [
        {
          strategy: "wheel",
          name: "Options Wheel",
          description: "Cash-secured puts and covered calls. Generate 1.5-3%/month.",
          match: 0,
          reasons: ["Answer assessment questions to see your match"]
        },
        {
          strategy: "mean_reversion_stocks",
          name: "Mean Reversion (Stocks)",
          description: "Hold positions 2-10 days. Capture short-term momentum.",
          match: 0,
          reasons: ["Answer assessment questions to see your match"]
        },
        {
          strategy: "earnings_vip",
          name: "Earnings VIP",
          description: "Event-driven options around earnings. Target high volatility.",
          match: 0,
          reasons: ["Answer assessment questions to see your match"]
        },
        {
          strategy: "dividend_capture",
          name: "Dividend Capture",
          description: "Event-driven stock strategies. Capture dividend payments.",
          match: 0,
          reasons: ["Answer assessment questions to see your match"]
        }
      ];
    }

    const capital = answers.capital || 3;
    const risk = answers.risk || 3;
    const time = answers.time || 2;
    const experience = answers.experience || 2;

    const recommendations: StrategyRecommendation[] = [];

    // Dividend Capture - best for conservative, low time, moderate capital
    const dcMatch =
      ((capital >= 2 ? 20 : 5) +
        (risk <= 2 ? 25 : risk === 3 ? 15 : 5) +
        (time <= 2 ? 25 : 10) +
        (experience >= 2 ? 20 : 10)) /
      0.9;
    recommendations.push({
      strategy: "dividend_capture",
      name: "Dividend Capture",
      description: "Event-driven stock strategies. Capture dividend payments.",
      match: Math.round(dcMatch),
      reasons: [
        capital >= 2 ? "✓ Capital level supports stock ownership" : "⚠ Requires at least $10K capital",
        risk <= 2 ? "✓ Matches your conservative risk profile" : "",
        time <= 2 ? "✓ Low time commitment fits your schedule" : "",
      ].filter(Boolean),
    });

    // Earnings VIP - balanced, defined risk, event-driven
    const evMatch =
      ((capital >= 1 ? 20 : 10) +
        (risk >= 2 && risk <= 4 ? 25 : 10) +
        (time >= 1 && time <= 2 ? 25 : 10) +
        (experience >= 2 ? 20 : 10)) /
      0.9;
    recommendations.push({
      strategy: "earnings_vip",
      name: "Earnings VIP",
      description: "Event-driven options around earnings. Target high volatility.",
      match: Math.round(evMatch),
      reasons: [
        capital >= 1 ? "✓ Works with your capital level" : "",
        risk >= 2 && risk <= 4 ? "✓ Moderate risk tolerance is ideal" : "",
        time <= 2 ? "✓ Time commitment matches your availability" : "",
        "✓ Event-driven approach limits exposure duration",
      ].filter(Boolean),
    });

    // Options Wheel - medium complexity, consistent income
    const owMatch =
      ((capital >= 3 ? 25 : capital === 2 ? 15 : 5) +
        (risk >= 2 && risk <= 4 ? 20 : 10) +
        (time >= 2 ? 20 : 10) +
        (experience >= 3 ? 25 : experience === 2 ? 15 : 5)) /
      0.9;
    recommendations.push({
      strategy: "wheel",
      name: "Options Wheel",
      description: "Sell cash-secured puts, get assigned, sell covered calls. Consistent income generation.",
      match: Math.round(owMatch),
      reasons: [
        capital >= 3 ? "✓ Capital level ideal for wheel strategy" : capital >= 2 ? "⚠ Minimum capital, consider smaller positions" : "⚠ Requires at least $10K",
        experience >= 3 ? "✓ Experience level supports this strategy" : experience === 2 ? "⚠ Consider paper trading first" : "⚠ Requires intermediate knowledge",
        risk >= 2 && risk <= 4 ? "✓ Risk profile is well-suited" : "",
      ].filter(Boolean),
    });

    // Mean Reversion Stocks - technical, medium term
    const mrMatch =
      ((capital >= 2 ? 20 : 10) +
        (risk >= 3 ? 25 : 10) +
        (time >= 2 ? 25 : 10) +
        (experience >= 3 ? 20 : 10)) /
      0.9;
    recommendations.push({
      strategy: "mean_reversion_stocks",
      name: "Mean Reversion (Stocks)",
      description: "Hold positions for 2-10 days. Technical analysis-based entries and exits.",
      match: Math.round(mrMatch),
      reasons: [
        capital >= 2 ? "✓ Capital supports positions" : "⚠ Limited capital for diversification",
        time >= 2 ? "✓ Your time availability supports monitoring" : "⚠ Requires regular market monitoring",
        experience >= 3 ? "✓ Experience level appropriate" : "⚠ Requires technical analysis skills",
      ].filter(Boolean),
    });

    return recommendations.sort((a, b) => b.match - a.match);
  };

  const handleConfirmStrategy = () => {
    if (selectedStrategies.length > 0) {
      // Pass the first selected strategy (primary strategy) and save it
      setSelectedStrategy(selectedStrategies[0]);
      onStrategyConfirmed(selectedStrategies[0]);
      toast.success(`${selectedStrategies.length} strategy(ies) confirmed! Proceed to Broker Setup.`);
    }
  };

  const handleToggleStrategy = (strategy: TradingStrategy) => {
    const newStrategies = selectedStrategies.includes(strategy)
      ? selectedStrategies.filter((s) => s !== strategy)
      : [...selectedStrategies, strategy];
    setSelectedStrategies(newStrategies);
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      {/* Confirmation Card - shown above when strategies are selected */}
      {selectedStrategies.length > 0 && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold mb-2">
                  {selectedStrategies.length} strateg{selectedStrategies.length > 1 ? 'ies' : 'y'} selected
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Selected: {selectedStrategies.map(s => recommendations.find(r => r.strategy === s)?.name).join(', ')}
                </p>
                <Button onClick={handleConfirmStrategy} className="w-full">
                  Confirm Strategy & Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Assessment Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Strategy Assessment <span className="text-xs text-muted-foreground font-normal ml-2">(calculated from assessment)</span>
            </CardTitle>
            <CardDescription>
              Answer 4 quick questions to get personalized strategy recommendations
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
          </CardContent>
        </Card>

        {/* Right column: Recommendations (always shown) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Recommended Strategies
            </CardTitle>
            <CardDescription>Based on your assessment, here are your best matches (sorted by fit)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec) => (
                  <div
                    key={rec.strategy}
                    className={`p-4 border rounded-lg transition-colors ${
                      selectedStrategies.includes(rec.strategy)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedStrategies.includes(rec.strategy)}
                        onCheckedChange={() => handleToggleStrategy(rec.strategy)}
                        id={rec.strategy}
                        className="mt-1"
                      />
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
              </CardContent>
            </Card>
      </div>
    </div>
  );
}
