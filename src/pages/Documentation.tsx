import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";

const Documentation = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Print/Download controls - hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">System Documentation</h1>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print / Save as PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Documentation content */}
      <div className="container max-w-4xl py-8 prose prose-slate dark:prose-invert max-w-none">
        {/* Cover Page */}
        <div className="text-center mb-16 page-break-after">
          <h1 className="text-5xl font-bold mb-4">Rockwell Wealth OS</h1>
          <h2 className="text-3xl text-muted-foreground mb-8">Technical System Documentation</h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive Personal Financial Management Platform
          </p>
          <div className="mt-16">
            <p className="text-sm text-muted-foreground">Version 1.0</p>
            <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 page-break-after">
          <h2 className="text-3xl font-bold mb-6">Table of Contents</h2>
          <nav className="space-y-2">
            <a href="#overview" className="block text-primary hover:underline">1. System Overview</a>
            <a href="#architecture" className="block text-primary hover:underline ml-4">1.1 Architecture and Data Flow</a>
            <a href="#tech-stack" className="block text-primary hover:underline ml-4">1.2 Technology Stack</a>
            <a href="#data-sources" className="block text-primary hover:underline ml-4">1.3 Data Sources & Calculation Logic</a>
            <a href="#command-center" className="block text-primary hover:underline">2. Command Center - Data Ingestion</a>
            <a href="#dashboard" className="block text-primary hover:underline">3. Dashboard - Net Worth Overview</a>
            <a href="#budget" className="block text-primary hover:underline">4. Budget Analyzer - 50/30/20 Analysis</a>
            <a href="#classification" className="block text-primary hover:underline ml-4">4.1 Transaction Classification System</a>
            <a href="#calculation" className="block text-primary hover:underline ml-4">4.2 50/30/20 Calculation Flow</a>
            <a href="#visualizations" className="block text-primary hover:underline ml-4">4.3 Visualizations and Components</a>
            <a href="#data-labeling" className="block text-primary hover:underline ml-4">4.4 Data Labeling System</a>
            <a href="#investments" className="block text-primary hover:underline">5. Investment Planning - Active Investment Readiness</a>
            <a href="#investments" className="block text-primary hover:underline ml-4">5.1 Strategy Assessment (Updated)</a>
            <a href="#investments" className="block text-primary hover:underline ml-4">5.2 Broker Setup Wizard (NEW)</a>
            <a href="#investments" className="block text-primary hover:underline ml-4">5.3 Readiness Score (Enhanced)</a>
            <a href="#investments" className="block text-primary hover:underline ml-4">5.4 Paper Trading</a>
            <a href="#investments" className="block text-primary hover:underline ml-4">5.5 Accessibility & Warnings (NEW)</a>
            <a href="#goals" className="block text-primary hover:underline">6. Goals - RPIC Calculator</a>
            <a href="#six-month-plan" className="block text-primary hover:underline">7. Six-Month Foundation Plan Generator</a>
            <a href="#six-month-plan" className="block text-primary hover:underline ml-4">7.1 Overview</a>
            <a href="#six-month-plan" className="block text-primary hover:underline ml-4">7.2 Plan Inputs</a>
            <a href="#six-month-plan" className="block text-primary hover:underline ml-4">7.3 Plan Generation Algorithm</a>
            <a href="#six-month-plan" className="block text-primary hover:underline ml-4">7.4 UI Component (SixMonthPlanDialog)</a>
            <a href="#six-month-plan" className="block text-primary hover:underline ml-4">7.5 Trigger Button Logic (Smart Navigation)</a>
            <a href="#six-month-plan" className="block text-primary hover:underline ml-4">7.6 Limitations & Future Enhancements</a>
            <a href="#twin-engine" className="block text-primary hover:underline">8. Twin-Engine Projection Model</a>
            <a href="#twin-engine" className="block text-primary hover:underline ml-4">8.1 Overview & Conceptual Model</a>
            <a href="#twin-engine" className="block text-primary hover:underline ml-4">8.2 Input Settings (TwinEngineSettings)</a>
            <a href="#twin-engine" className="block text-primary hover:underline ml-4">8.3 Calculation Algorithm</a>
            <a href="#twin-engine" className="block text-primary hover:underline ml-4">8.4 Output Data (TwinEngineRow)</a>
            <a href="#twin-engine" className="block text-primary hover:underline ml-4">8.5 Milestones Tracking</a>
            <a href="#twin-engine" className="block text-primary hover:underline ml-4">8.6 KPI Calculations</a>
            <a href="#twin-engine" className="block text-primary hover:underline ml-4">8.7 Lifestyle Design</a>
            <a href="#formulas" className="block text-primary hover:underline">9. Key Calculations and Formulas</a>
            <a href="#formulas" className="block text-primary hover:underline ml-4">9.1 Transaction Classification (Complete)</a>
            <a href="#formulas" className="block text-primary hover:underline ml-4">9.2 Readiness Score Factors (Detailed)</a>
            <a href="#formulas" className="block text-primary hover:underline ml-4">9.3 RPIC Calculations (Complete)</a>
            <a href="#formulas" className="block text-primary hover:underline ml-4">9.4 Six-Month Plan Formulas (Summary)</a>
            <a href="#formulas" className="block text-primary hover:underline ml-4">9.5 Capital Allocation Waterfall</a>
            <a href="#user-flow" className="block text-primary hover:underline">10. Typical User Flow</a>
            <a href="#glossary" className="block text-primary hover:underline">11. Glossary of Terms</a>
            <a href="/angular-migration" className="block text-primary hover:underline font-semibold mt-4">📄 Angular Migration Guide (Separate Document)</a>
          </nav>
        </div>

        {/* 1. System Overview */}
        <section id="overview" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">1. System Overview</h2>
          
          <h3 className="text-2xl font-semibold mb-4">Purpose</h3>
          <p className="mb-4">
            Rockwell Wealth OS is a comprehensive personal financial management platform designed to help users:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Visualize and analyze their consolidated net worth</li>
            <li>Evaluate and optimize their budget using the 50/30/20 rule</li>
            <li>Plan and prepare for active investments</li>
            <li>Calculate financial independence goals (RPIC)</li>
            <li>Make informed financial decisions based on real data</li>
          </ul>

          <h3 id="architecture" className="text-2xl font-semibold mb-4">1.1 Architecture and Data Flow</h3>
          <p className="mb-4">
            The system uses a centralized context architecture (<code>FinancialDataContext</code>) that manages all financial state of the application:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>FinancialSnapshot</strong>: Complete user data (assets, liabilities, transactions)</li>
            <li><strong>DashboardData</strong>: Processed data for dashboard visualizations</li>
            <li><strong>PaperTradingProgress</strong>: Paper trading progress state</li>
            <li><strong>RpicResult</strong>: RPIC calculation results</li>
          </ul>
          <p className="mb-4">
            Data is persisted locally using <code>localStorage</code> and shared across all modules via React Context API.
          </p>

          <h3 id="tech-stack" className="text-2xl font-semibold mb-4">1.2 Technology Stack</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Frontend Core</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>React 18</strong>: UI library with hooks and functional components</li>
              <li><strong>TypeScript</strong>: Static typing for enhanced safety</li>
              <li><strong>Vite</strong>: Modern and fast build tool</li>
              <li><strong>React Router v6</strong>: Page navigation</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">State and Data</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Context API</strong>: Global state management</li>
              <li><strong>localStorage</strong>: Client-side data persistence</li>
              <li><strong>React Hooks</strong>: useState, useEffect, useContext, useMemo</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">UI/UX</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Tailwind CSS</strong>: CSS utility framework</li>
              <li><strong>shadcn/ui</strong>: Accessible and customizable UI components</li>
              <li><strong>Radix UI</strong>: Unstyled component primitives</li>
              <li><strong>Lucide React</strong>: Modern icons</li>
              <li><strong>Recharts</strong>: Charts and data visualizations</li>
            </ul>
          </div>
        </section>

        {/* 1.3 Data Sources & Calculation Logic */}
        <section id="data-sources" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">1.3 Data Sources & Calculation Logic</h2>
          <p className="mb-4">
            The application uses three distinct types of data throughout its components. Understanding this distinction is critical for evaluating prototype completeness:
          </p>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">1.3.1 Real Calculations (Calculated from User Data)</h3>
            <p className="mb-4">
              These values are dynamically computed from uploaded transactions, holdings, liabilities, and user inputs. They reflect actual financial state:
            </p>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3">Dashboard Calculations</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Net Worth</strong>: Sum of all holdings.balance - Sum of all liabilities.balance</li>
                <li><strong>Liquid Assets</strong>: Sum of holdings where liquidity = "liquid" (checking, savings, money market)</li>
                <li><strong>Income & Expenses</strong>: Calculated from transactions using <code className="bg-muted px-1 py-0.5 rounded">classifyTransactions()</code></li>
                <li><strong>Unspent Income</strong>: Total Income - Total Expenses for selected period</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3">Budget Analyzer Calculations</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>50/30/20 Breakdown</strong>: Transactions classified into needs/wants/savings categories</li>
                <li><strong>Monthly Trends</strong>: Aggregated transaction totals grouped by month and category</li>
                <li><strong>Budget Donut</strong>: Percentage distribution calculated from classified expense transactions</li>
              </ul>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
                <p className="mb-2"><strong>Transaction Classification Algorithm:</strong></p>
                <code className="block whitespace-pre-wrap">
{`// Filter valid income (credits > $100, excluding transfers)
const isValidIncome = (txn: Transaction) => 
  txn.sign === "credit" && 
  txn.amount > 100 && 
  !txn.desc.toLowerCase().includes("transfer");

// Map subcategory to needs/wants/savings
const mapSubcategoryToCategory = (sub: string) => {
  const needsKeywords = ["groceries", "utilities", "rent", "mortgage", "insurance", "healthcare"];
  const savingsKeywords = ["savings", "investment", "401k", "ira", "retirement"];
  // Default to "want" if not matched
};`}
                </code>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3">Readiness Score Calculations</h4>
              <p className="mb-2">Five factors scored 0-100, weighted equally (20% each):</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
                <code className="block whitespace-pre-wrap">
{`// 1. Emergency Fund Coverage (20%)
const efMonths = liquidAssets / monthlyExpenses;
const efScore = Math.min(efMonths / targetMonths, 1) * 100;

// 2. High-Interest Debt (20%)
const highAprDebt = liabilities.filter(l => l.apr > 7);
const debtScore = highAprDebt.length === 0 ? 100 : 
  Math.max(0, 100 - (totalHighAprDebt / netWorth * 100));

// 3. Income Stability (20%)
const incomeCV = stdDev(monthlyIncomes) / mean(monthlyIncomes);
const stabilityScore = Math.max(0, 100 - (incomeCV * 100));

// 4. Monthly Cash Flow (20%)
const cashFlowRatio = monthlyCashFlow / monthlyExpenses;
const cashFlowScore = Math.min(cashFlowRatio * 50, 100);

// 5. Capital Availability (20%)
const availableCapital = liquidAssets - (emergencyFund + nearTermGoals);
const capitalScore = Math.min(availableCapital / 10000, 1) * 100;

// Total Score
const readinessScore = (efScore + debtScore + stabilityScore + cashFlowScore + capitalScore) / 5;`}
                </code>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3">RPIC Calculations (Goals)</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Monthly RPIC</strong>: (R + P + I + C) / 12</li>
                <li><strong>Required Capital</strong>: Sum of retirement, personal goals, insurance needs, cushion fund</li>
                <li><strong>Timeline</strong>: Years to goal calculated from current savings + projected contributions</li>
              </ul>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
                <code className="block whitespace-pre-wrap">
{`// RPIC Formula
const rpicMonthly = (
  retirementAnnual + 
  personalGoalsAnnual + 
  insuranceAnnual + 
  cushionAnnual
) / 12;

// Timeline Calculation
const yearsToGoal = (requiredCapital - currentSavings) / 
  (monthlyContribution * 12 + expectedAnnualReturn);`}
                </code>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3">Six-Month Plan Calculations</h4>
              <p className="mb-2">Client-side algorithm generates actionable monthly tasks:</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
                <code className="block whitespace-pre-wrap">
{`// Emergency Fund Gap Filling
const efGap = emergencyFundReq - liquidAssets;
const monthlyEfContribution = efGap / 6;

// Debt Payoff (Avalanche Method - Highest APR First)
const highestAprDebt = debts.sort((a, b) => b.apr - a.apr)[0];
const extraPayment = cashFlowMonthly * 0.3; // 30% of surplus

// Expense Reduction Templates
const expenseCuts = {
  month1: { type: "subscriptions", estSave: 50-150 },
  month2: { type: "utilities", estSave: 30-80 },
  month3: { type: "groceries", estSave: 100-200 }
};

// Income Boost Templates
const incomeBoosts = {
  month3: { type: "freelance", estRange: [200, 800] },
  month4: { type: "salary_negotiation", estRange: [0, 500] }
};`}
                </code>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">1.3.2 Fixed/Mock Data (Prototype Placeholders)</h3>
            <p className="mb-4">
              These components display hardcoded example data and are labeled with <span className="text-xs text-muted-foreground">(fixed examples)</span>:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Connection Status</strong>: Shows 3 mock connected accounts (Chase, Vanguard, Amex)</li>
              <li><strong>Personalized Recommendations</strong>: 3 hardcoded quick wins with estimated savings</li>
              <li><strong>Paper Trading Progress</strong>: Mock 40 trades with 95% adherence rate</li>
              <li><strong>Action Plan (Goals)</strong>: Static list of 5 recommended actions</li>
              <li><strong>Key Insights</strong>: Templated insight cards with placeholder metrics</li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm">
                <strong>Note:</strong> These components require backend integration or AI processing in production. They are intentionally static for prototype demonstration.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">1.3.3 User-Editable Data (Persisted State)</h3>
            <p className="mb-4">
              These values are set by users and persist across sessions via localStorage:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Monthly Income</strong>: User-edited value in Unspent Income card (overrides calculated average)</li>
              <li><strong>Strategy Assessment Answers</strong>: 4 questions about capital, risk, time, experience</li>
              <li><strong>Selected Strategies</strong>: User-chosen trading strategies (multi-select enabled)</li>
              <li><strong>Broker Setup Progress</strong>: Wizard step, chosen broker, account type, options level, completion flags</li>
              <li><strong>Emergency Fund Months</strong>: Target months of expenses for emergency fund (default 6)</li>
              <li><strong>Six-Month Plan</strong>: Generated plan data including tasks, KPIs, rollup summary</li>
            </ul>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <p className="text-sm">
                <strong>Persistence Mechanism:</strong> All editable data is stored in FinancialDataContext and synced to localStorage. Changes persist across page refreshes and tab navigation.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">Data Labeling System</h3>
            <p className="mb-4">
              Throughout the UI, data labels indicate the source of displayed values:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><code className="bg-muted px-2 py-1 rounded text-xs">(fixed examples)</code> - Mock/hardcoded data</li>
              <li><code className="bg-muted px-2 py-1 rounded text-xs">(calculated from snapshot)</code> - Derived from holdings/liabilities</li>
              <li><code className="bg-muted px-2 py-1 rounded text-xs">(calculated from transactions)</code> - Derived from transaction history</li>
              <li><code className="bg-muted px-2 py-1 rounded text-xs">(calculated from your inputs)</code> - Based on user-entered values</li>
              <li><code className="bg-muted px-2 py-1 rounded text-xs">(progress from wizard)</code> - Tracked via Broker Setup wizard</li>
              <li><code className="bg-muted px-2 py-1 rounded text-xs">(strange calculation)</code> - Complex logic requiring refinement</li>
            </ul>
          </div>
        </section>

        {/* 2. Command Center */}
        <section id="command-center" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">2. Command Center - Data Ingestion</h2>
          <p className="mb-4">
            The Command Center is the entry point for loading financial data into the system. It supports multiple ingestion methods:
          </p>

          <h3 className="text-2xl font-semibold mb-4">Ingestion Methods</h3>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">1. Sample Data</h4>
            <p className="mb-2">Loads predefined demo data to explore the system.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Realistic synthetic data for accounts, investments, and transactions</li>
              <li>Useful for demos and testing</li>
              <li>Location: <code>src/utils/sampleData.ts</code></li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">2. Mock Connect</h4>
            <p className="mb-2">Simulates a connection to financial institutions.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Generates random data from multiple accounts</li>
              <li>Includes checking, savings, credit cards, loans, investments</li>
              <li>Transactions from the last 90 days</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">3. Upload Files (PDF/CSV/XLSX)</h4>
            <p className="mb-2">Allows uploading account statements in multiple formats.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>PDF</strong>: Text extraction with format validation</li>
              <li><strong>CSV</strong>: Direct parsing with automatic column detection</li>
              <li><strong>XLSX</strong>: Excel spreadsheet reading</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">4. Manual Entry</h4>
            <p className="mb-2">Form to manually input data.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Validated fields for accounts, balances, and transactions</li>
              <li>Useful for adjustments or data from non-digital sources</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Data Validation</h3>
          <p className="mb-4">
            All entered data goes through validation:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Data type verification (numbers, dates, strings)</li>
            <li>Range validation (positive/negative balances by type)</li>
            <li>Duplicate detection by unique ID</li>
            <li>Error notifications with toast messages</li>
          </ul>
        </section>

        {/* 3. Dashboard */}
        <section id="dashboard" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">3. Dashboard - Net Worth Overview</h2>
          <p className="mb-4">
            The Dashboard provides a consolidated view of the user's net worth, breaking down assets by class and liquidity.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Main Calculations</h3>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Net Worth</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Net Worth = Total Assets - Total Liabilities</code>
            </div>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Total Assets includes: cash, investments, properties, other assets</li>
              <li>Total Liabilities includes: mortgages, loans, credit cards, other debts</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Liquid Assets</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Liquid Assets = Cash + Investments (stocks, bonds, mutual funds, ETFs)</code>
            </div>
            <p className="mb-4">Assets that can be quickly converted to cash without significant loss of value.</p>

            <h4 className="text-xl font-semibold mb-3">Emergency Fund</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Emergency Fund = Liquid Assets × 0.30</code>
            </div>
            <p className="mb-4">30% of liquid assets is reserved as an emergency fund (3-6 months of expenses).</p>

            <h4 className="text-xl font-semibold mb-3">Available to Invest</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Available to Invest = Liquid Assets - Emergency Fund</code>
            </div>
            <p className="mb-4">Capital available for investments after securing the emergency fund.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Visual Components</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Asset Allocation View</strong>: Pie chart showing asset distribution</li>
            <li><strong>Holdings Table</strong>: Detailed table of all accounts and investments</li>
            <li><strong>Liabilities Table</strong>: Table of all debts and liabilities</li>
            <li><strong>KPI Panel</strong>: Cards with key metrics (Net Worth, Liquid Assets, etc.)</li>
          </ul>
        </section>

        {/* 4. Budget Analyzer */}
        <section id="budget" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">4. Budget Analyzer - 50/30/20 Analysis</h2>
          <p className="mb-4">
            The Budget Analyzer evaluates the user's financial health by applying the 50/30/20 rule:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>50% Needs</strong>: Essential expenses (housing, food, transportation, utilities)</li>
            <li><strong>30% Wants</strong>: Discretionary spending (entertainment, shopping, hobbies)</li>
            <li><strong>20% Savings</strong>: Investments, debt payments, emergency funds</li>
          </ul>

          <h3 id="classification" className="text-2xl font-semibold mb-4">4.1 Transaction Classification System</h3>
          <p className="mb-4">
            The system uses an automatic classifier (<code>transactionClassifier.ts</code>) that categorizes each transaction based on keywords and patterns. The classification process has two main stages: income filtering and expense categorization.
          </p>

          <h4 className="text-xl font-semibold mb-3">Complete Classification Algorithm</h4>
          <p className="mb-4">
            The <code>classifyTransactions()</code> function in <code>src/utils/transactionClassifier.ts</code> implements the full classification pipeline:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`export function classifyTransactions(txns: StagingTransaction[]) {
  // Step 1: Filter valid operational income
  const validIncome = txns.filter(txn => 
    txn.sign === "credit" && isValidIncome(txn)
  );
  
  // Step 2: Filter operational expenses (debits only)
  const operationalExpenses = txns.filter(txn => 
    txn.sign === "debit" && !isTransferOrRefund(txn)
  );
  
  // Step 3: Classify expenses into needs/wants/savings
  const classified = operationalExpenses.map(txn => ({
    ...txn,
    category: mapSubcategoryToCategory(txn.subcategory),
  }));
  
  return { validIncome, classified };
}`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Income Filtering: isValidIncome()</h4>
          <p className="mb-4">
            The <code>isValidIncome()</code> function identifies real operational income by excluding non-income credits:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`function isValidIncome(txn: StagingTransaction): boolean {
  const desc = txn.desc.toLowerCase();
  const amount = txn.amount;
  
  // Exclude transfers between accounts
  const transferKeywords = ["transfer", "xfer", "payment from"];
  if (transferKeywords.some(kw => desc.includes(kw))) return false;
  
  // Exclude credit card payments and refunds
  const nonIncomeKeywords = ["credit card", "cc payment", "refund", "return"];
  if (nonIncomeKeywords.some(kw => desc.includes(kw))) return false;
  
  // Exclude small amounts (likely fees or adjustments)
  if (amount < 100) return false;
  
  // Valid income keywords
  const incomeKeywords = [
    "payroll", "salary", "direct deposit", "dd",
    "dividend", "interest", "distribution",
    "freelance", "gig", "1099", "consulting"
  ];
  
  return incomeKeywords.some(kw => desc.includes(kw)) || amount > 1000;
}`}
            </code>
          </div>
          <div className="mb-6">
            <p className="font-semibold mb-2">Valid Income Examples (INCLUDED):</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Payroll / Direct Deposit / Salary</li>
              <li>Investment Income (dividends, interest, distributions)</li>
              <li>Freelance / Gig Work / Consulting Income (1099)</li>
              <li>Large credits over $1,000 (likely income even without keywords)</li>
            </ul>
            <p className="font-semibold mb-2">Excluded Movements (NOT INCOME):</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Internal Transfers ("transfer", "xfer", "payment from")</li>
              <li>Credit Card Payments ("cc payment", "credit card")</li>
              <li>Refunds / Returns ("refund", "return")</li>
              <li>Small amounts under $100 (fees, adjustments)</li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold mb-3">Expense Classification: mapSubcategoryToCategory()</h4>
          <p className="mb-4">
            The <code>mapSubcategoryToCategory()</code> function maps transaction subcategories to the 50/30/20 framework:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`function mapSubcategoryToCategory(subcategory: string): TransactionCategory {
  const needsSubcategories = [
    "housing", "utilities", "internet", "phone",
    "groceries", "food_delivery",
    "gas", "public_transit", "car_maintenance", "parking", "tolls",
    "insurance", "healthcare", "pharmacy", "medical",
    "childcare", "education", "tuition",
    "minimum_debt_payment"
  ];
  
  const savingsSubcategories = [
    "investment", "brokerage", "retirement_contribution",
    "savings_transfer", "extra_debt_payment", "emergency_fund"
  ];
  
  if (needsSubcategories.includes(subcategory)) return "need";
  if (savingsSubcategories.includes(subcategory)) return "saving";
  return "want"; // Default: everything else is a want
}`}
            </code>
          </div>
          <div className="mb-4">
            <p className="font-semibold mb-2">Needs (50%) - Essential Expenses:</p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li><strong>Housing & Utilities:</strong> housing, utilities, internet, phone</li>
              <li><strong>Food:</strong> groceries, food_delivery</li>
              <li><strong>Transportation:</strong> gas, public_transit, car_maintenance, parking, tolls</li>
              <li><strong>Insurance & Healthcare:</strong> insurance, healthcare, pharmacy, medical</li>
              <li><strong>Education:</strong> childcare, education, tuition</li>
              <li><strong>Minimum Debt:</strong> minimum_debt_payment</li>
            </ul>

            <p className="font-semibold mb-2">Wants (30%) - Discretionary Spending:</p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li><strong>Dining & Entertainment:</strong> restaurants, bars, coffee_shops, entertainment, streaming, subscriptions</li>
              <li><strong>Shopping:</strong> shopping, clothing, personal_care</li>
              <li><strong>Travel:</strong> travel, vacation, hotels</li>
              <li><strong>Hobbies:</strong> hobbies, sports, gym_membership</li>
              <li><strong>Other:</strong> pet_care (non-essential), any uncategorized expenses</li>
            </ul>

            <p className="font-semibold mb-2">Savings (20%) - Wealth Building:</p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li><strong>Investments:</strong> investment, brokerage, retirement_contribution</li>
              <li><strong>Savings:</strong> savings_transfer, emergency_fund</li>
              <li><strong>Debt Payoff:</strong> extra_debt_payment (above minimum)</li>
            </ul>
          </div>

          <h3 id="calculation" className="text-2xl font-semibold mb-4 page-break-before">4.2 50/30/20 Calculation Flow</h3>
          <p className="mb-4">
            The calculation is performed in the <code>BudgetDonut.tsx</code> component following these steps:
          </p>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Step 1: Period Filtering</h4>
            <p className="mb-2">Transactions are filtered by the selected period (30, 60, or 90 days).</p>

            <h4 className="text-xl font-semibold mb-3">Step 2: Operational Classification</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>filterOperationalTransactions(filteredTransactions)</code>
            </div>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Separates debits (expenses) and credits (income)</li>
              <li>Applies <code>isValidIncome()</code> to filter only real income</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Step 3: Real Net Income Calculation</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>totalIncome = sum(operationalCredits.map(txn =&gt; txn.amount))</code>
            </div>
            <p className="mb-4">If <code>totalIncome &lt; $500</code>, an insufficient income warning is displayed.</p>

            <h4 className="text-xl font-semibold mb-3">Step 4: Expense Classification</h4>
            <p className="mb-2">Operational debits are categorized:</p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`needs = sum(expenses where category === "need")
wants = sum(expenses where category === "want")
savings = sum(expenses where category === "saving")`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Step 5: Percentage Calculation</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`needsPct = (needs / totalIncome) × 100
wantsPct = (wants / totalIncome) × 100
savingsPct = (savings / totalIncome) × 100`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Step 6: 50/30/20 Validation</h4>
            <p className="mb-2">The <code>validate50_30_20()</code> function verifies:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Needs ≤ 50%</li>
              <li>Wants ≤ 30%</li>
              <li>Savings ≥ 20%</li>
            </ul>
            <p className="mb-4">Generates specific alerts if targets are not met.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Correction: Average Monthly Income</h3>
          <p className="mb-4">
            In <code>useDashboardData.ts</code>, the <code>avgIncomeAmount</code> calculation was corrected:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <code className="text-sm">
              {`// BEFORE (INCORRECT): divided by number of transactions
avgIncomeAmount = totalValidIncome / validIncomeTransactions.length

// NOW (CORRECT): divides by number of months in period
avgIncomeAmount = totalValidIncome / period.months`}
            </code>
          </div>

          <h3 id="visualizations" className="text-2xl font-semibold mb-4 page-break-before">4.3 Visualizations and Components</h3>
          
          <h4 className="text-xl font-semibold mb-3">BudgetDonut</h4>
          <p className="mb-4">
            Circular donut chart showing 50/30/20 distribution with:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Conic gradient with differentiated colors by category</li>
            <li>Percentages and amounts for each category</li>
            <li>Visual compliance indicators (✓ or ⚠)</li>
            <li>Explanatory tooltip of the 50/30/20 rule</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">MonthlyStackedBars</h4>
          <p className="mb-4">
            Stacked bar chart showing monthly evolution of:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Needs (green)</li>
            <li>Wants (blue)</li>
            <li>Savings (purple)</li>
            <li>Includes <strong>InfoTooltip</strong> explaining what "Monthly Breakdown" is</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">KeyInsights</h4>
          <p className="mb-4">
            Insight cards highlighting:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Positive Trend</strong>: Favorable budget trends (with explanatory <strong>InfoTooltip</strong>)</li>
            <li><strong>Red Flag</strong>: Excessive spending alerts (with explanatory <strong>InfoTooltip</strong>)</li>
            <li><strong>Quick Win</strong>: Immediate savings opportunities</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">TransactionsList / TransactionsTable</h4>
          <p className="mb-4">
            Detailed list/table of all transactions with filters:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Date Range</strong>: Custom date range</li>
            <li><strong>Type</strong>: Income, Expense, Transfer</li>
            <li><strong>Category</strong>: Need, Want, Saving</li>
            <li><strong>Subcategory</strong>: housing, groceries, transportation, healthcare, etc. (new filter added)</li>
            <li><strong>Account</strong>: Filter by specific account</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">FiltersCard</h4>
          <p className="mb-4">
            Updated filters panel with the new <strong>Subcategory</strong> filter that allows viewing specific transactions such as:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Groceries</li>
            <li>Transportation</li>
            <li>Healthcare</li>
            <li>Housing</li>
            <li>And many more subcategories...</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">UnspentIncomeCard</h4>
          <p className="mb-4">
            Displays income that was not allocated to expenses during the selected period:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <code className="text-sm">
              Unspent Income = Total Income - Total Expenses
            </code>
          </div>
          <p className="mb-4">
            <strong>Note:</strong> This card displays "(strange calculation)" as a label to indicate that the calculation methodology for unspent income differs from traditional approaches and may require further refinement or clarification in future iterations.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Shows the difference between income and expenses for the period</li>
            <li>Indicates available surplus for additional savings or investments</li>
            <li>Updates dynamically based on selected time period (30, 60, or 90 days)</li>
          </ul>

          <h3 id="data-labeling" className="text-2xl font-semibold mb-4 mt-8">4.4 Data Labeling System</h3>
          <p className="mb-4">
            Throughout the Budget Analyzer (and entire application), small labels indicate the data source and calculation methodology. This transparency helps distinguish prototype placeholders from production-ready calculations.
          </p>
          
          <h4 className="text-xl font-semibold mb-3">Label Types and Meanings</h4>
          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
              <p className="font-mono text-xs mb-1">(calculated from transactions)</p>
              <p className="text-sm">Real calculations derived from uploaded transaction data. Fully functional and production-ready.</p>
              <p className="text-sm font-semibold mt-2">Examples:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Income & Expenses in IncomeExpensesKPI</li>
                <li>50/30/20 breakdown in BudgetDonut</li>
                <li>Monthly trends in MonthlyStackedBars</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
              <p className="font-mono text-xs mb-1">(calculated from snapshot)</p>
              <p className="text-sm">Real calculations derived from holdings and liabilities data. Production-ready.</p>
              <p className="text-sm font-semibold mt-2">Examples:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Net Worth calculation (assets - liabilities)</li>
                <li>Liquid Assets (sum of liquid holdings)</li>
                <li>Holdings and Liabilities tables</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50">
              <p className="font-mono text-xs mb-1">(calculated from your inputs)</p>
              <p className="text-sm">Calculations based on user-provided values in Goals/RPIC forms. Production-ready logic.</p>
              <p className="text-sm font-semibold mt-2">Examples:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>RPIC Monthly/Annual calculations</li>
                <li>Required Capital table</li>
                <li>Timeline projections</li>
              </ul>
            </div>

            <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50">
              <p className="font-mono text-xs mb-1">(progress from wizard)</p>
              <p className="text-sm">User progress tracked through the Broker Setup wizard. State persisted in localStorage.</p>
              <p className="text-sm font-semibold mt-2">Examples:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Broker Setup completion status</li>
                <li>Selected broker and account type</li>
                <li>Options approval level</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-500 pl-4 py-2 bg-gray-50">
              <p className="font-mono text-xs mb-1">(fixed examples)</p>
              <p className="text-sm">Hardcoded mock data for prototype demonstration. Requires backend integration or AI in production.</p>
              <p className="text-sm font-semibold mt-2">Examples:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Connection Status (3 mock accounts)</li>
                <li>Paper Trading Progress (mock 40 trades)</li>
                <li>Personalized Recommendations quick wins</li>
                <li>Key Insights cards</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
              <p className="font-mono text-xs mb-1">(strange calculation)</p>
              <p className="text-sm">Complex calculations using non-standard methodology that may require refinement before production.</p>
              <p className="text-sm font-semibold mt-2">Examples:</p>
              <ul className="list-disc pl-6 text-sm">
                <li>Unspent Income calculation (differs from traditional approaches)</li>
                <li>Readiness Score factor calculations (some use heuristics)</li>
                <li>Recommended Action Plan generation</li>
              </ul>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-3">Labeling Implementation</h4>
          <p className="mb-4">
            Labels are implemented consistently across all components using Tailwind CSS classes:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`<span className="text-xs text-muted-foreground font-normal ml-2">
  (calculated from transactions)
</span>`}
            </code>
          </div>
          <p className="mb-4">
            This uniform styling ensures labels are visible but non-intrusive, maintaining UI hierarchy while providing crucial transparency.
          </p>
        </section>

        {/* 5. Investments */}
        <section id="investments" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">5. Investment Planning - Active Investment Readiness</h2>
          <p className="mb-4">
            The Investments module guides users through a comprehensive 5-step process to assess readiness for active trading, select appropriate strategies, set up brokerage accounts, and validate skills through paper trading before allocating real capital.
          </p>

          <h3 className="text-2xl font-semibold mb-4">5.1 Strategy Assessment (Updated)</h3>
          <p className="mb-4">
            Users complete a self-assessment to receive personalized trading strategy recommendations based on capital, risk tolerance, time availability, and experience level.
          </p>

          <h4 className="text-xl font-semibold mb-3">Assessment Questions (4 Questions)</h4>
          <div className="mb-6">
            <div className="mb-4">
              <p className="font-semibold mb-2">Question 1: Capital Available for Active Trading</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 text-sm">
                <li><strong>Limited (&lt;$10k):</strong> Just getting started with limited funds</li>
                <li><strong>Moderate ($10k-$25k):</strong> Some capital but still building wealth</li>
                <li><strong>Good ($25k-$50k):</strong> Comfortable capital for diversified strategies</li>
                <li><strong>Strong ($50k-$100k):</strong> Significant capital for multiple strategies</li>
                <li><strong>Substantial (&gt;$100k):</strong> Extensive capital for sophisticated approaches</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Question 2: Risk Comfort Level</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 text-sm">
                <li><strong>Very Conservative:</strong> 5% account drop causes stress</li>
                <li><strong>Conservative:</strong> 10% drop is uncomfortable but manageable</li>
                <li><strong>Moderate:</strong> 15% drop is acceptable for higher returns</li>
                <li><strong>Aggressive:</strong> 20% drop is tolerable with conviction</li>
                <li><strong>Very Aggressive:</strong> 25% drop seen as buying opportunity</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Question 3: Time Dedication</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 text-sm">
                <li><strong>Very Limited (&lt;30 min/day):</strong> Busy schedule, need passive approaches</li>
                <li><strong>Limited (30-60 min/day):</strong> Can check markets daily, minimal active trading</li>
                <li><strong>Moderate (1-2 hours/day):</strong> Can actively monitor and trade regularly</li>
              </ul>
              <p className="text-sm italic mt-2">Note: Options are capped at 2 hours/day as more is unsustainable long-term and indicates unrealistic expectations.</p>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Question 4: Trading Experience</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 text-sm">
                <li><strong>Complete Beginner:</strong> Never traded stocks or options</li>
                <li><strong>Novice:</strong> Bought stocks, no options experience</li>
                <li><strong>Intermediate:</strong> Some options trades, still learning</li>
                <li><strong>Advanced:</strong> Consistent options trading, profitable over 1+ years</li>
                <li><strong>Expert:</strong> Professional-level skills, 3+ years consistent profitability</li>
              </ul>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-3">Recommended Strategies Logic</h4>
          <p className="mb-4">
            Based on answers, strategies are scored and displayed with match percentages. Users can select multiple strategies simultaneously (multi-select enabled).
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`function calculateStrategyMatch(answers: StrategyAssessmentAnswers, strategy: StrategyInfo): number {
  let matchScore = 0;
  
  // Capital match (30% weight)
  if (strategy.minCapital <= capitalFromAnswer(answers.capital)) {
    matchScore += 30;
  }
  
  // Risk match (30% weight)
  const userRisk = riskLevelFromAnswer(answers.risk);
  if (userRisk === strategy.riskLevel) {
    matchScore += 30;
  } else if (Math.abs(userRisk - strategy.riskLevel) === 1) {
    matchScore += 15; // Adjacent risk level
  }
  
  // Time match (20% weight)
  const userTime = timeFromAnswer(answers.time);
  if (userTime >= strategy.timeCommitment) {
    matchScore += 20;
  }
  
  // Experience match (20% weight)
  const userExp = experienceFromAnswer(answers.experience);
  if (userExp >= strategy.requiredExperience) {
    matchScore += 20;
  }
  
  return matchScore; // 0-100%
}`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Strategy Selection (Multi-Select)</h4>
          <p className="mb-4">
            Users can select multiple strategies using checkboxes. Selected strategies persist across sessions via localStorage. The confirmation card displays all selected strategies for user awareness.
          </p>

          <h4 className="text-xl font-semibold mb-3">Persistence</h4>
          <p className="mb-4">
            Both <code>strategyAssessmentAnswers</code> and <code>selectedStrategies</code> are stored in FinancialDataContext and persisted to localStorage, ensuring user progress is maintained across tab navigation and page refreshes.
          </p>

          <h3 className="text-2xl font-semibold mb-4 mt-8">5.2 Broker Setup Wizard (NEW)</h3>
          <p className="mb-4">
            A dedicated tab in Investments guides users through the complete process of opening, funding, and connecting a brokerage account with options approval. The wizard tracks progress and resumes from the last completed step.
          </p>

          <h4 className="text-xl font-semibold mb-3">Wizard Steps (5 Steps)</h4>
          <div className="mb-6">
            <div className="mb-4">
              <p className="font-semibold mb-2">Step 1: Choose Broker</p>
              <p className="mb-2">Comparison table of 6 brokers (Tradier, IBKR, Schwab, E*TRADE, Fidelity, TradeZero) filtered and scored based on selected strategy requirements:</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 text-sm">
                <li><strong>Account Type Required:</strong> Cash, Margin, or Retirement</li>
                <li><strong>Options Level Required:</strong> Level 0-4 based on strategy complexity</li>
                <li><strong>Minimum Balance:</strong> Varies by broker and account type</li>
              </ul>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2 mt-2">
                <code className="block whitespace-pre-wrap">
{`Strategy Requirements:
- options_wheel: Options Level 2+, Cash or Margin
- spreads: Options Level 3+, Margin required
- swing_trading: Level 0-1, Cash or Margin
- day_trading: Level 0-1, Margin required ($25k+ PDT rule)
- covered_calls: Level 1+, Cash or Margin`}
                </code>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Step 2: Select Account Type & Options Approval Level</p>
              <p className="mb-2">User chooses account type and target options level:</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 text-sm">
                <li><strong>Account Types:</strong> Cash, Margin, Retirement</li>
                <li><strong>Options Levels:</strong>
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    <li>Level 0: Stocks only</li>
                    <li>Level 1: Covered calls and protective puts</li>
                    <li>Level 2: Long calls/puts (buying options)</li>
                    <li>Level 3: Spreads (multi-leg strategies)</li>
                    <li>Level 4: Naked options (highest risk)</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Step 3: Complete Funding Checklist</p>
              <p className="mb-2">Checklist to track account opening and initial funding:</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 text-sm">
                <li>Open account on broker's website</li>
                <li>Complete identity verification</li>
                <li>Link bank account</li>
                <li>Transfer initial funding (minimum required by broker)</li>
                <li>Confirm funds settled</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Step 4: Apply for Options Approval</p>
              <p className="mb-2">Guidance for applying to the target options level:</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 text-sm">
                <li>Submit options application through broker</li>
                <li>Provide trading experience (be honest, brokers verify)</li>
                <li>Disclose net worth and income (required for approval)</li>
                <li>Wait for approval (typically 1-3 business days)</li>
              </ul>
              <p className="text-sm italic mt-2">Note: If denied, user can reapply after gaining more experience or adjusting financial profile.</p>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Step 5: Connect & Verify Account</p>
              <p className="mb-2">Final step to connect account to the application:</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 text-sm">
                <li>Generate API keys or use OAuth connection (broker-dependent)</li>
                <li>Enter credentials securely</li>
                <li>Verify connection with test API call</li>
                <li>Confirm account balances and positions sync correctly</li>
              </ul>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-3">Wizard Persistence & Resume</h4>
          <p className="mb-4">
            The wizard saves progress to localStorage via <code>brokerSetup</code> in FinancialDataContext:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`interface BrokerSetup {
  chosenBroker: BrokerId | null;          // Selected broker
  accountType: 'cash' | 'margin' | 'retirement' | null;
  targetOptionsLevel: 0 | 1 | 2 | 3 | 4;  // Target options level
  wizardStep: number;                      // Current step (1-5)
  progress: {
    openAccount: boolean;
    funded: boolean;
    optionsSubmitted: boolean;
    optionsApproved: boolean;
    connected: boolean;
  };
  notes: string[];                         // User notes
}`}
            </code>
          </div>
          <p className="mb-4">
            When users exit and reopen the wizard, it resumes from <code>wizardStep</code>, allowing them to take breaks without losing progress. After completion, the button changes to "Edit Broker Setup" for modifications.
          </p>

          <h4 className="text-xl font-semibold mb-3">Broker Comparison Scoring</h4>
          <p className="mb-4">
            Brokers are scored based on match with strategy requirements using <code>brokerRequirements.ts</code>:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`function scoreBrokerForStrategy(broker: BrokerRequirement, strategy: TradingStrategy): number {
  let score = 100;
  
  // Check account type compatibility
  if (!broker.accountTypes.includes(requiredAccountType)) score -= 30;
  
  // Check options level availability
  if (broker.maxOptionsLevel < requiredOptionsLevel) score -= 40;
  
  // Check minimum balance feasibility
  if (userCapital < broker.minBalance) score -= 20;
  
  // Bonus for lower fees
  if (broker.commissionFree) score += 10;
  
  return Math.max(0, score);
}`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4 mt-8">5.3 Readiness Score (Enhanced)</h3>
          <p className="mb-4">
            The Readiness Score evaluates financial foundation across 5 equally weighted factors (20% each). Each factor is scored 0-100, then multiplied by 0.20 to get its contribution to the total score (max 100).
          </p>

          <h4 className="text-xl font-semibold mb-3">Complete Factor Formulas (TypeScript)</h4>
          <div className="mb-6">
            <div className="mb-6">
              <p className="font-semibold mb-2">Factor 1: Emergency Fund Coverage (20% weight)</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
                <code className="block whitespace-pre-wrap">
{`function calculateEmergencyFundScore(
  liquidAssets: number,
  monthlyExpenses: number,
  targetMonths: number = 6
): number {
  const requiredEF = monthlyExpenses * targetMonths;
  const efMonths = liquidAssets / monthlyExpenses;
  
  // Score: 0-100 based on months of coverage
  const rawScore = Math.min((efMonths / targetMonths) * 100, 100);
  
  // Weighted contribution: 20% of total
  return rawScore * 0.20;
}

// Example: $30k liquid, $5k/month expenses, 6-month target
// efMonths = 30000 / 5000 = 6 months
// rawScore = (6 / 6) * 100 = 100
// weightedScore = 100 * 0.20 = 20 points (full credit)`}
                </code>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold mb-2">Factor 2: High-Interest Debt (20% weight)</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
                <code className="block whitespace-pre-wrap">
{`function calculateHighInterestDebtScore(
  liabilities: Liability[],
  netWorth: number
): number {
  // Identify high-APR debt (>7%)
  const highAprDebt = liabilities
    .filter(l => l.apr > 7)
    .reduce((sum, l) => sum + l.balance, 0);
  
  // If no high-APR debt, perfect score
  if (highAprDebt === 0) return 100 * 0.20; // 20 points
  
  // Calculate debt-to-net-worth ratio
  const debtRatio = highAprDebt / netWorth;
  
  // Score: 100 - (ratio * 100), minimum 0
  const rawScore = Math.max(0, 100 - (debtRatio * 100));
  
  return rawScore * 0.20;
}

// Example: $15k high-APR debt, $150k net worth
// debtRatio = 15000 / 150000 = 0.10 (10%)
// rawScore = 100 - (0.10 * 100) = 90
// weightedScore = 90 * 0.20 = 18 points`}
                </code>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold mb-2">Factor 3: Income Stability (20% weight)</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
                <code className="block whitespace-pre-wrap">
{`function calculateIncomeStabilityScore(
  monthlyIncomes: number[] // Last 6-12 months
): number {
  if (monthlyIncomes.length < 3) return 0; // Insufficient data
  
  // Calculate coefficient of variation (CV = stdDev / mean)
  const mean = monthlyIncomes.reduce((a, b) => a + b) / monthlyIncomes.length;
  const variance = monthlyIncomes
    .map(income => Math.pow(income - mean, 2))
    .reduce((a, b) => a + b) / monthlyIncomes.length;
  const stdDev = Math.sqrt(variance);
  const cv = stdDev / mean;
  
  // Score: Lower CV = higher stability
  // CV < 0.10 (10% variation) = 100 points
  // CV > 0.50 (50% variation) = 0 points
  const rawScore = Math.max(0, 100 - (cv * 200));
  
  return rawScore * 0.20;
}

// Example: Monthly incomes [5000, 5100, 4900, 5050, 4950]
// mean = 5000, stdDev ≈ 75, cv = 75/5000 = 0.015 (1.5%)
// rawScore = 100 - (0.015 * 200) = 97
// weightedScore = 97 * 0.20 = 19.4 points`}
                </code>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold mb-2">Factor 4: Monthly Cash Flow (20% weight)</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
                <code className="block whitespace-pre-wrap">
{`function calculateCashFlowScore(
  monthlyIncome: number,
  monthlyExpenses: number
): number {
  const monthlyCashFlow = monthlyIncome - monthlyExpenses;
  const cashFlowRatio = monthlyCashFlow / monthlyExpenses;
  
  // Score based on cash flow as % of expenses
  // 50%+ surplus (ratio >= 0.50) = 100 points
  // 0% surplus (ratio = 0) = 0 points
  // Negative cash flow = 0 points
  const rawScore = Math.max(0, Math.min((cashFlowRatio / 0.50) * 100, 100));
  
  return rawScore * 0.20;
}

// Example: $6000 income, $4500 expenses
// cashFlow = 1500, ratio = 1500 / 4500 = 0.333 (33%)
// rawScore = (0.333 / 0.50) * 100 = 66.6
// weightedScore = 66.6 * 0.20 = 13.3 points`}
                </code>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold mb-2">Factor 5: Capital Availability (20% weight)</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-2">
                <code className="block whitespace-pre-wrap">
{`function calculateCapitalAvailabilityScore(
  liquidAssets: number,
  emergencyFund: number,
  nearTermGoals: number = 0
): number {
  // Capital available = liquid assets - (emergency fund + near-term goals)
  const availableCapital = liquidAssets - (emergencyFund + nearTermGoals);
  
  // Score based on available capital
  // $10k+ available = 100 points
  // $0 available = 0 points
  const rawScore = Math.min((availableCapital / 10000) * 100, 100);
  
  return Math.max(0, rawScore * 0.20);
}

// Example: $35k liquid, $25k EF, $2k near-term
// availableCapital = 35000 - (25000 + 2000) = 8000
// rawScore = (8000 / 10000) * 100 = 80
// weightedScore = 80 * 0.20 = 16 points`}
                </code>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-3">Total Readiness Score Calculation</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`function calculateTotalReadinessScore(snapshot: FinancialSnapshot): number {
  const efScore = calculateEmergencyFundScore(
    liquidAssets, monthlyExpenses, targetMonths
  );
  const debtScore = calculateHighInterestDebtScore(
    liabilities, netWorth
  );
  const stabilityScore = calculateIncomeStabilityScore(
    monthlyIncomes
  );
  const cashFlowScore = calculateCashFlowScore(
    monthlyIncome, monthlyExpenses
  );
  const capitalScore = calculateCapitalAvailabilityScore(
    liquidAssets, emergencyFund, nearTermGoals
  );
  
  // Sum of all 5 factors (each 0-20, total 0-100)
  return efScore + debtScore + stabilityScore + cashFlowScore + capitalScore;
}

