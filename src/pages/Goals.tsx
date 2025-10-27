import { useState, useEffect } from "react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { ExpenseBaselineCard } from "@/components/goals/ExpenseBaselineCard";
import { GoalQuestionsCard } from "@/components/goals/GoalQuestionsCard";
import { RpicResultCard } from "@/components/goals/RpicResultCard";
import { TimelineCompareCards } from "@/components/goals/TimelineCompareCards";
import { VisualRoadmap } from "@/components/goals/VisualRoadmap";
import { AssumptionsPanel } from "@/components/goals/AssumptionsPanel";
import { RequiredCapitalTable } from "@/components/goals/RequiredCapitalTable";
import {
  calculateMonthlyExpensesFromDashboard,
  getStartingCapital,
  calculateRpic,
  calculateTimeline,
  generateMilestones,
  type RpicInputs,
  type RpicResult,
  type TimelineResult,
  type Milestone,
} from "@/utils/rpicCalculations";
import { calculateReadinessScore } from "@/utils/investmentCalculations";

export default function Goals() {
  const { snapshot, dashboardData } = useFinancialData();

  // Auto-populated expense baseline
  const autoMonthlyExpenses = dashboardData
    ? calculateMonthlyExpensesFromDashboard(dashboardData)
    : 5000;

  const autoStartingCapital = snapshot ? getStartingCapital(snapshot) : 10000;

  // State for user inputs
  const [confirmedExpenses, setConfirmedExpenses] = useState<number>(autoMonthlyExpenses);
  const [timing, setTiming] = useState<string>("10y");
  const [lifestyle, setLifestyle] = useState<number>(1.0);
  const [geography, setGeography] = useState<number>(1.0);
  const [inflationBuffer, setInflationBuffer] = useState<number>(1.15);
  const [activeReturn, setActiveReturn] = useState<number>(25);
  const [passiveYield, setPassiveYield] = useState<number>(10);
  const [inflation, setInflation] = useState<number>(3);
  const [startingCapital, setStartingCapital] = useState<number>(autoStartingCapital);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);

  // Derived results
  const [rpicResult, setRpicResult] = useState<RpicResult | null>(null);
  const [timelineResult, setTimelineResult] = useState<TimelineResult | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [foundationScore, setFoundationScore] = useState<number | undefined>(undefined);

  // Calculate foundation score if data available
  useEffect(() => {
    if (snapshot) {
      const readiness = calculateReadinessScore(snapshot, 6);
      setFoundationScore(readiness.totalScore);
    }
  }, [snapshot]);

  // Recalculate whenever inputs change
  useEffect(() => {
    const inputs: RpicInputs = {
      currentMonthlyExpenses: confirmedExpenses,
      timing: timing as any,
      lifestyle,
      geography,
      inflationBuffer,
      activeReturn: activeReturn / 100,
      passiveYield: passiveYield / 100,
      inflation: inflation / 100,
      startingCapital,
      monthlyContribution,
    };

    const rpic = calculateRpic(inputs);
    const timeline = calculateTimeline(inputs, rpic);
    const milestonesData = generateMilestones(rpic, timeline, startingCapital);

    setRpicResult(rpic);
    setTimelineResult(timeline);
    setMilestones(milestonesData);
  }, [
    confirmedExpenses,
    timing,
    lifestyle,
    geography,
    inflationBuffer,
    activeReturn,
    passiveYield,
    inflation,
    startingCapital,
    monthlyContribution,
  ]);

  const handleResetAssumptions = () => {
    setActiveReturn(25);
    setPassiveYield(10);
    setInflation(3);
  };

  if (!dashboardData) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">RPIC Calculator</h1>
          <p className="text-muted-foreground">
            Please complete Budget Analyzer first to calculate your RPIC target.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Find Your RPIC</h1>
        <p className="text-muted-foreground">
          Your target monthly passive income. Goal-based. 3 questions. Clear roadmap.
        </p>
      </div>

      {/* Two-column layout for main inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Expense Baseline */}
        <ExpenseBaselineCard
          autoMonthlyExpenses={autoMonthlyExpenses}
          onExpensesConfirmed={setConfirmedExpenses}
        />

        {/* Right Column: RPIC Result */}
        {rpicResult && (
          <RpicResultCard rpic={rpicResult} foundationScore={foundationScore} />
        )}
      </div>

      {/* Full-width: Goal Questions */}
      <GoalQuestionsCard
        timing={timing}
        lifestyle={lifestyle}
        geography={geography}
        onTimingChange={setTiming}
        onLifestyleChange={setLifestyle}
        onGeographyChange={setGeography}
      />

      {/* Timeline Comparison */}
      {rpicResult && timelineResult && (
        <TimelineCompareCards
          timeline={timelineResult}
          startingCapital={startingCapital}
          monthlyContribution={monthlyContribution}
          onStartingCapitalChange={setStartingCapital}
          onMonthlyContributionChange={setMonthlyContribution}
        />
      )}

      {/* Visual Roadmap */}
      {milestones.length > 0 && <VisualRoadmap milestones={milestones} />}

      {/* Two-column layout for detailed results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Required Capital Table */}
        {rpicResult && timelineResult && (
          <RequiredCapitalTable
            rpic={rpicResult}
            timeline={timelineResult}
            startingCapital={startingCapital}
          />
        )}

        {/* Right: Assumptions Panel */}
        <AssumptionsPanel
          activeReturn={activeReturn}
          passiveYield={passiveYield}
          inflation={inflation}
          onActiveReturnChange={setActiveReturn}
          onPassiveYieldChange={setPassiveYield}
          onInflationChange={setInflation}
          onReset={handleResetAssumptions}
        />
      </div>
    </div>
  );
}
