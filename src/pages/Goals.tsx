import { useState, useEffect } from "react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { Target } from "lucide-react";
import { ExpenseBaselineCard } from "@/components/goals/ExpenseBaselineCard";
import { GoalQuestionsCard } from "@/components/goals/GoalQuestionsCard";
import { RpicResultCard } from "@/components/goals/RpicResultCard";
import { TimelineCompareCards } from "@/components/goals/TimelineCompareCards";
import { VisualRoadmap } from "@/components/goals/VisualRoadmap";
import { AssumptionsPanel } from "@/components/goals/AssumptionsPanel";
import { RequiredCapitalTable } from "@/components/goals/RequiredCapitalTable";
import { ProjectionSettingsPanel } from "@/components/goals/ProjectionSettingsPanel";
import { ProjectionChart } from "@/components/goals/ProjectionChart";
import { ProjectionTable } from "@/components/goals/ProjectionTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

interface GoalsProps {
  onNavigateToTab?: (tabName: string) => void;
}

export default function Goals({ onNavigateToTab }: GoalsProps) {
  const { 
    snapshot, 
    dashboardData, 
    setRpicResult: saveRpicResult,
    projectionSettings,
    setProjectionSettings 
  } = useFinancialData();

  // Auto-populated expense baseline
  const autoMonthlyExpenses = dashboardData
    ? calculateMonthlyExpensesFromDashboard(dashboardData)
    : 5000;

  const autoStartingCapital = snapshot ? getStartingCapital(snapshot) : 10000;

  // State for user inputs
  const [confirmedExpenses, setConfirmedExpenses] = useState<number>(autoMonthlyExpenses);
  const [timing, setTiming] = useState<number>(10); // Years
  const [lifestyle, setLifestyle] = useState<number>(1.0);
  const [geography, setGeography] = useState<number>(1.0);
  const [inflationBuffer, setInflationBuffer] = useState<number>(1.15);
  const [activeReturn, setActiveReturn] = useState<number>(25);
  const [passiveYield, setPassiveYield] = useState<number>(13);
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
      timing,
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
    
    // Save to context for use in Investments
    saveRpicResult(rpic);
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
        {/* Page Description */}
        <div className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">RPIC Calculator</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What you'll find here:</strong> Calculate your <strong>Retirement Passive Income Capital (RPIC)</strong>—the 
                lump sum needed to generate your target monthly passive income. Answer 3 simple questions (timing, lifestyle, geography), 
                adjust assumptions (active/passive returns), and visualize your roadmap with milestones. See timelines for different 
                contribution levels and track your <strong>RPIC Index</strong> (current progress toward 120% of monthly expenses).
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Please complete Budget Analyzer first to calculate your RPIC target.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Description */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/20">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">RPIC Calculator <span className="text-xs text-muted-foreground font-normal ml-2">(calculated from your inputs)</span></h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>What you'll find here:</strong> Calculate your <strong>Retirement Passive Income Capital (RPIC)</strong>—the 
              lump sum needed to generate your target monthly passive income. Answer 3 simple questions (timing, lifestyle, geography), 
              adjust assumptions (active/passive returns), and visualize your roadmap with milestones. See timelines for different 
              contribution levels and track your <strong>RPIC Index</strong> (current progress toward 120% of monthly expenses).
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="compare">Compare Paths</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="projection">Projection</TabsTrigger>
        </TabsList>

        {/* TAB 1: Overview */}
        <TabsContent value="overview" className="space-y-6">
          <ExpenseBaselineCard
            autoMonthlyExpenses={autoMonthlyExpenses}
            onExpensesConfirmed={setConfirmedExpenses}
          />

          {rpicResult && (
            <RpicResultCard 
              rpic={rpicResult} 
              foundationScore={foundationScore}
              onNavigateToTab={onNavigateToTab}
            />
          )}
        </TabsContent>

        {/* TAB 2: Inputs */}
        <TabsContent value="inputs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left & Center: Input Forms */}
            <div className="lg:col-span-2 space-y-6">
              <GoalQuestionsCard
                timing={timing}
                lifestyle={lifestyle}
                geography={geography}
                onTimingChange={(value) => setTiming(typeof value === 'string' ? parseInt(value) : value)}
                onLifestyleChange={setLifestyle}
                onGeographyChange={setGeography}
              />

              {/* Timeline Inputs */}
              <Card>
                <CardHeader>
                  <CardTitle>Timeline Inputs</CardTitle>
                  <CardDescription>Adjust your starting capital and monthly contribution to see how it affects your timeline.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="startingCapital">Starting Capital</Label>
                    <Input
                      id="startingCapital"
                      type="number"
                      value={startingCapital}
                      onChange={(e) => setStartingCapital(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Sticky RPIC Target Summary */}
            <div className="lg:sticky lg:top-6 lg:h-fit">
              {rpicResult && (
                <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Your RPIC Target</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">RPIC Index</p>
                      <p className="text-2xl font-bold text-primary">{rpicResult.rpicIndex}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly RPIC</p>
                      <p className="text-xl font-semibold">${rpicResult.monthlyRpic.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Annual RPIC</p>
                      <p className="text-xl font-semibold">${rpicResult.annualRpic.toLocaleString()}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Required Capital</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Traditional (4%):</span>
                          <span className="font-medium">${rpicResult.targetCapitalPassive.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Wealth OS:</span>
                          <span className="font-medium text-primary">${rpicResult.targetCapitalActive.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* TAB 3: Compare Paths */}
        <TabsContent value="compare" className="space-y-6">
          {rpicResult && timelineResult && (
            <>
              <TimelineCompareCards
                timeline={timelineResult}
                startingCapital={startingCapital}
                monthlyContribution={monthlyContribution}
                onStartingCapitalChange={setStartingCapital}
                onMonthlyContributionChange={setMonthlyContribution}
              />

              <RequiredCapitalTable
                rpic={rpicResult}
                timeline={timelineResult}
                startingCapital={startingCapital}
              />
            </>
          )}
        </TabsContent>

        {/* TAB 4: Roadmap */}
        <TabsContent value="roadmap" className="space-y-6">
          {milestones.length > 0 && <VisualRoadmap milestones={milestones} />}

          <AssumptionsPanel
            activeReturn={activeReturn}
            passiveYield={passiveYield}
            inflation={inflation}
            onActiveReturnChange={setActiveReturn}
            onPassiveYieldChange={setPassiveYield}
            onInflationChange={setInflation}
            onReset={handleResetAssumptions}
          />
        </TabsContent>

        {/* TAB 5: Projection - Income Machine Calculator */}
        <TabsContent value="projection" className="space-y-6">
          {projectionSettings && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Settings Panel */}
                <ProjectionSettingsPanel
                  settings={projectionSettings}
                  onSettingsChange={setProjectionSettings}
                  autoMonthlyExpenses={autoMonthlyExpenses}
                />

                {/* Chart */}
                <ProjectionChart
                  settings={projectionSettings}
                  rows={[]} // Will be populated by calculateRows logic
                />
              </div>

              {/* Table */}
              <ProjectionTable
                settings={projectionSettings}
                onSettingsChange={setProjectionSettings}
              />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