// Interpretation:
// 80-100: Excellent - Ready for active investing
// 60-79:  Good - Minor improvements recommended
// 40-59:  Fair - Foundation work required
// 0-39:   Poor - Focus on financial basics first`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4 mt-8">5.4 Paper Trading</h3>
          <p className="mb-4">
            Before allocating real capital, users must complete paper trading requirements to validate discipline and strategy execution:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Gate 1:</strong> Complete 40+ simulated trades following the selected strategy</li>
            <li><strong>Gate 2:</strong> Achieve 95%+ adherence to trading plan (proper entry/exit, position sizing)</li>
            <li><strong>Gate 3:</strong> Complete 70%+ of pre-trade checklist items (risk assessment, technical analysis, etc.)</li>
          </ul>
          <p className="mb-4">
            Progress is tracked via <code>PaperTradingProgress</code> component. Only after passing all gates is real capital allocation recommended.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-sm">
              <strong>Note:</strong> Current implementation uses <span className="font-mono text-xs">(fixed examples)</span> for paper trading progress. Production version would integrate with a paper trading API or manual trade logging system.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4 mt-8">5.5 Accessibility & Warnings (NEW)</h3>
          <p className="mb-4">
            All Investments features are accessible regardless of readiness score to allow user autonomy and testing. However, prominent warnings appear when foundation score is below recommended levels.
          </p>

          <h4 className="text-xl font-semibold mb-3">Readiness Score Warnings</h4>
          <p className="mb-4">
            When readiness score &lt; 80, the following warnings display:
          </p>
          <div className="mb-4">
            <p className="font-semibold mb-2">1. Global Alert (Top of Investments View)</p>
            <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-4">
              <p className="font-semibold text-destructive">⚠ Foundation Score is Below Recommended Level</p>
              <p className="text-sm mt-2">
                Your readiness score is &lt;80. Proceeding with active investments carries increased risk. Consider strengthening your financial foundation first by building emergency fund, paying down high-interest debt, and stabilizing cash flow.
              </p>
            </div>

            <p className="font-semibold mb-2">2. Broker Setup Warning (NextActionCard)</p>
            <p className="mb-2">If readiness &lt; 80, a warning badge displays:</p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
              <p className="font-semibold text-amber-700">⚠ Not Recommended Yet</p>
              <p className="text-sm mt-2">
                Opening a brokerage account is not recommended until your foundation score reaches 80+. Focus on improving emergency fund, debt management, and cash flow stability first.
              </p>
            </div>
          </div>

          <h4 className="text-xl font-semibold mb-3">Design Philosophy</h4>
          <p className="mb-4">
            This approach balances user autonomy with educational guidance:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>No Hard Gates:</strong> Users can explore all features regardless of score</li>
            <li><strong>Clear Warnings:</strong> Risks are communicated prominently without blocking access</li>
            <li><strong>Informed Decisions:</strong> Users understand consequences and can proceed at their own discretion</li>
            <li><strong>Testing Enabled:</strong> Allows thorough prototype evaluation without artificial restrictions</li>
          </ul>
        </section>

        {/* 6. Goals */}
        <section id="goals" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">6. Goals - RPIC Calculator</h2>
          <p className="mb-4">
            The Goals module helps users calculate their <strong>Retirement Passive Income Capital (RPIC)</strong>, the capital needed to generate sufficient passive income for retirement.
          </p>

          <h3 className="text-2xl font-semibold mb-4">User Inputs (3 Questions)</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">1. Target Monthly Passive Income</h4>
            <p className="mb-2">How much do you want to earn monthly in passive income when you retire?</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Numeric input in dollars</li>
              <li>Typically based on current monthly expenses</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">2. Lifestyle Multiplier</h4>
            <p className="mb-2">How do you expect your lifestyle to change?</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>0.7x: Downsize (expense reduction)</li>
              <li>1.0x: Same (same as now) - <strong>Corrected: value="1"</strong></li>
              <li>1.3x: Upgrade (expense increase)</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">3. Geography Multiplier</h4>
            <p className="mb-2">Where do you plan to live?</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>0.5x: Lower cost area</li>
              <li>1.0x: Same location - <strong>Corrected: value="1"</strong></li>
              <li>1.5x: Higher cost area</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">RPIC Calculation</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Step 1: Adjust Target Income</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`adjustedMonthlyIncome = targetMonthly × lifestyle × geography`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Step 2: Annualized RPIC</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`annualRPIC = adjustedMonthlyIncome × 12`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Step 3: Required Capital</h4>
            <p className="mb-4">Two scenarios are calculated:</p>
            
            <p className="font-semibold mb-2">A. Wealth OS Hybrid Approach</p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`assumedReturn = 12% (combination of active/passive investments)
capitalRequired = annualRPIC / 0.12`}
              </code>
            </div>

            <p className="font-semibold mb-2">B. Traditional Passive Approach</p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`assumedReturn = 4% (traditional 4% rule)
capitalRequired = annualRPIC / 0.04`}
              </code>
            </div>

            <p className="mt-4 mb-2"><strong>Capital Efficiency:</strong></p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`savings = traditionalCapital - hybridCapital`}
              </code>
            </div>
            <p className="mb-4">
              The Wealth OS Hybrid approach requires 67% less capital than traditional due to projected higher returns.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Timeline Calculation</h3>
          <p className="mb-4">
            How many years will it take to reach the target RPIC?
          </p>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Additional Inputs</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Starting Capital</strong>: Available initial capital</li>
              <li><strong>Monthly Contribution</strong>: Monthly contribution towards goal</li>
              <li><strong>Expected Annual Return</strong>: Expected annual return (%)</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Future Value Formula</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`FV = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]

Where:
- FV = Future Value (capitalRequired)
- PV = Present Value (startingCapital)
- PMT = Monthly Contribution (monthlyContribution)
- r = Monthly Return (annualReturn / 12)
- n = Number of months (what we solve for)

Solving for n:
yearsToGoal = n / 12`}
              </code>
            </div>

            <p className="mb-4">
              If the goal is not achievable with current parameters (returns very high or negative years), a suggestive alert is shown:
            </p>
            <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-500 p-4 rounded-lg mb-4">
              <p className="text-foreground text-sm">
                "With current parameters, you'd reach RPIC in X years, exceeding your Y-year goal. Consider increasing monthly contributions or adjusting return assumptions."
              </p>
            </div>
            <p className="mb-4">
              <strong>Applied correction:</strong> This alert text now uses <code>text-foreground</code> (black) instead of <code>text-warning-foreground</code> (white) for better visibility.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Visualizations</h3>
          
          <h4 className="text-xl font-semibold mb-3">Required Capital Table</h4>
          <p className="mb-4">
            Comparative table showing:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Required capital for each approach (Hybrid vs Traditional)</li>
            <li>Capital gap (difference with current capital)</li>
            <li>Years to reach goal</li>
            <li>Capital efficiency (Hybrid approach savings)</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">Visual Roadmap</h4>
          <p className="mb-4">
            Visual timeline with milestones:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Emergency Fund Secured</li>
            <li>Debt-Free</li>
            <li>First $100K Invested</li>
            <li>Half-Way to RPIC</li>
            <li>RPIC Goal Reached</li>
          </ul>
          <p className="mb-4">
            Each milestone shows estimated achievement date and current progress.
          </p>

          <h4 className="text-xl font-semibold mb-3">RPIC Result Card</h4>
          <p className="mb-4">
            Executive summary showing:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Adjusted annualized RPIC</li>
            <li>Required capital (both approaches)</li>
            <li>Capital savings (Hybrid vs Traditional)</li>
            <li>RPIC Index (progress as percentage)</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Correction: Expense Baseline Card</h3>
          <p className="mb-4">
            <strong>Identified issue:</strong> The "Yes, this reflects my lifestyle" button did not work correctly, and edit state was not properly managed.
          </p>
          <p className="mb-4">
            <strong>Applied correction:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>The "Yes, this reflects my lifestyle" button now correctly confirms <code>autoMonthlyExpenses</code> and calls <code>onExpensesConfirmed(autoMonthlyExpenses)</code></li>
            <li>Both buttons ("Yes" and "Adjust") are always shown when data is available</li>
            <li>Edit flow is now consistent: saving updates the value and exits edit mode</li>
          </ul>
        </section>

        {/* 7. Six-Month Foundation Plan Generator */}
        <section id="six-month-plan" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">7. Six-Month Foundation Plan Generator</h2>
          <p className="mb-4">
            The Six-Month Plan Generator is a client-side algorithm that produces a personalized, actionable 6-month financial improvement plan. It requires no AI or backend services, using predefined templates and formulas to generate specific monthly tasks with dollar impacts.
          </p>

          <h3 className="text-2xl font-semibold mb-4">7.1 Overview</h3>
          <p className="mb-4">
            The plan generator bridges the gap between identifying financial issues (via Dashboard and Readiness Score) and taking concrete action. It provides month-by-month guidance with specific, measurable tasks tailored to the user's financial snapshot.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="font-semibold mb-2">Key Features:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Fully Client-Side:</strong> No API calls or AI required, runs entirely in the browser</li>
              <li><strong>Template-Based:</strong> Uses predefined task templates with estimated impacts</li>
              <li><strong>Priority-Driven:</strong> Follows financial best practices (emergency fund → debt → capital building)</li>
              <li><strong>Actionable:</strong> Each task includes specific actions and estimated dollar impacts</li>
              <li><strong>Trackable:</strong> Monthly KPIs show progress toward readiness for active investing</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">7.2 Plan Inputs</h3>
          <p className="mb-4">
            The generator collects inputs from existing financial data and contexts:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`interface SixMonthPlanInputs {
  // Current state (from Dashboard)
  currentMonthExpenses: number;          // Last month's total expenses
  avgMonthlyIncome: number;              // Average monthly income
  avgMonthlyExpenses: number;            // Average monthly expenses
  cashFlowMonthly: number;               // Monthly surplus/deficit
  liquidAssets: number;                  // Total liquid assets
  
  // Goals (calculated from expenses)
  emergencyFundReq: number;              // Target emergency fund (6 months expenses)
  
  // Debts (from liabilities)
  highAprDebts: Array<{                  // Debts with APR > 7%
    id: string;
    name: string;
    type: string;
    apr: number;
    balance: number;
    monthlyPayment: number;
  }>;
  allDebts: Array<{                      // All liabilities
    id: string;
    name: string;
    apr: number;
    balance: number;
    monthlyPayment: number;
  }>;
  
  // Readiness (from Readiness Score calculation)
  readinessScore: number;                // 0-100 current readiness
  
  // RPIC (from Goals calculations)
  rpicMonthly: number;                   // Monthly RPIC target
  rpicAnnual: number;                    // Annual RPIC target
  availableCapital: number;              // Capital available for investing
}`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4">7.3 Plan Generation Algorithm</h3>
          <p className="mb-4">
            The algorithm follows a structured month-by-month approach with three financial priorities:
          </p>

          <h4 className="text-xl font-semibold mb-3">Month-by-Month Logic (Pseudocode)</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`function generateSixMonthPlan(inputs: SixMonthPlanInputs): SixMonthPlan {
  // Initialize running balances
  let runningCashFlow = inputs.cashFlowMonthly;
  let runningEF = inputs.liquidAssets;
  let runningHighAprDebt = sumHighAprDebt(inputs.highAprDebts);
  
  const months: MonthPlan[] = [];
  
  // Calculate gaps
  const efGap = Math.max(0, inputs.emergencyFundReq - runningEF);
  const monthlyEfContribution = efGap / 6; // Spread over 6 months
  
  // Identify primary debt (highest APR) for avalanche method
  const primaryDebt = inputs.highAprDebts.sort((a, b) => b.apr - a.apr)[0];
  
  for (let month = 1; month <= 6; month++) {
    const tasks: PlanTask[] = [];
    
    // Priority 1: Emergency Fund (if needed)
    if (efGap > 0 && runningEF < inputs.emergencyFundReq) {
      tasks.push({
        type: "emergency_fund",
        title: \`Contribute \${monthlyEfContribution} to Emergency Fund\`,
        details: "Build emergency fund to 6 months of expenses before investing",
        amount: monthlyEfContribution
      });
      runningEF += monthlyEfContribution;
    }
    
    // Priority 2: Debt Paydown (starts when EF reaches 50%)
    const efProgress = runningEF / inputs.emergencyFundReq;
    if (efProgress >= 0.5 && primaryDebt && runningHighAprDebt > 0) {
      const extraPayment = runningCashFlow * 0.3; // 30% of surplus to debt
      const principalPaydown = extraPayment - (primaryDebt.balance * primaryDebt.apr / 12 / 100);
      const interestSaved = calculateInterestSaved(principalPaydown, primaryDebt.apr);
      
      tasks.push({
        type: "debt_paydown",
        title: \`Extra \${extraPayment} payment on \${primaryDebt.name}\`,
        details: "Avalanche method: Attack highest APR debt first",
        estMonthlyImpact: extraPayment,
        principalPaydown: principalPaydown,
        estInterestSaved: interestSaved
      });
      
      runningHighAprDebt -= principalPaydown;
    }
    
    // Priority 3: Expense Reduction (template-based)
    if (month === 1) {
      tasks.push({
        type: "expense_cut",
        title: "Audit and cancel unused subscriptions",
        details: "Review streaming, gym, software subscriptions",
        estMonthlyImpact: randomRange(50, 150) // Template estimate
      });
      runningCashFlow += estimatedSavings;
    }
    
    if (month === 2) {
      tasks.push({
        type: "expense_cut",
        title: "Optimize utilities and insurance",
        details: "Compare providers, negotiate rates",
        estMonthlyImpact: randomRange(30, 80)
      });
      runningCashFlow += estimatedSavings;
    }
    
    // Priority 4: Income Boost (template-based)
    if (month === 3) {
      tasks.push({
        type: "income_boost",
        title: "Start freelance/gig work side hustle",
        details: "Use skills for extra income (Upwork, Fiverr, etc.)",
        estMonthlyImpact: randomRange(200, 800)
      });
    }
    
    if (month === 4) {
      tasks.push({
        type: "income_boost",
        title: "Request salary review or negotiate raise",
        details: "Document accomplishments and market research",
        estMonthlyImpact: randomRange(0, 500) // May or may not succeed
      });
    }
    
    // Calculate KPIs for this month
    const kpis = {
      cashFlowRunRate: runningCashFlow,
      emergencyFundProgress: (runningEF / inputs.emergencyFundReq) * 100,
      highAprBalance: runningHighAprDebt
    };
    
    // Determine blocked actions (if readiness < 80)
    const blockedActions = [];
    if (inputs.readinessScore < 80 && month >= 4) {
      blockedActions.push({
        reason: "Foundation score below 80",
        name: "Active trading account funding",
        unblocksWhen: "Emergency fund complete and high-APR debt < $5k"
      });
    }
    
    months.push({
      monthIndex: month,
      theme: getMonthTheme(month), // e.g., "Foundation Building", "Debt Attack"
      tasks,
      kpis,
      blockedActions
    });
  }
  
  // Calculate rollup summary
  const totalMonthlySavings = sumTaskImpacts(months, "expense_cut");
  const totalInterestSaved = sumTaskImpacts(months, "debt_paydown", "estInterestSaved");
  const emergencyFundEnding = runningEF;
  const readinessProjected = projectReadinessScore(inputs, runningEF, runningHighAprDebt);
  const nextStep = readinessProjected >= 80 ? "paper_trading" : "continue_foundation";
  
  return {
    planId: generateUUID(),
    generatedAt: new Date().toISOString(),
    inputs,
    assumptions: {
      inflation: 0.03,
      minEmergencyMonths: 6,
      incomeBoostRangeMonthly: [200, 800],
      maxRiskCapitalShare: 0.20
    },
    months,
    rollup: {
      totalMonthlySavings,
      totalOneTimeSavings: 0,
      totalInterestSaved,
      emergencyFundEnding,
      readinessProjected,
      nextStep
    },
    cta: {
      addToActionPlan: true,
      scheduleMonthlyReassessment: true
    }
  };
}`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Key Formulas Used in Algorithm</h4>
          <div className="mb-6">
            <p className="font-semibold mb-2">1. Emergency Fund Contribution</p>
            <div className="bg-muted p-3 rounded-lg mb-4">
              <code className="text-sm">
                monthlyEfContribution = (emergencyFundReq - liquidAssets) / 6
              </code>
            </div>

            <p className="font-semibold mb-2">2. Debt Paydown (Avalanche Method)</p>
            <div className="bg-muted p-3 rounded-lg mb-4">
              <code className="text-sm">
{`// Sort debts by APR descending
primaryDebt = debts.sort((a, b) => b.apr - a.apr)[0];

// Allocate 30% of monthly surplus to extra payment
extraPayment = cashFlowMonthly * 0.30;

// Calculate principal reduction (payment - interest accrued)
monthlyInterest = (primaryDebt.balance * primaryDebt.apr / 12) / 100;
principalPaydown = extraPayment - monthlyInterest;`}
              </code>
            </div>

            <p className="font-semibold mb-2">3. Interest Saved Calculation</p>
            <div className="bg-muted p-3 rounded-lg mb-4">
              <code className="text-sm">
{`// Simple approximation for 6-month interest savings
interestSaved = (principalPaydown * primaryDebt.apr / 100) * (6 / 12);`}
              </code>
            </div>

            <p className="font-semibold mb-2">4. Readiness Score Projection</p>
            <div className="bg-muted p-3 rounded-lg mb-4">
              <code className="text-sm">
{`// Recalculate readiness factors with projected end-state
projectedEF = endingEF / emergencyFundReq;  // New EF coverage
projectedDebt = endingHighAprDebt;           // Reduced debt balance

// Recalculate 5-factor score with new values
newReadinessScore = recalculateReadiness({
  efCoverage: projectedEF,
  highAprDebt: projectedDebt,
  // other factors remain same
});`}
              </code>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">7.4 UI Component (SixMonthPlanDialog)</h3>
          <p className="mb-4">
            The plan is displayed in a full-screen dialog modal with the following sections:
          </p>

          <h4 className="text-xl font-semibold mb-3">Dialog Structure</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Header:</strong> Plan title, generation date, download JSON button</li>
            <li><strong>Executive Summary:</strong> Rollup metrics (total savings, interest saved, projected readiness)</li>
            <li><strong>Monthly Breakdown:</strong> 6 accordion sections (one per month) containing:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Month theme (e.g., "Foundation Building", "Debt Avalanche")</li>
                <li>Task list with titles, details, and estimated impacts</li>
                <li>KPI cards showing cash flow, EF progress %, high-APR debt balance</li>
                <li>Blocked actions (if any) with unlock conditions</li>
              </ul>
            </li>
            <li><strong>Next Steps:</strong> Recommended action based on projected readiness:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>If projected readiness ≥ 80: "Begin Paper Trading" CTA</li>
                <li>If projected readiness &lt; 80: "Continue Foundation Building" with specific recommendations</li>
              </ul>
            </li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">Plan Persistence</h4>
          <p className="mb-4">
            Generated plans are stored in <code>FinancialDataContext.sixMonthPlan</code> and persisted to localStorage. Users can:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Download plan as JSON file for external tracking</li>
            <li>Regenerate plan after updating financial data</li>
            <li>View historical plans (if multiple generations are tracked)</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">7.5 Trigger Button Logic (Smart Navigation)</h3>
          <p className="mb-4">
            The "Build 6-Month Plan" button in the Goals → RPIC Result Card uses intelligent logic based on foundation score:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`function getTriggerButtonBehavior(foundationScore: number | null) {
  if (!foundationScore) {
    return {
      text: "Complete Snapshot",
      action: () => navigateToDashboard(),
      variant: "outline"
    };
  }
  
  if (foundationScore >= 80) {
    return {
      text: "Go to Investments",
      action: () => navigateToInvestments(),
      variant: "default"
    };
  }
  
  if (foundationScore >= 60 && foundationScore < 80) {
    return {
      text: "Build 6-Month Plan",
      action: () => openSixMonthPlanDialog(),
      variant: "default"
    };
  }
  
  // foundationScore < 60
  return {
    text: "Build 6-Month Plan",
    action: () => openSixMonthPlanDialog(),
    variant: "destructive" // Red to emphasize urgent need
  };
}`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Navigation Behavior Summary</h4>
          <div className="space-y-3 mb-6">
            <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
              <p className="font-semibold mb-1">Foundation Score ≥ 80 (Ready)</p>
              <p className="text-sm">Button: "Go to Investments" → Navigate to Investments tab (Strategy Selection)</p>
            </div>

            <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50">
              <p className="font-semibold mb-1">Foundation Score 60-79 (Good Progress)</p>
              <p className="text-sm">Button: "Build 6-Month Plan" → Open SixMonthPlanDialog to complete final improvements</p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
              <p className="font-semibold mb-1">Foundation Score &lt; 60 (Needs Work)</p>
              <p className="text-sm">Button: "Build 6-Month Plan" (red/destructive) → Open SixMonthPlanDialog with urgent improvements</p>
            </div>

            <div className="border-l-4 border-gray-500 pl-4 py-2 bg-gray-50">
              <p className="font-semibold mb-1">No Foundation Score (No Snapshot)</p>
              <p className="text-sm">Button: "Complete Snapshot" → Navigate to Dashboard to upload financial data</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">7.6 Limitations & Future Enhancements</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="font-semibold mb-2">Current Limitations:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Template-Based:</strong> Task recommendations use predefined templates, not AI-powered personalization</li>
              <li><strong>Estimated Impacts:</strong> Savings estimates are ranges (e.g., $50-$150), not precise calculations</li>
              <li><strong>No Progress Tracking:</strong> Users must manually track completion of tasks (no built-in checkoff system)</li>
              <li><strong>Single Iteration:</strong> Plan generates once; doesn't adapt if user deviates mid-execution</li>
            </ul>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="font-semibold mb-2">Future Enhancements (Production):</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>AI-Powered Personalization:</strong> Use Lovable AI to generate custom task recommendations based on transaction patterns</li>
              <li><strong>Progress Tracking:</strong> Add checkboxes and completion tracking with monthly reassessment</li>
              <li><strong>Adaptive Plans:</strong> Regenerate plan automatically when financial data updates</li>
              <li><strong>Real Impact Calculations:</strong> Use actual transaction data to project precise savings (e.g., analyze subscription costs)</li>
              <li><strong>Goal Integration:</strong> Link plan tasks to specific RPIC milestones for motivation</li>
            </ul>
          </div>
        </section>

        {/* 8. Twin-Engine Projection Model */}
        <section id="twin-engine" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">8. Twin-Engine Projection Model</h2>
          <p className="mb-4">
            The Twin-Engine Projection Model is the core calculation engine for long-term financial independence planning. It projects wealth accumulation and passive income generation using two separate "engines" (Active and Passive) compared against a Traditional benchmark.
          </p>

          <h3 className="text-2xl font-semibold mb-4">8.1 Overview & Conceptual Model</h3>
          <p className="mb-4">
            The Twin-Engine model separates capital into two distinct pools with different growth characteristics:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold mb-2">🔵 Active Engine (Trading)</p>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>High-return active trading (default 30% ROI)</li>
                <li>Capped at tradingCap (default $200K)</li>
                <li>Limited duration (default 10 years)</li>
                <li>Excess profits "spill over" to Passive</li>
              </ul>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="font-semibold mb-2">🟢 Passive Engine (Income)</p>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Dividend/income generation (default 12% yield)</li>
                <li>Uncapped growth potential</li>
                <li>Permanent duration</li>
                <li>Source of retirement withdrawals</li>
              </ul>
            </div>
          </div>
          <p className="mb-4">
            <strong>Freedom Trigger:</strong> Financial independence is achieved when passive income ≥ gross living expenses (RPIC Score ≥ 100%).
          </p>
          <p className="mb-4">
            <strong>Dynamic Duration:</strong> Projections run until Age 106 (minimum 10 years) to capture full retirement lifecycle.
          </p>

          <h3 className="text-2xl font-semibold mb-4">8.2 Input Settings (TwinEngineSettings)</h3>
          <p className="mb-4">
            The model accepts 26 configurable parameters organized into 7 categories:
          </p>

          <h4 className="text-xl font-semibold mb-3">Foundation</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`currentAge: number;        // User's current age (default: 55)
savingsPassive: number;    // Starting passive account balance (default: $400,000)
savingsActive: number;     // Starting active trading account (default: $100,000)
monthlyContrib: number;    // Monthly contribution amount (default: $2,000)`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Lifestyle</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`annualExpenses: number;    // Annual living expenses (default: $60,000)
inflationRate: number;     // Annual inflation rate % (default: 3.0)
enableStepDown: boolean;   // Reduce expenses in late life (default: false)
stepDownAge: number;       // Age to reduce expenses (default: 75)
stepDownPercent: number;   // Expense reduction % (default: 20)`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Wealth OS Strategy</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`tradingCap: number;           // Max active account size (default: $200,000)
activeReturn: number;         // Active trading ROI % (default: 30.0)
passiveYield: number;         // Passive income yield % (default: 12.0)
activeDuration: number;       // Years of active trading (default: 10)
activeCashOutPercent: number; // % to cash out when active ends (default: 0)
taxRate: number;              // Income tax rate % (default: 18.0)`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Advanced Settings</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`enableRampUp: boolean;        // Enable learning curve ROI ramp (default: false)
rampUpDuration: number;       // Months to reach full ROI (default: 24, step: 6)
yieldCapPercent: number;      // Max withdrawal as % of yield (default: 80)
retirementIncomeStartAge: number; // Age Social Security starts (default: 67)`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Withdrawal Plan</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`withdrawalStrategy: 'growth' | 'freedom' | 'custom';  // When to start withdrawing
customWithdrawalYear: number;    // Year for custom withdrawal start
customWithdrawalAmount: number;  // Annual withdrawal for custom strategy
retirementIncome: number;        // Monthly Social Security/pension (default: 0)`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Benchmark</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`tradReturn: number;   // Traditional market return % (default: 7.0)
startYear: number;    // Projection start year (default: current year)`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4">8.3 Calculation Algorithm</h3>
          <p className="mb-4">
            The main calculation loop iterates year-by-year, applying the following logic:
          </p>

          <h4 className="text-xl font-semibold mb-3">Step 0: Ramp-Up ROI with Blended Rate (if enabled)</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`// Blended Rate Algorithm: Uses 6-month increments (rampUpDuration in months)
let effectiveActiveReturn = activeReturn;
if (enableRampUp) {
  const rampUpYears = rampUpDuration / 12; // Convert months to years
  const yearStart = yearsIntoProjection;
  const yearEnd = yearsIntoProjection + 1;
  
  if (yearEnd <= rampUpYears) {
    // Entire year within ramp-up: average efficiency for this year
    const startEfficiency = 0.5 + (0.5 * (yearStart / rampUpYears));
    const endEfficiency = 0.5 + (0.5 * (yearEnd / rampUpYears));
    effectiveActiveReturn = activeReturn * ((startEfficiency + endEfficiency) / 2);
  } else if (yearStart >= rampUpYears) {
    // After ramp-up: full ROI
    effectiveActiveReturn = activeReturn;
  } else {
    // Blended year: part in ramp, part at full
    const monthsInRamp = (rampUpYears - yearStart) * 12;
    const monthsAtFull = 12 - monthsInRamp;
    const avgRampEff = (0.5 + (0.5 * (yearStart / rampUpYears)) + 1.0) / 2;
    effectiveActiveReturn = activeReturn * ((monthsInRamp * avgRampEff + monthsAtFull) / 12);
  }
}
// Example: 18-month ramp with 30% target ROI
// Year 1: avg efficiency ~62.5% → ~18.75% effective ROI
// Year 2: blended (6mo ramp + 6mo full) → ~26.25% effective ROI`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Step 1: Expense Adjustments</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`// A. Step-Down (optional late-life expense reduction)
if (enableStepDown && age === stepDownAge) {
  currentExpenses = currentExpenses * (1 - stepDownPercent / 100);
}

// B. Inflation (applied after first year)
if (year > startYear) {
  currentExpenses = currentExpenses * (1 + inflationRate / 100);
}

// C. Gross Expenses (pre-tax equivalent for withdrawal calculations)
const grossExpenses = currentExpenses / (1 - taxRate / 100);
// Example: $60,000 net / (1 - 0.18) = $73,171 gross needed`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Step 2: Traditional Path (Benchmark)</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`// Traditional 7% growth with 4% safe withdrawal rate
const tradGrowth = currentTrad * (tradReturn / 100);
const tradSafeIncome = (currentTrad + tradGrowth) * 0.04;

// Freedom check for traditional path
if (!tradFreedomYear && tradSafeIncome >= currentExpenses) {
  tradFreedomYear = year;
  tradCapitalNeeded = currentTrad + tradGrowth;
}

// Update balance (contributions while working, withdrawals when retired)
if (isTradRetired) {
  const grossWithdrawalNeeded = currentExpenses / (1 - taxRate / 100);
  currentTrad = currentTrad + tradGrowth - grossWithdrawalNeeded;
} else {
  currentTrad = currentTrad + tradGrowth + (monthlyContrib * 12);
}`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Step 3: Active Engine</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`if (isActivePhase) {
  // A. Route contributions (prioritize Active until cap)
  if (currentActive < tradingCap) {
    const roomInActive = tradingCap - currentActive;
    contribToActive = Math.min(annualContrib, roomInActive);
    contribToPassive = annualContrib - contribToActive;
  } else {
    contribToPassive = annualContrib;
  }

  // B. Calculate profits (with optional ramp-up)
  activeProfitGross = currentActive * (effectiveActiveReturn / 100);
  activeTax = activeProfitGross * (taxRate / 100);
  activeProfitNet = activeProfitGross - activeTax;

  // C. Apply cap and spillover
  let potentialActiveBalance = currentActive + activeProfitNet + contribToActive;
  if (potentialActiveBalance > tradingCap) {
    spilloverNet = potentialActiveBalance - tradingCap;  // Excess to Passive
    currentActive = tradingCap;
    if (!capHitYear) capHitYear = year;
  } else {
    currentActive = potentialActiveBalance;
  }
} else {
  // Active phase ended - liquidate to Passive
  if (!activeStoppedYear) {
    activeStoppedYear = year;
    const moveToPassive = currentActive * (1 - activeCashOutPercent / 100);
    currentPassive += moveToPassive;
    currentActive = 0;
  }
}`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Step 4: Freedom Trigger (RPIC Score)</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`// Calculate passive income generation
const passiveIncomeGen = currentPassive * (passiveYield / 100);

// RPIC Score = Passive Income / Gross Expenses × 100
const rpicScore = grossExpenses > 0 ? (passiveIncomeGen / grossExpenses) * 100 : 0;

// Freedom achieved when passive income covers gross expenses
if (!freedomYear && rpicScore >= 100) {
  freedomYear = year;
  wealthOSCapitalNeeded = currentActive + currentPassive;
}

// Example: $87,804 passive income / $73,171 gross expenses = 120% RPIC Score`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Step 5: Withdrawal Engine with Yield Cap</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`// Determine net income needed (expenses minus Social Security)
let netNeeded = Math.max(0, currentExpenses - annualRetirementIncome);

// Calculate gross withdrawal needed
let withdrawalAmount = netNeeded / (1 - taxRate / 100);

// YIELD CAP: Cannot withdraw more than yieldCapPercent of passive income
const maxWithdrawal = passiveGrowth * (yieldCapPercent / 100);
if (withdrawalAmount > maxWithdrawal && maxWithdrawal > 0) {
  withdrawalAmount = maxWithdrawal;  // Capped withdrawal
}

// Ensure we don't withdraw more than balance
if (currentPassive < withdrawalAmount) {
  withdrawalAmount = currentPassive;
}

// Example: Need $60k net, yield cap 80% of $100k yield = $80k max
// Withdrawal = min($73,171 gross needed, $80,000 cap) = $73,171`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Step 6: Passive Balance Update</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`nextPassiveBalance = currentPassive 
  + passiveGrowth          // Yield from investments
  + contribToPassive       // New contributions
  + spilloverNet           // Excess from Active engine
  + surplusIncome          // Social Security surplus (if any)
  - withdrawalAmount;      // Retirement withdrawals

if (nextPassiveBalance < 0) nextPassiveBalance = 0;
currentPassive = nextPassiveBalance;`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4">8.4 Output Data (TwinEngineRow)</h3>
          <p className="mb-4">
            Each year generates a row with the following fields:
          </p>

          <h4 className="text-xl font-semibold mb-3">Balances</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`year: number;              // Calendar year
age: number;               // User's age in this year
activeBalance: number;     // Active trading account balance
passiveBalance: number;    // Passive income account balance
totalWealthOS: number;     // Active + Passive total
tradBalance: number;       // Traditional benchmark balance`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Income Flows</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`activeProfitNet: number;   // Net profit from active trading (after tax)
passiveIncome: number;     // Passive income generated (yield)
tradSafeIncome: number;    // Traditional 4% safe withdrawal amount
expenses: number;          // Current year living expenses (after inflation)
retirementIncome: number;  // Social Security/pension income`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Ledger Details</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`activeProfitGross: number; // Gross profit before tax
activeTax: number;         // Tax on active profits
spilloverNet: number;      // Excess moved from Active to Passive
passiveGrowth: number;     // Yield from passive investments
withdrawalAmount: number;  // Gross amount withdrawn
withdrawalTax: number;     // Tax on withdrawals
netWallet: number;         // Net spendable income
tradWithdrawal: number;    // Traditional path withdrawal amount
grossExpenses: number;     // Pre-tax expense equivalent
expenseShortfall: number;  // Gap if income < expenses`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Status Flags</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`rpicScore: number;         // Passive Income / Gross Expenses × 100
isCapHit: boolean;         // Has active account reached cap?
isFreedom: boolean;        // Has financial freedom been achieved?
isActivePhase: boolean;    // Is active trading still ongoing?`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4">8.5 Milestones Tracking</h3>
          <p className="mb-4">
            The model tracks 13 significant milestones throughout the projection:
          </p>

          <h4 className="text-xl font-semibold mb-3">Primary Milestones</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`capHitYear: number | null;         // First year Active balance = Trading Cap
freedomYear: number | null;        // First year RPIC Score ≥ 100%
tradFreedomYear: number | null;    // First year Traditional Safe Income ≥ Expenses
activeStoppedYear: number | null;  // Year active trading phase ends
wealthOSCapitalNeeded: number;     // Capital at Wealth OS freedom
tradCapitalNeeded: number;         // Capital at Traditional freedom`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Growth Milestones</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`// Active Profit Milestones (single-year profits)
first25kActiveYear: number | null;    // First $25K annual profit
first100kActiveYear: number | null;   // First $100K annual profit

// Passive Balance Milestones (cumulative)
first500kPassiveYear: number | null;  // Passive balance reaches $500K
first1M_PassiveYear: number | null;   // Passive balance reaches $1M
first2M_PassiveYear: number | null;   // Passive balance reaches $2M
first5M_PassiveYear: number | null;   // Passive balance reaches $5M
first10M_PassiveYear: number | null;  // Passive balance reaches $10M`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4">8.6 KPI Calculations</h3>
          <p className="mb-4">
            The header displays 4 key performance indicators calculated from the projection results:
          </p>

          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`interface TwinEngineKPIs {
  freedomYear: number | null;      // Year of financial freedom
  freedomAge: number | null;       // Age at financial freedom
  timeSaved: number | null;        // Years earlier vs Traditional
  wealthOSCapital: number | null;  // Capital needed (Wealth OS)
  tradCapital: number | null;      // Capital needed (Traditional)
  capitalSavedPercent: number | null; // % less capital needed
  taxRate: number;                 // Applied tax rate
  legacyValue: number | null;      // Final Wealth OS balance at Age 106
  legacyAge: number | null;        // Final projection age
  tradLegacyValue: number | null;  // Final Traditional balance
}

// KPI Calculations
freedomAge = currentAge + (freedomYear - startYear);
timeSaved = tradFreedomYear - freedomYear;
capitalSavedPercent = ((tradCapitalNeeded - wealthOSCapitalNeeded) / tradCapitalNeeded) * 100;
legacyValue = rows[rows.length - 1].totalWealthOS;  // Final balance`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">KPI Display Examples</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="border p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Freedom Date</p>
              <p className="text-2xl font-bold">2031 (Age 61)</p>
            </div>
            <div className="border p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Time Saved</p>
              <p className="text-2xl font-bold text-green-600">12 years earlier</p>
            </div>
            <div className="border p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Capital Required</p>
              <p className="text-2xl font-bold">$732K <span className="text-sm text-muted-foreground">(vs $1.5M traditional)</span></p>
            </div>
            <div className="border p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Legacy Potential</p>
              <p className="text-2xl font-bold text-blue-600">$12.4M at Age 106</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">8.7 Lifestyle Design</h3>
          <p className="mb-4">
            The Lifestyle Roadmap view allows users to adjust target annual spending based on geography and lifestyle tier:
          </p>

          <h4 className="text-xl font-semibold mb-3">Geography Cost Base</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`const geographyBase = {
  low: 40000,     // Low-cost regions (Southeast Asia, Latin America, rural US)
  medium: 60000,  // Medium-cost (mid-tier US cities, Europe)
  high: 90000     // High-cost (NYC, SF, London, major metros)
};`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Lifestyle Tier Multiplier</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`const lifestyleMultiplier = {
  essential: 0.75,  // Basic needs covered, minimal luxuries
  comfort: 1.0,     // Comfortable living with moderate extras
  luxury: 1.5       // Premium lifestyle with significant discretionary
};`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Target Annual Spend Formula</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`targetAnnualSpend = geographyBase[selectedGeography] * lifestyleMultiplier[selectedLifestyle];

// Examples:
// Low-cost + Essential:  $40,000 × 0.75 = $30,000/year
// Medium + Comfort:      $60,000 × 1.00 = $60,000/year
// High-cost + Luxury:    $90,000 × 1.50 = $135,000/year`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">Late-Life Reduction</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`// Optional expense reduction in later years (Step-Down)
if (enableStepDown && age >= stepDownAge) {
  adjustedExpenses = targetAnnualSpend * (1 - stepDownPercent / 100);
}

