import { useState, useEffect, useMemo } from "react";
import { useFinancialData } from "@/contexts/FinancialDataContext";
import { Target, LayoutDashboard, Table2, MapPinned } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ExpenseBaselineCard } from "@/components/goals/ExpenseBaselineCard";
import { GoalQuestionsCard } from "@/components/goals/GoalQuestionsCard";
import { RpicResultCard } from "@/components/goals/RpicResultCard";
import { TimelineCompareCards } from "@/components/goals/TimelineCompareCards";
import { VisualRoadmap } from "@/components/goals/VisualRoadmap";
import { AssumptionsPanel } from "@/components/goals/AssumptionsPanel";
import { RequiredCapitalTable } from "@/components/goals/RequiredCapitalTable";
import { TwinEngineSettingsPanel } from "@/components/goals/TwinEngineSettingsPanel";
import { TwinEngineKPIHeader } from "@/components/goals/TwinEngineKPIHeader";
import { TwinEngineChart } from "@/components/goals/TwinEngineChart";
import { TwinEngineTable } from "@/components/goals/TwinEngineTable";
import { StrategicRoadmap } from "@/components/goals/StrategicRoadmap";
import { LifestyleRoadmapView } from "@/components/goals/LifestyleRoadmapView";
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
import { 
  calculateTwinEngineProjection, 
  calculateTwinEngineKPIs,
  type TwinEngineSettings 
} from "@/utils/twinEngineCalculations";

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

  // Projection view toggle state - now includes 'roadmap'
  const [projectionView, setProjectionView] = useState<'dashboard' | 'roadmap' | 'datagrid'>('dashboard');

  // Twin-Engine projection calculations
  const twinEngineResult = useMemo(() => {
    if (!projectionSettings) return null;
    return calculateTwinEngineProjection(projectionSettings);
  }, [projectionSettings]);

  const twinEngineKPIs = useMemo(() => {
    if (!twinEngineResult || !projectionSettings) return null;
    return calculateTwinEngineKPIs(twinEngineResult, projectionSettings);
  }, [twinEngineResult, projectionSettings]);

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
            {/* Left Column - Goal Questions */}
            <div className="lg:col-span-2 space-y-6">
              <GoalQuestionsCard
                timing={timing}
                lifestyle={lifestyle}
                geography={geography}
                onTimingChange={setTiming}
                onLifestyleChange={setLifestyle}
                onGeographyChange={setGeography}
              />

              {/* Starting Capital & Monthly Contribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Timeline Inputs</CardTitle>
                  <CardDescription>Set your starting capital and monthly contribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startingCapital">Starting Capital</Label>
                      <Input
                        id="startingCapital"
                        type="number"
                        value={startingCapital}
                        onChange={(e) => setStartingCapital(Number(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Auto-detected: ${autoStartingCapital.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sticky RPIC Summary */}
            <div className="lg:col-span-1">
              {rpicResult && (
                <Card className="sticky top-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">RPIC Target</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly RPIC</p>
                      <p className="text-2xl font-bold text-primary">${rpicResult.monthlyRpic.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Annual RPIC</p>
                      <p className="text-xl font-semibold">${rpicResult.annualRpic.toLocaleString()}</p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">Target Capital Required</p>
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Traditional:</span>
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

        {/* TAB 5: Projection - Twin-Engine Goal Simulator */}
        <TabsContent value="projection" className="space-y-6">
          {projectionSettings && twinEngineResult && twinEngineKPIs && (
            <>
              {/* KPI Header */}
              <TwinEngineKPIHeader kpis={twinEngineKPIs} />

              {/* Settings + Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Settings Panel - Always visible */}
                <div className="lg:col-span-1">
                  <TwinEngineSettingsPanel
                    settings={projectionSettings}
                    onSettingsChange={setProjectionSettings}
                  />
                </div>

                {/* Right Column - Toggle between Dashboard, Roadmap, and Data Grid */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Toggle Buttons - Now with 3 options */}
                  <div className="flex justify-start">
                    <ToggleGroup 
                      type="single" 
                      value={projectionView} 
                      onValueChange={(v) => v && setProjectionView(v as 'dashboard' | 'roadmap' | 'datagrid')}
                      className="bg-muted p-1 rounded-lg"
                    >
                      <ToggleGroupItem 
                        value="dashboard" 
                        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-4 py-2 rounded-md"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </ToggleGroupItem>
                      <ToggleGroupItem 
                        value="roadmap" 
                        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-4 py-2 rounded-md"
                      >
                        <MapPinned className="w-4 h-4 mr-2" />
                        Lifestyle Roadmap
                      </ToggleGroupItem>
                      <ToggleGroupItem 
                        value="datagrid" 
                        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-4 py-2 rounded-md"
                      >
                        <Table2 className="w-4 h-4 mr-2" />
                        Data Grid
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  {/* Conditional Content */}
                  {projectionView === 'dashboard' && (
                    <>
                      {/* Chart */}
                      <TwinEngineChart 
                        data={twinEngineResult.rows}
                        milestones={twinEngineResult.milestones}
                        settings={projectionSettings}
                      />
                      {/* Strategic Roadmap */}
                      <StrategicRoadmap 
                        milestones={twinEngineResult.milestones}
                        settings={projectionSettings}
                      />
                    </>
                  )}
                  
                  {projectionView === 'roadmap' && (
                    <LifestyleRoadmapView 
                      milestones={twinEngineResult.milestones}
                      settings={projectionSettings}
                      onSettingsChange={(updates) => setProjectionSettings({ ...projectionSettings, ...updates })}
                    />
                  )}
                  
                  {projectionView === 'datagrid' && (
                    <TwinEngineTable 
                      data={twinEngineResult.rows}
                      settings={projectionSettings}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
