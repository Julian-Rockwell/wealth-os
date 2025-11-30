import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, TrendingUp, Info, DollarSign, Gauge, Clock, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import type { TradingStrategy, StrategyMatchResult } from "@/types/trading";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { CANONICAL_STRATEGIES } from "@/constants/strategies";
import { calculateAllStrategyMatches, AssessmentAnswers } from "@/utils/strategyAlignmentMatrix";
import { useCallback } from "react";

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

const STRATEGY_SUBTITLES: Record<TradingStrategy, string> = {
  mean_reversion_stocks: "Buy oversold stocks; sell upon mean reversion.",
  dividend_capture: "Buy stock before ex-div; sell post price recovery.",
  wheel: "Sell Cash-Secured Puts & Covered Calls for income.",
  earnings_vip: "Capitalize on post-earnings volatility crush.",
  spy_bcs: "Sell credit spreads on SPY for consistent income.",
};

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

  const getRecommendations = useCallback((): StrategyMatchResult[] => {
    const { capital, risk, time, experience } = answers;
    
    // Solo calcular si HAY respuestas (no usar defaults)
    if (!capital || !risk || !time || !experience) {
      return CANONICAL_STRATEGIES.map(s => ({
        strategyId: s.id,
        matchPercent: 0,
        factorMatches: { capital: 0, risk: 0, dailyTime: 0, experience: 0 }
      }));
    }
    
    const assessmentAnswers: AssessmentAnswers = {
      capital,
      risk,
      time,
      experience
    };
    
    return calculateAllStrategyMatches(assessmentAnswers, false); // false = no SPY BCS
  }, [answers]);

  // Removed old recommendation logic - now using matrix-based calculation

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
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    {selectedStrategies.length} strateg{selectedStrategies.length > 1 ? 'ies' : 'y'} selected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedStrategies.map(s => {
                      const strategyInfo = CANONICAL_STRATEGIES.find(cs => cs.id === s);
                      return strategyInfo?.label || s;
                    }).join(', ')}
                  </p>
                </div>
              </div>
              <Button onClick={handleConfirmStrategy}>
                Confirm Strategy & Continue
              </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec) => {
                const isSelected = selectedStrategies.includes(rec.strategyId);
                const strategyInfo = CANONICAL_STRATEGIES.find(s => s.id === rec.strategyId);
                
                return (
                  <Card
                    key={rec.strategyId}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleToggleStrategy(rec.strategyId)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-2 flex-1">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleStrategy(rec.strategyId)}
                            id={rec.strategyId}
                            className="mt-0.5"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm leading-tight">
                              {strategyInfo?.label}
                            </h4>
                          </div>
                        </div>
                        <Badge 
                          variant={rec.matchPercent >= 70 ? "default" : rec.matchPercent >= 50 ? "secondary" : "outline"}
                          className="ml-2 flex-shrink-0"
                        >
                          {rec.matchPercent}% Match
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {STRATEGY_SUBTITLES[rec.strategyId]}
                      </p>
                      
                      {rec.matchPercent > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-muted-foreground">Capital</div>
                              <div className="text-sm font-semibold">{rec.factorMatches.capital}%</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-muted-foreground">Time</div>
                              <div className="text-sm font-semibold">{rec.factorMatches.dailyTime}%</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                            <Gauge className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-muted-foreground">Risk</div>
                              <div className="text-sm font-semibold">{rec.factorMatches.risk}%</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-muted-foreground">Exp</div>
                              <div className="text-sm font-semibold">{rec.factorMatches.experience}%</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground italic text-center py-4">
                          Answer all questions to see your match
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t">
              <Info className="h-3 w-3 flex-shrink-0" />
              <span>Based on Strategy Alignment matrix</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