// Example: $60,000/year reduced by 20% at age 75 = $48,000/year`}
            </code>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="font-semibold mb-2">Default Values (from Chris's Prototype):</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Tax Rate:</strong> 18% (corrected from 25%)</li>
              <li><strong>Annual Expenses:</strong> $60,000 (corrected from $70,000)</li>
              <li><strong>Active Return:</strong> 30% ROI</li>
              <li><strong>Passive Yield:</strong> 12%</li>
              <li><strong>Traditional Return:</strong> 7%</li>
              <li><strong>Trading Cap:</strong> $200,000</li>
              <li><strong>Yield Cap:</strong> 80%</li>
            </ul>
          </div>
        </section>

        {/* 9. Key Calculations */}
        <section id="formulas" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">9. Key Calculations and Formulas</h2>
          <p className="mb-4">
            This section provides complete, production-ready TypeScript code for all major calculations in the system. Each formula includes detailed comments, edge case handling, and numerical examples.
          </p>

          <h3 className="text-2xl font-semibold mb-4">9.1 Transaction Classification (Complete)</h3>
          <p className="mb-4">
            The foundation of budget analysis: filtering operational income/expenses and categorizing into needs/wants/savings.
          </p>

          <h4 className="text-xl font-semibold mb-3">classifyTransactions() - Main Function</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`export function classifyTransactions(txns: StagingTransaction[]) {
  // Step 1: Filter valid operational income (exclude transfers, refunds, etc.)
  const validIncome = txns.filter(txn => 
    txn.sign === "credit" && isValidIncome(txn)
  );
  
  // Step 2: Filter operational expenses (debits only, exclude transfers)
  const operationalExpenses = txns.filter(txn => 
    txn.sign === "debit" && !isTransferOrRefund(txn)
  );
  
  // Step 3: Classify expenses into needs/wants/savings
  const classified = operationalExpenses.map(txn => ({
    ...txn,
    category: mapSubcategoryToCategory(txn.subcategory),
  }));
  
  // Calculate totals
  const totalIncome = validIncome.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = classified.reduce((sum, t) => sum + t.amount, 0);
  
  return { 
    validIncome, 
    classified,
    totalIncome,
    totalExpenses,
    unspentIncome: totalIncome - totalExpenses
  };
}`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">isValidIncome() - Income Filter</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`function isValidIncome(txn: StagingTransaction): boolean {
  const desc = txn.desc.toLowerCase();
  const amount = txn.amount;
  
  // Exclude transfers between accounts
  const transferKeywords = ["transfer", "xfer", "payment from", "move money"];
  if (transferKeywords.some(kw => desc.includes(kw))) return false;
  
  // Exclude credit card payments and refunds
  const nonIncomeKeywords = [
    "credit card", "cc payment", "refund", "return", 
    "reimbursement", "cashback"
  ];
  if (nonIncomeKeywords.some(kw => desc.includes(kw))) return false;
  
  // Exclude small amounts (likely fees or adjustments)
  if (amount < 100) return false;
  
  // Include explicit income keywords
  const incomeKeywords = [
    "payroll", "salary", "direct deposit", "dd", "wages",
    "dividend", "interest", "distribution", "bonus",
    "freelance", "gig", "1099", "consulting", "commission"
  ];
  if (incomeKeywords.some(kw => desc.includes(kw))) return true;
  
  // Include large credits (likely income even without keywords)
  if (amount > 1000) return true;
  
  // Default: exclude if no positive match
  return false;
}

// Example usages:
// isValidIncome({ desc: "Payroll Direct Deposit", amount: 5000, sign: "credit" })  → true
// isValidIncome({ desc: "Transfer from Savings", amount: 500, sign: "credit" })     → false
// isValidIncome({ desc: "Refund Amazon", amount: 50, sign: "credit" })               → false
// isValidIncome({ desc: "Large Deposit", amount: 3000, sign: "credit" })             → true (>$1000)`}
            </code>
          </div>

          <h4 className="text-xl font-semibold mb-3">mapSubcategoryToCategory() - Expense Categorization</h4>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`function mapSubcategoryToCategory(
  subcategory: string
): "need" | "want" | "saving" {
  // Needs: Essential expenses (50% target)
  const needsSubcategories = [
    // Housing & Utilities
    "housing", "rent", "mortgage", "utilities", "internet", "phone",
    // Food
    "groceries", "food_delivery",
    // Transportation
    "gas", "public_transit", "car_maintenance", "parking", "tolls", "car_payment",
    // Insurance & Healthcare
    "insurance", "healthcare", "pharmacy", "medical", "dental", "vision",
    // Education & Childcare
    "childcare", "education", "tuition", "student_loan",
    // Minimum Debt
    "minimum_debt_payment"
  ];
  
  // Savings: Wealth-building activities (20% target)
  const savingsSubcategories = [
    "investment", "brokerage", "retirement_contribution", "401k", "ira",
    "savings_transfer", "extra_debt_payment", "emergency_fund"
  ];
  
  if (needsSubcategories.includes(subcategory.toLowerCase())) return "need";
  if (savingsSubcategories.includes(subcategory.toLowerCase())) return "saving";
  
  // Default: Everything else is a want (30% target)
  return "want";
}

// Example usages:
// mapSubcategoryToCategory("groceries")        → "need"
// mapSubcategoryToCategory("restaurants")      → "want"
// mapSubcategoryToCategory("401k")             → "saving"
// mapSubcategoryToCategory("streaming")        → "want" (default)`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4 mt-8">9.2 Readiness Score Factors (Detailed)</h3>
          <p className="mb-4">
            Complete implementation of all 5 readiness factors with numerical examples.
          </p>

          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`export function calculateReadinessScore(
  snapshot: FinancialSnapshot,
  emergencyFundMonths: number = 6
): { score: number; factors: ReadinessFactor[] } {
  
  // Extract needed values from snapshot
  const liquidAssets = calculateLiquidAssets(snapshot.holdings);
  const monthlyExpenses = calculateMonthlyExpenses(snapshot);
  const monthlyIncome = calculateMonthlyIncome(snapshot);
  const liabilities = snapshot.liabilities;
  const netWorth = snapshot.netWorth.net;
  
  // Calculate 5 factors (each worth 20 points)
  const factor1 = calculateEmergencyFundScore(
    liquidAssets, monthlyExpenses, emergencyFundMonths
  );
  const factor2 = calculateHighInterestDebtScore(liabilities, netWorth);
  const factor3 = calculateIncomeStabilityScore(snapshot);
  const factor4 = calculateCashFlowScore(monthlyIncome, monthlyExpenses);
  const factor5 = calculateCapitalAvailabilityScore(
    liquidAssets, monthlyExpenses * emergencyFundMonths
  );
  
  // Total score (0-100)
  const totalScore = factor1.score + factor2.score + factor3.score + 
                     factor4.score + factor5.score;
  
  return {
    score: Math.round(totalScore),
    factors: [factor1, factor2, factor3, factor4, factor5]
  };
}

// ============ Factor 1: Emergency Fund Coverage (20%) ============
function calculateEmergencyFundScore(
  liquidAssets: number,
  monthlyExpenses: number,
  targetMonths: number
): ReadinessFactor {
  const requiredEF = monthlyExpenses * targetMonths;
  const efMonths = liquidAssets / monthlyExpenses;
  const rawScore = Math.min((efMonths / targetMonths) * 100, 100);
  const weightedScore = rawScore * 0.20; // 20% of total
  
  return {
    name: "Emergency Fund Coverage",
    score: weightedScore,
    maxScore: 20,
    status: weightedScore >= 16 ? "pass" : weightedScore >= 12 ? "warning" : "fail",
    details: \`\${efMonths.toFixed(1)} months of expenses saved (target: \${targetMonths})\`
  };
}
// Example: $30k liquid, $5k/month, 6-month target
// efMonths = 6, rawScore = 100, weightedScore = 20 → PASS

// ============ Factor 2: High-Interest Debt (20%) ============
function calculateHighInterestDebtScore(
  liabilities: Liability[],
  netWorth: number
): ReadinessFactor {
  const highAprDebt = liabilities
    .filter(l => l.apr > 7)
    .reduce((sum, l) => sum + l.balance, 0);
  
  if (highAprDebt === 0) {
    return {
      name: "High-Interest Debt",
      score: 20,
      maxScore: 20,
      status: "pass",
      details: "No high-interest debt (APR > 7%)"
    };
  }
  
  const debtRatio = highAprDebt / netWorth;
  const rawScore = Math.max(0, 100 - (debtRatio * 100));
  const weightedScore = rawScore * 0.20;
  
  return {
    name: "High-Interest Debt",
    score: weightedScore,
    maxScore: 20,
    status: weightedScore >= 16 ? "pass" : weightedScore >= 12 ? "warning" : "fail",
    details: \`$\${highAprDebt.toLocaleString()} high-APR debt (\${(debtRatio * 100).toFixed(1)}% of net worth)\`
  };
}
// Example: $15k debt, $150k net worth
// debtRatio = 0.10, rawScore = 90, weightedScore = 18 → PASS

// ============ Factor 3: Income Stability (20%) ============
function calculateIncomeStabilityScore(
  snapshot: FinancialSnapshot
): ReadinessFactor {
  // Extract monthly incomes from last 6-12 months of transactions
  const monthlyIncomes = extractMonthlyIncomes(snapshot.stagingTxns);
  
  if (monthlyIncomes.length < 3) {
    return {
      name: "Income Stability",
      score: 0,
      maxScore: 20,
      status: "fail",
      details: "Insufficient data (need 3+ months)"
    };
  }
  
  // Calculate coefficient of variation (CV = stdDev / mean)
  const mean = monthlyIncomes.reduce((a, b) => a + b) / monthlyIncomes.length;
  const variance = monthlyIncomes
    .map(income => Math.pow(income - mean, 2))
    .reduce((a, b) => a + b) / monthlyIncomes.length;
  const stdDev = Math.sqrt(variance);
  const cv = stdDev / mean;
  
  // Lower CV = higher stability
  // CV < 0.10 (10% variation) = 100 points
  // CV > 0.50 (50% variation) = 0 points
  const rawScore = Math.max(0, 100 - (cv * 200));
  const weightedScore = rawScore * 0.20;
  
  return {
    name: "Income Stability",
    score: weightedScore,
    maxScore: 20,
    status: weightedScore >= 16 ? "pass" : weightedScore >= 12 ? "warning" : "fail",
    details: \`CV: \${(cv * 100).toFixed(1)}% (lower is better)\`
  };
}
// Example: Incomes [5000, 5100, 4900, 5050, 4950]
// mean = 5000, cv = 0.015, rawScore = 97, weightedScore = 19.4 → PASS

// ============ Factor 4: Monthly Cash Flow (20%) ============
function calculateCashFlowScore(
  monthlyIncome: number,
  monthlyExpenses: number
): ReadinessFactor {
  const monthlyCashFlow = monthlyIncome - monthlyExpenses;
  const cashFlowRatio = monthlyCashFlow / monthlyExpenses;
  
  // 50%+ surplus = 100 points, 0% = 0 points
  const rawScore = Math.max(0, Math.min((cashFlowRatio / 0.50) * 100, 100));
  const weightedScore = rawScore * 0.20;
  
  return {
    name: "Monthly Cash Flow",
    score: weightedScore,
    maxScore: 20,
    status: weightedScore >= 16 ? "pass" : weightedScore >= 12 ? "warning" : "fail",
    details: \`$\${monthlyCashFlow.toLocaleString()} surplus (\${(cashFlowRatio * 100).toFixed(0)}% of expenses)\`
  };
}
// Example: $6000 income, $4500 expenses
// cashFlow = 1500, ratio = 0.333, rawScore = 66.6, weightedScore = 13.3 → WARNING

// ============ Factor 5: Capital Availability (20%) ============
function calculateCapitalAvailabilityScore(
  liquidAssets: number,
  emergencyFund: number
): ReadinessFactor {
  const availableCapital = Math.max(0, liquidAssets - emergencyFund);
  
  // $10k+ available = 100 points
  const rawScore = Math.min((availableCapital / 10000) * 100, 100);
  const weightedScore = rawScore * 0.20;
  
  return {
    name: "Capital Availability",
    score: weightedScore,
    maxScore: 20,
    status: weightedScore >= 16 ? "pass" : weightedScore >= 12 ? "warning" : "fail",
    details: \`$\${availableCapital.toLocaleString()} available after emergency fund\`
  };
}
// Example: $35k liquid, $25k EF
// available = 10k, rawScore = 100, weightedScore = 20 → PASS`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4 mt-8">9.3 RPIC Calculations (Complete)</h3>
          <p className="mb-4">
            Full implementation of retirement passive income capital calculations with timeline projections.
          </p>

          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`// ============ RPIC Calculation ============
export function calculateRpic(inputs: RpicInputs) {
  // Step 1: Adjust for lifestyle and geography
  const adjustedMonthly = 
    inputs.targetMonthly * 
    inputs.lifestyleMultiplier * 
    inputs.geographyMultiplier;
  
  const annualRpic = adjustedMonthly * 12;
  
  // Step 2: Calculate required capital (two scenarios)
  const hybridReturn = 0.12;      // 12% expected return (active + passive mix)
  const traditionalReturn = 0.04; // 4% traditional rule
  
  const hybridCapital = annualRpic / hybridReturn;
  const traditionalCapital = annualRpic / traditionalReturn;
  const capitalSavings = traditionalCapital - hybridCapital;
  
  return {
    adjustedMonthly,
    annualRpic,
    hybridCapital,
    traditionalCapital,
    capitalSavings,
    efficiencyPercent: (capitalSavings / traditionalCapital) * 100 // Usually ~67%
  };
}

// Example: Target $5k/month, same lifestyle (1.0x), same location (1.0x)
// adjustedMonthly = 5000, annualRpic = 60000
// hybridCapital = 60000 / 0.12 = $500k
// traditionalCapital = 60000 / 0.04 = $1.5M
// capitalSavings = $1M (67% more efficient)

// ============ Timeline Calculation ============
export function calculateTimeline(
  targetCapital: number,
  startingCapital: number,
  monthlyContribution: number,
  annualReturn: number
): { years: number; feasible: boolean } {
  
  const monthlyReturn = annualReturn / 12;
  
  // Edge case: Already at goal
  if (startingCapital >= targetCapital) {
    return { years: 0, feasible: true };
  }
  
  // Edge case: No contributions and not at goal
  if (monthlyContribution <= 0 && startingCapital < targetCapital) {
    return { years: Infinity, feasible: false };
  }
  
  // Future Value formula solved for n (number of months)
  // FV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
  // This requires iterative solution or logarithmic approximation
  
  let months = 0;
  let balance = startingCapital;
  const maxMonths = 600; // 50 years cap
  
  while (balance < targetCapital && months < maxMonths) {
    balance = balance * (1 + monthlyReturn) + monthlyContribution;
    months++;
  }
  
  if (months >= maxMonths) {
    return { years: Infinity, feasible: false };
  }
  
  return { 
    years: Math.round(months / 12 * 10) / 10, // Round to 1 decimal
    feasible: true 
  };
}

// Example: Target $500k, starting $50k, contribute $2k/month, 8% return
// Iterative calculation → approximately 11.2 years

// ============ Required Monthly Contribution (Reverse Calc) ============
export function calculateRequiredMonthlyContribution(
  targetCapital: number,
  startingCapital: number,
  targetYears: number,
  annualReturn: number
): number {
  
  const monthlyReturn = annualReturn / 12;
  const months = targetYears * 12;
  
  // Rearrange FV formula to solve for PMT:
  // PMT = (FV - PV * (1 + r)^n) / [((1 + r)^n - 1) / r]
  
  const futureValueOfPV = startingCapital * Math.pow(1 + monthlyReturn, months);
  const futureValueNeeded = targetCapital - futureValueOfPV;
  const annuityFactor = (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn;
  
  const requiredPMT = futureValueNeeded / annuityFactor;
  
  return Math.max(0, requiredPMT); // Can't be negative
}

// Example: Need $500k in 15 years, starting $50k, 8% return
// Required monthly contribution ≈ $1,247`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4 mt-8">9.4 Six-Month Plan Formulas (Summary)</h3>
          <p className="mb-4">
            Key calculations used in the Six-Month Plan Generator (see Section 7.3 for full algorithm).
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <p className="font-semibold mb-2">Emergency Fund Monthly Contribution</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  monthlyEfContribution = (emergencyFundReq - liquidAssets) / 6
                </code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Debt Avalanche (Highest APR First)</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
{`primaryDebt = debts.sort((a, b) => b.apr - a.apr)[0];
extraPayment = cashFlowMonthly * 0.30;
monthlyInterest = (primaryDebt.balance * primaryDebt.apr / 12) / 100;
principalPaydown = extraPayment - monthlyInterest;`}
                </code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Interest Saved (Simple Approximation)</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  interestSaved = (principalPaydown * primaryDebt.apr / 100) * (6 / 12)
                </code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Expense Reduction (Template Estimates)</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
{`Month 1 - Subscriptions: $50-$150/month
Month 2 - Utilities: $30-$80/month
Month 3 - Groceries: $100-$200/month`}
                </code>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Income Boost (Template Estimates)</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
{`Month 3 - Freelance/Gig: $200-$800/month
Month 4 - Salary Negotiation: $0-$500/month (variable)`}
                </code>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4 mt-8">9.5 Capital Allocation Waterfall</h3>
          <p className="mb-4">
            Priority-based capital flow from liquid assets to investment accounts.
          </p>

          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`export function calculateCapitalAllocation(
  liquidAssets: number,
  monthlyExpenses: number,
  emergencyFundMonths: number,
  highInterestDebt: number,
  rpicTargetPassiveCapital: number = 0
): CapitalAllocation {
  
  // Priority 1: Emergency Fund
  const emergencyFund = monthlyExpenses * emergencyFundMonths;
  const afterEF = Math.max(0, liquidAssets - emergencyFund);
  
  // Priority 2: High-Interest Debt Buffer (50% of debt)
  const debtBuffer = highInterestDebt * 0.5;
  const afterDebt = Math.max(0, afterEF - debtBuffer);
  
  // Priority 3: Dynamic Trading Account Cap
  const defaultCap = 100000; // $100k default
  const dynamicCap = rpicTargetPassiveCapital > 0 
    ? rpicTargetPassiveCapital * 0.40  // 40% of RPIC target
    : defaultCap;
  
  const maxTradingAccountCap = Math.max(dynamicCap, 25000); // Min $25k for PDT
  
  // Priority 4: Active Trading Account (capped)
  const tradingAccount = Math.min(afterDebt, maxTradingAccountCap);
  const afterTrading = Math.max(0, afterDebt - tradingAccount);
  
  // Priority 5: Passive Income Reserve (overflow when cap reached)
  const passiveReserve = afterTrading;
  const feedingToPassive = tradingAccount >= maxTradingAccountCap && passiveReserve > 0;
  
  return {
    liquidAssets,
    emergencyFund,
    debtBuffer,
    tradingAccount,
    maxTradingAccountCap,
    passiveReserve,
    feedingToPassive,
    waterfall: [
      { stage: "Liquid Assets", amount: liquidAssets },
      { stage: "Emergency Fund", amount: emergencyFund },
      { stage: "Debt Buffer", amount: debtBuffer },
      { stage: "Trading Account", amount: tradingAccount },
      { stage: "Passive Reserve", amount: passiveReserve }
    ]
  };
}

// Example 1: $100k liquid, $5k/month expenses, 6-month EF, $20k high-APR debt, $500k RPIC target
// emergencyFund = 30k
// debtBuffer = 10k
// afterDebt = 60k
// dynamicCap = 500k * 0.40 = 200k
// tradingAccount = min(60k, 200k) = 60k
// passiveReserve = 0
// feedingToPassive = false (not at cap yet)

// Example 2: $300k liquid, same expenses/debt, $500k RPIC target
// emergencyFund = 30k
// debtBuffer = 10k
// afterDebt = 260k
// dynamicCap = 200k
// tradingAccount = 200k (capped)
// passiveReserve = 60k (overflow)
// feedingToPassive = true (feeding mode activated)`}
            </code>
          </div>
        </section>

        {/* 10. User Flow */}
        <section id="user-flow" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">10. Typical User Flow</h2>

          <h3 className="text-2xl font-semibold mb-4">First Time (Onboarding)</h3>
          <ol className="list-decimal pl-6 mb-6 space-y-3">
            <li>
              <strong>Command Center - Data Intake</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>User loads data via Sample Data, Mock Connect, Upload Files, or Manual Entry</li>
                <li>System validates and processes data</li>
                <li>FinancialSnapshot is created and persisted in localStorage</li>
              </ul>
            </li>
            <li>
              <strong>Dashboard - Net Worth Overview</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>User sees their consolidated net worth</li>
                <li>Reviews asset and liability distribution</li>
                <li>Identifies liquid assets and available capital</li>
              </ul>
            </li>
            <li>
              <strong>Budget Analyzer - 50/30/20 Analysis</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>System automatically classifies transactions</li>
                <li>User sees current distribution vs 50/30/20 target</li>
                <li>Identifies improvement areas and quick wins</li>
                <li>Can filter transactions by Type, Category, Subcategory, Account, Date</li>
              </ul>
            </li>
            <li>
              <strong>Investments - Readiness Assessment</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Completes Readiness Score (5 factors)</li>
                <li>Reviews asset optimization opportunities</li>
                <li>Selects active investment strategy</li>
                <li>Starts paper trading if appropriate</li>
              </ul>
            </li>
            <li>
              <strong>Goals - RPIC Planning</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Answers 3 key questions (Target Income, Lifestyle, Geography)</li>
                <li>Confirms or adjusts monthly expense baseline</li>
                <li>System calculates required RPIC and timeline</li>
                <li>User sees visual roadmap with milestones</li>
              </ul>
            </li>
          </ol>

          <h3 className="text-2xl font-semibold mb-4">Returning User</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Dashboard automatically loads persisted data</li>
            <li>User can update data in Command Center</li>
            <li>Reviews progress in Budget Analyzer (period filters: 30/60/90 days)</li>
            <li>Updates paper trading progress in Investments</li>
            <li>Adjusts assumptions in Goals based on life changes</li>
            <li>Can reset all data with "New Analysis" at any time</li>
          </ul>
        </section>

        {/* 11. Glossary */}
        <section id="glossary" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">11. Glossary of Terms</h2>

          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-lg mb-1">50/30/20 Rule</dt>
              <dd className="text-muted-foreground">
                Budgeting rule suggesting allocation of 50% of income to needs, 30% to wants, and 20% to savings/investments.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Asset Allocation</dt>
              <dd className="text-muted-foreground">
                Distribution of investments across different asset classes (stocks, bonds, real estate, etc.).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Avalanche Method</dt>
              <dd className="text-muted-foreground">
                Debt payoff strategy that prioritizes paying down the highest APR debt first, minimizing total interest paid over time. Used in the Six-Month Plan Generator.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Broker Setup Wizard</dt>
              <dd className="text-muted-foreground">
                5-step guided process in the Investments tab for opening, funding, and connecting a brokerage account with options approval. Progress is saved and resumes from the last completed step.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Coefficient of Variation (CV)</dt>
              <dd className="text-muted-foreground">
                Statistical measure of income stability calculated as (standard deviation / mean) × 100. Lower CV indicates more stable income. Used in Readiness Score Factor 3.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Debt-to-Income Ratio (DTI)</dt>
              <dd className="text-muted-foreground">
                Percentage of monthly income allocated to debt payments. Lower DTI indicates better financial health.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Emergency Fund</dt>
              <dd className="text-muted-foreground">
                Cash reserve equivalent to 3-6 months of expenses for unexpected emergencies.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Feeding Mode</dt>
              <dd className="text-muted-foreground">
                Capital allocation state triggered when the active trading account reaches or exceeds its cap ($100k default or 40% of RPIC target). Excess capital automatically flows to the Passive Income Reserve instead of the trading account.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Foundation Score</dt>
              <dd className="text-muted-foreground">
                Synonym for Readiness Score. 0-100 score evaluating financial readiness for active investments based on 5 equally weighted factors (emergency fund, debt, income stability, cash flow, capital availability).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Liquid Assets</dt>
              <dd className="text-muted-foreground">
                Assets that can be quickly converted to cash without significant loss of value (cash, stocks, bonds).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Multi-Strategy Trading</dt>
              <dd className="text-muted-foreground">
                Ability to select and execute multiple trading strategies simultaneously (e.g., options wheel + swing trading). Unlocks when trading account reaches $50,000.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Net Worth</dt>
              <dd className="text-muted-foreground">
                Total value of all assets minus all liabilities. Primary metric of financial health.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Operational Income</dt>
              <dd className="text-muted-foreground">
                Real income (salaries, investments, freelance) excluding internal transfers, refunds, and asset sales.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Paper Trading</dt>
              <dd className="text-muted-foreground">
                Trading simulation with virtual money to practice strategies without real financial risk.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Paper Trading Gate</dt>
              <dd className="text-muted-foreground">
                Requirements that must be met before allocating real capital to active trading: (1) Complete 40+ simulated trades, (2) Achieve 95%+ plan adherence, (3) Complete 70%+ of pre-trade checklist. Validates discipline and strategy execution.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Readiness Score</dt>
              <dd className="text-muted-foreground">
                0-100 score evaluating a user's readiness for active investments based on 5 key factors (each worth 20 points): emergency fund coverage, high-interest debt, income stability, monthly cash flow, capital availability.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">RPIC (Retirement Passive Income Capital)</dt>
              <dd className="text-muted-foreground">
                Total capital needed to generate sufficient passive income for retirement without depleting principal.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">RPIC Index</dt>
              <dd className="text-muted-foreground">
                Progress percentage toward target RPIC. RPIC Index = (Current Capital / Target RPIC) × 100.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">RPIC Score (Twin-Engine)</dt>
              <dd className="text-muted-foreground">
                Ratio of passive income to gross expenses. RPIC Score = (Passive Income / Gross Expenses) × 100. Freedom is achieved when RPIC Score ≥ 100%.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Ramp-Up Period</dt>
              <dd className="text-muted-foreground">
                Learning curve period in Twin-Engine projection where active trading ROI starts at 50% and scales linearly to 100% over a configurable number of years (default: 2 years).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Six-Month Foundation Plan</dt>
              <dd className="text-muted-foreground">
                Client-side generated 6-month financial improvement plan with specific monthly tasks (expense cuts, debt paydown, income boosts) tailored to the user's snapshot. Includes estimated dollar impacts, KPI tracking, and projected readiness score at completion.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Strategy Assessment</dt>
              <dd className="text-muted-foreground">
                4-question self-assessment in the Investments tab (capital, risk tolerance, time availability, experience) that generates personalized trading strategy recommendations with match percentages. Users can select multiple strategies simultaneously.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Spillover</dt>
              <dd className="text-muted-foreground">
                In the Twin-Engine model, excess profits from the Active account that exceed the trading cap automatically "spill over" into the Passive account for income generation.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Subcategory</dt>
              <dd className="text-muted-foreground">
                Detailed transaction classification (groceries, transportation, healthcare, etc.) that maps to main categories (Need/Want/Saving).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Trading Cap</dt>
              <dd className="text-muted-foreground">
                Maximum size of the Active trading account in the Twin-Engine model (default: $200,000). When reached, excess profits spill over to the Passive account.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Twin-Engine Model</dt>
              <dd className="text-muted-foreground">
                Financial projection model that separates capital into two distinct pools: Active Engine (capped, high-return trading) and Passive Engine (uncapped, income-generating). Compares against a Traditional benchmark.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Waterfall Logic</dt>
              <dd className="text-muted-foreground">
                Sequential calculation process where each step depends on the result of the previous one (used in capital allocation).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Wealth OS Hybrid Approach</dt>
              <dd className="text-muted-foreground">
                Strategy combining traditional passive investments with active investments to achieve ~12% annual returns, requiring 67% less capital than traditional approaches.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Yield Cap</dt>
              <dd className="text-muted-foreground">
                Maximum percentage of passive income that can be withdrawn annually (default: 80%). Prevents over-withdrawal and ensures capital preservation during retirement.
              </dd>
            </div>
          </dl>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rockwell Wealth OS. Technical System Documentation.</p>
          <p className="mt-2">Generated on {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Documentation;
